import Link from "next/link";
import { ArticleMeta, getCategoryLabel, getCategoryColor } from "@/lib/articles";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="border-b border-alinea-100 pb-6 last:border-b-0">
      <div className="flex items-center gap-3 mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${getCategoryColor(article.category)}`}>
          {getCategoryLabel(article.category)}
        </span>
        <time className="text-xs text-alinea-400">{article.date}</time>
        <span className="text-xs text-alinea-400">· {article.readTime}</span>
      </div>
      <Link href={`/articles/${article.slug}`}>
        <h2
          className="text-xl font-bold text-alinea-950 hover:text-accent-dark transition-colors leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {article.title}
        </h2>
      </Link>
      <p className="mt-2 text-alinea-600 text-sm leading-relaxed">{article.excerpt}</p>
      <div className="mt-3 flex gap-2">
        {article.tags?.map((tag) => (
          <span key={tag} className="text-xs text-alinea-400">#{tag}</span>
        ))}
      </div>
    </article>
  );
}
