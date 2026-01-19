import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { question, email, id } = await req.json();

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
            unit_amount: 500, // $5.00
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

