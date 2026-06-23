import type { Metadata } from 'next';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId } from '@/lib/types';

const BASE_URL = 'https://bloom-shindan.vercel.app';

export async function generateMetadata(
  { params }: { params: Promise<{ typeId: string }> }
): Promise<Metadata> {
  const { typeId } = await params;
  const t = BLOOM_TYPES[typeId as BloomTypeId];

  if (!t) {
    return { title: 'ブルーム診断 結果' };
  }

  const title = `【${t.catchTitle}】${t.jobClass} | ブルーム診断`;
  const description = `あなたのブルーム診断の結果は「${t.catchTitle}」(${t.jobClass})。${t.description.slice(0, 80)}…`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/result/${typeId}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/result/${typeId}`,
      type: 'website',
      siteName: 'ブルーム診断',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ResultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ typeId: string }>;
}) {
  const { typeId } = await params;
  const t = BLOOM_TYPES[typeId as BloomTypeId];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ブルーム診断', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '診断結果', item: `${BASE_URL}/result` },
      ...(t ? [{ '@type': 'ListItem', position: 3, name: `${t.catchTitle}（${t.jobClass}）`, item: `${BASE_URL}/result/${typeId}` }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
