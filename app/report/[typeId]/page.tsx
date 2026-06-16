'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId, FactionColor } from '@/lib/types';
import { loadResult } from '@/lib/scoring';

const FACTION_COLOR: Record<FactionColor, { accent: string }> = {
  blue:   { accent: '#3b82f6' },
  red:    { accent: '#ef4444' },
  purple: { accent: '#a855f7' },
  gold:   { accent: '#c9a84c' },
  cyan:   { accent: '#22d3ee' },
  orange: { accent: '#f97316' },
  green:  { accent: '#22c55e' },
};

function PurchaseButton({ typeId, accent }: { typeId: string; accent: string }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeId }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="w-full py-4 font-black text-sm tracking-[0.2em] text-white disabled:opacity-60 transition-opacity"
      style={{ background: accent }}
    >
      {loading ? '処理中...' : `¥480 で購入する →`}
    </button>
  );
}

function ReportSection({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: accent }} />
        <h2 className="text-sm font-black tracking-widest text-white">{title}</h2>
      </div>
      <p className="text-white/65 text-sm leading-[1.9] pl-4">{body}</p>
    </div>
  );
}

function parseReport(text: string): { title: string; body: string }[] {
  const parts = text.split(/◆\s+/).filter(Boolean);
  return parts.map((part) => {
    const lines = part.trim().split('\n');
    const title = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();
    return { title, body };
  });
}

function sessionKey(typeId: string) { return `bloom_session_${typeId}`; }
function reportKey(typeId: string) { return `bloom_report_${typeId}`; }

