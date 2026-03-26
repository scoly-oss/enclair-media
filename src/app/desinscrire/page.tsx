"use client";

import { useState } from "react";
import Link from "next/link";

const reasons = [
  { id: "trop", emoji: "📬", label: "Trop d'emails" },
  { id: "pertinent", emoji: "🎯", label: "Pas assez pertinent pour moi" },
  { id: "temps", emoji: "⏰", label: "Je n'ai plus le temps de lire" },
  { id: "autre", emoji: "💭", label: "Autre raison" },
];

export default function DesinscriptionPage() {
  const [email, setEmail] = useState("");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error" | "stay">("idle");

  const handleUnsubscribe = async () => {
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "stay") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1
            className="text-3xl font-bold text-alinea-950 mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Content de vous garder !
          </h1>
          <p className="text-alinea-500 mb-8 leading-relaxed">
            Promis, on continue à faire en sorte que chaque newsletter mérite votre temps.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-alinea-950 text-white rounded-xl font-medium hover:bg-alinea-800 transition-colors"
          >
            Retour à l&apos;accueil →
          </Link>
        </div>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">👋</div>
          <h1
            className="text-3xl font-bold text-alinea-950 mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            C&apos;est fait.
          </h1>
          <p className="text-alinea-500 mb-4 leading-relaxed">
            Vous ne recevrez plus la newsletter En Clair. Vos données ont été supprimées.
          </p>
          <p className="text-alinea-400 text-sm mb-8">
            Si un jour le droit social vous manque (ça arrive plus souvent qu&apos;on ne le pense),
            vous savez où nous trouver.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-alinea-950 text-white rounded-xl font-medium hover:bg-alinea-800 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">😢</div>
          <h1
            className="text-3xl font-bold text-alinea-950 mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Vous nous quittez ?
          </h1>
          <p className="text-alinea-500 leading-relaxed">
            On comprend. Mais avant de partir, dites-nous pourquoi — ça nous aide à nous améliorer.
          </p>
        </div>

        {/* Reasons */}
        <div className="space-y-3 mb-8">
          {reasons.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedReason(r.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2 text-left transition-all ${
                selectedReason === r.id
                  ? "border-alinea-950 bg-alinea-50"
                  : "border-alinea-100 hover:border-alinea-300"
              }`}
            >
              <span className="text-xl">{r.emoji}</span>
              <span className={`font-medium ${selectedReason === r.id ? "text-alinea-950" : "text-alinea-600"}`}>
                {r.label}
              </span>
            </button>
          ))}
        </div>

        {selectedReason === "autre" && (
          <textarea
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="Dites-nous en plus..."
            className="w-full px-4 py-3 rounded-xl border-2 border-alinea-100 focus:border-alinea-950 focus:outline-none text-alinea-700 mb-6 resize-none h-24"
          />
        )}

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-alinea-600 mb-2">
            Votre adresse email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-alinea-100 focus:border-alinea-950 focus:outline-none text-alinea-700"
          />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm mb-4 text-center">Erreur. Réessayez ou contactez-nous.</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleUnsubscribe}
            disabled={!email || status === "loading"}
            className="w-full px-6 py-3.5 bg-alinea-100 text-alinea-600 rounded-xl font-medium hover:bg-alinea-200 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Désinscription..." : "Confirmer la désinscription"}
          </button>
          <button
            onClick={() => setStatus("stay")}
            className="w-full px-6 py-3.5 bg-alinea-950 text-white rounded-xl font-medium hover:bg-alinea-800 transition-colors"
          >
            Finalement, je reste ! 🙂
          </button>
        </div>

        <p className="text-center text-alinea-400 text-xs mt-6">
          Vos données seront supprimées conformément à notre{" "}
          <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.
        </p>
      </div>
    </div>
  );
}
