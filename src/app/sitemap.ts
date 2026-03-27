import { getAllArticles } from "@/lib/articles";
import { getAllGuides } from "@/lib/guides";
import { modeles } from "@/data/modeles";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const guides = getAllGuides();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://enclair.media";

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
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...articleEntries,
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/modeles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...modeles.map((m) => ({
      url: `${baseUrl}/modeles/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
