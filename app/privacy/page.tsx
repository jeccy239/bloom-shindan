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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-6 py-12">
      <div className="max-w-lg w-full">

        {/* Header */}
        <div className="mb-10">
          <div className="text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase mb-6">
            ブルーム診断システム
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-3">
            プライバシー<br />ポリシー
          </h1>
          <div className="w-6 h-0.5 mb-4" style={{ background: '#c9a84c' }} />
          <p className="text-[10px] text-white/30 leading-loose">
            最終更新日：2025年6月
          </p>
        </div>

        {/* Intro */}
        <p className="text-xs text-white/50 leading-loose mb-8 border-l-2 pl-4" style={{ borderColor: '#c9a84c' }}>
          株式会社LEVAN（以下「当社」）は、ブルーム診断（bloom-shindan.vercel.app、以下「当サイト」）におけるユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-0">
          {SECTIONS.map((section, i) => (
            <div key={i} className="border-t border-white/8 py-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] font-mono text-white/20">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-sm font-black text-white tracking-wide">{section.title}</h2>
              </div>
              <p className="text-xs text-white/45 leading-loose whitespace-pre-line pl-7">
                {section.body}
              </p>
            </div>
          ))}
          <div className="border-t border-white/8" />
        </div>

        {/* Back */}
        <div className="mt-10 mb-16">
          <Link
            href="/"
            className="text-[9px] font-bold tracking-[0.3em] text-white/30 hover:text-white/70 transition-colors"
          >
            ← トップへ戻る
          </Link>
        </div>

        {/* Character grid */}
        <div className="border-t border-white/8 pt-6">
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
      <div className="mt-12 pt-6 border-t border-white/8 w-full max-w-lg flex justify-between items-center">
        <div className="text-[8px] text-white/20">© 2025 株式会社LEVAN</div>
        <Link href="/privacy" className="text-[8px] text-white/20 tracking-widest">
          プライバシーポリシー
        </Link>
      </div>

    </div>
  );
}
