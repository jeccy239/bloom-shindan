import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">

      {/* Main card */}
      <div className="max-w-md w-full text-center animate-fadeInUp">

        {/* Logo */}
        <div className="text-6xl mb-4">🌸</div>
        <div className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase mb-3">
          Bloom Diagnosis
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          あなたの咲き方を<br />見つけよう
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          50問の質問に答えるだけで、<br />
          あなただけの花タイプがわかる。
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: '50問', label: '質問数' },
            { value: '16種', label: 'タイプ数' },
            { value: '約5分', label: '所要時間' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-100 py-3 px-2 bg-gray-50">
              <div className="text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/quiz"
          className="block w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-base shadow-md shadow-pink-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
        >
          診断スタート ✨
        </Link>

        <p className="text-xs text-gray-300 mt-4">
          回答は保存されません。何度でも試せます。
        </p>
      </div>

      {/* Type badges */}
      <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-md">
        {['🌸 コスモス', '🌻 ひまわり', '🌹 バラ', '💜 ラベンダー', '🌷 チューリップ', '🌵 サボテン'].map((t) => (
          <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-gray-100 text-gray-400">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
