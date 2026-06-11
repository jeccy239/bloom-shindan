'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const MESSAGES = [
  'SCANNING PERSONALITY AXES...',
  'ANALYZING ENERGY PATTERNS...',
  'COMPUTING BATTLE POWER...',
  'FINALIZING TYPE MATCH...',
];

export default function AnalyzingPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const router = useRouter();
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 750);

    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + Math.max(0.5, (100 - p) * 0.04);
      });
    }, 50);

    const redirect = setTimeout(() => {
      router.push(`/result/${typeId}`);
    }, 3300);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      clearTimeout(redirect);
    };
  }, [router, typeId]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-xs w-full">

        <div className="text-[9px] font-bold tracking-[0.5em] text-gray-300 uppercase mb-10">
          Bloom Diagnosis
        </div>

        <div className="text-2xl font-black text-gray-900 mb-1 tracking-tight">
          ANALYZING
        </div>
        <div className="text-[10px] font-mono text-gray-400 mb-10 h-4 animate-fadeInUp" key={msgIndex}>
          {MESSAGES[msgIndex]}
        </div>

        {/* Progress bar */}
        <div className="h-px bg-gray-200 relative overflow-hidden mb-3">
          <div
            className="h-full absolute top-0 left-0"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: '#c9a84c',
              transition: 'width 0.1s ease',
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-[10px] font-mono text-gray-400 tabular-nums">
            {Math.round(Math.min(progress, 100)).toString().padStart(3, '0')}%
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1"
                style={{
                  background: '#c9a84c',
                  opacity: msgIndex >= i ? 1 : 0.2,
                  transition: 'opacity 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
