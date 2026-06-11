'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { buildResult, saveResult, TOTAL_QUESTIONS } from '@/lib/scoring';
import type { Answer, AxisDirection } from '@/lib/types';

const AXIS_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  EI: { label: 'エネルギー', emoji: '⚡', color: 'from-yellow-400 to-orange-400' },
  SN: { label: '思考スタイル', emoji: '💡', color: 'from-blue-400 to-indigo-400' },
  TF: { label: '判断軸', emoji: '⚖️', color: 'from-emerald-400 to-teal-400' },
  JP: { label: '生活スタイル', emoji: '🎯', color: 'from-purple-400 to-pink-400' },
};

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<AxisDirection | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const current = questions[currentIndex];
  const progress = (currentIndex / TOTAL_QUESTIONS) * 100;
  const axisInfo = AXIS_LABELS[current.axis];

  const handleSelect = useCallback(
    (direction: AxisDirection) => {
      if (isTransitioning || selected) return;
      setSelected(direction);

      const newAnswer: Answer = { questionId: current.id, direction };
      const updatedAnswers = [...answers, newAnswer];

      setTimeout(() => {
        if (currentIndex + 1 >= TOTAL_QUESTIONS) {
          const result = buildResult(updatedAnswers);
          saveResult(result);
          router.push(`/result/${result.typeId}`);
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
    [answers, current.id, currentIndex, isTransitioning, router, selected],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A' || e.key === '1') handleSelect(current.optionA.direction);
      if (e.key === 'b' || e.key === 'B' || e.key === '2') handleSelect(current.optionB.direction);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, handleSelect]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50" />

      {/* Top bar */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">
            Bloom 診断
          </span>
          <span className="text-xs font-bold text-gray-400">
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-purple-100 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${axisInfo.color} progress-fill`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Axis indicator */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-base">{axisInfo.emoji}</span>
          <span className="text-xs text-gray-400">{axisInfo.label}に関する質問</span>
        </div>
      </div>

      {/* Question card */}
      <div
        key={key}
        className={`glass-card rounded-3xl shadow-xl shadow-purple-100/50 max-w-xl w-full p-8 ${
          isTransitioning ? 'opacity-0 translate-x-4 transition-all duration-300' : 'animate-scaleIn'
        }`}
      >
        {/* Question number badge */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${axisInfo.color} text-white text-xs font-bold shadow-sm`}
          >
            Q
          </span>
          <span className="text-xs text-gray-400 font-medium">Question {currentIndex + 1}</span>
        </div>

        {/* Question text */}
        <p className="text-gray-800 text-lg font-bold leading-snug mb-8">
          {current.text}
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {([current.optionA, current.optionB] as const).map((option, idx) => {
            const isSelected = selected === option.direction;
            const isOther = selected !== null && !isSelected;
            return (
              <button
                key={option.direction}
                onClick={() => handleSelect(option.direction)}
                disabled={!!selected}
                className={`option-btn relative w-full text-left rounded-2xl border-2 px-5 py-4 font-medium text-sm leading-relaxed transition-all
                  ${
                    isSelected
                      ? `border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 selected shadow-md shadow-purple-200/50`
                      : isOther
                      ? 'border-gray-100 bg-gray-50/50 text-gray-300'
                      : 'border-purple-100 bg-white hover:border-purple-300 hover:bg-purple-50/40 text-gray-700'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5
                      ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500 text-white'
                          : isOther
                          ? 'border-gray-200 text-gray-300'
                          : 'border-purple-200 text-purple-400'
                      }
                    `}
                  >
                    {idx === 0 ? 'A' : 'B'}
                  </span>
                  <span>{option.text}</span>
                </div>
                {isSelected && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 text-lg">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-xs text-gray-300 mt-5">
          キーボードの <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-mono text-xs">A</kbd> /{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-mono text-xs">B</kbd> でも選べます
        </p>
      </div>

      {/* Dot indicators (grouped) */}
      <div className="mt-6 flex gap-1 flex-wrap justify-center max-w-xs">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i < currentIndex
                ? 'w-2 h-2 bg-purple-400'
                : i === currentIndex
                ? 'w-3 h-2 bg-pink-400'
                : 'w-2 h-2 bg-purple-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
