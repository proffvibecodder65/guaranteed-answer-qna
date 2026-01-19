'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getLink = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'placeholder@example.com' }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Ошибка создания ссылки');
        return;
      }

      router.push(data.link);
    } catch (e) {
      console.error(e);
      alert('Ошибка запроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-xl space-y-6 p-6 text-center">
        <h1 className="text-4xl font-bold">Guaranteed Answer Q&A</h1>

        <p className="text-zinc-400 text-lg">
          Сервис для платных вопросов людям, которые гарантированно отвечают.
        </p>

        <div className="space-y-3">
          <button
            onClick={getLink}
            disabled={loading}
            className="block w-full py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-60"
          >
            {loading ? 'Создаём ссылку...' : 'Получить ссылку для вопросов'}
          </button>

          <p className="text-sm text-zinc-500">
            Если вы хотите задать вопрос — перейдите по персональной ссылке человека
          </p>
        </div>
      </div>
    </main>
  );
}
