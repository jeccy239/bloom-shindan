import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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

export default async function Image() {
  const font = await loadFont();
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: font ? 'NotoSansJP' : 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Gold top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#c9a84c' }} />

        {/* Brand mark */}
        <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: 16, letterSpacing: 12, marginBottom: 32, display: 'flex' }}>
          BLOOM SHINDAN
        </div>

        {/* Title */}
        <div style={{ color: 'white', fontSize: 96, fontWeight: 700, lineHeight: 1, marginBottom: 24, display: 'flex' }}>
          ブルーム診断
        </div>

        {/* Divider */}
        <div style={{ width: 64, height: 3, background: '#c9a84c', marginBottom: 32, display: 'flex' }} />

        {/* Subtitle */}
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 32, marginBottom: 48, display: 'flex' }}>
          あなたの本質を分析する性格診断
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[
            { v: '50問', l: '設問数' },
            { v: '16タイプ', l: 'パーソナリティ' },
            { v: '完全無料', l: '基本診断' },
          ].map(s => (
            <div key={s.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ color: '#c9a84c', fontSize: 28, fontWeight: 700 }}>{s.v}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, letterSpacing: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Bottom brand */}
        <div style={{ position: 'absolute', bottom: 32, right: 48, color: 'rgba(255,255,255,0.2)', fontSize: 14, display: 'flex' }}>
          株式会社LEVAN
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
