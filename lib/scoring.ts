import type { Answer, AxisScore, BloomTypeId, DiagnosisResult, DiagnosisStats } from './types';
import { BLOOM_TYPES } from './types';
import { questions } from './questions';

const TYPE_MAP: Record<string, BloomTypeId> = {
  LLLLL: '04', LLLHL: '04',
  LLLHH: '03', LLLLH: '03',
  LLHLL: '08', LLHLH: '08',
  LLHHH: '07', LLHHL: '07',
  LHLLL: '01', LHLLH: '01',
  LHLHL: '02', LHLHH: '02',
  LHHLL: '16', LHHLH: '16',
  LHHHH: '15', LHHHL: '15',
  HLLLL: '11', HLLLH: '11',
  HLLHL: '12', HLLHH: '12',
  HLHLL: '06', HLHLH: '06',
  HLHHH: '05', HLHHL: '05',
  HHLLL: '14', HHLLH: '14',
  HHLHL: '13', HHLHH: '13',
  HHHLL: '10', HHHLH: '10',
  HHHHH: '09', HHHHL: '09',
};

export function calculateAxisScores(answers: Answer[]): AxisScore {
  const scores: AxisScore = { axis1: 0, axis2: 0, axis3: 0, axis4: 0, axis5: 0 };
  for (const answer of answers) {
    scores.axis1 += answer.scores[0];
    scores.axis2 += answer.scores[1];
    scores.axis3 += answer.scores[2];
    scores.axis4 += answer.scores[3];
    scores.axis5 += answer.scores[4];
  }
  scores.axis1 = Math.max(-20, Math.min(20, scores.axis1));
  scores.axis2 = Math.max(-20, Math.min(20, scores.axis2));
  scores.axis3 = Math.max(-20, Math.min(20, scores.axis3));
  scores.axis4 = Math.max(-20, Math.min(20, scores.axis4));
  scores.axis5 = Math.max(-20, Math.min(20, scores.axis5));
  return scores;
}

export function determineType(scores: AxisScore): BloomTypeId {
  const a1 = scores.axis1 >= 0 ? 'H' : 'L';
  const a2 = scores.axis2 >= 0 ? 'H' : 'L';
  const a3 = scores.axis3 >= 0 ? 'H' : 'L';
  const a4 = scores.axis4 >= 0 ? 'H' : 'L';
  const a5 = scores.axis5 >= 0 ? 'H' : 'L';
  const key = `${a1}${a2}${a3}${a4}${a5}`;
  return TYPE_MAP[key] ?? '01';
}

export function calcBattlePower(scores: AxisScore): number {
  const analysis = Math.abs(scores.axis2) / 20 * 100;
  const action   = Math.abs(scores.axis1) / 20 * 100;
  const empathy  = (20 - scores.axis2) / 40 * 100;
  const express  = Math.abs(scores.axis5) / 20 * 100;
  const change   = Math.abs(scores.axis4) / 20 * 100;
  const total = (analysis + action + empathy + express + change) / 5;
  return Math.round(5000 + total * 50);
}

export function calcStats(scores: AxisScore): DiagnosisStats {
  return {
    analysis:   Math.round((scores.axis2 + 20) / 40 * 100),
    action:     Math.round((scores.axis1 + 20) / 40 * 100),
    empathy:    Math.round((-scores.axis2 + 20) / 40 * 100),
    expression: Math.round((scores.axis5 + 20) / 40 * 100),
    change:     Math.round((scores.axis4 + 20) / 40 * 100),
  };
}

export function buildResult(answers: Answer[]): DiagnosisResult {
  const axisScores = calculateAxisScores(answers);
  const typeId = determineType(axisScores);
  const battlePower = calcBattlePower(axisScores);
  const stats = calcStats(axisScores);
  return {
    answers,
    axisScores,
    typeId,
    battlePower,
    stats,
    completedAt: new Date().toISOString(),
  };
}

export function saveResult(result: DiagnosisResult): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bloomDiagnosis', JSON.stringify(result));
}

export function loadResult(): DiagnosisResult | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('bloomDiagnosis');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DiagnosisResult;
  } catch {
    return null;
  }
}

export const TOTAL_QUESTIONS = questions.length;

// Re-export for convenience
export { BLOOM_TYPES };
