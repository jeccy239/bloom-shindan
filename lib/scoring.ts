import type { Answer, AxisScores, AxisPercentages, BloomTypeCode, DiagnosisResult } from './types';
import { BLOOM_TYPES } from './types';
import { questions } from './questions';

export function calculateScores(answers: Answer[]): AxisScores {
  const scores: AxisScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const answer of answers) {
    scores[answer.direction]++;
  }
  return scores;
}

export function calculatePercentages(scores: AxisScores): AxisPercentages {
  const ei = scores.E + scores.I;
  const sn = scores.S + scores.N;
  const tf = scores.T + scores.F;
  const jp = scores.J + scores.P;

  return {
    EI: ei > 0 ? Math.round((scores.E / ei) * 100) : 50,
    SN: sn > 0 ? Math.round((scores.S / sn) * 100) : 50,
    TF: tf > 0 ? Math.round((scores.T / tf) * 100) : 50,
    JP: jp > 0 ? Math.round((scores.J / jp) * 100) : 50,
  };
}

export function determineType(scores: AxisScores): BloomTypeCode {
  const e = scores.E >= scores.I ? 'E' : 'I';
  const s = scores.S >= scores.N ? 'S' : 'N';
  const t = scores.T >= scores.F ? 'T' : 'F';
  const j = scores.J >= scores.P ? 'J' : 'P';
  return `${e}${s}${t}${j}` as BloomTypeCode;
}

export function buildResult(answers: Answer[]): DiagnosisResult {
  const scores = calculateScores(answers);
  const percentages = calculatePercentages(scores);
  const typeCode = determineType(scores);
  const typeId = BLOOM_TYPES[typeCode].id;

  return {
    answers,
    scores,
    percentages,
    typeCode,
    typeId,
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
