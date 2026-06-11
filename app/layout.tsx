import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bloom 診断 | あなたの咲き方を見つけよう',
  description: '50問の質問に答えて、あなただけの花タイプを発見しよう。16タイプのBloom診断。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
