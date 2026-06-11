'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId, DiagnosisStats } from '@/lib/types';
import { loadResult } from '@/lib/scoring';

const STAT_LABELS: { key: keyof DiagnosisStats; emoji: string; label: string }[] = [
  { key: 'analysis',   emoji: '🧠', label: '分析力' },
  { key: 'action',     emoji: '⚡', label: '実行力' },
  { key: 'empathy',    emoji: '❤️', label: '共感力' },
  { key: 'expression', emoji: '📣', label: '発信力' },
  { key: 'change',     emoji: '🔥', label: '変化適応' },
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
          <p className="text-gray-500 mb-4">タイプが見つかりませんでした</p>
          <Link href="/" className="text-pink-500 underline">トップへ戻る</Link>
        </div>
      </div>
    );
  }

  const stats = userStats ?? typeData.stats;
  const battlePower = userBP ?? typeData.battlePower;
  const compatibleType = BLOOM_TYPES[typeData.compatibleType];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-16 px-4">

      {/* Header */}
      <div className="w-full max-w-xl pt-10 text-center animate-fadeInUp">
        <div className="text-xs font-bold tracking-[0.3em] text-pink-400 uppercase mb-3">
          Bloom 診断 結果
        </div>
        <div className="text-4xl font-black text-gray-900 mb-1">
          {typeData.catchTitle}
        </div>
        <div className="text-sm text-gray-400 italic mb-1">
          "{typeData.catchCopy}"
        </div>
        <div className="text-xs text-gray-300 font-mono">TYPE {typeData.id}</div>
      </div>

      {/* Battle Power */}
      <div className="max-w-xl w-full mt-5 animate-scaleIn">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-center text-white shadow-xl">
          <div className="text-xs font-bold tracking-[0.3em] uppercase opacity-50 mb-2">
            Battle Power
          </div>
          <div className="text-6xl font-black tracking-tight mb-1 tabular-nums">
            {displayBP.toLocaleString()}
          </div>
          <div className="text-xs opacity-40 mb-4">/ 10,000</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400"
              style={{
                width: `${(displayBP / 10000) * 100}%`,
                transition: 'width 0.05s ease-out',
              }}
            />
          </div>
          <div className="mt-4 text-xs opacity-50 leading-relaxed">
            {typeData.jobTitle}
          </div>
        </div>
      </div>

      {/* Stats bars */}
      <div
        className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-4 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          5軸スコア
        </h2>
        <div className="flex flex-col gap-4">
          {STAT_LABELS.map(({ key, emoji, label }) => {
            const value = stats[key];
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </span>
                  <span className="text-sm font-bold text-gray-500">{value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400"
                    style={{
                      width: showBars ? `${value}%` : '0%',
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
        className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-4 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.15s', opacity: 0 }}
      >
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          あなたについて
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">{typeData.description}</p>
      </div>

      {/* Jobs & Hobbies */}
      <div
        className="max-w-xl w-full mt-4 grid grid-cols-2 gap-4 animate-fadeInUp"
        style={{ animationDelay: '0.2s', opacity: 0 }}
      >
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            💼 向いてる仕事
          </h2>
          <ul className="flex flex-col gap-2">
            {typeData.jobs.map((job) => (
              <li key={job} className="text-sm text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-300 flex-shrink-0" />
                {job}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            🎯 趣味・習慣
          </h2>
          <ul className="flex flex-col gap-2">
            {typeData.hobbies.map((hobby) => (
              <li key={hobby} className="text-sm text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-300 flex-shrink-0" />
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compatible type */}
      <div
        className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full mt-4 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.25s', opacity: 0 }}
      >
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          💘 最高の相棒タイプ
        </h2>
        <Link
          href={`/result/${typeData.compatibleType}`}
          className="flex items-center gap-4 p-4 rounded-2xl border border-pink-100 bg-pink-50/50 hover:bg-pink-50 hover:border-pink-200 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {compatibleType.id}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-800">{compatibleType.catchTitle}</div>
            <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{typeData.compatibleReason}</div>
          </div>
          <span className="text-gray-300 text-sm flex-shrink-0">→</span>
        </Link>
      </div>

      {/* CTAs */}
      <div
        className="max-w-xl w-full mt-6 animate-fadeInUp"
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <button
          onClick={() => {
            const text = `私のBloomタイプは「${typeData.catchTitle}」！戦闘力 ${battlePower.toLocaleString()} — ${typeData.catchCopy}`;
            if (navigator.share) {
              navigator.share({ title: text, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(window.location.href).then(() => {
                alert('URLをコピーしました！');
              });
            }
          }}
          className="block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-base shadow-lg shadow-pink-300/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          結果をシェアする 📤
        </button>
        <Link
          href="/"
          className="block w-full mt-3 text-center py-4 rounded-2xl border border-gray-200 bg-white text-gray-600 font-bold text-base hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
          もう一度診断する 🌸
        </Link>
      </div>
    </div>
  );
}
