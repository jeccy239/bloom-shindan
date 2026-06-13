import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return Response.json({ paid: false }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ paid: false }, { status: 500 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === 'paid';
    return Response.json({ paid, typeId: session.metadata?.typeId });
  } catch {
    return Response.json({ paid: false }, { status: 400 });
  }
}
