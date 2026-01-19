export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }

    // ⬇️ КРИТИЧНО: динамический import, а не require
    const StripeModule = await import('stripe');
    const Stripe = StripeModule.default;

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    const { question, email, id } = await req.json();

    if (!question || !email || !id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Guaranteed Answer',
              description: question,
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/success?id=${id}&q=${encodeURIComponent(
        question
      )}&email=${encodeURIComponent(email)}`,
      cancel_url: `${process.env.BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('STRIPE CHECKOUT ERROR:', error);
    return NextResponse.json(
      { error: 'Stripe checkout failed' },
      { status: 500 }
    );
  }
}
