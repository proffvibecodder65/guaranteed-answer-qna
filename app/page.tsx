'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-xl space-y-6 p-6 text-center">
        <h1 className="text-4xl font-bold">
          Guaranteed Answer Q&A
        </h1>

        <p className="text-zinc-400 text-lg">
          Сервис для платных вопросов людям, которые гарантированно отвечают.
        </p>

        <div className="space-y-3">
          <Link
            href="/get-link"
            className="block w-full py-3 rounded-xl bg-white text-black font-semibold"
          >
            Получить ссылку для вопросов
          </Link>

          <p className="text-sm text-zinc-500">
            Если вы хотите задать вопрос — перейдите по персональной ссылке человека
          </p>
        </div>
      </div>
    </main>
  );
}
