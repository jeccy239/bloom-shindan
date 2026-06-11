import Link from 'next/link';

const floatingEmojis = [
  { emoji: '🌸', style: 'top-[8%] left-[8%] text-5xl', delay: '0s' },
  { emoji: '🌺', style: 'top-[12%] right-[10%] text-4xl', delay: '1s' },
  { emoji: '🌻', style: 'top-[40%] left-[4%] text-3xl', delay: '2s' },
  { emoji: '🌷', style: 'top-[60%] right-[6%] text-4xl', delay: '0.5s' },
  { emoji: '💐', style: 'bottom-[15%] left-[12%] text-3xl', delay: '1.5s' },
  { emoji: '🌹', style: 'bottom-[20%] right-[14%] text-4xl', delay: '2.5s' },
  { emoji: '🌼', style: 'top-[28%] right-[20%] text-2xl', delay: '3s' },
  { emoji: '🌿', style: 'top-[72%] left-[18%] text-2xl', delay: '0.8s' },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]" />

      {/* Floating emojis */}
      {floatingEmojis.map((item, i) => (
        <span
          key={i}
          className={`fixed animate-float select-none pointer-events-none ${item.style}`}
          style={{ animationDelay: item.delay, opacity: 0.6 }}
        >
          {item.emoji}
        </span>
      ))}

      {/* Main card */}
      <div className="glass-card rounded-3xl shadow-2xl shadow-purple-200/40 max-w-lg w-full px-8 py-12 text-center animate-fadeInUp">
        {/* Logo area */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 shadow-lg shadow-pink-300/40 mb-4 text-4xl">
            🌸
          </div>
          <div className="text-xs font-semibold tracking-[0.3em] text-purple-400 uppercase mb-2">
            Bloom Diagnosis
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            <span className="gradient-text">あなたの咲き方</span>
            <br />
            <span className="text-gray-800">を見つけよう</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          50問の質問に答えるだけで、
          <br />
          あなただけの<strong className="text-purple-600">花タイプ</strong>がわかる。
          <br />
          16種類の中から、あなたらしい咲き方を発見しよう。
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: '50問', label: '質問数' },
            { value: '16種', label: 'タイプ数' },
            { value: '約5分', label: '所要時間' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 py-3 px-2"
            >
              <div className="text-xl font-bold text-purple-600">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <Link
          href="/quiz"
          className="block w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-lg shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-300/60 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
        >
          診断スタート ✨
        </Link>

        <p className="text-xs text-gray-400 mt-4">
          回答は保存されません。何度でも試せます。
        </p>
      </div>

      {/* Type preview badges */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
        {['🌸 コスモス', '🌻 ひまわり', '🌹 バラ', '💜 ラベンダー', '🌷 チューリップ', '🌵 サボテン'].map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1.5 rounded-full bg-white/70 border border-purple-100 text-gray-500 shadow-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
