import { notFound } from "next/navigation";
import { modeles } from "@/data/modeles";
import ModeleClient from "./ModeleClient";
import { getArticlesByKeywords, getCategoryLabel, getCategoryColor } from "@/lib/articles";
import type { Metadata } from "next";

const BASE_URL = "https://enclair.media";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return modeles.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const modele = modeles.find((m) => m.slug === slug);
  if (!modele) return {};

  const url = `${BASE_URL}/modeles/${slug}`;

  return {
    title: `${modele.title} — Modèle gratuit | En Clair`,
    description: modele.longDescription,
    alternates: {
      canonical: `/modeles/${slug}`,
    },
    openGraph: {
      title: `${modele.title} — Modèle gratuit`,
      description: modele.longDescription,
      type: "article",
      url,
      locale: "fr_FR",
      siteName: "En Clair",
    },
    twitter: {
      card: "summary_large_image",
      title: `${modele.title} — Modèle gratuit | En Clair`,
      description: modele.longDescription,
    },
  };
}

export default async function ModelePage({ params }: Props) {
  const { slug } = await params;
  const modele = modeles.find((m) => m.slug === slug);
  if (!modele) notFound();

  const relatedArticles = getArticlesByKeywords(modele.keywords)
    .slice(0, 3)
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      readTime: a.readTime,
      category: a.category,
      categoryLabel: getCategoryLabel(a.category),
      categoryColor: getCategoryColor(a.category),
    }));

  return <ModeleClient modele={modele} relatedArticles={relatedArticles} />;
}
