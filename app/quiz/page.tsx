'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { buildResult, saveResult, TOTAL_QUESTIONS } from '@/lib/scoring';
import type { Answer } from '@/lib/types';

const AXIS_LABELS: Record<number, { label: string; emoji: string; color: string }> = {
  1: { label: 'エネルギー源', emoji: '⚡', color: 'from-yellow-400 to-orange-400' },
  2: { label: '思考スタイル', emoji: '🧠', color: 'from-blue-400 to-indigo-400' },
  3: { label: '環境適性',   emoji: '🌐', color: 'from-emerald-400 to-teal-400' },
  4: { label: '変化への態度', emoji: '🔄', color: 'from-purple-400 to-pink-400' },
  5: { label: '表現スタイル', emoji: '📣', color: 'from-rose-400 to-red-400' },
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
          router.push(`/analyzing/${result.typeId}`);
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
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">

      {/* Top bar */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-pink-400 tracking-widest uppercase">
            Bloom 診断
          </span>
          <span className="text-xs font-bold text-gray-400">
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <div className="h-2 rounded-full bg-pink-100 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${axisInfo.color} progress-fill`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-base">{axisInfo.emoji}</span>
          <span className="text-xs text-gray-400">{axisInfo.label}に関する質問</span>
        </div>
      </div>

      {/* Question card */}
      <div
        key={key}
        className={`bg-white border border-gray-100 rounded-3xl shadow-sm max-w-xl w-full p-7 ${
          isTransitioning ? 'opacity-0 translate-x-4 transition-all duration-300' : 'animate-scaleIn'
        }`}
      >
        <div className="flex items-center gap-2 mb-5">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${axisInfo.color} text-white text-xs font-bold shadow-sm`}
          >
            Q
          </span>
          <span className="text-xs text-gray-400 font-medium">Question {currentIndex + 1}</span>
        </div>

        <p className="text-gray-800 text-lg font-bold leading-snug mb-6">
          {current.text}
        </p>

        <div className="grid grid-cols-1 gap-2.5">
          {current.choices.map((choice) => {
            const isSelected = selected === choice.label;
            const isOther = selected !== null && !isSelected;
            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label)}
                disabled={!!selected}
                className={`option-btn relative w-full text-left rounded-2xl border-2 px-4 py-3.5 font-medium text-sm leading-relaxed transition-all
                  ${
                    isSelected
                      ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 selected shadow-md shadow-pink-200/50'
                      : isOther
                      ? 'border-gray-100 bg-gray-50/50 text-gray-300'
                      : 'border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-gray-700'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5
                      ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500 text-white'
                          : isOther
                          ? 'border-gray-200 text-gray-300'
                          : 'border-pink-200 text-pink-400'
                      }
                    `}
                  >
                    {choice.label}
                  </span>
                  <span>{choice.text}</span>
                </div>
                {isSelected && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500 text-lg">✓</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-300 mt-5">
          キーボードの{' '}
          {(['A', 'B', 'C', 'D'] as const).map((k) => (
            <kbd key={k} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-mono text-xs mx-0.5">{k}</kbd>
          ))}
          {' '}でも選べます
        </p>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex gap-1 flex-wrap justify-center max-w-xs">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i < currentIndex
                ? 'w-2 h-2 bg-pink-400'
                : i === currentIndex
                ? 'w-3 h-2 bg-rose-400'
                : 'w-2 h-2 bg-pink-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
