"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

const GUIDES_PER_PAGE = 12;

export default function GuidesClient({ guides }: { guides: GuideMeta[] }) {
  const [visibleCount, setVisibleCount] = useState(GUIDES_PER_PAGE);

  const visible = guides.slice(0, visibleCount);
  const hasMore = visibleCount < guides.length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Header */}
      <div className="text-center py-8 md:py-12 mb-6">
        <p className="text-[13px] font-medium text-accent-dark uppercase tracking-[0.15em] mb-4">
          Guides pratiques
        </p>
        <h1
          className="text-3xl md:text-[2.75rem] font-bold text-alinea-950 leading-[1.15] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Guides pratiques
        </h1>
        <p className="mt-5 text-lg text-alinea-500 max-w-lg mx-auto leading-relaxed">
          Tout ce que l&apos;employeur doit savoir, étape par étape.
        </p>
      </div>

      {/* Count */}
      <p className="text-alinea-500 text-[15px] mb-8">
        {guides.length} guide{guides.length > 1 ? "s" : ""} disponible{guides.length > 1 ? "s" : ""}
      </p>

      {/* Guides list */}
      <div className="space-y-10">
        {visible.map((guide) => (
          <article key={guide.slug}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                Guide
              </span>
              <span className="text-[13px] text-alinea-400">{guide.date}</span>
              <span className="text-[13px] text-alinea-400">· {guide.readTime}</span>
            </div>

            <Link href={`/guides/${guide.slug}`}>
              <h2
                className="text-xl md:text-2xl font-bold text-alinea-950 hover:text-accent-dark transition-colors leading-snug tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {guide.title}
              </h2>
            </Link>

            <p className="mt-3 text-alinea-500 leading-relaxed text-[15px]">
              {guide.excerpt}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
              {guide.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[13px] text-alinea-400">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + GUIDES_PER_PAGE)}
            className="border border-alinea-200 text-alinea-700 px-8 py-3.5 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
          >
            Voir plus de guides ({guides.length - visibleCount} restants) &rarr;
          </button>
        </div>
      )}

      {!hasMore && visible.length > 0 && (
        <div className="text-center mt-12 pt-8 border-t border-alinea-100">
          <p className="text-alinea-400 text-[14px] mb-4">
            Vous avez tout lu. Recevez les prochains guides directement par email.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            S&apos;abonner gratuitement
          </Link>
        </div>
      )}

      {visible.length === 0 && (
        <div className="text-center py-20">
          <p className="text-alinea-400 text-lg">Les premiers guides arrivent bientôt.</p>
          <Link
            href="/#newsletter"
            className="inline-block mt-6 bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            Être prévenu par email
          </Link>
        </div>
      )}
    </div>
  );
}
