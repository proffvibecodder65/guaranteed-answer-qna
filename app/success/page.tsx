'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const question = searchParams.get('q');
  const buyerEmail = searchParams.get('email');

  const [status, setStatus] = useState('Отправляем вопрос...');

  useEffect(() => {
    if (!id || !question || !buyerEmail) {
      setStatus('Ошибка данных ❌');
      return;
    }

    const send = async () => {
      try {
        await fetch('/api/send-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            question,
            buyerEmail,
          }),
        });

        setStatus('Вопрос успешно отправлен ✅');
      } catch (error) {
        console.error(error);
        setStatus('Ошибка отправки ❌');
      }
    };

    send();
  }, [id, question, buyerEmail]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="max-w-xl p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Спасибо за оплату</h1>
        <p className="text-zinc-400">{status}</p>
      </div>
    </main>
  );
}
