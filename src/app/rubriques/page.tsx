import Link from "next/link";
import { getAllArticles, getCategoryLabel } from "@/lib/articles";

export const metadata = {
  title: "Rubriques — En Clair",
  description: "Toutes les rubriques d'En Clair : droit social, économie, jurisprudence, décryptages, alertes.",
};

const categories = [
  {
    slug: "droit-social",
    icon: "§",
    description: "Contrats, licenciements, temps de travail, rémunération, relations collectives.",
  },
  {
    slug: "economie",
    icon: "↗",
    description: "Conjoncture, indicateurs, réformes fiscales et sociales pour les décideurs.",
  },
  {
    slug: "jurisprudence",
    icon: "⚖",
    description: "Arrêts de la Cour de cassation et des cours d'appel, expliqués.",
  },
  {
    slug: "decryptage",
    icon: "⚡",
    description: "Décrets, lois, réformes — ce qui change et ce que vous devez faire.",
  },
  {
    slug: "alerte",
    icon: "→",
    description: "Changements réglementaires urgents à connaître immédiatement.",
  },
];

export default function RubriquesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <h1
        className="text-3xl md:text-4xl font-bold text-alinea-950 tracking-tight mb-12"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Rubriques
      </h1>

      <div className="space-y-6">
        {categories.map((cat) => {
          const count = articles.filter((a) => a.category === cat.slug).length;
          return (
            <Link
              key={cat.slug}
              href={`/rubriques/${cat.slug}`}
              className="block border border-alinea-100 rounded-xl p-6 hover:border-alinea-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-alinea-400 text-lg">{cat.icon}</span>
                    <h2 className="font-semibold text-alinea-950 text-lg">
                      {getCategoryLabel(cat.slug)}
                    </h2>
                  </div>
                  <p className="text-[15px] text-alinea-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="text-[13px] text-alinea-400 whitespace-nowrap ml-6">
                  {count} article{count !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
