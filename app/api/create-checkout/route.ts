export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;

    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }

    const stripe = new Stripe(key, {
      apiVersion: '2023-10-16',
    });

    const { question, email, id } = await req.json();

    if (!question || !email || !id) {
      return NextResponse.json(
        { error: 'Missing fields' },
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
    console.error('STRIPE ERROR:', error);
    return NextResponse.json(
      { error: 'Stripe error' },
      { status: 500 }
    );
  }
}
