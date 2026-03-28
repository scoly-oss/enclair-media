import { getAllArticles, getArticlesByCategory, getCategoryLabel } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const validCategories = ["droit-social", "economie", "jurisprudence", "decryptage", "alerte"];

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!validCategories.includes(category)) return {};
  const label = getCategoryLabel(category);
  const description = `Toutes les analyses ${label.toLowerCase()} d'En Clair. Droit, économie et jurisprudence décryptés pour les dirigeants.`;
  return {
    title: `${label} — En Clair`,
    description,
    alternates: {
      canonical: `/rubriques/${category}`,
    },
    openGraph: {
      title: `${label} — En Clair`,
      description,
      type: "website",
      url: `https://enclair.media/rubriques/${category}`,
      locale: "fr_FR",
      siteName: "En Clair",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${label} — En Clair`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!validCategories.includes(category)) notFound();

  const articles = getArticlesByCategory(category);
  const label = getCategoryLabel(category);

  const descriptions: Record<string, string> = {
    "droit-social": "Analyses de fond sur le droit du travail : contrats, licenciements, temps de travail, rémunération, relations collectives.",
    economie: "Conjoncture, indicateurs, réformes fiscales et sociales — l'actualité économique décryptée pour les décideurs.",
    jurisprudence: "Les arrêts importants de la Cour de cassation et des cours d'appel, expliqués et mis en perspective.",
    decryptage: "Décrets, lois, réformes — ce qui change concrètement et ce que vous devez faire.",
    alerte: "Changements réglementaires urgents. Ce qu'il faut savoir immédiatement.",
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <header className="mb-14">
        <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-3">
          Rubrique
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold text-alinea-950 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {label}
        </h1>
        <p className="mt-4 text-lg text-alinea-500 leading-relaxed">
          {descriptions[category]}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-alinea-400 text-lg">Les premiers articles arrivent bientôt.</p>
      ) : (
        <div className="space-y-12 mb-20">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      <NewsletterForm />
    </div>
  );
}
