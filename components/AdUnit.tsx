'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  className?: string;
}

export default function AdUnit({ adSlot, adFormat = 'auto', className = '' }: AdUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 text-[9px] text-gray-300 tracking-widest ${className}`}
        style={{ minHeight: 90 }}
      >
        AD UNIT — {adSlot}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
