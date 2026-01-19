"use client";

import { useState } from "react";

export default function GetLinkPage() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/create-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLink(data.link);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Получить ссылку для вопросов</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Получить ссылку</button>
      </form>

      {link && (
        <>
          <p>Ваша ссылка:</p>
          <a href={link}>{link}</a>
        </>
      )}
    </div>
  );
}
