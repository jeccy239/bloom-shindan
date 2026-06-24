'use client';

import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { buildResult, saveResult, TOTAL_QUESTIONS } from '@/lib/scoring';
import type { Answer } from '@/lib/types';

const AXIS_LABELS: Record<number, string> = {
  1: 'エネルギー源',
  2: '思考スタイル',
  3: '環境適性',
  4: '変化への態度',
  5: '表現スタイル',
};

// Left-border accent per Likert option (strong agree → strong disagree)
const LIKERT_ACCENTS = [
  '#c9a84c',               // とてもそう思う — gold
  'rgba(255,255,255,0.35)', // そう思う
  'rgba(255,255,255,0.12)', // そう思わない
  'rgba(255,255,255,0.05)', // 全くそう思わない
];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const current = questions[currentIndex];
  const progress = (currentIndex / TOTAL_QUESTIONS) * 100;

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
      setIsTransitioning(true);

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
          // iOS Safari: 白背景を同期クリアしてからGPUレイヤーを更新
          flushSync(() => setSelected(null));
          setAnswers(updatedAnswers);
          setCurrentIndex(currentIndex + 1);
          setIsTransitioning(false);
          setKey((k) => k + 1);
        }
      }, 220);
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
            {AXIS_LABELS[current.axis]}
          </div>
          <div className="text-[10px] font-mono font-bold text-white/30">
            {String(currentIndex + 1).padStart(2, '0')} / {TOTAL_QUESTIONS}
          </div>
        </div>
        {/* Gold progress bar */}
        <div className="h-px bg-white/8 w-full relative overflow-hidden">
          <div
            className="h-full absolute top-0 left-0 progress-fill transition-all duration-300"
            style={{ width: `${progress}%`, background: '#c9a84c' }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={key}
        className={`border border-white/8 max-w-lg w-full px-7 pt-7 pb-5 ${
          isTransitioning ? 'opacity-0 translate-x-4 transition-all duration-200' : 'animate-scaleIn'
        }`}
      >
        {/* Q number + axis */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-xs font-black text-white/25">
            Q{String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[9px] font-bold tracking-widest text-white/25 uppercase">
            {AXIS_LABELS[current.axis]}
          </span>
        </div>

        {/* Statement */}
        <p className="text-white text-xl font-bold leading-snug mb-8">
          {current.text}
        </p>

        {/* Likert buttons */}
        <div className="flex flex-col gap-2 mb-4">
          {current.choices.map((choice, idx) => {
            const isSelected = selected === choice.label;
            const isOther = selected !== null && !isSelected;
            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label)}
                style={
                  !isSelected && !isOther
                    ? { borderLeftColor: LIKERT_ACCENTS[idx] }
                    : undefined
                }
                className={`option-btn appearance-none w-full text-left border border-l-2 px-4 py-4 text-sm transition-all ${
                  isSelected
                    ? 'selected border-white bg-white text-[#0a0a0a]'
                    : isOther
                    ? 'border-white/5 text-white/20 cursor-default'
                    : 'border-white/8 text-white/65 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{choice.text}</span>
                  {!isSelected && !isOther && (
                    <span className="text-[9px] font-mono text-white/20 flex-shrink-0">{idx + 1}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[9px] text-white/15 text-right tracking-wider">
          タップで次の質問へ自動で進みます
        </p>
      </div>

      {/* Segment progress */}
      <div className="mt-4 flex gap-px max-w-lg w-full">
        {questions.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1"
            style={{
              background:
                i < currentIndex
                  ? '#c9a84c'
                  : i === currentIndex
                  ? 'rgba(255,255,255,0.7)'
                  : 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>

      {/* Back */}
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
