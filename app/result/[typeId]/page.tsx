'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId, FactionColor, Rarity, RPGStats } from '@/lib/types';
import { loadResult } from '@/lib/scoring';

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

function RadarChart({
  stats,
  color,
  size = 260,
}: {
  stats: RPGStats;
  color: string;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.30;
  const labelR = size * 0.44;

  const axes = [
    { key: '知力',   value: stats.知力 },
    { key: '創造力', value: stats.創造力 },
    { key: '行動力', value: stats.行動力 },
    { key: '精神力', value: stats.精神力 },
    { key: '共感力', value: stats.共感力 },
    { key: '統率力', value: stats.統率力 },
  ];

  // Start from top (−90°), clockwise every 60°
  const angles = axes.map((_, i) => ((i * 60) - 90) * (Math.PI / 180));
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const hexPts = (frac: number) =>
    angles.map(a => `${cx + frac * r * Math.cos(a)},${cy + frac * r * Math.sin(a)}`).join(' ');

  const statPts = axes
    .map(({ value }, i) => {
      const v = value / 100;
      return `${cx + v * r * Math.cos(angles[i])},${cy + v * r * Math.sin(angles[i])}`;
    })
    .join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible' }}
    >
      {/* Background fill inside outer hex */}
      <polygon points={hexPts(1.0)} fill={color} fillOpacity={0.04} />

      {/* Grid rings */}
      {gridLevels.map((lv, li) => (
        <polygon
          key={li}
          points={hexPts(lv)}
          fill="none"
          stroke={color}
          strokeOpacity={li === gridLevels.length - 1 ? 0.35 : 0.12}
          strokeWidth={li === gridLevels.length - 1 ? 1.5 : 0.8}
        />
      ))}

      {/* Axis lines */}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={cx} y1={cy}
          x2={cx + r * Math.cos(a)}
          y2={cy + r * Math.sin(a)}
          stroke={color}
          strokeOpacity={0.2}
          strokeWidth={0.8}
        />
      ))}

      {/* Stat polygon */}
      <polygon
        points={statPts}
        fill={color}
        fillOpacity={0.22}
        stroke={color}
        strokeWidth={2}
        strokeOpacity={0.95}
        strokeLinejoin="round"
      />

      {/* Dots */}
      {axes.map(({ value }, i) => {
        const v = value / 100;
        return (
          <circle
            key={i}
            cx={cx + v * r * Math.cos(angles[i])}
            cy={cy + v * r * Math.sin(angles[i])}
            r={3.5}
            fill={color}
          />
        );
      })}

      {/* Labels */}
      {axes.map(({ key, value }, i) => {
        const lx = cx + labelR * Math.cos(angles[i]);
        const ly = cy + labelR * Math.sin(angles[i]);
        return (
          <g key={i}>
            <text
              x={lx} y={ly - 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={8}
              fill="rgba(255,255,255,0.45)"
              fontFamily="sans-serif"
            >
              {key}
            </text>
            <text
              x={lx} y={ly + 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fontWeight="bold"
              fill={color}
              fontFamily="sans-serif"
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ResultPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const [mounted, setMounted] = useState(false);
  const [displayBP, setDisplayBP] = useState(0);
  const [userBP, setUserBP] = useState<number | null>(null);

  const typeData = BLOOM_TYPES[typeId as BloomTypeId];

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const urlBP = params.get('bp');
    if (urlBP) { setUserBP(parseInt(urlBP)); return; }
    const saved = loadResult();
    if (saved && saved.typeId === typeId) setUserBP(saved.battlePower);
  }, [typeId]);

  useEffect(() => {
    if (!mounted || !typeData) return;
    const target = userBP ?? typeData.battlePower;
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayBP(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(animate);
      else setDisplayBP(target);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mounted, userBP, typeData]);

  if (!mounted) return null;

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">タイプが見つかりませんでした</p>
      </div>
    );
  }

  const battlePower = userBP ?? typeData.battlePower;
  const compatibleType = BLOOM_TYPES[typeData.compatibleType];
  const enemyType = BLOOM_TYPES[typeData.enemyType];
  const accent = FACTION_COLOR[typeData.factionColor].accent;
  const rarity = RARITY_STYLE[typeData.rarity];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center pb-16">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO CARD — screenshotworthy      */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="w-full max-w-lg text-white px-6 pt-8 pb-8 animate-fadeInUp"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accent}18 0%, #0a0a0a 65%)`,
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[8px] font-bold tracking-[0.4em] text-white/20">BLOOM DIAGNOSIS</span>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-black tracking-widest px-2 py-0.5"
              style={{ color: rarity.color, border: `1px solid ${rarity.color}50` }}
            >
              {rarity.label}
            </span>
            <span className="text-[10px] text-white/30">上位{typeData.populationPercent}%</span>
          </div>
        </div>

        {/* Character identity */}
        <div className="mb-6">
          <div className="text-[8px] font-mono text-white/20 mb-2 tracking-[0.3em]">
            TYPE {typeData.id}
          </div>
          <h1 className="text-[2.75rem] font-black leading-tight mb-1 tracking-tight">
            {typeData.catchTitle}
          </h1>
          <p className="text-xs text-white/30 italic mb-3">"{typeData.catchCopy}"</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-black tracking-wider" style={{ color: accent }}>
              {typeData.jobClass}
            </span>
            <span className="text-white/15">·</span>
            <span className="text-xs text-white/35">{typeData.characterTitle}</span>
          </div>
          <span
            className="inline-block text-[8px] font-bold tracking-[0.3em] px-2 py-1"
            style={{ color: accent, border: `1px solid ${accent}35`, background: `${accent}0d` }}
          >
            {typeData.faction}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />

        {/* Radar chart */}
        <div className="flex justify-center mb-6">
          <RadarChart stats={typeData.rpgStats} color={accent} size={260} />
        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />

        {/* Battle power */}
        <div className="mb-6">
          <div className="text-[8px] font-bold tracking-[0.4em] mb-2" style={{ color: accent }}>
            BATTLE POWER
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl font-black tabular-nums leading-none">
              {displayBP.toLocaleString()}
            </span>
            <span className="text-xs text-white/25 mb-1">/ 15,000</span>
          </div>
          <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              style={{
                width: `${Math.min((displayBP / 15000) * 100, 100)}%`,
                height: '100%',
                background: accent,
                transition: 'width 0.05s ease-out',
                borderRadius: '9999px',
              }}
            />
          </div>
        </div>

        {/* Special skills */}
        <div>
          <div className="text-[8px] font-bold tracking-[0.4em] text-white/20 mb-3">特殊スキル</div>
          <div className="flex flex-col gap-3">
            {typeData.specialSkills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{skill.emoji}</span>
                  <span className="text-xs font-bold text-white/75">{skill.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: i < skill.level ? accent : 'rgba(255,255,255,0.08)' }}
                    />
                  ))}
                  <span className="text-[9px] font-mono text-white/25 ml-1.5">Lv.{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share button */}
      <div className="w-full max-w-lg px-5 mt-3">
        <button
          onClick={() => {
            const text = `私は【${typeData.catchTitle}】だった。\nクラス：${typeData.jobClass}\n戦闘力 ${battlePower.toLocaleString()} / 15,000\n${typeData.rarity}級 / 上位${typeData.populationPercent}%\n\nあなたのクラスは？ →`;
            if (navigator.share) {
              navigator.share({ title: text, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(`${text}\n${window.location.href}`).then(() => alert('コピーしました！'));
            }
          }}
          className="block w-full py-4 font-bold text-xs tracking-[0.3em] uppercase text-center transition-colors text-white"
          style={{ background: accent }}
        >
          結果をシェアする →
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* INFO SECTIONS — light bg          */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full max-w-lg px-5 mt-5">

        {/* Ad */}
        <AdUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT ?? ''} />

        {/* Description */}
        <div className="bg-white border border-gray-100 mt-3 p-6 animate-fadeInUp" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-3">プロフィール</div>
          <p className="text-gray-700 text-sm leading-relaxed">{typeData.description}</p>
        </div>

        {/* Jobs & Hobbies */}
        <div className="mt-3 grid grid-cols-2 gap-3 animate-fadeInUp" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <div className="bg-white border border-gray-100 p-5">
            <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-4">向いてる仕事</div>
            <ul className="flex flex-col gap-3">
              {typeData.jobs.map((job) => (
                <li key={job} className="text-xs text-gray-700 flex items-center gap-2">
                  <span className="w-3 h-px flex-shrink-0" style={{ background: accent }} />
                  {job}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-100 p-5">
            <div className="text-[9px] font-bold tracking-[0.3em] text-gray-300 mb-4">趣味・習慣</div>
            <ul className="flex flex-col gap-3">
              {typeData.hobbies.map((hobby) => (
                <li key={hobby} className="text-xs text-gray-700 flex items-center gap-2">
                  <span className="w-3 h-px flex-shrink-0" style={{ background: accent }} />
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compatible & Enemy */}
        <div className="mt-3 grid grid-cols-2 gap-3 animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="bg-white border border-gray-100 p-5">
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

          <div className="bg-white border border-gray-100 p-5">
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

        {/* Bottom action */}
        <div className="mt-4 animate-fadeInUp" style={{ animationDelay: '0.25s', opacity: 0 }}>
          <Link
            href="/"
            className="block w-full py-4 border border-white/10 bg-white/5 text-white/40 font-bold text-xs tracking-[0.3em] uppercase text-center hover:text-white/60 transition-colors"
          >
            もう一度診断する
          </Link>
        </div>
      </div>

    </div>
  );
}
