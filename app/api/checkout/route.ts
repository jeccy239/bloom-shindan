import Stripe from 'stripe';
import { BLOOM_TYPES } from '@/lib/types';
import type { BloomTypeId } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { typeId } = await request.json();

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response('STRIPE_SECRET_KEY not configured', { status: 500 });
  }

  const typeData = BLOOM_TYPES[typeId as BloomTypeId];
  if (!typeData) {
    return new Response('Invalid typeId', { status: 400 });
  }

  const origin = request.headers.get('origin') ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: `ブルーム診断 AI深層分析レポート`,
            description: `【${typeData.catchTitle}】${typeData.jobClass} — あなただけの詳細分析レポート`,
          },
          unit_amount: 480,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/report/${typeId}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/result/${typeId}`,
    metadata: { typeId },
  });

  return Response.json({ url: session.url });
}
