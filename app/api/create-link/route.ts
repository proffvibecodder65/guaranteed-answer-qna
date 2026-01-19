export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

type RecipientMap = Record<string, { email: string }>;

export async function POST(request: Request) {
  const body = await request.json();
  const email: string | undefined = body?.email;

  if (!email) {
    return NextResponse.json(
      { error: 'Email required' },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), 'data', 'recipients.json');

  let data: RecipientMap = {};

  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as RecipientMap;
    } catch {
      data = {};
    }
  }

  const id = crypto.randomBytes(4).toString('hex');

  data[id] = { email };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({
    link: `${process.env.BASE_URL}/ask/${id}`,
  });
}

