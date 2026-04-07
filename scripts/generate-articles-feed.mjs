import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content/articles");
const outputPath = path.join(process.cwd(), "public/articles-feed.json");

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

const articles = files
  .map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(articlesDir, fileName), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || "",
      date: data.date || "2025-01-01",
      category: data.category || "droit-social",
      tags: data.tags || [],
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), "utf8");
console.log(`articles-feed.json: ${articles.length} articles generated`);
