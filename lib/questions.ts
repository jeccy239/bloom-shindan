import type { Question } from './types';

// scores: [axis1, axis2, axis3, axis4, axis5]
// axis1: L=内省派(<0), H=行動派(≥0)
// axis2: L=共感(<0),   H=分析(≥0)
// axis3: L=個人(<0),   H=チーム(≥0)
// axis4: L=安定(<0),   H=変化(≥0)
// axis5: L=静か(<0),   H=発信(≥0)
//
// 4択リッカート尺度（中間なし）
// A=とてもそう思う(+5) / B=そう思う(+2) / C=そう思わない(-2) / D=全くそう思わない(-5)
// 各軸4問 × ±5 = max ±20 → 既存スコアリングと互換

export const questions: Question[] = [

  // ── Axis 1: エネルギー源（行動派 H / 内省派 L） ──
  {
    id: 1, axis: 1,
    text: '人と過ごすと、一人でいる時より元気になる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [5,  0, 0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [2,  0, 0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [-2, 0, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [-5, 0, 0, 0, 0] },
    ],
  },
  {
    id: 2, axis: 1,
    text: '知らない人が多い場でも、自然と話しかけてしまう方だ',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [5,  0, 0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [2,  0, 0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [-2, 0, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [-5, 0, 0, 0, 0] },
    ],
  },
  {
    id: 3, axis: 1,
    text: '人前で話すことへの苦手意識は、ほとんどない',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [5,  0, 0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [2,  0, 0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [-2, 0, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [-5, 0, 0, 0, 0] },
    ],
  },
  {
    id: 4, axis: 1,
    text: '一人の時間が長くなると、だんだん気力が落ちてくる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [5,  0, 0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [2,  0, 0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [-2, 0, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [-5, 0, 0, 0, 0] },
    ],
  },

  // ── Axis 2: 思考スタイル（分析 H / 共感 L） ──
  {
    id: 5, axis: 2,
    text: '感情より事実やデータを優先して物事を判断することが多い',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 5,  0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 2,  0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, -2, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, -5, 0, 0, 0] },
    ],
  },
  {
    id: 6, axis: 2,
    text: '誰かの悩みを聞いた時、まず解決策を考えてしまう',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 5,  0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 2,  0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, -2, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, -5, 0, 0, 0] },
    ],
  },
  {
    id: 7, axis: 2,
    text: '「なぜ？」「根拠は？」と問いかけるのが、自分の習慣だ',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 5,  0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 2,  0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, -2, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, -5, 0, 0, 0] },
    ],
  },
  {
    id: 8, axis: 2,
    text: '論理的な矛盾は、感情的なズレより強く引っかかる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 5,  0, 0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 2,  0, 0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, -2, 0, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, -5, 0, 0, 0] },
    ],
  },

  // ── Axis 3: 環境適性（チーム H / 個人 L） ──
  {
    id: 9, axis: 3,
    text: '一人より誰かと一緒に取り組む方が、力を発揮できる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 5,  0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 2,  0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, -2, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, -5, 0, 0] },
    ],
  },
  {
    id: 10, axis: 3,
    text: '悩んでいる時は、誰かに話すと気持ちが楽になる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 5,  0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 2,  0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, -2, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, -5, 0, 0] },
    ],
  },
  {
    id: 11, axis: 3,
    text: '仕事では、チームで連携できる環境の方が向いていると思う',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 5,  0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 2,  0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, -2, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, -5, 0, 0] },
    ],
  },
  {
    id: 12, axis: 3,
    text: '大切な決断の前に、誰かに相談することが多い',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 5,  0, 0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 2,  0, 0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, -2, 0, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, -5, 0, 0] },
    ],
  },

  // ── Axis 4: 変化への態度（変化 H / 安定 L） ──
  {
    id: 13, axis: 4,
    text: 'リスクのある挑戦は、不安より楽しさを感じる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 5,  0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 2,  0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, -2, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, -5, 0] },
    ],
  },
  {
    id: 14, axis: 4,
    text: '同じルーティンが続くと、別のやり方を試したくなる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 5,  0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 2,  0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, -2, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, -5, 0] },
    ],
  },
  {
    id: 15, axis: 4,
    text: '新しい環境への適応は、比較的早い方だと思う',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 5,  0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 2,  0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, -2, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, -5, 0] },
    ],
  },
  {
    id: 16, axis: 4,
    text: '5年後は今と全く違う自分になっていたいと思う',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 5,  0] },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 2,  0] },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, -2, 0] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, -5, 0] },
    ],
  },

  // ── Axis 5: 表現スタイル（発信 H / 静か L） ──
  {
    id: 17, axis: 5,
    text: '自分の考えやアイデアを、積極的に外へ発信したい',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 0, 5]  },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 0, 2]  },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, 0, -2] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, 0, -5] },
    ],
  },
  {
    id: 18, axis: 5,
    text: 'グループの中で、自然と存在感が出ることが多い',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 0, 5]  },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 0, 2]  },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, 0, -2] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, 0, -5] },
    ],
  },
  {
    id: 19, axis: 5,
    text: 'SNSやコンテンツ発信に、抵抗感があまりない',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 0, 5]  },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 0, 2]  },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, 0, -2] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, 0, -5] },
    ],
  },
  {
    id: 20, axis: 5,
    text: '誰かに認められると、もっと発信したくなる',
    choices: [
      { label: 'A', text: 'とてもそう思う',    scores: [0, 0, 0, 0, 5]  },
      { label: 'B', text: 'そう思う',          scores: [0, 0, 0, 0, 2]  },
      { label: 'C', text: 'そう思わない',      scores: [0, 0, 0, 0, -2] },
      { label: 'D', text: '全くそう思わない',  scores: [0, 0, 0, 0, -5] },
    ],
  },
];
