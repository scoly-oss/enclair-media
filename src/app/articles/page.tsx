import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";

export const metadata = {
  title: "Articles — En Clair",
  description: "Toutes les analyses juridiques et économiques d'En Clair.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  return <ArticlesClient articles={articles} />;
}
