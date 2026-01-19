'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function AskPage() {
  const params = useParams();
  const id = params.id as string;

  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const submit = async () => {
    if (!question.trim() || !email.trim()) return;

    setStatus('Переход к оплате...');

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          question,
          buyerEmail: email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatus('Ошибка оплаты ❌');
      }
    } catch (error) {
      console.error(error);
      setStatus('Ошибка оплаты ❌');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-xl space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">
          Задать платный вопрос
        </h1>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ваш вопрос..."
          className="w-full h-36 p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email (для ответа)"
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <button
          onClick={submit}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold"
        >
          Оплатить и отправить
        </button>

        {status && (
          <p className="text-center text-sm text-zinc-400">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}
