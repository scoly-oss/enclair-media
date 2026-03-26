import type { Metadata } from "next";
import Link from "next/link";
import { modeles, categories } from "@/data/modeles";

export const metadata: Metadata = {
  title: "30 modèles juridiques gratuits — En Clair | Droit du travail",
  description:
    "Téléchargez gratuitement nos modèles de contrats, lettres de licenciement, chartes télétravail et plus. Rédigés par un avocat en droit social.",
  alternates: { canonical: "https://enclair.media/modeles" },
  openGraph: {
    title: "30 modèles juridiques gratuits — En Clair",
    description:
      "Contrats, lettres, chartes, accords : tous les modèles dont un employeur a besoin, rédigés par un avocat.",
    url: "https://enclair.media/modeles",
    siteName: "En Clair",
    locale: "fr_FR",
    type: "website",
  },
};

const categoryIcons: Record<string, string> = {
  Embauche: "📝",
  Avenants: "🔄",
  Rupture: "⚖️",
  "Rupture conventionnelle": "🤝",
  Discipline: "⚠️",
  Organisation: "🏢",
  "Accords / DUE": "📋",
  IRP: "🗳️",
  Divers: "📁",
};

export default function ModelesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Modèles juridiques gratuits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            30 modèles rédigés par un avocat en droit social. Contrats,
            lettres, chartes, accords — prêts à personnaliser. Téléchargement
            gratuit après inscription.
          </p>
        </div>
      </section>

      {/* Listing par catégorie */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        {categories.map((cat) => {
          const items = modeles.filter((m) => m.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>{categoryIcons[cat] ?? "📄"}</span>
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/modeles/${m.slug}`}
                    className="group block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#e8842c] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 text-lg">
                        📄
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-[#e8842c] transition-colors">
                          {m.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm text-amber-800">
          <strong>Avertissement :</strong> ces modèles sont fournis à titre
          informatif et ne constituent pas un conseil juridique personnalisé.
          Chaque situation étant unique, nous vous recommandons de consulter un
          avocat pour adapter ces documents à votre cas.
        </div>
      </section>
    </main>
  );
}