export default function ReportPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const searchParams = useSearchParams();
  const urlSessionId = searchParams.get('session_id');

  const [paymentStatus, setPaymentStatus] = useState<'verifying' | 'paid' | 'unpaid'>('verifying');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const typeData = BLOOM_TYPES[typeId as BloomTypeId];
  const accent = typeData ? FACTION_COLOR[typeData.factionColor].accent : '#c9a84c';

  // Step 1: verify payment — URL session_id takes priority, falls back to localStorage
  useEffect(() => {
    const savedSessionId = localStorage.getItem(sessionKey(typeId));
    const effectiveSessionId = urlSessionId || savedSessionId;

    if (!effectiveSessionId) {
      setPaymentStatus('unpaid');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/verify-payment?session_id=${effectiveSessionId}`);
        const data = await res.json();
        if (data.paid) {
          localStorage.setItem(sessionKey(typeId), effectiveSessionId);
          setPaymentStatus('paid');
        } else {
          setPaymentStatus('unpaid');
        }
      } catch {
        setPaymentStatus('unpaid');
      }
    })();
  }, [urlSessionId, typeId]);

  // Step 2: load cached report or stream a new one
  useEffect(() => {
    if (paymentStatus !== 'paid' || !typeData) return;

    // Return cached report immediately — no API call needed
    const cached = localStorage.getItem(reportKey(typeId));
    if (cached) {
      setReport(cached);
      setLoading(false);
      setDone(true);
      return;
    }

    const result = loadResult();
    const stats = result?.stats ?? {
      analysis: typeData.stats.analysis,
      action: typeData.stats.action,
      empathy: typeData.stats.empathy,
      expression: typeData.stats.expression,
      change: typeData.stats.change,
    };
    const axisScores = result?.axisScores ?? { axis1: 0, axis2: 0, axis3: 0, axis4: 0, axis5: 0 };

    abortRef.current = new AbortController();

    (async () => {
      try {
        const res = await fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ typeId, stats, axisScores }),
          signal: abortRef.current!.signal,
        });

        if (!res.ok) throw new Error('API error');

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No stream');

        const decoder = new TextDecoder();
        setLoading(false);

        let fullReport = '';
        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          const chunk = decoder.decode(value, { stream: true });
          fullReport += chunk;
          setReport((prev) => prev + chunk);
        }
        localStorage.setItem(reportKey(typeId), fullReport);
        setDone(true);
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
        setErrorMsg('分析の生成中にエラーが発生しました。');
        setLoading(false);
      }
    })();

    return () => abortRef.current?.abort();
  }, [paymentStatus, typeId, typeData]);

  if (!typeData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white/40 text-sm">タイプが見つかりません</p>
      </div>
    );
  }

  // Payment verification loading
  if (paymentStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `${accent}40`, borderTopColor: accent }}
          />
          <p className="text-white/30 text-xs tracking-[0.3em]">決済を確認中...</p>
        </div>
      </div>
    );
  }

  // Not paid
  if (paymentStatus === 'unpaid') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="text-[9px] font-bold tracking-[0.4em] text-white/20 mb-8">
            BLOOM DIAGNOSIS — DEEP ANALYSIS
          </div>
          <h2 className="text-xl font-black text-white mb-2">AI 深層分析レポート</h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            あなただけの詳細分析レポートをご覧いただくには決済が必要です。
          </p>
          <PurchaseButton typeId={typeData.id} accent={accent} />
          <Link
            href={`/result/${typeId}`}
            className="block mt-4 text-xs text-white/25 hover:text-white/40 transition-colors"
          >
            ← 結果ページに戻る
          </Link>
        </div>
      </div>
    );
  }

  const sections = parseReport(report);
  const hasContent = sections.length > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">

      {/* Header */}
      <div
        className="w-full max-w-lg mx-auto px-6 pt-10 pb-8"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${accent}15 0%, #0a0a0a 60%)`,
        }}
      >
        <div className="text-[8px] font-bold tracking-[0.4em] text-white/20 mb-6">
          BLOOM DIAGNOSIS — DEEP ANALYSIS
        </div>
        <div className="mb-2">
          <span className="text-[9px] font-mono text-white/20 tracking-[0.3em]">TYPE {typeData.id}</span>
        </div>
        <h1 className="text-3xl font-black mb-1" style={{ color: accent }}>{typeData.jobClass}</h1>
        <p className="text-base font-bold text-white mb-1">{typeData.catchTitle}</p>
        <p className="text-xs font-bold tracking-wider mb-4 text-white/40">{typeData.characterTitle}</p>
        <div className="h-px" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
      </div>

      {/* Content */}
      <div className="w-full max-w-lg mx-auto px-6">

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${accent}40`, borderTopColor: accent }}
            />
            <p className="text-white/30 text-xs tracking-[0.3em]">AIが分析中...</p>
          </div>
        )}

        {/* Error state */}
        {errorMsg && (
          <div className="py-12 text-center">
            <p className="text-white/40 text-sm mb-6">{errorMsg}</p>
            <Link href={`/result/${typeId}`} className="text-xs text-white/30 underline">
              結果ページに戻る
            </Link>
          </div>
        )}

        {/* Streaming: show raw text until sections are parseable */}
        {!loading && !errorMsg && (
          <>
            {hasContent ? (
              <div className="animate-fadeInUp">
                {sections.map((section, i) => (
                  <ReportSection
                    key={i}
                    title={section.title}
                    body={section.body}
                    accent={accent}
                  />
                ))}
                {/* Streaming cursor */}
                {!done && (
                  <span
                    className="inline-block w-0.5 h-4 animate-pulse ml-1"
                    style={{ background: accent }}
                  />
                )}
              </div>
            ) : (
              /* Pre-section text streaming */
              <div className="text-white/60 text-sm leading-[1.9] py-4">
                {report}
                {!done && (
                  <span
                    className="inline-block w-0.5 h-4 animate-pulse ml-1"
                    style={{ background: accent }}
                  />
                )}
              </div>
            )}

            {/* Footer actions */}
            {done && (
              <div className="mt-10 flex flex-col gap-3 animate-fadeInUp">
                <div
                  className="text-[9px] font-bold tracking-[0.3em] text-center mb-2"
                  style={{ color: accent }}
                >
                  あなたの分析が完了しました
                </div>
                <Link
                  href={`/result/${typeId}`}
                  className="block w-full py-4 border border-white/10 text-white/40 font-bold text-xs tracking-[0.3em] text-center hover:text-white/60 transition-colors"
                >
                  ← 診断結果に戻る
                </Link>
                <Link
                  href="/"
                  className="block w-full py-3 text-white/20 font-bold text-xs tracking-[0.2em] text-center hover:text-white/40 transition-colors"
                >
                  もう一度診断する
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
