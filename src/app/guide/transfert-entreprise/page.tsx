import { Metadata } from "next";
import { getAllModules } from "@/lib/guide";
import GuideEmailGate from "@/components/guide/GuideEmailGate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le Transfert d'Entreprise — Le guide interactif",
  description:
    "14 modules gratuits. Tout ce que vous devez savoir avant, pendant et après un transfert d'entreprise. Contrats, CSE, prévoyance, conventions collectives.",
  openGraph: {
    title: "Le Transfert d'Entreprise — Le guide interactif",
    description:
      "14 modules. 0 EUR. Tout ce que vous devez savoir avant, pendant et après un transfert d'entreprise.",
    type: "website",
  },
  alternates: {
    canonical: "/guide/transfert-entreprise",
  },
};

const partLabels: Record<string, string> = {
  fondamentaux: "Les fondamentaux",
  "mise-en-oeuvre": "La mise en oeuvre",
  "situations-particulieres": "Les situations particulières",
};

const partDescriptions: Record<string, string> = {
  fondamentaux:
    "Comprendre les mécanismes juridiques, les obligations d'information et de consultation.",
  "mise-en-oeuvre":
    "Contrats de travail, accords collectifs, usages et prévoyance : les impacts concrets.",
  "situations-particulieres":
    "Assurance, retraite complémentaire, participation, épargne salariale et plus encore.",
};

const partRanges: Record<string, string> = {
  fondamentaux: "Modules 1 à 4",
  "mise-en-oeuvre": "Modules 5 à 8",
  "situations-particulieres": "Modules 9 à 14",
};

export default function GuideTransfertEntreprise() {
  const modules = getAllModules();

  const parts = ["fondamentaux", "mise-en-oeuvre", "situations-particulieres"] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Le Transfert d'Entreprise — Le guide interactif",
    description:
      "14 modules gratuits couvrant tous les aspects juridiques du transfert d'entreprise : contrats, CSE, prévoyance, conventions collectives.",
    provider: {
      "@type": "Organization",
      name: "En Clair",
      url: "https://enclair.media",
    },
    numberOfCredits: 14,
    isAccessibleForFree: true,
    inLanguage: "fr",
  };

  return (
    <div className="mx-auto max-w-4xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="text-center py-20 md:py-28">
        <p className="text-[13px] font-medium text-accent-dark uppercase tracking-[0.15em] mb-6">
          Guide interactif gratuit
        </p>
        <h1
          className="text-4xl md:text-[3.2rem] font-bold text-alinea-950 leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Le Transfert d&apos;Entreprise
          <br />
          <span className="text-accent-dark">Le guide interactif</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-alinea-500 max-w-xl mx-auto leading-relaxed">
          14 modules. 0&nbsp;&euro;. Tout ce que vous devez savoir avant, pendant et après un
          transfert d&apos;entreprise.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8 text-[13px] text-alinea-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            14 modules complets
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cas pratiques
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Références juridiques
          </span>
        </div>
      </section>

      {/* Email gate */}
      <section className="mb-20">
        <GuideEmailGate>
          {/* Module grid — shown once unlocked */}
          <div className="space-y-16">
            {parts.map((partKey) => {
              const partModules = modules.filter((m) => m.part === partKey);
              return (
                <div key={partKey}>
                  <div className="mb-6">
                    <p className="text-[12px] font-semibold text-accent-dark uppercase tracking-[0.12em] mb-1">
                      {partRanges[partKey]}
                    </p>
                    <h2
                      className="text-2xl font-bold text-alinea-950 tracking-tight"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {partLabels[partKey]}
                    </h2>
                    <p className="text-[15px] text-alinea-500 mt-1">
                      {partDescriptions[partKey]}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {partModules.map((m) => (
                      <Link
                        key={m.slug}
                        href={`/guide/transfert-entreprise/${m.slug}`}
                        className="group block border border-alinea-200 rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-alinea-100 text-alinea-600 text-[14px] font-bold group-hover:bg-accent/20 group-hover:text-accent-dark transition-colors">
                            {m.number}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-[15px] font-semibold text-alinea-950 leading-snug group-hover:text-accent-dark transition-colors">
                              {m.title}
                            </h3>
                            <p className="text-[12px] text-alinea-400 mt-1">{m.readTime} de lecture</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA at bottom */}
          <div className="text-center mt-16 pt-12 border-t border-alinea-100">
            <Link
              href="/guide/transfert-entreprise/comprendre-le-processus"
              className="inline-block bg-alinea-950 text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-alinea-800 transition-colors"
            >
              Commencer le module 1 &rarr;
            </Link>
          </div>
        </GuideEmailGate>
      </section>
    </div>
  );
}
