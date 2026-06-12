import Link from 'next/link';

const SECTIONS = [
  {
    title: '収集する情報',
    body: `当サイトは、以下の情報を自動的に収集することがあります。\n\n・アクセスログ（IPアドレス、ブラウザの種類、参照URL、アクセス日時）\n・Cookieおよびこれに類する技術による情報\n・診断結果（タイプID・スコア）は、お客様のブラウザ内（localStorage）にのみ保存され、当サイトのサーバーには送信・保存されません。`,
  },
  {
    title: 'Cookieの使用について',
    body: `当サイトでは、利便性の向上および広告配信の最適化を目的として、Cookieを使用しています。ブラウザの設定によりCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。`,
  },
  {
    title: '広告の配信について（Google AdSense）',
    body: `当サイトは、Googleが提供する広告配信サービス「Google AdSense」を利用しています。Google AdSenseは、ユーザーの興味に応じた広告を表示するために、Cookieを使用することがあります。\n\nGoogleによるCookieの使用については、以下のページをご確認ください。\nhttps://policies.google.com/technologies/ads\n\nまた、Googleのパーソナライズ広告の設定はこちらから変更できます。\nhttps://www.google.com/settings/ads`,
  },
  {
    title: 'アクセス解析について',
    body: `当サイトでは、サービス改善のためにアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は収集しません。`,
  },
  {
    title: '個人情報の第三者提供',
    body: `当サイトは、法令に基づく場合を除き、収集した個人情報を第三者に提供することはありません。`,
  },
  {
    title: '免責事項',
    body: `当サイトの診断結果はエンターテインメントを目的としたものであり、医学的・心理学的な診断に代わるものではありません。診断結果の利用により生じたいかなる損害についても、運営者は責任を負いかねます。`,
  },
  {
    title: 'プライバシーポリシーの変更',
    body: `当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーは本ページに掲載した時点から効力を生じるものとします。`,
  },
  {
    title: 'お問い合わせ',
    body: `本ポリシーに関するお問い合わせは、下記までご連絡ください。\n\n運営：株式会社LEVAN\nEmail：info@levan.sakuraweb.com`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="max-w-lg w-full">

        {/* Header */}
        <div className="mb-10">
          <div className="text-[9px] font-bold tracking-[0.5em] text-gray-300 uppercase mb-6">
            ブルーム診断システム
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">
            プライバシー<br />ポリシー
          </h1>
          <div className="w-6 h-0.5 mb-4" style={{ background: '#c9a84c' }} />
          <p className="text-[10px] text-gray-400 leading-loose">
            最終更新日：2025年6月
          </p>
        </div>

        {/* Intro */}
        <p className="text-xs text-gray-600 leading-loose mb-8 border-l-2 pl-4" style={{ borderColor: '#c9a84c' }}>
          株式会社LEVAN（以下「当社」）は、ブルーム診断（bloom-shindan.vercel.app、以下「当サイト」）におけるユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-0">
          {SECTIONS.map((section, i) => (
            <div key={i} className="border-t border-gray-100 py-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] font-mono text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-sm font-black text-gray-900 tracking-wide">{section.title}</h2>
              </div>
              <p className="text-xs text-gray-600 leading-loose whitespace-pre-line pl-7">
                {section.body}
              </p>
            </div>
          ))}
          <div className="border-t border-gray-100" />
        </div>

        {/* Back */}
        <div className="mt-10">
          <Link
            href="/"
            className="text-[9px] font-bold tracking-[0.3em] text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← トップへ戻る
          </Link>
        </div>

      </div>
    </div>
  );
}
