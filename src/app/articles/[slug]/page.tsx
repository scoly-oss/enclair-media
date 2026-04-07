import { getArticleBySlug, getAllArticles, getRelatedArticles, getCategoryLabel, getCategoryColor } from "@/lib/articles";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";

const BASE_URL = "https://enclair.media";

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

  const url = `${BASE_URL}/articles/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      locale: "fr_FR",
      siteName: "En Clair",
      publishedTime: article.date,
      authors: ["Sofiane Coly"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: "Sofiane Coly",
      url: "https://sofianecoly.com",
    },
    publisher: {
      "@type": "Organization",
      name: "En Clair",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/articles/${slug}`,
    },
    inLanguage: "fr-FR",
  };

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* Articles liés */}
      {(() => {
        const related = getRelatedArticles(slug, article.category, 3);
        if (related.length === 0) return null;
        return (
          <div className="mt-16 pt-8 border-t border-alinea-100">
            <h3
              className="text-2xl font-bold text-alinea-950 mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Articles liés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="group block rounded-xl border border-alinea-100 bg-white p-5 hover:border-alinea-200 hover:shadow-sm transition-all"
                >
                  <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mb-3 ${getCategoryColor(rel.category)}`}>
                    {getCategoryLabel(rel.category)}
                  </span>
                  <h4 className="text-[15px] font-semibold text-alinea-950 leading-snug group-hover:text-alinea-700 transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-[13px] text-alinea-500 leading-relaxed mb-3">
                    {rel.excerpt.length > 100
                      ? rel.excerpt.slice(0, 100).trimEnd() + "..."
                      : rel.excerpt}
                  </p>
                  <span className="text-[12px] text-alinea-400">{rel.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Newsletter */}
      <div className="mt-20">
        <NewsletterForm />
      </div>
    </div>
  );
}
