export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;

  if (!email) {
    return NextResponse.json(
      { error: 'Email required' },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), 'data', 'recipients.json');

  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  const id = crypto.randomBytes(4).toString('hex');
  data[id] = { email };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({
    link: `http://localhost:3000/ask/${id}`,
  });
}

