import Anthropic from '@anthropic-ai/sdk';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId, DiagnosisStats } from '@/lib/types';

interface ReportRequest {
  typeId: BloomTypeId;
  stats: DiagnosisStats;
  axisScores: {
    axis1: number; // エネルギー: L=内省, H=行動
    axis2: number; // 思考: L=共感, H=分析
    axis3: number; // 環境: L=個人, H=チーム
    axis4: number; // 変化: L=安定, H=変化
    axis5: number; // 表現: L=静か, H=発信
  };
}

function buildPrompt(req: ReportRequest): string {
  const t = BLOOM_TYPES[req.typeId];
  const { stats, axisScores } = req;

  const axis1Label = axisScores.axis1 >= 0
    ? `行動派（+${axisScores.axis1}）`
    : `内省派（${axisScores.axis1}）`;
  const axis2Label = axisScores.axis2 >= 0
    ? `分析派（+${axisScores.axis2}）`
    : `共感派（${axisScores.axis2}）`;
  const axis3Label = axisScores.axis3 >= 0
    ? `チーム派（+${axisScores.axis3}）`
    : `個人派（${axisScores.axis3}）`;
  const axis4Label = axisScores.axis4 >= 0
    ? `変化派（+${axisScores.axis4}）`
    : `安定派（${axisScores.axis4}）`;
  const axis5Label = axisScores.axis5 >= 0
    ? `発信派（+${axisScores.axis5}）`
    : `静か派（${axisScores.axis5}）`;

  return `あなたは「ブルーム診断」の深層分析AIです。
ユーザーの診断データを元に、読んだ人が「これは自分のことだ」と感じる、非常に具体的で深い分析レポートを日本語で作成してください。

このブルーム診断は、障害を持っている人でも自信を持って挑戦してほしいというコンセプトで作られています。
"挑戦できない"ではなく、"挑戦できることを探す"という視点を大切にしてください。

## ユーザーの診断データ

タイプ：${t.catchTitle}（${t.characterTitle} / ${t.jobClass}）
陣営：${t.faction}
レア度：${t.rarity}
戦闘力：${t.battlePower}

## 5軸スコア（-20〜+20）
- エネルギー軸：${axis1Label}
- 思考軸：${axis2Label}
- 環境軸：${axis3Label}
- 変化軸：${axis4Label}
- 表現軸：${axis5Label}

## 能力値（0〜100）
- 分析力：${stats.analysis}
- 行動力：${stats.action}
- 共感力：${stats.empathy}
- 表現力：${stats.expression}
- 変化対応：${stats.change}

## 出力形式（マークダウン禁止。各セクション「◆ タイトル」形式）

以下の5セクションで合計1800〜2200文字の分析レポートを作成してください。
数値を具体的に引用しながら、その人だけの分析を書いてください。

◆ あなたの本質
（内面の動き・行動パターン・思考の癖を軸スコアの数値を踏まえて深く分析。曖昧な表現を避け、「そうそう」と思わせる具体性で）

◆ 隠れた強み
（本人も気づいていないかもしれない深層の才能を3つ。それぞれ2〜3文で、なぜそう言えるかの根拠を添えて）

◆ あなたへの挑戦状
（このタイプが最も輝ける挑戦・チャレンジを5つ。身体的な制約があっても取り組めるものを意識し、小さな一歩から大きな挑戦まで幅広く。「できない理由を探すのをやめて、できる方法を探す」という視点で）

◆ 人間関係の地図
（相性の良い人の特徴、人間関係で自然とやってしまうパターン、関係を深めるためのヒント。具体的なシーンを交えて）

◆ 明日からの一歩
（明日すぐ実践できる具体的なアクションを3つ。小さくても確実な変化を起こすものを。最後に短い励ましの言葉で締める）`;
}

export async function POST(request: Request) {
  try {
    const body: ReportRequest = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response('ANTHROPIC_API_KEY not configured', { status: 500 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageStream = client.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 2500,
            messages: [{ role: 'user', content: buildPrompt(body) }],
          });

          for await (const chunk of messageStream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new Response('Failed to generate report', { status: 500 });
  }
}
