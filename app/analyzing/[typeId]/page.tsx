'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const MESSAGES = [
  'エネルギーを分析中...',
  '思考スタイルを解析中...',
  '環境適性を照合中...',
  'パーソナリティを確定中...',
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
        const remaining = 100 - p;
        return p + Math.max(1, remaining * 0.04);
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">

        <div className="text-7xl mb-8 animate-float">🌸</div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          あなたのタイプを分析中
        </h2>
        <div className="h-5 mb-8">
          <p className="text-sm text-gray-400 animate-fadeInUp" key={msgIndex}>
            {MESSAGES[msgIndex]}
          </p>
        </div>

        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400"
            style={{
              width: `${Math.min(progress, 100)}%`,
              transition: 'width 0.1s ease',
            }}
          />
        </div>
        <p className="text-xs text-gray-300 font-mono">{Math.round(Math.min(progress, 100))}%</p>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-pink-300"
              style={{
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
