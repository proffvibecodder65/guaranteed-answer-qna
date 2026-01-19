export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { id, question, buyerEmail } = await request.json();

    if (!id || !question || !buyerEmail) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'data', 'recipients.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Recipients file not found' },
        { status: 500 }
      );
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const recipient = data[id];

    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      );
    }

    await resend.emails.send({
      from: 'Guaranteed QnA <onboarding@resend.dev>',
      to: recipient.email,
      replyTo: buyerEmail,
      subject: '❓ Новый вопрос',
      text: `
Вам задали новый вопрос:

${question}

Email для ответа:
${buyerEmail}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
