"use client"

import { useState } from "react"

export default function AskPage() {
  const [question, setQuestion] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!question.trim()) return

    // имитация отправки
    setSubmitted(true)
    setQuestion("")

    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-xl space-y-6 p-6 text-center">
        <h1 className="text-3xl font-bold">
          Задать вопрос
        </h1>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Напиши свой вопрос здесь..."
          className="w-full h-40 p-4 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
        >
          Отправить вопрос
        </button>

        {submitted && (
          <p className="text-green-400 font-medium">
            ✅ Вопрос отправлен. Ответ придёт скоро.
          </p>
        )}
      </div>
    </main>
  )
}
