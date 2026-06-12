import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブルーム診断 | あなたの本質を分析する',
  description: '50の問いに答えるだけで、あなたのパーソナリティタイプと戦闘力スコアが算出される。16タイプのブルーム診断。',
};

const TYPE_LIST = [
  { id: '01', title: '孤高の天才' },
  { id: '02', title: '影の参謀' },
  { id: '03', title: '共感の達人' },
  { id: '04', title: '不動の守護者' },
  { id: '05', title: '時代を創る者' },
  { id: '06', title: '冷静な支配者' },
  { id: '07', title: '未来の預言者' },
  { id: '08', title: '完璧な設計者' },
  { id: '09', title: '無謀な開拓者' },
  { id: '10', title: '熱狂の伝道師' },
  { id: '11', title: '孤高の職人' },
  { id: '12', title: '型破りの革命家' },
  { id: '13', title: '魂の扇動者' },
  { id: '14', title: '現場の守護神' },
  { id: '15', title: '言葉の魔術師' },
  { id: '16', title: '魂の癒し手' },
];

const STATS = [
  { v: '50', u: '問', l: '設問数' },
  { v: '16', u: '種', l: 'タイプ' },
  { v: '15〜20', u: '分', l: '所要時間' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      <div className="max-w-sm mx-auto w-full flex flex-col min-h-[90vh] justify-between">

        <div>
          {/* Brand */}
          <div className="animate-fadeInUp delay-100 text-[9px] font-bold tracking-[0.5em] text-gray-300 uppercase mb-10">
            ブルーム診断
          </div>

          {/* Headline */}
          <h1 className="animate-fadeInUp delay-200 text-5xl font-black text-gray-900 leading-[1.05] mb-5">
            あなたの<br />本質を<br />分析する。
          </h1>

          {/* Gold divider */}
          <div
            className="animate-expandX delay-300 w-8 h-0.5 mb-5"
            style={{ background: '#c9a84c' }}
          />

          <p className="animate-fadeInUp delay-400 text-xs text-gray-500 leading-loose mb-10">
            50の問いに答えるだけで、<br />
            あなたのパーソナリティタイプと<br />
            戦闘力スコアが算出される。
          </p>

          {/* Stats */}
          <div className="animate-fadeInUp delay-500 grid grid-cols-3 border border-gray-200 divide-x divide-gray-200 mb-10">
            {STATS.map((s) => (
              <div key={s.l} className="py-4 text-center">
                <div className="font-black text-gray-900 leading-none"
                  style={{ fontSize: s.v.length > 3 ? '0.85rem' : '1.25rem' }}>
                  {s.v}<span className="text-xs font-bold">{s.u}</span>
                </div>
                <div className="text-[8px] font-bold tracking-[0.3em] text-gray-400 mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fadeInUp delay-600">
            <Link
              href="/quiz"
              className="block w-full py-4 bg-gray-900 text-white font-bold text-xs tracking-[0.3em] uppercase text-center hover:bg-black transition-colors"
            >
              診断スタート →
            </Link>
          </div>
        </div>

        {/* Type index */}
        <div className="animate-fadeInUp delay-700 mt-12 border-t border-gray-100 pt-6">
          <div className="text-[8px] font-bold tracking-[0.5em] text-gray-300 uppercase mb-4">
            16のパーソナリティ
          </div>
          <div className="grid grid-cols-3 gap-y-2.5">
            {TYPE_LIST.map((t) => (
              <div key={t.id} className="flex items-center gap-1.5">
                <span className="text-[8px] font-mono text-gray-300">{t.id}</span>
                <span className="text-[10px] text-gray-400">{t.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="animate-fadeInUp delay-800 mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
        <div className="text-[8px] text-gray-300">© 2025 株式会社LEVAN</div>
        <Link href="/privacy" className="text-[8px] text-gray-300 hover:text-gray-500 transition-colors tracking-widest">
          プライバシーポリシー
        </Link>
      </div>

    </div>
  );
}
