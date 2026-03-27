"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function DesabonnementContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1
            className="text-3xl font-bold text-alinea-950 mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Quelque chose n&apos;a pas marche
          </h1>
          <p className="text-alinea-500 mb-4 leading-relaxed">
            Le lien de desinscription est invalide ou a expire.
          </p>
          <p className="text-alinea-400 text-sm mb-8">
            Vous pouvez vous desinscrire manuellement depuis{" "}
            <Link href="/desinscrire" className="underline text-alinea-600">
              cette page
            </Link>
            , ou nous contacter a{" "}
            <a
              href="mailto:contact@enclair.media"
              className="underline text-alinea-600"
            >
              contact@enclair.media
            </a>
            .
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-alinea-950 text-white rounded-xl font-medium hover:bg-alinea-800 transition-colors"
          >
            Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  // Default: success
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">👋</div>
        <h1
          className="text-3xl font-bold text-alinea-950 mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          C&apos;est note !
        </h1>
        <p className="text-alinea-500 mb-4 leading-relaxed">
          On vous enleve de la liste. Vous nous manquerez !
        </p>
        <p className="text-alinea-400 text-sm mb-8">
          Vos donnees ont ete supprimees. Si un jour le droit social vous manque
          (ca arrive plus souvent qu&apos;on ne le pense), vous savez ou nous
          trouver.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-alinea-950 text-white rounded-xl font-medium hover:bg-alinea-800 transition-colors"
          >
            Retour a l&apos;accueil
          </Link>
          <Link
            href="/articles"
            className="inline-block px-6 py-3 bg-alinea-100 text-alinea-700 rounded-xl font-medium hover:bg-alinea-200 transition-colors"
          >
            Lire les articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DesabonnementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-alinea-500">Chargement...</p>
        </div>
      }
    >
      <DesabonnementContent />
    </Suspense>
  );
}
