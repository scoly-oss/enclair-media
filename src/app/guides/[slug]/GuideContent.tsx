"use client";

import { useState } from "react";

interface GuideContentProps {
  contentHtml: string;
  slug: string;
  title: string;
}

/**
 * Split HTML content: show first ~30 lines as preview, blur the rest behind an email paywall.
 */
function splitContent(html: string, lineCount = 30): { preview: string; rest: string } {
  // Split on block-level tags to approximate "lines"
  const parts = html.split(/(?=<(?:p|h[1-6]|div|ul|ol|li|table|blockquote|hr)[\s>])/i);
  if (parts.length <= lineCount) {
    return { preview: html, rest: "" };
  }
  const preview = parts.slice(0, lineCount).join("");
  const rest = parts.slice(lineCount).join("");
  return { preview, rest };
}

export default function GuideContent({ contentHtml, slug, title }: GuideContentProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { preview, rest } = splitContent(contentHtml, 30);
  const hasPaywall = rest.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setUnlocked(true);
      } else if (res.status === 429) {
        setErrorMsg("Trop de requêtes. Réessayez dans une minute.");
        setStatus("error");
      } else {
        setErrorMsg("Une erreur est survenue. Réessayez.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur de connexion. Réessayez.");
      setStatus("error");
    }
  };

  // If no paywall needed or already unlocked, show full content
  if (!hasPaywall || unlocked) {
    return (
      <>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {unlocked && (
          <div className="mt-10 p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center">
            <p className="text-[15px] text-teal-800 font-medium mb-3">
              Guide complet déverrouillé
            </p>
            <button
              onClick={() => window.print()}
              className="inline-block px-6 py-3 text-white font-medium rounded-xl text-[14px] transition-colors hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#1D627A" }}
            >
              Télécharger le PDF
            </button>
          </div>
        )}
      </>
    );
  }

  // Paywall view
  return (
    <>
      {/* Visible preview */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: preview }}
      />

      {/* Blurred content + overlay */}
      <div className="relative mt-0">
        {/* Blurred rest of content */}
        <div className="guide-blurred">
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: rest }}
          />
        </div>

        {/* Overlay with form */}
        <div className="absolute inset-0 flex items-start justify-center pt-8 z-10">
          <div className="bg-white border border-alinea-200 rounded-2xl shadow-xl p-8 md:p-10 max-w-md w-full mx-4 text-center">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ backgroundColor: "#1D627A15" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D627A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h3
              className="text-xl md:text-2xl font-bold text-alinea-950 tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Accédez au guide complet gratuitement
            </h3>
            <p className="mt-2 text-[15px] text-alinea-500 leading-relaxed">
              Entrez votre email pour lire la suite et recevoir le PDF
            </p>

            <form onSubmit={handleSubmit} className="mt-6 text-left">
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-alinea-200 text-alinea-950 placeholder-alinea-400 focus:outline-none focus:border-[#1D627A] focus:ring-1 focus:ring-[#1D627A] text-[15px]"
              />

              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 shrink-0"
                  style={{ accentColor: "#1D627A" }}
                />
                <span className="text-[12px] text-alinea-500 leading-relaxed">
                  J&apos;accepte de recevoir la newsletter En Clair
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "loading" || !consent}
                className="w-full mt-5 px-6 py-3 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-[15px]"
                style={{ backgroundColor: "#1D627A" }}
              >
                {status === "loading"
                  ? "Chargement..."
                  : "Lire le guide complet \u2192"}
              </button>
            </form>

            {status === "error" && errorMsg && (
              <p className="mt-3 text-red-500 text-[13px]">{errorMsg}</p>
            )}
          </div>
        </div>
      </div>

      {/* CSS for blur effect */}
      <style jsx global>{`
        .guide-blurred {
          filter: blur(5px);
          pointer-events: none;
          user-select: none;
          max-height: 400px;
          overflow: hidden;
          position: relative;
        }
        .guide-blurred::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(transparent, white);
        }
      `}</style>
    </>
  );
}
