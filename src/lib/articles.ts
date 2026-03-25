import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "droit-social" | "economie" | "jurisprudence" | "decryptage" | "alerte";
  tags: string[];
  readTime: string;
  sources?: string[];
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return { slug, ...data } as ArticleMeta;
    });
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return { slug, contentHtml, ...data } as Article;
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "droit-social": "Droit social",
    economie: "Économie",
    jurisprudence: "Jurisprudence",
    decryptage: "Décryptage",
    alerte: "Alerte",
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "droit-social": "bg-blue-100 text-blue-800",
    economie: "bg-emerald-100 text-emerald-800",
    jurisprudence: "bg-purple-100 text-purple-800",
    decryptage: "bg-amber-100 text-amber-800",
    alerte: "bg-red-100 text-red-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}
