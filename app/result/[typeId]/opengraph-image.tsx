import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId } from '@/lib/types';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return Object.keys(BLOOM_TYPES).map(typeId => ({ typeId }));
}

const FACTION_COLOR: Record<string, string> = {
  blue:   '#3b82f6',
  red:    '#ef4444',
  purple: '#a855f7',
  gold:   '#c9a84c',
  cyan:   '#22d3ee',
  orange: '#f97316',
  green:  '#22c55e',
};

const IMAGE_FILENAME: Record<string, string> = {
  '01': 'image_01_アークセージ_02.png',
  '02': 'image_02_シャドウストラテジスト_02.png',
  '03': 'image_03_ソウルヒーラー_02.png',
  '04': 'image_04_アイアンガーディアン.png',
  '05': 'image_05_ワールドメーカー.png',
  '06': 'image_06_エンペラーロード.png',
  '07': 'image_07_オラクル.png',
  '08': 'image_08_アーキテクト.png',
  '09': 'image_09_フロンティア.png',
  '10': 'image_10_インフルエンサー.png',
  '11': 'image_11_マスタースミス.png',
  '12': 'image_12_レボリューショナー.png',
  '13': 'image_13_フレイムスピーカー.png',
  '14': 'image_14_フィールドキーパー.png',
  '15': 'image_15_ワールドメイジ.png',
  '16': 'image_16_ソウルケアラー.png',
};

async function loadFont() {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0' } }
    ).then(r => r.text());
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/);
    if (!match) return null;
    return fetch(match[1]).then(r => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ typeId: string }> }) {
  const { typeId } = await params;
  const t = BLOOM_TYPES[typeId as BloomTypeId];
  if (!t) return new Response('Not found', { status: 404 });

  const accent = FACTION_COLOR[t.factionColor] ?? '#c9a84c';

  const [font, imgBuffer] = await Promise.all([
    loadFont(),
    readFile(join(process.cwd(), 'public', IMAGE_FILENAME[typeId] ?? '')).catch(() => null),
  ]);

  const imgSrc = imgBuffer
    ? `data:image/png;base64,${Buffer.from(imgBuffer).toString('base64')}`
    : null;

  const fonts = font
    ? [{ name: 'NotoSansJP', data: font, weight: 700 as const, style: 'normal' as const }]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          fontFamily: font ? 'NotoSansJP' : 'sans-serif',
        }}
      >
        {/* Left accent bar */}
        <div style={{ width: 8, background: accent, flexShrink: 0 }} />

        {/* Text content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '56px 48px 56px 52px',
          }}
        >
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 18, letterSpacing: 8, marginBottom: 28, display: 'flex' }}>
            ブルーム診断
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div
              style={{
                background: accent,
                color: '#0a0a0a',
                fontSize: 15,
                fontWeight: 700,
                padding: '5px 14px',
                letterSpacing: 4,
                display: 'flex',
              }}
            >
              {t.rarity}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 17, display: 'flex' }}>
              上位 {t.populationPercent}%
            </div>
          </div>

          <div style={{ color: 'white', fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginBottom: 16, display: 'flex' }}>
            {t.jobClass}
          </div>

          <div style={{ color: accent, fontSize: 30, marginBottom: 20, display: 'flex' }}>
            【{t.catchTitle}】
          </div>

          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 22, display: 'flex' }}>
            {t.catchCopy}
          </div>
        </div>

        {/* Character image */}
        <div
          style={{
            width: 320,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexShrink: 0,
            paddingBottom: 0,
          }}
        >
          {imgSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc}
              width={320}
              height={320}
              style={{ objectFit: 'contain' }}
              alt={t.jobClass}
            />
          )}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
