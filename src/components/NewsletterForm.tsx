"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="newsletter" className="bg-alinea-950 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
        Recevez En Clair chaque semaine
      </h2>
      <p className="mt-3 text-alinea-400 max-w-lg mx-auto">
        Le brief juridique et économique pour les dirigeants qui n&apos;ont pas le temps de lire le Journal Officiel.
        Gratuit. Sans spam. Désinscription en un clic.
      </p>

      {status === "success" ? (
        <div className="mt-6 bg-emerald-900/30 border border-emerald-700 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-emerald-300 font-medium">Bienvenue dans En Clair. Premier brief à venir.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-alinea-800 border border-alinea-700 text-white placeholder-alinea-500 focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-accent text-alinea-950 font-semibold rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "S'abonner"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 text-red-400 text-sm">Erreur. Réessayez ou contactez-nous.</p>
      )}
    </div>
  );
}
