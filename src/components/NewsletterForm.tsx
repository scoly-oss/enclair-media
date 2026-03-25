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
    <div id="newsletter" className="bg-alinea-950 rounded-2xl px-8 py-12 md:px-14 md:py-16 text-center">
      <h2
        className="text-2xl md:text-3xl font-bold text-white tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Recevez En Clair chaque semaine
      </h2>
      <p className="mt-4 text-alinea-400 max-w-md mx-auto leading-relaxed text-[15px]">
        Le brief juridique et économique pour les dirigeants
        qui n&apos;ont pas le temps de lire le Journal Officiel.
      </p>
      <p className="mt-1 text-alinea-500 text-[13px]">
        Gratuit · Sans spam · Désinscription en un clic
      </p>

      {status === "success" ? (
        <div className="mt-8 bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-5 max-w-sm mx-auto">
          <p className="text-emerald-300 font-medium text-[15px]">
            Bienvenue. Premier brief à venir.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            required
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-alinea-800/50 border border-alinea-700/50 text-white placeholder-alinea-500 focus:outline-none focus:border-accent text-[15px]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-accent text-alinea-950 font-semibold rounded-xl hover:bg-accent-light transition-colors disabled:opacity-50 text-[15px]"
          >
            {status === "loading" ? "..." : "S'abonner"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-4 text-red-400 text-[13px]">Erreur. Réessayez.</p>
      )}
    </div>
  );
}
