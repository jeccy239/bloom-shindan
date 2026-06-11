'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BLOOM_TYPES } from '@/lib/types';
import type { DiagnosisResult, BloomTypeCode } from '@/lib/types';
import { loadResult } from '@/lib/scoring';

const AXIS_LABELS = {
  EI: { left: 'E 外向き', right: 'I 内向き', leftPct: (p: number) => p, rightPct: (p: number) => 100 - p },
  SN: { left: 'S 現実型', right: 'N 直感型', leftPct: (p: number) => p, rightPct: (p: number) => 100 - p },
  TF: { left: 'T 論理型', right: 'F 感情型', leftPct: (p: number) => p, rightPct: (p: number) => 100 - p },
  JP: { left: 'J 計画型', right: 'P 柔軟型', leftPct: (p: number) => p, rightPct: (p: number) => 100 - p },
};

export default function ResultPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = loadResult();
    if (saved && saved.typeId === typeId) {
      setResult(saved);
    }
  }, [typeId]);

  const typeCode = (
    Object.keys(BLOOM_TYPES).find(
      (k) => BLOOM_TYPES[k as BloomTypeCode].id === typeId,
    ) as BloomTypeCode | undefined
  );

  if (!mounted) return null;

  if (!typeCode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">タイプが見つかりませんでした</p>
          <Link href="/" className="text-purple-500 underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const type = BLOOM_TYPES[typeCode];
  const pct = result?.percentages;

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center pb-16 px-4">

      {/* Hero section */}
      <div className="w-full max-w-xl pt-10 animate-fadeInUp">
        <div
          className="rounded-3xl p-8 text-white text-center shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${type.gradientFrom}, ${type.gradientTo})` }}
        >
          <div className="text-xs font-bold tracking-[0.3em] uppercase opacity-80 mb-3">
            Bloom 診断 結果
          </div>
          <div className="text-7xl mb-4 drop-shadow-md animate-float">
            {type.emoji}
          </div>
          <div className="text-base font-semibold opacity-80 mb-1">
            {type.flower}（{type.flowerEn}）
          </div>
          <div className="text-3xl font-black tracking-tight mb-1">
            {type.title}
          </div>
          <div className="text-sm opacity-75 italic mb-4">
            "{type.tagline}"
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-mono font-bold text-lg tracking-widest">
            {type.code}
          </div>
        </div>
      </div>

      {/* Score bars */}
      {pct && (
        <div
          className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-5 p-6 animate-fadeInUp"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
            あなたのスコア
          </h2>
          <div className="flex flex-col gap-4">
            {(Object.entries(AXIS_LABELS) as [keyof typeof AXIS_LABELS, typeof AXIS_LABELS[keyof typeof AXIS_LABELS]][]).map(([axis, labels]) => {
              const leftPct =
                axis === 'EI' ? pct.EI
                : axis === 'SN' ? pct.SN
                : axis === 'TF' ? pct.TF
                : pct.JP;
              const rightPct = 100 - leftPct;
              const dominantLeft = leftPct >= 50;
              return (
                <div key={axis}>
                  <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
                    <span className={dominantLeft ? 'text-purple-600' : ''}>{labels.left}</span>
                    <span className={!dominantLeft ? 'text-pink-600' : ''}>{labels.right}</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden flex">
                    <div
                      className="h-full rounded-l-full"
                      style={{
                        width: `${leftPct}%`,
                        background: 'linear-gradient(to right, #a855f7, #ec4899)',
                        transition: 'width 1s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                    />
                    <div
                      className="h-full rounded-r-full"
                      style={{
                        width: `${rightPct}%`,
                        background: 'linear-gradient(to right, #f9a8d4, #fed7aa)',
                        transition: 'width 1s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{leftPct}%</span>
                    <span>{rightPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Description */}
      <div
        className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-5 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.15s', opacity: 0 }}
      >
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
          あなたについて
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">{type.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {type.keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={{
                background: `linear-gradient(135deg, ${type.gradientFrom}22, ${type.gradientTo}22)`,
                color: type.gradientFrom,
                border: `1px solid ${type.gradientFrom}44`,
              }}
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths & Challenges */}
      <div className="max-w-xl w-full mt-5 grid grid-cols-1 gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
            ✨ あなたの強み
          </h2>
          <ul className="flex flex-col gap-2">
            {type.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">◆</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
          <h2 className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-3">
            🌱 成長のヒント
          </h2>
          <ul className="flex flex-col gap-2">
            {type.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-rose-300 mt-0.5 flex-shrink-0">◆</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compatible types */}
      <div
        className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-5 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.25s', opacity: 0 }}
      >
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          相性の良いタイプ
        </h2>
        <div className="flex flex-wrap gap-3">
          {type.compatibleWith.map((code) => {
            const t = BLOOM_TYPES[code];
            return (
              <Link
                key={code}
                href={`/result/${t.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-purple-100 bg-white/60 hover:bg-purple-50 hover:border-purple-200 transition-colors"
              >
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <div className="text-xs font-bold text-gray-700">{t.code}</div>
                  <div className="text-xs text-gray-400">{t.flower}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* All 16 types */}
      <div
        className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-5 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          全16タイプ
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {(Object.values(BLOOM_TYPES) as typeof BLOOM_TYPES[BloomTypeCode][]).map((t) => (
            <Link
              key={t.code}
              href={`/result/${t.id}`}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                t.code === type.code
                  ? 'border-purple-300 bg-purple-50 shadow-sm'
                  : 'border-gray-100 bg-white/40 hover:border-purple-200'
              }`}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-xs font-bold text-gray-600">{t.code}</span>
              <span className="text-[10px] text-gray-400 text-center leading-tight">{t.flower}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Retry button */}
      <div
        className="max-w-xl w-full mt-6 animate-fadeInUp"
        style={{ animationDelay: '0.35s', opacity: 0 }}
      >
        <Link
          href="/"
          className="block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-base shadow-lg shadow-pink-300/40 hover:shadow-xl hover:shadow-pink-300/60 hover:-translate-y-0.5 transition-all duration-200"
        >
          もう一度診断する 🌸
        </Link>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `私のBloomタイプは「${type.title}」(${type.code})でした！`,
                text: `${type.flower}タイプ：${type.tagline}`,
                url: window.location.href,
              });
            }
          }}
          className="block w-full mt-3 text-center py-4 rounded-2xl border-2 border-purple-200 bg-white/60 text-purple-600 font-bold text-base hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
        >
          結果をシェアする 📤
        </button>
      </div>
    </div>
  );
}
