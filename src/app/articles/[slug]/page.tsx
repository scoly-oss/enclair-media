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
    title: `${article.title} — En Clair`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12 md:py-16">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${getCategoryColor(article.category)}`}>
            {getCategoryLabel(article.category)}
          </span>
          <span className="text-[13px] text-alinea-400">{article.date}</span>
          <span className="text-[13px] text-alinea-400">· {article.readTime}</span>
        </div>

        <h1
          className="text-3xl md:text-[2.75rem] font-bold text-alinea-950 leading-[1.15] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {article.title}
        </h1>

        <p className="mt-5 text-lg md:text-xl text-alinea-500 leading-relaxed">
          {article.excerpt}
        </p>
      </header>

      {/* Content */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Sources */}
      {article.sources && article.sources.length > 0 && (
        <div className="mt-16 pt-8 border-t border-alinea-100">
          <h3 className="text-[12px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-4">
            Sources
          </h3>
          <ul className="space-y-2">
            {article.sources.map((source, i) => (
              <li key={i} className="text-[14px] text-alinea-500 leading-relaxed">
                <span className="text-alinea-400">[{i + 1}]</span>{" "}
                {source}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-20">
        <NewsletterForm />
      </div>
    </div>
  );
}
