"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, website: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setConsent(false);
      } else if (res.status === 429) {
        setStatus("error");
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
        Les risques juridiques que vous ne voyez pas, les décisions que vous devez prendre
        — chaque semaine, pour les dirigeantes et dirigeants, DRH, DAF et experts-comptables.
      </p>

      {status === "success" ? (
        <div className="mt-8 bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-5 max-w-sm mx-auto">
          <p className="text-emerald-300 font-medium text-[15px]">
            Bienvenue. Premier brief à venir.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 max-w-sm mx-auto">
          {/* Honeypot — invisible to humans, bots fill it */}
          <input
            type="text"
            name="website"
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row gap-3">
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
              disabled={status === "loading" || !consent}
              className="px-6 py-3 bg-accent text-alinea-950 font-semibold rounded-xl hover:bg-accent-light transition-colors disabled:opacity-50 text-[15px]"
            >
              {status === "loading" ? "..." : "S'abonner"}
            </button>
          </div>

          {/* RGPD consent checkbox */}
          <label className="flex items-start gap-3 text-left mt-4 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 shrink-0 accent-accent"
            />
            <span className="text-[12px] text-alinea-500 leading-relaxed">
              J&apos;accepte de recevoir la newsletter En Clair par email.{" "}
              <Link href="/confidentialite" className="underline text-alinea-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>.
              Désinscription possible à tout moment.
            </span>
          </label>
        </form>
      )}

      {status === "error" && (
        <p className="mt-4 text-red-400 text-[13px]">Erreur. Réessayez dans un instant.</p>
      )}
    </div>
  );
}
