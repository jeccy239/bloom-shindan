'use client';

import { useEffect, useState, useRef } from 'react';
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
  cyan:   { accent: '#22d3ee' },
  orange: { accent: '#f97316' },
  green:  { accent: '#22c55e' },
};

const CHARACTER_IMAGE: Record<string, string> = {
  '01': '/image_01_アークセージ_02.png',
  '02': '/image_02_シャドウストラテジスト_02.png',
  '03': '/image_03_ソウルヒーラー_02.png',
  '04': '/image_04_アイアンガーディアン.png',
  '05': '/image_05_ワールドメーカー.png',
  '06': '/image_06_エンペラーロード.png',
  '07': '/image_07_オラクル.png',
  '08': '/image_08_アーキテクト.png',
  '09': '/image_09_フロンティア.png',
  '10': '/image_10_インフルエンサー.png',
  '11': '/image_11_マスタースミス.png',
  '12': '/image_12_レボリューショナー.png',
  '13': '/image_13_フレイムスピーカー.png',
  '14': '/image_14_フィールドキーパー.png',
  '15': '/image_15_ワールドメイジ.png',
  '16': '/image_16_ソウルケアラー.png',
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

function DeepAnalysisCTA({ typeId, accent }: { typeId: string; accent: string }) {
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
    <div className="mt-4 animate-fadeInUp" style={{ animationDelay: '0.12s' }}>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full text-left disabled:opacity-60 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${accent}22 0%, ${accent}0a 100%)`,
          border: `1.5px solid ${accent}70`,
          boxShadow: `0 0 24px ${accent}20`,
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${accent}25` }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black tracking-[0.3em]" style={{ color: accent }}>
              AI 深層分析レポート
            </span>
          </div>
          <span
            className="text-[10px] font-black px-2 py-0.5"
            style={{ background: accent, color: '#0a0a0a' }}
          >
            ¥480
          </span>
        </div>

        {/* Body */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-white text-base font-black mb-3 leading-snug">
            診断結果の"本当の意味"を<br />AIが徹底解説する
          </p>
          <div className="flex flex-col gap-1.5 mb-4">
            {['あなたの本質', '隠れた強み × 3', '挑戦への扉 × 5', '人間関係の地図', '明日からの一歩'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
                <span className="text-xs text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mx-5 mb-5 py-3 flex items-center justify-center gap-2 font-black text-sm"
          style={{ background: accent, color: '#0a0a0a' }}
        >
          {loading ? '処理中...' : '今すぐ読む →'}
        </div>
      </button>
    </div>
  );
}

export default function ResultPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const [mounted, setMounted] = useState(false);
  const [displayBP, setDisplayBP] = useState(0);
  const [userBP, setUserBP] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

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

  const handleSaveImage = async () => {
    if (!shareCardRef.current || saving) return;
    setSaving(true);
    const card = shareCardRef.current;
    try {
      const html2canvas = (await import('html2canvas')).default;

      // html2canvas が position:fixed + 大きな負の left 値でオフセットを誤算するため
      // キャプチャ直前だけ原点(0,0)に移動し、描画後に戻す
      card.style.left = '0';
      card.style.top = '0';
      await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));

      const canvas = await html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#0a0a0a',
        logging: false,
      });

      card.style.left = '-9999px';

      const fileName = `bloom-result-${typeData.catchTitle}.png`;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS) {
        const blob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
        );
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: 'ブルーム診断結果' });
        } else {
          window.open(canvas.toDataURL('image/png'), '_blank');
        }
      } else {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } finally {
      card.style.left = '-9999px';
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center pb-16">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO CARD — screenshotworthy      */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="w-full max-w-lg text-white px-6 pt-8 pb-8 animate-fadeInUp relative"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accent}18 0%, #0a0a0a 65%)`,
        }}
      >
        {/* MH-style corner brackets */}
        <div style={{ position: 'absolute', top: 12, left: 12, width: 18, height: 18, borderTop: `1.5px solid ${accent}70`, borderLeft: `1.5px solid ${accent}70` }} />
        <div style={{ position: 'absolute', top: 12, right: 12, width: 18, height: 18, borderTop: `1.5px solid ${accent}70`, borderRight: `1.5px solid ${accent}70` }} />
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 18, height: 18, borderBottom: `1.5px solid ${accent}70`, borderLeft: `1.5px solid ${accent}70` }} />
        <div style={{ position: 'absolute', bottom: 12, right: 12, width: 18, height: 18, borderBottom: `1.5px solid ${accent}70`, borderRight: `1.5px solid ${accent}70` }} />
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[8px] font-bold tracking-[0.4em] text-white/20">BLOOM DIAGNOSIS</span>
          <div className="flex items-center gap-3">
            <span
              className="text-2xl font-black tracking-widest px-3 py-1"
              style={{
                color: rarity.color,
                border: `2px solid ${rarity.color}`,
                textShadow: `0 0 12px ${rarity.color}99`,
                boxShadow: `0 0 12px ${rarity.color}40`,
              }}
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
          <h1 className="text-[2.75rem] font-black leading-tight mb-1 tracking-tight" style={{ color: accent }}>
            {typeData.jobClass}
          </h1>
          <p className="text-lg font-bold text-white/85 mb-1 tracking-tight">{typeData.catchTitle}</p>
          <p className="text-xs text-white/55 italic mb-3">"{typeData.catchCopy}"</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-white/55">{typeData.characterTitle}</span>
          </div>
          <span
            className="inline-block text-[8px] font-bold tracking-[0.3em] px-2 py-1"
            style={{ color: accent, border: `1px solid ${accent}35`, background: `${accent}0d` }}
          >
            {typeData.faction}
          </span>
        </div>

        {/* Character image */}
        <div className="flex justify-center my-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CHARACTER_IMAGE[typeId] ?? ''}
            alt={typeData.jobClass}
            style={{
              width: 200,
              height: 200,
              objectFit: 'contain',
              filter: `drop-shadow(0 0 24px ${accent}55)`,
            }}
          />
        </div>

        {/* Ornate divider */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }} />
          <span style={{ fontSize: 8, color: accent }}>◆</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accent}50)` }} />
        </div>

        {/* Radar chart */}
        <div className="flex justify-center mb-6">
          <RadarChart stats={typeData.rpgStats} color={accent} size={260} />
        </div>

        {/* Battle power */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }} />
            <span className="text-[8px] font-bold tracking-[0.4em] text-white/40">BATTLE POWER</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accent}50)` }} />
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl font-black tabular-nums leading-none">
              {displayBP.toLocaleString()}
            </span>
            <span className="text-xs text-white/45 mb-1">/ 15,000</span>
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
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(255,255,255,0.15))` }} />
            <span className="text-[8px] font-bold tracking-[0.4em] text-white/35">特殊スキル</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, rgba(255,255,255,0.15))` }} />
          </div>
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
                  <span className="text-[9px] font-mono text-white/45 ml-1.5">Lv.{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="w-full max-w-lg px-5 mt-3 flex gap-2">
        <button
          onClick={() => {
            const text = `私は【${typeData.catchTitle}】だった。\nクラス：${typeData.jobClass}\n戦闘力 ${battlePower.toLocaleString()} / 15,000\n${typeData.rarity}級 / 上位${typeData.populationPercent}%\n\nあなたのクラスは？ →`;
            if (navigator.share) {
              navigator.share({ title: text, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(`${text}\n${window.location.href}`).then(() => alert('コピーしました！'));
            }
          }}
          className="flex-1 py-4 font-bold text-xs tracking-[0.3em] uppercase text-center transition-colors text-white"
          style={{ background: accent }}
        >
          結果をシェアする →
        </button>
        <button
          onClick={() => {
            const text = encodeURIComponent(
              `私は【${typeData.catchTitle}】だった。\nクラス：${typeData.jobClass}\n戦闘力 ${battlePower.toLocaleString()} / 15,000\n${typeData.rarity}級 / 上位${typeData.populationPercent}%\n\n#ブルーム診断 であなたのクラスは？`
            );
            const url = encodeURIComponent(window.location.href);
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
          }}
          className="flex items-center justify-center gap-2 px-5 py-4 font-bold text-xs tracking-[0.2em] text-center transition-opacity hover:opacity-80 text-white"
          style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.754l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xでシェア
        </button>
      </div>

      {/* Image save button */}
      <div className="w-full max-w-lg px-5 mt-2">
        <button
          onClick={handleSaveImage}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full py-3.5 font-bold text-xs tracking-[0.25em] text-center transition-opacity hover:opacity-80 disabled:opacity-50 text-white/60 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {saving ? '画像を生成中...' : '結果を画像で保存する'}
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* INFO SECTIONS                     */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full max-w-lg px-5 mt-5">

        {/* Ad */}
        <AdUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT ?? ''} />

        {/* Description */}
        <div className="border border-white/8 mt-3 p-6 animate-fadeInUp" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 mb-3">プロフィール</div>
          <p className="text-white/80 text-sm leading-relaxed">{typeData.description}</p>
        </div>

        {/* Deep Analysis CTA */}
        <DeepAnalysisCTA typeId={typeData.id} accent={accent} />

        {/* LINE Banner */}
        <a
          href="https://lin.ee/OYB1EU8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block animate-fadeInUp"
          style={{ animationDelay: '0.14s', opacity: 0 }}
        >
          <div style={{ background: '#06C755' }} className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-black" style={{ color: '#06C755' }}>LINE</span>
              </div>
              <div>
                <p className="text-white font-black text-sm leading-tight">強みを活かす方法を無料配信中</p>
                <p className="text-white/70 text-[10px] mt-0.5">ブルーム診断 公式LINE</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-3 bg-white px-3 py-1.5">
              <span className="text-[11px] font-black" style={{ color: '#06C755' }}>友だち追加 →</span>
            </div>
          </div>
        </a>

        {/* Jobs & Hobbies */}
        <div className="mt-3 grid grid-cols-2 gap-3 animate-fadeInUp" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <div className="border border-white/8 p-5">
            <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 mb-4">向いてる仕事</div>
            <ul className="flex flex-col gap-3">
              {typeData.jobs.map((job) => (
                <li key={job} className="text-xs text-white/75 flex items-center gap-2">
                  <span className="w-3 h-px flex-shrink-0" style={{ background: accent }} />
                  {job}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/8 p-5">
            <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 mb-4">趣味・習慣</div>
            <ul className="flex flex-col gap-3">
              {typeData.hobbies.map((hobby) => (
                <li key={hobby} className="text-xs text-white/75 flex items-center gap-2">
                  <span className="w-3 h-px flex-shrink-0" style={{ background: accent }} />
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compatible & Enemy */}
        <div className="mt-3 grid grid-cols-2 gap-3 animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="border border-white/8 p-5">
            <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 mb-3">最強の相棒</div>
            <Link href={`/result/${typeData.compatibleType}`} className="flex flex-col gap-2 hover:opacity-80 transition-opacity">
              <div
                className="w-10 h-10 flex items-center justify-center text-white font-black font-mono text-xs"
                style={{ background: FACTION_COLOR[compatibleType.factionColor].accent }}
              >
                {compatibleType.id}
              </div>
              <div className="font-black text-white text-sm leading-tight">{compatibleType.catchTitle}</div>
              <div className="text-[9px] font-bold" style={{ color: FACTION_COLOR[compatibleType.factionColor].accent }}>
                {compatibleType.jobClass}
              </div>
              <p className="text-[10px] text-white/60 leading-snug mt-1">{typeData.compatibleReason}</p>
            </Link>
          </div>

          <div className="border border-white/8 p-5">
            <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 mb-3">天　敵</div>
            <Link href={`/result/${typeData.enemyType}`} className="flex flex-col gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 flex items-center justify-center text-white font-black font-mono text-xs" style={{ background: 'rgba(255,255,255,0.08)' }}>
                {enemyType.id}
              </div>
              <div className="font-black text-white text-sm leading-tight">{enemyType.catchTitle}</div>
              <div className="text-[9px] font-bold" style={{ color: FACTION_COLOR[enemyType.factionColor].accent }}>
                {enemyType.jobClass}
              </div>
              <p className="text-[10px] text-white/60 leading-snug mt-1">
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Hidden card for image export      */}
      {/* 360×640 → scale:3 → 1080×1920    */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Hunter Card (MH aesthetic) — 360×640 → scale:3 → 1080×1920 */}
      <div
        ref={shareCardRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: 360,
          height: 640,
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif',
          background: '#0a0a0a',
        }}
      >
        {/* Diagonal line texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${accent}05 20px, ${accent}05 21px)` }} />
        {/* Radial glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse 100% 50% at 50% 0%, ${accent}1c 0%, transparent 60%)` }} />
        {/* Outer frame border */}
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, border: `1px solid ${accent}25` }} />
        {/* Corner brackets — TL */}
        <div style={{ position: 'absolute', top: 10, left: 10, width: 22, height: 22, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
        {/* Corner brackets — TR */}
        <div style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
        {/* Corner brackets — BL */}
        <div style={{ position: 'absolute', bottom: 10, left: 10, width: 22, height: 22, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
        {/* Corner brackets — BR */}
        <div style={{ position: 'absolute', bottom: 10, right: 10, width: 22, height: 22, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />

        {/* Content */}
        <div style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          bottom: 22,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>

          {/* ── S1: Header ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.18)' }}>BLOOM DIAGNOSIS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 7, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>TYPE {typeData.id}</span>
              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 8, margin: '0 2px' }}>·</span>
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.15em', color: rarity.color, border: `1px solid ${rarity.color}55`, padding: '1px 5px' }}>{rarity.label}</span>
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', marginLeft: 3 }}>上位{typeData.populationPercent}%</span>
            </div>
          </div>

          {/* ── S2: Identity ── */}
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: accent, lineHeight: 1.1, marginBottom: 4, letterSpacing: '-0.02em' }}>{typeData.jobClass}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 6, letterSpacing: '-0.01em' }}>{typeData.catchTitle}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>{typeData.faction}</span>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9 }}>·</span>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{typeData.characterTitle}</span>
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>"{typeData.catchCopy}"</div>
          </div>

          {/* ── S2.5: Character image ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHARACTER_IMAGE[typeId] ?? ''}
              alt={typeData.jobClass}
              style={{
                width: 140,
                height: 140,
                objectFit: 'contain',
                filter: `drop-shadow(0 0 16px ${accent}60)`,
              }}
            />
          </div>

          {/* ── S3: Status bars (MH style) ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${accent}55)` }} />
              <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)' }}>STATUS</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${accent}55)` }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {(Object.entries(typeData.rpgStats) as [string, number][]).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', width: 36, flexShrink: 0, letterSpacing: '0.02em' }}>{key}</span>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: `${value}%`, height: '100%', background: `linear-gradient(to right, ${accent}aa, ${accent})`, borderRadius: 1 }} />
                  </div>
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)', width: 22, textAlign: 'right', flexShrink: 0 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── S4: Battle Power ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${accent}55)` }} />
              <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)' }}>BATTLE POWER</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${accent}55)` }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 7 }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>{battlePower.toLocaleString()}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>/ 15,000</span>
            </div>
            <div style={{ height: 4, borderRadius: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min((battlePower / 15000) * 100, 100)}%`, height: '100%', background: `linear-gradient(to right, ${accent}aa, ${accent})`, borderRadius: 1 }} />
            </div>
          </div>

          {/* ── S5: Footer ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.18em' }}>bloom-shindan.vercel.app</span>
          </div>

        </div>
      </div>

    </div>
  );
}
