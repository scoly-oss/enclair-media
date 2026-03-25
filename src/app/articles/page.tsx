import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata = {
  title: "Articles — Alinéa",
  description: "Toutes les analyses juridiques et économiques d'Alinéa.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1
        className="text-3xl font-bold text-alinea-950 mb-8"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Toutes les analyses
      </h1>
      <div className="bg-white rounded-xl border border-alinea-200 p-6 md:p-8 space-y-6">
        {articles.length === 0 ? (
          <p className="text-alinea-500">Les premiers articles arrivent bientôt.</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        )}
      </div>
    </div>
  );
}
