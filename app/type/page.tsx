import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOOM_TYPES } from '@/lib/types';

export const metadata: Metadata = {
  title: 'ブルーム診断 16タイプ一覧 | 全パーソナリティタイプの特徴・向いてる仕事',
  description: 'ブルーム診断の16タイプを一覧で紹介。アークセージ・ソウルヒーラー・エンペラーロードなど各タイプの特徴・強み・向いてる仕事を詳しく解説。自分のタイプを無料診断できます。',
  alternates: { canonical: 'https://bloom-shindan.vercel.app/type' },
};

const IMAGE_FILENAME: Record<string, string> = {
  '01': 'image_01_アークセージ_02.png',
  '02': 'image_02_シャドウストラテジスト_02.png',
  '03': 'image_03_ソウルヒーラー_02.png',
  '04': 'image_04_アイアンガーディアン.png',
  '05': 'image_05_ワールドメーカー.png',
  '06': 'image_06_エンペラーロード.png',
  '07': 'image_07_オラクル.png',
  '08': 'image_08_アーキテクト.png',
  '09': 'image_09_フロンティア.png',
  '10': 'image_10_インフルエンサー.png',
  '11': 'image_11_マスタースミス.png',
  '12': 'image_12_レボリューショナー.png',
  '13': 'image_13_フレイムスピーカー.png',
  '14': 'image_14_フィールドキーパー.png',
  '15': 'image_15_ワールドメイジ.png',
  '16': 'image_16_ソウルケアラー.png',
};

const FACTION_COLOR: Record<string, string> = {
  blue:   '#3b82f6',
  red:    '#ef4444',
  purple: '#a855f7',
  gold:   '#c9a84c',
  cyan:   '#22d3ee',
  orange: '#f97316',
  green:  '#22c55e',
};

const RARITY_ORDER: Record<string, number> = { SSR: 0, SR: 1, R: 2, N: 3 };

export default function TypeIndexPage() {
  const types = Object.values(BLOOM_TYPES).sort(
    (a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <nav className="text-[10px] text-white/25 mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white/50 transition-colors">ブルーム診断</Link>
          <span>/</span>
          <span className="text-white/50">16タイプ一覧</span>
        </nav>

        <h1 className="text-3xl font-black mb-2">16タイプ一覧</h1>
        <p className="text-sm text-white/40 mb-10 leading-relaxed">
          ブルーム診断に登場する16のパーソナリティタイプ。<br />
          各タイプの特徴・強み・向いてる仕事を詳しく解説しています。
        </p>

        <div className="grid grid-cols-2 gap-3 mb-12">
          {types.map(t => {
            const accent = FACTION_COLOR[t.factionColor] ?? '#c9a84c';
            return (
              <Link
                key={t.id}
                href={`/type/${t.id}`}
                className="border border-white/8 p-4 flex gap-3 items-start hover:border-white/20 transition-colors group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${IMAGE_FILENAME[t.id]}`}
                  alt={t.jobClass}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="text-[9px] font-black px-1.5 py-0.5 tracking-widest"
                      style={{ background: accent, color: '#0a0a0a' }}
                    >
                      {t.rarity}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">{t.jobClass}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: accent }}>
                    {t.catchTitle}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-white/8 pt-8 text-center">
          <p className="text-sm text-white/40 mb-4">自分のタイプを診断する</p>
          <Link
            href="/quiz"
            className="inline-block px-10 py-4 bg-white text-[#0a0a0a] font-bold text-xs tracking-[0.3em] hover:bg-white/90 transition-colors"
          >
            無料で診断する →
          </Link>
        </div>

      </div>
    </div>
  );
}
