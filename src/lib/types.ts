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
