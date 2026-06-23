import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const BASE_URL = 'https://bloom-shindan.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ブルーム診断 | あなたの本質を分析する性格診断',
    template: '%s | ブルーム診断',
  },
  description: '50問に答えるだけで、あなたのパーソナリティタイプと戦闘力スコアを算出。16タイプの異世界ギルド世界観で自分の本質・強み・弱みを深く知れる性格診断。障害を持つ方も含めすべての人の挑戦を後押しする。',
  keywords: ['ブルーム診断', '性格診断', 'パーソナリティ診断', '16タイプ', '強み診断', '自己分析', '無料診断', 'bloom診断'],
  authors: [{ name: '株式会社LEVAN' }],
  creator: '株式会社LEVAN',
  publisher: '株式会社LEVAN',
  verification: { google: 'w2GT8HoSoX78ZIAWTknlR0qnEhK_ZC7byNzEWQgoF3g' },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: BASE_URL,
    siteName: 'ブルーム診断',
    title: 'ブルーム診断 | あなたの本質を分析する性格診断',
    description: '50問に答えるだけで、あなたのパーソナリティタイプと戦闘力スコアを算出。16タイプの異世界ギルド世界観で自分の強み・弱みを深く知れる無料性格診断。',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ブルーム診断' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ブルーム診断 | あなたの本質を分析する性格診断',
    description: '50問に答えるだけで、あなたのパーソナリティタイプと戦闘力スコアを算出。16タイプの異世界ギルド世界観で自分の強み・弱みを深く知れる無料性格診断。',
    images: ['/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ブルーム診断',
  url: 'https://bloom-shindan.vercel.app',
  description: '50問に答えるだけで、あなたのパーソナリティタイプと戦闘力スコアを算出する無料性格診断。',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: '株式会社LEVAN', url: 'https://levan.sakuraweb.com' },
  inLanguage: 'ja',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <meta name="google-site-verification" content="w2GT8HoSoX78ZIAWTknlR0qnEhK_ZC7byNzEWQgoF3g" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
