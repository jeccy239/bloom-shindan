'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { buildResult, saveResult, TOTAL_QUESTIONS } from '@/lib/scoring';
import type { Answer } from '@/lib/types';

const AXIS_LABELS: Record<number, { label: string; short: string }> = {
  1: { label: 'エネルギー源',   short: 'エネルギー' },
  2: { label: '思考スタイル',  short: '思考スタイル' },
  3: { label: '環境適性',      short: '環境適性' },
  4: { label: '変化への態度',  short: '変化への態度' },
  5: { label: '表現スタイル',  short: '表現スタイル' },
};

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const current = questions[currentIndex];
  const progress = (currentIndex / TOTAL_QUESTIONS) * 100;
  const axisInfo = AXIS_LABELS[current.axis];

  const handleBack = useCallback(() => {
    if (isTransitioning || selected || currentIndex === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setAnswers((prev) => prev.slice(0, -1));
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
      setIsTransitioning(false);
      setKey((k) => k + 1);
    }, 200);
  }, [currentIndex, isTransitioning, selected]);

  const handleSelect = useCallback(
    (label: 'A' | 'B' | 'C' | 'D') => {
      if (isTransitioning || selected) return;
      setSelected(label);

      const choice = current.choices.find((c) => c.label === label)!;
      const newAnswer: Answer = {
        questionId: current.id,
        choiceLabel: label,
        scores: choice.scores,
      };
      const updatedAnswers = [...answers, newAnswer];

      setTimeout(() => {
        if (currentIndex + 1 >= TOTAL_QUESTIONS) {
          const result = buildResult(updatedAnswers);
          saveResult(result);
          const s = [
            result.stats.analysis,
            result.stats.action,
            result.stats.empathy,
            result.stats.expression,
            result.stats.change,
          ].join(',');
          router.push(`/analyzing/${result.typeId}?bp=${result.battlePower}&s=${s}`);
        } else {
          setIsTransitioning(true);
          setTimeout(() => {
            setAnswers(updatedAnswers);
            setCurrentIndex(currentIndex + 1);
            setSelected(null);
            setIsTransitioning(false);
            setKey((k) => k + 1);
          }, 300);
        }
      }, 400);
    },
    [answers, current, currentIndex, isTransitioning, router, selected],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A' || e.key === '1') handleSelect('A');
      if (e.key === 'b' || e.key === 'B' || e.key === '2') handleSelect('B');
      if (e.key === 'c' || e.key === 'C' || e.key === '3') handleSelect('C');
      if (e.key === 'd' || e.key === 'D' || e.key === '4') handleSelect('D');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSelect]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-5 py-8">

      {/* Top bar */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[9px] font-bold tracking-[0.2em] text-white/30">
            ブルーム診断 — {axisInfo.short}
          </div>
          <div className="text-[10px] font-mono font-bold text-white/30">
            {String(currentIndex + 1).padStart(2, '0')} / {TOTAL_QUESTIONS}
          </div>
        </div>
        <div className="h-px bg-white/8 w-full relative overflow-hidden">
          <div
            className="h-full absolute top-0 left-0 progress-fill"
            style={{ width: `${progress}%`, background: '#c9a84c' }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={key}
        className={`border border-white/8 max-w-lg w-full p-7 ${
          isTransitioning ? 'opacity-0 translate-x-4 transition-all duration-300' : 'animate-scaleIn'
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[9px] font-black tracking-[0.3em] text-white/20">
            第
          </span>
          <span className="font-mono text-xs font-bold text-white">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-black tracking-[0.3em] text-white/20">
            問
          </span>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[9px] font-bold tracking-widest text-white/20 uppercase">
            {axisInfo.label}
          </span>
        </div>

        <p className="text-white text-lg font-bold leading-snug mb-7">
          {current.text}
        </p>

        <div className="flex flex-col gap-2">
          {current.choices.map((choice) => {
            const isSelected = selected === choice.label;
            const isOther = selected !== null && !isSelected;
            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label)}
                disabled={!!selected}
                className={`option-btn w-full text-left border px-4 py-3.5 text-sm transition-all ${
                  isSelected
                    ? 'selected border-white bg-white text-[#0a0a0a]'
                    : isOther
                    ? 'border-white/5 text-white/20'
                    : 'border-white/10 text-white/65 hover:border-white/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-5 h-5 border flex items-center justify-center text-[10px] font-black mt-0.5
                      ${isSelected ? 'border-[#0a0a0a] text-[#0a0a0a]' : isOther ? 'border-white/5 text-white/20' : 'border-white/20 text-white/30'}
                    `}
                  >
                    {choice.label}
                  </span>
                  <span>{choice.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-1 mt-5 justify-center">
          {(['A', 'B', 'C', 'D'] as const).map((k) => (
            <kbd key={k} className="text-[9px] px-1.5 py-0.5 border border-white/8 text-white/20 font-mono">{k}</kbd>
          ))}
        </div>
      </div>

      {/* Progress segments */}
      <div className="mt-5 flex gap-px max-w-lg w-full">
        {questions.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1"
            style={{
              background: i < currentIndex ? '#c9a84c' : i === currentIndex ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <div className="max-w-lg w-full mt-4">
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            disabled={!!selected || isTransitioning}
            className="text-[9px] font-bold text-white/30 hover:text-white/60 disabled:opacity-30 transition-colors tracking-widest"
          >
            ← 前の問題
          </button>
        )}
      </div>
    </div>
  );
}
