import { getAllArticles } from "@/lib/articles";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://enclair-media.vercel.app";

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...articleEntries,
  ];
}
