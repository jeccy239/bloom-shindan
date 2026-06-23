import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId } from '@/lib/types';

const BASE_URL = 'https://bloom-shindan.vercel.app';

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

const ABILITY_COLOR: Record<string, string> = {
  S: '#c9a84c',
  A: '#22c55e',
  B: '#3b82f6',
  C: '#6b7280',
  D: '#ef4444',
};

export function generateStaticParams() {
  return Object.keys(BLOOM_TYPES).map(typeId => ({ typeId }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ typeId: string }> }
): Promise<Metadata> {
  const { typeId } = await params;
  const t = BLOOM_TYPES[typeId as BloomTypeId];
  if (!t) return {};

  const title = `${t.jobClass}（${t.catchTitle}）の特徴・向いてる仕事・相性 | ブルーム診断`;
  const description = `ブルーム診断${t.rarity}レア・${t.jobClass}型（全体の上位${t.populationPercent}%）の特徴を詳しく解説。${t.description.slice(0, 80)}…`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/type/${typeId}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/type/${typeId}`,
      siteName: 'ブルーム診断',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function TypePage({ params }: { params: Promise<{ typeId: string }> }) {
  const { typeId } = await params;
  const t = BLOOM_TYPES[typeId as BloomTypeId];
  if (!t) notFound();

  const accent = FACTION_COLOR[t.factionColor] ?? '#c9a84c';
  const compatible = BLOOM_TYPES[t.compatibleType];
  const enemy = BLOOM_TYPES[t.enemyType];

  const faqItems = [
    {
      q: `${t.jobClass}（${t.catchTitle}）とはどんな性格ですか？`,
      a: t.description,
    },
    {
      q: `${t.jobClass}に向いてる仕事は何ですか？`,
      a: `${t.jobs.join('、')}などが向いています。${t.jobTitle}`,
    },
    {
      q: `ブルーム診断で${t.jobClass}になる人の割合は？`,
      a: `${t.jobClass}は全体の上位${t.populationPercent}%に存在するレアなタイプです。レアリティは${t.rarity}に分類されます。`,
    },
    {
      q: `${t.jobClass}と相性がいいタイプは？`,
      a: compatible
        ? `${compatible.jobClass}（${compatible.catchTitle}）と相性が良いです。${t.compatibleReason}`
        : t.compatibleReason,
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a] text-white">

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${accent}18, transparent)` }} />
          <div className="relative max-w-2xl mx-auto px-6 pt-12 pb-10">

            {/* Breadcrumb */}
            <nav className="text-[10px] text-white/25 mb-8 flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-white/50 transition-colors">ブルーム診断</Link>
              <span>/</span>
              <Link href="/type" className="hover:text-white/50 transition-colors">16タイプ一覧</Link>
              <span>/</span>
              <span style={{ color: accent }}>{t.jobClass}</span>
            </nav>

            <div className="flex gap-6 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${IMAGE_FILENAME[typeId]}`}
                alt={t.jobClass}
                width={120}
                height={120}
                className="w-28 h-28 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-black px-2.5 py-0.5 tracking-[0.2em]"
                    style={{ background: accent, color: '#0a0a0a' }}
                  >
                    {t.rarity}
                  </span>
                  <span className="text-[10px] text-white/35">上位 {t.populationPercent}%</span>
                  <span className="text-[10px] text-white/25">{t.faction}</span>
                </div>
                <h1 className="text-3xl font-black leading-tight mb-2">{t.jobClass}</h1>
                <div className="text-base mb-1.5" style={{ color: accent }}>【{t.catchTitle}】</div>
                <p className="text-sm text-white/40 leading-relaxed">{t.catchCopy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

          {/* 特徴 */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              {t.jobClass}の特徴
            </h2>
            <p className="text-white/75 text-sm leading-[2]">{t.description}</p>
          </section>

          {/* 強みと弱み */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              強みと弱み
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(t.abilities).map(([key, rank]) => (
                <div key={key} className="border border-white/8 px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-white/55">{key}</span>
                  <span className="text-xl font-black" style={{ color: ABILITY_COLOR[rank] }}>{rank}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-3 flex-wrap">
              {t.guildTags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-3 py-1 border border-white/10 text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* 向いてる仕事 */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-2">
              {t.jobClass}に向いてる仕事
            </h2>
            <p className="text-xs text-white/30 mb-4 leading-relaxed">{t.jobTitle}</p>
            <div className="space-y-2">
              {t.jobs.map((job, i) => (
                <div key={i} className="border border-white/8 px-4 py-3 flex items-center gap-4">
                  <span className="text-xs font-mono text-white/20">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-white/70">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* スキル */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              特殊スキル
            </h2>
            <div className="space-y-2">
              {t.specialSkills.map((skill, i) => (
                <div key={i} className="border border-white/8 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{skill.emoji}</span>
                    <span className="text-sm text-white/70">{skill.name}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-2 h-2"
                        style={{ background: j < skill.level ? accent : 'rgba(255,255,255,0.1)' }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 趣味・傾向 */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              趣味・傾向
            </h2>
            <div className="flex flex-wrap gap-2">
              {t.hobbies.map((h, i) => (
                <span key={i} className="text-xs px-3 py-1.5 border border-white/10 text-white/45">
                  {h}
                </span>
              ))}
            </div>
          </section>

          {/* 相性 */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              相性
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {compatible && (
                <Link
                  href={`/type/${t.compatibleType}`}
                  className="border p-4 block hover:opacity-80 transition-opacity"
                  style={{ borderColor: `${accent}50` }}
                >
                  <div className="text-[9px] tracking-[0.3em] text-white/25 mb-2">BEST MATCH</div>
                  <div className="text-sm font-bold text-white">{compatible.jobClass}</div>
                  <div className="text-xs mt-0.5" style={{ color: accent }}>【{compatible.catchTitle}】</div>
                  <p className="text-[10px] text-white/40 mt-2 leading-relaxed">{t.compatibleReason}</p>
                </Link>
              )}
              {enemy && (
                <div className="border border-white/8 p-4">
                  <div className="text-[9px] tracking-[0.3em] text-white/25 mb-2">CLASH</div>
                  <div className="text-sm font-bold text-white">{enemy.jobClass}</div>
                  <div className="text-xs text-white/35 mt-0.5">【{enemy.catchTitle}】</div>
                </div>
              )}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              よくある質問
            </h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div key={i} className="border border-white/8 p-4">
                  <div className="text-xs font-bold text-white/75 mb-2">Q. {item.q}</div>
                  <div className="text-xs text-white/45 leading-relaxed">A. {item.a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 他のタイプへのリンク */}
          <section>
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase mb-4">
              他のタイプを見る
            </h2>
            <Link
              href="/type"
              className="block text-center border border-white/10 py-3 text-sm text-white/40 hover:text-white/70 hover:border-white/25 transition-all"
            >
              16タイプ一覧 →
            </Link>
          </section>

          {/* CTA */}
          <div className="border-t border-white/8 pt-10 text-center">
            <p className="text-xs text-white/30 mb-2 tracking-widest">あなたは何タイプ？</p>
            <p className="text-sm text-white/55 mb-6">50問に答えて自分のパーソナリティを診断しよう</p>
            <Link
              href="/quiz"
              className="inline-block px-12 py-4 font-bold text-sm tracking-[0.3em] text-[#0a0a0a] hover:opacity-90 transition-opacity"
              style={{ background: accent }}
            >
              無料で診断する →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
