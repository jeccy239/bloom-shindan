'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId, FactionColor, Rarity } from '@/lib/types';
import { loadResult } from '@/lib/scoring';

const RPG_STAT_KEYS = ['知力', '創造力', '統率力', '共感力', '行動力', '精神力'] as const;

const FACTION_COLOR: Record<FactionColor, { accent: string }> = {
  blue:   { accent: '#3b82f6' },
  red:    { accent: '#ef4444' },
  purple: { accent: '#a855f7' },
  gold:   { accent: '#c9a84c' },
};

const RARITY_STYLE: Record<Rarity, { label: string; color: string }> = {
  SSR: { label: 'SSR', color: '#c9a84c' },
  SR:  { label: 'SR',  color: '#9ca3af' },
  R:   { label: 'R',   color: '#3b82f6' },
  N:   { label: 'N',   color: '#6b7280' },
};

export default function ResultPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const [mounted, setMounted] = useState(false);
  const [displayBP, setDisplayBP] = useState(0);
  const [showBars, setShowBars] = useState(false);
  const [userBP, setUserBP] = useState<number | null>(null);

  const typeData = BLOOM_TYPES[typeId as BloomTypeId];

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const urlBP = params.get('bp');
    if (urlBP) {
      setUserBP(parseInt(urlBP));
      return;
    }
    const saved = loadResult();
    if (saved && saved.typeId === typeId) {
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

  const battlePower = userBP ?? typeData.battlePower;
  const compatibleType = BLOOM_TYPES[typeData.compatibleType];
  const enemyType = BLOOM_TYPES[typeData.enemyType];
  const factionAccent = FACTION_COLOR[typeData.factionColor].accent;
  const rarityStyle = RARITY_STYLE[typeData.rarity];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-16 px-5">

      {/* Header */}
      <div className="w-full max-w-lg pt-12 pb-6 animate-fadeInUp">
        <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-6">
          ブルーム診断 — 結果
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-[9px] font-mono text-gray-300">TYPE {typeData.id}</span>
          <div className="flex-1 h-px bg-gray-100" />
          <span
            className="text-[9px] font-bold tracking-widest px-2 py-0.5"
            style={{ color: factionAccent, border: `1px solid ${factionAccent}50` }}
          >
            {typeData.faction}
          </span>
        </div>

        <h1 className="text-5xl font-black text-gray-900 leading-none mb-1">
          {typeData.catchTitle}
        </h1>
        <div className="w-8 h-0.5 mt-3 mb-3" style={{ background: factionAccent }} />

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-400">{typeData.characterTitle}</span>
          <span className="text-gray-200">·</span>
          <span className="text-xs font-bold" style={{ color: factionAccent }}>
            {typeData.jobClass}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {typeData.guildTags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold tracking-widest border border-gray-200 px-2 py-1 text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Battle Power card */}
      <div
        className="max-w-lg w-full animate-fadeInUp"
        style={{ animationDelay: '0.05s', opacity: 0 }}
      >
        <div className="bg-gray-900 p-6 text-white">
          <div className="flex items-start justify-between mb-2">
            <div className="text-[9px] font-bold tracking-[0.3em]" style={{ color: factionAccent }}>
              戦　闘　力
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-black tracking-widest px-2 py-0.5"
                style={{ color: rarityStyle.color, border: `1px solid ${rarityStyle.color}60` }}
              >
                {rarityStyle.label}
              </span>
              <span className="text-[10px] text-gray-400">上位{typeData.populationPercent}%</span>
            </div>
          </div>
          <div className="text-7xl font-black tracking-tight tabular-nums leading-none mb-4">
            {displayBP.toLocaleString()}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-[10px] text-gray-500 flex-shrink-0">/ 15,000</div>
            <div className="flex-1 h-px bg-gray-800 overflow-hidden">
              <div
                style={{
                  height: '100%',
                  width: `${Math.min((displayBP / 15000) * 100, 100)}%`,
                  background: factionAccent,
                  transition: 'width 0.05s ease-out',
                }}
              />
            </div>
          </div>
          <div className="text-[10px] text-gray-500">{typeData.jobTitle}</div>
        </div>
      </div>

      {/* RPG Stats */}
      <div
        className="border border-gray-200 max-w-lg w-full mt-3 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-5">
          ステータス
        </div>
        <div className="flex flex-col gap-4">
          {RPG_STAT_KEYS.map((key) => {
            const value = typeData.rpgStats[key];
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-gray-700">{key}</span>
                  <span className="text-sm font-black tabular-nums" style={{ color: factionAccent }}>
                    {value}
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: showBars ? `${value}%` : '0%',
                      height: '100%',
                      background: factionAccent,
                      transition: 'width 1s cubic-bezier(0.34,1.56,0.64,1)',
                      borderRadius: '9999px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Skills */}
      <div
        className="border border-gray-200 max-w-lg w-full mt-3 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.15s', opacity: 0 }}
      >
        <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-4">
          特殊スキル
        </div>
        <div className="flex flex-col gap-3">
          {typeData.specialSkills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-base">{skill.emoji}</span>
                <span className="text-sm font-bold text-gray-800">{skill.name}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: i < skill.level ? factionAccent : '#e5e7eb' }}
                  />
                ))}
                <span className="text-[10px] font-mono text-gray-400 ml-1">Lv.{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad unit */}
      <div className="max-w-lg w-full mt-3">
        <AdUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT ?? ''} />
      </div>

      {/* Description */}
      <div
        className="border border-gray-200 max-w-lg w-full mt-3 p-6 animate-fadeInUp"
        style={{ animationDelay: '0.2s', opacity: 0 }}
      >
        <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-3">
          プロフィール
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{typeData.description}</p>
      </div>

      {/* Jobs & Hobbies */}
      <div
        className="max-w-lg w-full mt-3 grid grid-cols-2 gap-3 animate-fadeInUp"
        style={{ animationDelay: '0.25s', opacity: 0 }}
      >
        <div className="border border-gray-200 p-5">
          <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-4">向いてる仕事</div>
          <ul className="flex flex-col gap-3">
            {typeData.jobs.map((job) => (
              <li key={job} className="text-xs text-gray-700 flex items-center gap-2">
                <span className="w-3 h-px flex-shrink-0" style={{ background: factionAccent }} />
                {job}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 p-5">
          <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-4">趣味・習慣</div>
          <ul className="flex flex-col gap-3">
            {typeData.hobbies.map((hobby) => (
              <li key={hobby} className="text-xs text-gray-700 flex items-center gap-2">
                <span className="w-3 h-px flex-shrink-0" style={{ background: factionAccent }} />
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compatible & Enemy */}
      <div
        className="max-w-lg w-full mt-3 grid grid-cols-2 gap-3 animate-fadeInUp"
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <div className="border border-gray-200 p-5">
          <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-3">最強の相棒</div>
          <Link href={`/result/${typeData.compatibleType}`} className="flex flex-col gap-2 hover:opacity-80 transition-opacity">
            <div
              className="w-10 h-10 flex items-center justify-center text-white font-black font-mono text-xs"
              style={{ background: FACTION_COLOR[compatibleType.factionColor].accent }}
            >
              {compatibleType.id}
            </div>
            <div className="font-black text-gray-900 text-sm leading-tight">{compatibleType.catchTitle}</div>
            <div className="text-[9px] font-bold" style={{ color: FACTION_COLOR[compatibleType.factionColor].accent }}>
              {compatibleType.jobClass}
            </div>
            <p className="text-[10px] text-gray-400 leading-snug mt-1">{typeData.compatibleReason}</p>
          </Link>
        </div>

        <div className="border border-gray-200 p-5">
          <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-3">天　敵</div>
          <Link href={`/result/${typeData.enemyType}`} className="flex flex-col gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white font-black font-mono text-xs">
              {enemyType.id}
            </div>
            <div className="font-black text-gray-900 text-sm leading-tight">{enemyType.catchTitle}</div>
            <div className="text-[9px] font-bold" style={{ color: FACTION_COLOR[enemyType.factionColor].accent }}>
              {enemyType.jobClass}
            </div>
            <p className="text-[10px] text-gray-400 leading-snug mt-1">
              最も意見がぶつかるが、最も成長させてくれる相手。
            </p>
          </Link>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="max-w-lg w-full mt-5 animate-fadeInUp"
        style={{ animationDelay: '0.35s', opacity: 0 }}
      >
        <button
          onClick={() => {
            const text = `私は【${typeData.catchTitle}】だった。\nクラス：${typeData.jobClass}\n戦闘力 ${battlePower.toLocaleString()} / 15,000\n${typeData.rarity}級 / 上位${typeData.populationPercent}%\n\nあなたのクラスは？ →`;
            if (navigator.share) {
              navigator.share({ title: text, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(`${text}\n${window.location.href}`).then(() => alert('コピーしました！'));
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
