#!/usr/bin/env npx ts-node
/**
 * En Clair — Pipeline de génération d'articles
 *
 * Ce script est conçu pour être appelé par Claude (via Claude Code ou Agent SDK)
 * pour produire des articles sourcés à partir des bases juridiques.
 *
 * Workflow :
 * 1. Interroger les APIs Légifrance (JORF, jurisprudence, codes) et le BOSS
 * 2. Analyser les résultats et identifier les sujets à forte valeur
 * 3. Générer un article en markdown avec frontmatter
 * 4. Sauvegarder dans content/articles/
 *
 * Usage autonome (via Claude) :
 *   - Appeler les outils MCP Légifrance pour récupérer la matière première
 *   - Utiliser ce template pour structurer le contenu
 *   - Écrire le fichier .md dans content/articles/
 *
 * Le script ci-dessous est un template/guide — la génération réelle
 * est faite par Claude lui-même via ses outils.
 */

interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: "droit-social" | "economie" | "jurisprudence" | "decryptage" | "alerte";
  tags: string[];
  readTime: string;
  sources: string[];
}

interface ArticleTemplate {
  frontmatter: ArticleFrontmatter;
  sections: {
    hook: string; // Accroche — pourquoi le lecteur doit lire ça
    context: string; // Le contexte factuel (loi, décret, arrêt)
    impact: string; // Ce que ça change concrètement pour le dirigeant
    action: string; // Ce qu'il doit faire
    closing: string; // Phrase de conclusion percutante
  };
}

/**
 * Sources automatisées disponibles via MCP :
 *
 * JURISPRUDENCE :
 * - juri_rechercher_complet : recherche plein texte dans les décisions
 * - juri_rechercher_cassation : ciblé chambre sociale, filtrable par solution
 * - juri_get_decision : contenu complet d'une décision par ID
 *
 * CODES :
 * - code_rechercher_complet : articles de code avec contenu
 * - code_article : article spécifique par ID LEGIARTI
 *
 * JOURNAL OFFICIEL :
 * - jorf_rechercher_complet : textes du JO avec contenu
 * - jorf_derniers_jo : dernières publications
 * - jorf_par_date : textes par date ou période
 *
 * BOSS (Sécurité sociale) :
 * - boss_recherche_semantique : recherche par question naturelle
 * - boss_rag_context : contexte assemblé pour RAG
 *
 * CONVENTIONS COLLECTIVES :
 * - kali_rechercher_complet : articles de conventions avec contenu
 * - consulter_convention_idcc : convention par numéro IDCC
 */

// Catégories de veille automatisable
const VEILLE_TOPICS = [
  {
    name: "Jurisprudence sociale",
    description: "Arrêts publiés au bulletin de la chambre sociale",
    frequency: "hebdomadaire",
    sources: ["juri_rechercher_cassation"],
    keywords: [
      "licenciement", "forfait jours", "heures supplémentaires",
      "inaptitude", "harcèlement", "discrimination",
      "rupture conventionnelle", "clause de non-concurrence",
      "télétravail", "contrat de travail"
    ]
  },
  {
    name: "Réforme réglementaire",
    description: "Décrets et arrêtés impactant les employeurs",
    frequency: "quotidienne",
    sources: ["jorf_derniers_jo", "jorf_par_date"],
    keywords: [
      "cotisations", "SMIC", "convention collective",
      "santé au travail", "formation professionnelle",
      "retraite", "assurance chômage"
    ]
  },
  {
    name: "BOSS et sécurité sociale",
    description: "Mises à jour du Bulletin Officiel de la Sécurité Sociale",
    frequency: "hebdomadaire",
    sources: ["boss_recherche_semantique"],
    keywords: [
      "allègements", "exonérations", "bulletin de paie",
      "protection sociale", "complémentaire santé"
    ]
  },
  {
    name: "Économie et conjoncture",
    description: "Indicateurs et analyses macro impactant les PME",
    frequency: "hebdomadaire",
    sources: ["web_search"],
    keywords: [
      "inflation", "taux directeur", "PIB", "emploi",
      "défaillances entreprises", "investissement"
    ]
  }
];

// Template de slug à partir du titre
function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

// Génération du fichier markdown
function generateMarkdown(template: ArticleTemplate): string {
  const fm = template.frontmatter;
  const s = template.sections;

  return `---
title: "${fm.title}"
excerpt: "${fm.excerpt}"
date: "${fm.date}"
category: "${fm.category}"
tags: ${JSON.stringify(fm.tags)}
readTime: "${fm.readTime}"
sources:
${fm.sources.map(src => `  - "${src}"`).join("\n")}
---

${s.hook}

${s.context}

${s.impact}

${s.action}

---

*${s.closing}*
`;
}

// Export pour utilisation programmatique
export type { ArticleFrontmatter, ArticleTemplate };
export { VEILLE_TOPICS, slugify, generateMarkdown };

console.log("En Clair — Pipeline de génération");
console.log(`${VEILLE_TOPICS.length} catégories de veille configurées`);
console.log("Catégories :", VEILLE_TOPICS.map(t => t.name).join(", "));
