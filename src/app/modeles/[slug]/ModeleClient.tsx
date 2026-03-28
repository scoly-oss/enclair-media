"use client";

import { useState } from "react";
import Link from "next/link";
import type { Modele } from "@/data/modeles";

interface Props {
  modele: Modele;
}

export default function ModeleClient({ modele }: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(() => {
    if (typeof window !== "undefined" && localStorage.getItem("enclair_subscribed") === "true") {
      return "success";
    }
    return "idle";
  });
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setErrorMsg("Veuillez accepter les conditions.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/modeles/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug: modele.slug, consent }),
      });
      const data = await res.json();
      if (data.success && data.downloadUrl) {
        setStatus("success");
        localStorage.setItem("enclair_subscribed", "true");
        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.download = `${modele.slug}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erreur de connexion. Réessayez.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-3xl mx-auto py-12 px-4">
        <Link
          href="/modeles"
          className="text-sm text-gray-500 hover:text-[#e8842c] mb-6 inline-block"
        >
          ← Retour aux modèles
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Badge catégorie */}
          <span className="inline-block bg-[#e8842c]/10 text-[#e8842c] text-xs font-medium px-3 py-1 rounded-full mb-4">
            {modele.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {modele.title}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            {modele.longDescription}
          </p>

          {/* Keywords SEO */}
          <div className="flex flex-wrap gap-2 mb-8">
            {modele.keywords.map((kw) => (
              <span
                key={kw}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Formulaire */}
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-green-800 font-medium text-lg mb-2">
                Modèle disponible
              </p>
              <p className="text-green-700 text-sm mb-4">
                Cliquez ci-dessous pour télécharger le PDF.
              </p>
              <a
                href={`/modeles/${modele.slug}.pdf`}
                download={`${modele.slug}.pdf`}
                className="inline-block bg-[#e8842c] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#d4741f] transition-colors"
              >
                Télécharger le PDF
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Télécharger ce modèle gratuitement
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Votre adresse email professionnelle
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@entreprise.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8842c] focus:border-transparent outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-[#e8842c]"
                  />
                  <span>
                    J&apos;accepte de recevoir la newsletter En Clair et
                    j&apos;ai lu la{" "}
                    <Link
                      href="/confidentialite"
                      className="text-[#e8842c] underline"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {errorMsg && (
                <p className="text-red-600 text-sm mb-3">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#e8842c] text-white font-medium py-3 rounded-lg hover:bg-[#d4741f] transition-colors disabled:opacity-50"
              >
                {status === "loading"
                  ? "Téléchargement..."
                  : "Télécharger gratuitement"}
              </button>
            </form>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          Ce modèle est fourni à titre informatif. Consultez un avocat pour
          l&apos;adapter à votre situation. © En Clair — enclair.media
        </p>
      </section>
    </main>
  );
}
