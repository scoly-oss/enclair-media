import Link from "next/link";
import { ArticleMeta, getCategoryLabel, getCategoryColor } from "@/lib/types";

interface Props {
  article: ArticleMeta;
  featured?: boolean;
}

export default function ArticleCard({ article, featured }: Props) {
  return (
    <article>
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${getCategoryColor(article.category)}`}>
          {getCategoryLabel(article.category)}
        </span>
        <span className="text-[13px] text-alinea-400">{article.date}</span>
        <span className="text-[13px] text-alinea-400">· {article.readTime}</span>
      </div>

      <Link href={`/articles/${article.slug}`}>
        <h2
          className={`font-bold text-alinea-950 hover:text-accent-dark transition-colors leading-snug tracking-tight ${
            featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {article.title}
        </h2>
      </Link>

      <p className={`mt-3 text-alinea-500 leading-relaxed ${featured ? "text-base md:text-lg" : "text-[15px]"}`}>
        {article.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
        {article.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[13px] text-alinea-400">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
