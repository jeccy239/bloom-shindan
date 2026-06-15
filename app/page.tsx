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

const STATS = [
  { v: '50', u: '問', l: '設問数' },
  { v: '16', u: '種', l: 'タイプ' },
  { v: '15〜20', u: '分', l: '所要時間' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col px-6 py-12">
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
          <div className="grid grid-cols-3 gap-y-2.5">
            {TYPE_LIST.map((t) => (
              <div key={t.id} className="flex items-center gap-1.5">
                <span className="text-[8px] font-mono text-white/20">{t.id}</span>
                <span className="text-[10px] text-white/30">{t.title}</span>
              </div>
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
