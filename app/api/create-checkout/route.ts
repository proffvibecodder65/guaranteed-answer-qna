export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    // 🔍 ВРЕМЕННЫЙ ЛОГ ДЛЯ ПРОВЕРКИ КЛЮЧА
    console.log('STRIPE KEY:', process.env.STRIPE_SECRET_KEY);

    const { id, question, buyerEmail } = await request.json();

    if (!id || !question || !buyerEmail) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: buyerEmail,

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Вопрос с гарантированным ответом',
            },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],

      success_url: `http://localhost:3000/success?id=${id}&q=${encodeURIComponent(
        question
      )}&email=${encodeURIComponent(buyerEmail)}`,

      cancel_url: `http://localhost:3000/cancel`,
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
