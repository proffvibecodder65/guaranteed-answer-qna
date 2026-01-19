import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    const id = crypto.randomBytes(4).toString('hex');

    // ❗️НИКАКИХ fs / файлов
    return NextResponse.json({
      link: `/ask/${id}`,
    });
  } catch (e) {
    console.error('CREATE LINK ERROR:', e);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
