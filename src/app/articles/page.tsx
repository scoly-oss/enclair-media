import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
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
  return <ArticlesClient articles={articles} />;
}
