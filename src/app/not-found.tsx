import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-[13px] font-medium text-accent-dark uppercase tracking-[0.15em] mb-4">
        Erreur 404
      </p>
      <h1
        className="text-3xl md:text-[2.75rem] font-bold text-alinea-950 leading-[1.15] tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Page introuvable
      </h1>
      <p className="mt-5 text-lg text-alinea-500 max-w-lg mx-auto leading-relaxed">
        La page que vous recherchez n&apos;existe pas, a ete deplacee ou n&apos;est plus disponible.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-block bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/articles"
          className="inline-block border border-alinea-200 text-alinea-700 px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
        >
          Tous les articles
        </Link>
      </div>

      <div className="mt-16 pt-10 border-t border-alinea-100">
        <h2
          className="text-xl font-bold text-alinea-950 mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Explorez nos contenus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <Link
            href="/articles"
            className="group block p-5 rounded-xl border border-alinea-100 hover:border-alinea-200 transition-colors"
          >
            <h3 className="font-semibold text-alinea-950 group-hover:text-accent-dark transition-colors text-[15px]">
              Articles
            </h3>
            <p className="mt-2 text-[13px] text-alinea-400 leading-relaxed">
              Analyses et decryptages du droit social et de l&apos;economie.
            </p>
          </Link>
          <Link
            href="/guides"
            className="group block p-5 rounded-xl border border-alinea-100 hover:border-alinea-200 transition-colors"
          >
            <h3 className="font-semibold text-alinea-950 group-hover:text-accent-dark transition-colors text-[15px]">
              Guides pratiques
            </h3>
            <p className="mt-2 text-[13px] text-alinea-400 leading-relaxed">
              Pas a pas pour employeurs, DRH et experts-comptables.
            </p>
          </Link>
          <Link
            href="/modeles"
            className="group block p-5 rounded-xl border border-alinea-100 hover:border-alinea-200 transition-colors"
          >
            <h3 className="font-semibold text-alinea-950 group-hover:text-accent-dark transition-colors text-[15px]">
              Modeles gratuits
            </h3>
            <p className="mt-2 text-[13px] text-alinea-400 leading-relaxed">
              Documents types conformes et prets a l&apos;emploi.
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-14 bg-alinea-950 rounded-2xl p-8 text-center">
        <h3
          className="text-lg font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ne manquez rien
        </h3>
        <p className="text-alinea-300 text-[14px] mb-5 leading-relaxed">
          Recevez chaque semaine le brief juridique qui compte, directement dans votre boite mail.
        </p>
        <Link
          href="/#newsletter"
          className="inline-block bg-accent text-alinea-950 px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-accent-light transition-colors"
        >
          S&apos;abonner gratuitement
        </Link>
      </div>
    </div>
  );
}
