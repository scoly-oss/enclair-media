import { getArticleBySlug, getAllArticles, getCategoryLabel, getCategoryColor } from "@/lib/articles";
import { notFound } from "next/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Alinéa`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${getCategoryColor(article.category)}`}>
            {getCategoryLabel(article.category)}
          </span>
          <time className="text-sm text-alinea-400">{article.date}</time>
          <span className="text-sm text-alinea-400">· {article.readTime}</span>
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-alinea-950 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {article.title}
        </h1>
        <p className="mt-3 text-lg text-alinea-600">{article.excerpt}</p>
      </div>

      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {article.sources && article.sources.length > 0 && (
        <div className="mt-10 pt-6 border-t border-alinea-200">
          <h3 className="text-sm font-semibold text-alinea-400 uppercase tracking-wide mb-3">Sources</h3>
          <ul className="space-y-1 text-sm text-alinea-500">
            {article.sources.map((source, i) => (
              <li key={i}>
                [{i + 1}] {source}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12">
        <NewsletterForm />
      </div>
    </div>
  );
}
