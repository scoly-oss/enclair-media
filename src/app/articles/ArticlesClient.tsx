"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/types";

const ARTICLES_PER_PAGE = 12;

const categoryLabels: Record<string, string> = {
  all: "Tout",
  "droit-social": "Droit social",
  economie: "Économie",
  jurisprudence: "Jurisprudence",
  decryptage: "Décryptage",
  alerte: "Alerte",
};

export default function ArticlesClient({ articles }: { articles: ArticleMeta[] }) {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const filtered =
    filter === "all"
      ? articles
      : articles.filter((a) => a.category === filter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1
        className="text-3xl md:text-4xl font-bold text-alinea-950 mb-3"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Toutes les analyses
      </h1>
      <p className="text-alinea-500 text-[15px] mb-8">
        {articles.length} articles · Droit social, économie, jurisprudence — sourcés et vérifiables.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {Object.entries(categoryLabels).map(([key, label]) => {
          const count =
            key === "all"
              ? articles.length
              : articles.filter((a) => a.category === key).length;
          return (
            <button
              key={key}
              onClick={() => {
                setFilter(key);
                setVisibleCount(ARTICLES_PER_PAGE);
              }}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                filter === key
                  ? "bg-alinea-950 text-white"
                  : "bg-alinea-50 text-alinea-500 hover:bg-alinea-100 hover:text-alinea-700"
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Articles */}
      <div className="space-y-10">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + ARTICLES_PER_PAGE)}
            className="border border-alinea-200 text-alinea-700 px-8 py-3.5 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
          >
            Voir plus d&apos;analyses ({filtered.length - visibleCount} restantes) →
          </button>
        </div>
      )}

      {!hasMore && visible.length > 0 && (
        <div className="text-center mt-12 pt-8 border-t border-alinea-100">
          <p className="text-alinea-400 text-[14px] mb-4">
            Vous avez tout lu. Recevez les prochaines analyses directement par email.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            S&apos;abonner gratuitement
          </Link>
        </div>
      )}
    </div>
  );
}
