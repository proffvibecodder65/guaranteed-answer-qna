export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1️⃣ Проверяем наличие Stripe key
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }

    // 2️⃣ Загружаем Stripe ТОЛЬКО при реальном запросе
    const Stripe = require('stripe');
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    // 3️⃣ Получаем данные от клиента
    const body = await req.json();
    const { question, email, id } = body;

    if (!question || !email || !id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4️⃣ Создаём Stripe Checkout Session
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
      )}&email=${encodeUR
