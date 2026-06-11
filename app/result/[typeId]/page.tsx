'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId, DiagnosisStats } from '@/lib/types';
import { loadResult } from '@/lib/scoring';

const STAT_LABELS: { key: keyof DiagnosisStats; label: string }[] = [
  { key: 'analysis',   label: '分析力' },
  { key: 'action',     label: '実行力' },
  { key: 'empathy',    label: '共感力' },
  { key: 'expression', label: '発信力' },
  { key: 'change',     label: '変化適応' },
];

export default function ResultPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const [mounted, setMounted] = useState(false);
  const [displayBP, setDisplayBP] = useState(0);
  const [showBars, setShowBars] = useState(false);
  const [userStats, setUserStats] = useState<DiagnosisStats | null>(null);
  const [userBP, setUserBP] = useState<number | null>(null);

  const typeData = BLOOM_TYPES[typeId as BloomTypeId];

  useEffect(() => {
    setMounted(true);
    const saved = loadResult();
    if (saved && saved.typeId === typeId) {
      setUserStats(saved.stats);
      setUserBP(saved.battlePower);
    }
  }, [typeId]);

  useEffect(() => {
    if (!mounted || !typeData) return;
    const target = userBP ?? typeData.battlePower;
    let frame: number;
    let start: number | null = null;
    const duration = 2000;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayBP(Math.round(eased * target));
      if (t < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayBP(target);
      }
    };

    frame = requestAnimationFrame(animate);
    const barTimer = setTimeout(() => setShowBars(true), 400);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(barTimer);
    };
  }, [mounted, userBP, typeData]);

  if (!mounted) return null;

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">タイプが見つかりませんでした</p>
          <Link href="/" className="text-gray-900 underline text-sm">トップへ戻る</Link>
        </div>
      </div>
    );
  }

  const stats = userStats ?? typeData.stats;
  const battlePower = userBP ?? typeData.battlePower;
  const compatibleType = BLOOM_TYPES[typeData.compatibleType];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-16 px-5">

      {/* Header */}
      <div className="w-full max-w-lg pt-12 pb-8 animate-fadeInUp">
        <div className="text-[9px] font-bold tracking-[0.5em] text-gray-300 uppercase mb-4">
          Bloom Diagnosis — Result
        </div>
        <div className="text-[9px] font-mono text-gray-300 mb-3">TYPE {typeData.id}</div>
        <h1 className="text-5xl font-black text-gray-900 leading-none mb-3">
          {typeData.catchTitle}
        </h1>
        <div className="w-6 h-0.5 mb-3" style={{ background: '#c9a84c' }} />
        <p className="text-xs text-gray-400">"{typeData.catchCopy}"</p>
      </div>

      {/* Battle Power */}
      <div className="max-w-lg w-full animate-scaleIn">
        <div className="bg-gray-900 p-7 text-white">
          <div className="text-[9px] font-bold tracking-[0.5em] uppercase mb-2" style={{ color: '#c9a84c' }}>
            Battle Power
          </div>
          <div className="text-7xl font-black tracking-tight tabular-nums leading-none mb-4">
            {displayBP.toLocaleString()}
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="text-[10px] text-gray-500 flex-shrink-0">/ 10,000</div>
            <div className="flex-1 h-px bg-gray-800 overflow-hidden">
              <div
                style={{
                  height: '100%',
                  width: `${(displayBP / 10000) * 100}%`,
                  background: '#c9a84c',
                  transition: 'width 0.05s ease-out',
                }}
              />
            </div>
          </div>
          <div className="text-[10px] text-gray-500">{typeData.jobTitle}</div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="border border-gray-200 max-w-lg w-full mt-3 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 mb-5">
          Personality Axes
        </div>
        <div className="flex flex-col gap-5">
          {STAT_LABELS.map(({ key, label }) => {
            const value = stats[key];
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-gray-700">{label}</span>
                  <span className="text-[10px] font-mono font-bold text-gray-400 tabular-nums">
                    {String(value).padStart(3, ' ')}%
                  </span>
                </div>
                <div className="h-0.5 bg-gray-100">
                  <div
                    style={{
                      width: showBars ? `${value}%` : '0%',
                      height: '100%',
                      background: '#c9a84c',
                      transition: 'width 1s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div
        className="border border-gray-200 max-w-lg w-full mt-3 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.15s', opacity: 0 }}
      >
        <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 mb-3">
          Profile
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{typeData.description}</p>
      </div>

      {/* Jobs & Hobbies */}
      <div
        className="max-w-lg w-full mt-3 grid grid-cols-2 gap-3 animate-fadeInUp"
        style={{ animationDelay: '0.2s', opacity: 0 }}
      >
        <div className="border border-gray-200 p-5">
          <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 mb-4">Jobs</div>
          <ul className="flex flex-col gap-3">
            {typeData.jobs.map((job) => (
              <li key={job} className="text-xs text-gray-700 flex items-center gap-2">
                <span className="w-3 h-px flex-shrink-0" style={{ background: '#c9a84c' }} />
                {job}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 p-5">
          <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 mb-4">Hobbies</div>
          <ul className="flex flex-col gap-3">
            {typeData.hobbies.map((hobby) => (
              <li key={hobby} className="text-xs text-gray-700 flex items-center gap-2">
                <span className="w-3 h-px flex-shrink-0" style={{ background: '#c9a84c' }} />
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compatible type */}
      <div
        className="border border-gray-200 max-w-lg w-full mt-3 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.25s', opacity: 0 }}
      >
        <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 mb-4">
          Best Match
        </div>
        <Link
          href={`/result/${typeData.compatibleType}`}
          className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-300 transition-colors"
        >
          <div className="w-10 h-10 bg-gray-900 flex items-center justify-center text-white font-black font-mono text-sm flex-shrink-0">
            {compatibleType.id}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 text-sm">{compatibleType.catchTitle}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{typeData.compatibleReason}</div>
          </div>
          <span className="text-gray-300 text-xs flex-shrink-0">→</span>
        </Link>
      </div>

      {/* CTAs */}
      <div
        className="max-w-lg w-full mt-5 animate-fadeInUp"
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <button
          onClick={() => {
            const text = `${typeData.catchTitle} — Battle Power ${battlePower.toLocaleString()} | ${typeData.catchCopy}`;
            if (navigator.share) {
              navigator.share({ title: text, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(window.location.href).then(() => alert('URLをコピーしました！'));
            }
          }}
          className="block w-full py-4 bg-gray-900 text-white font-bold text-xs tracking-[0.3em] uppercase text-center hover:bg-black transition-colors mb-2"
        >
          結果をシェアする →
        </button>
        <Link
          href="/"
          className="block w-full py-4 border border-gray-200 text-gray-500 font-bold text-xs tracking-[0.3em] uppercase text-center hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          もう一度診断する
        </Link>
      </div>

    </div>
  );
}
