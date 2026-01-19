'use client';

import { useEffect, useState } from 'react';

type Question = {
  text: string;
  date: string;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('questions') || '[]');
    setQuestions(stored);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center">Вопросы</h1>

        {questions.length === 0 && (
          <p className="text-center text-zinc-400">
            Вопросов пока нет
          </p>
        )}

        {questions.map((q, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-zinc-900 border border-zinc-700"
          >
            <p>{q.text}</p>
            <p className="text-xs text-zinc-400 mt-2">
              {new Date(q.date).toLocaleString()}
            </p>
          </div>
        ))}

        <a
          href="/"
          className="block text-center text-sm text-zinc-400 underline"
        >
          ← Назад
        </a>
      </div>
    </main>
  );
}

