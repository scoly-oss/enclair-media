import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toutes les analyses | Droit social, paie et jurisprudence",
  description:
    "Retrouvez toutes nos analyses juridiques : jurisprudence, réformes, risques employeur. Le décryptage du droit social pour les décideurs.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Toutes les analyses — En Clair | Droit social, paie et jurisprudence",
    description:
      "Retrouvez toutes nos analyses juridiques : jurisprudence, réformes, risques employeur. Le décryptage du droit social pour les décideurs.",
    type: "website",
    url: "https://enclair.media/articles",
    locale: "fr_FR",
    siteName: "En Clair",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toutes les analyses — En Clair",
    description:
      "Retrouvez toutes nos analyses juridiques : jurisprudence, réformes, risques employeur.",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  return (
    <>
      <ArticlesClient articles={articles} />
      {/* Noscript fallback: full article list for crawlers that don't execute JS */}
      <noscript>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <ul>
            {articles.map((article) => (
              <li key={article.slug} className="mb-4">
                <Link href={`/articles/${article.slug}`} className="text-alinea-950 underline">
                  {article.title}
                </Link>
                <span className="text-alinea-400 text-sm ml-2">{article.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </>
  );
}
