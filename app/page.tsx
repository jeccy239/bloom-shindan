import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブルーム診断 | あなたの本質を分析する',
  description: '50の問いに答えるだけで、あなたのパーソナリティタイプと戦闘力スコアが算出される。16タイプのブルーム診断。',
};

const TYPE_LIST = [
  { id: '01', title: 'アークセージ' },
  { id: '02', title: 'シャドウストラテジスト' },
  { id: '03', title: 'ソウルヒーラー' },
  { id: '04', title: 'アイアンガーディアン' },
  { id: '05', title: 'ワールドメーカー' },
  { id: '06', title: 'エンペラーロード' },
  { id: '07', title: 'オラクル' },
  { id: '08', title: 'アーキテクト' },
  { id: '09', title: 'フロンティア' },
  { id: '10', title: 'インフルエンサー' },
  { id: '11', title: 'マスタースミス' },
  { id: '12', title: 'レボリューショナー' },
  { id: '13', title: 'フレイムスピーカー' },
  { id: '14', title: 'フィールドキーパー' },
  { id: '15', title: 'ワードメイジ' },
  { id: '16', title: 'ソウルケアラー' },
];

const CHARACTER_IMAGE: Record<string, string> = {
  '01': '/thumbnails/image_01_アークセージ_02.png',
  '02': '/thumbnails/image_02_シャドウストラテジスト_02.png',
  '03': '/thumbnails/image_03_ソウルヒーラー_02.png',
  '04': '/thumbnails/image_04_アイアンガーディアン.png',
  '05': '/thumbnails/image_05_ワールドメーカー.png',
  '06': '/thumbnails/image_06_エンペラーロード.png',
  '07': '/thumbnails/image_07_オラクル.png',
  '08': '/thumbnails/image_08_アーキテクト.png',
  '09': '/thumbnails/image_09_フロンティア.png',
  '10': '/thumbnails/image_10_インフルエンサー.png',
  '11': '/thumbnails/image_11_マスタースミス.png',
  '12': '/thumbnails/image_12_レボリューショナー.png',
  '13': '/thumbnails/image_13_フレイムスピーカー.png',
  '14': '/thumbnails/image_14_フィールドキーパー.png',
  '15': '/thumbnails/image_15_ワールドメイジ.png',
  '16': '/thumbnails/image_16_ソウルケアラー.png',
};

const STATS = [
  { v: '50', u: '問', l: '設問数' },
  { v: '16', u: '種', l: 'タイプ' },
  { v: '15〜20', u: '分', l: '所要時間' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ブルーム診断とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ブルーム診断は、50問の質問に答えるだけであなたのパーソナリティタイプと戦闘力スコアを算出する性格診断です。16タイプの異世界ギルド世界観をもとに、あなたの本質・強み・弱み・人間関係パターンを深く分析します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ブルーム診断は無料で受けられますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、基本の診断は完全無料です。診断結果ページでは16タイプのうちあなたのタイプと詳しい解説が無料で表示されます。さらに深い分析を希望する場合はAI深層分析レポート（¥480）をご利用いただけます。',
      },
    },
    {
      '@type': 'Question',
      name: '何タイプありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ブルーム診断には16タイプあります。アークセージ・シャドウストラテジスト・ソウルヒーラー・アイアンガーディアン・ワールドメーカー・エンペラーロード・オラクル・アーキテクト・フロンティア・インフルエンサー・マスタースミス・レボリューショナー・フレイムスピーカー・フィールドキーパー・ワードメイジ・ソウルケアラーの16種類です。',
      },
    },
    {
      '@type': 'Question',
      name: '何問の質問がありますか？所要時間は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '全50問の質問に答えます。所要時間は15〜20分程度です。スマートフォンでもパソコンでも受けられます。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI深層分析レポートとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI深層分析レポートは、あなたの診断結果をもとにClaudeが生成する詳細なパーソナリティ分析レポートです（¥480の一回払い）。あなたの本質・隠れた強み・挑戦状・人間関係の地図・明日からの一歩の5セクションを詳しく分析します。',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-sm mx-auto w-full flex flex-col min-h-[90vh] justify-between">

        <div>
          {/* Brand */}
          <div className="animate-fadeInUp delay-100 text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase mb-10">
            ブルーム診断
          </div>

          {/* Headline */}
          <h1 className="animate-fadeInUp delay-200 text-5xl font-black text-white leading-[1.05] mb-5">
            あなたの<br />本質を<br />分析する。
          </h1>

          {/* Gold divider */}
          <div
            className="animate-expandX delay-300 w-8 h-0.5 mb-5"
            style={{ background: '#c9a84c' }}
          />

          <p className="animate-fadeInUp delay-400 text-xs text-white/40 leading-loose mb-10">
            50の問いに答えるだけで、<br />
            あなたのパーソナリティタイプと<br />
            戦闘力スコアが算出される。
          </p>

          {/* Stats */}
          <div className="animate-fadeInUp delay-500 grid grid-cols-3 border border-white/8 divide-x divide-white/8 mb-10">
            {STATS.map((s) => (
              <div key={s.l} className="py-4 text-center">
                <div className="font-black text-white leading-none"
                  style={{ fontSize: s.v.length > 3 ? '0.85rem' : '1.25rem' }}>
                  {s.v}<span className="text-xs font-bold">{s.u}</span>
                </div>
                <div className="text-[8px] font-bold tracking-[0.3em] text-white/30 mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fadeInUp delay-600">
            <Link
              href="/quiz"
              className="block w-full py-4 bg-white text-[#0a0a0a] font-bold text-xs tracking-[0.3em] uppercase text-center hover:bg-white/90 transition-colors"
            >
              診断スタート →
            </Link>
          </div>
        </div>

        {/* Type index */}
        <div className="animate-fadeInUp delay-700 mt-12 border-t border-white/8 pt-6">
          <div className="text-[8px] font-bold tracking-[0.5em] text-white/20 uppercase mb-4">
            16のパーソナリティ
          </div>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {TYPE_LIST.map((t) => (
              <Link key={t.id} href={`/result/${t.id}`} className="flex flex-col items-center gap-1 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CHARACTER_IMAGE[t.id]}
                  alt={t.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-200"
                />
                <span className="text-[7px] font-mono text-white/20">{t.id}</span>
                <span className="text-[8px] text-white/35 text-center leading-tight">{t.title}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="animate-fadeInUp delay-800 mt-8 pt-6 border-t border-white/8 flex justify-between items-center">
        <div className="text-[8px] text-white/20">© 2025 株式会社LEVAN</div>
        <Link href="/privacy" className="text-[8px] text-white/20 hover:text-white/50 transition-colors tracking-widest">
          プライバシーポリシー
        </Link>
      </div>

    </div>
  );
}
