import type { MetadataRoute } from 'next';

const BASE_URL = 'https://bloom-shindan.vercel.app';
const TYPE_IDS = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'];

export default function sitemap(): MetadataRoute.Sitemap {
  const resultPages = TYPE_IDS.map((id) => ({
    url: `${BASE_URL}/result/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const typePages = TYPE_IDS.map((id) => ({
    url: `${BASE_URL}/type/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/type`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...typePages,
    ...resultPages,
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
