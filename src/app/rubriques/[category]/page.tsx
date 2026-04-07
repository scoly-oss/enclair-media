import { getAllArticles, getArticlesByCategory, getCategoryLabel } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const validCategories = ["droit-social", "economie", "jurisprudence", "decryptage", "alerte"];

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

const editorialDescriptions: Record<string, string> = {
  "droit-social":
    "Droit du travail, contrats, licenciement, temps de travail, conventions collectives — tout ce que l'employeur doit maîtriser pour sécuriser sa gestion RH.",
  economie:
    "Cotisations, allègements, coût du travail, épargne salariale, aides à l'embauche — les leviers financiers que chaque dirigeant devrait connaître.",
  jurisprudence:
    "Les arrêts de la Cour de cassation qui changent la donne. Décryptage des décisions récentes en droit social, avec les conséquences concrètes pour les employeurs.",
  decryptage:
    "Lois, décrets, réformes — ce qui change vraiment et ce que ça implique pour votre entreprise. Analyse sans jargon des textes qui comptent.",
  alerte:
    "Les échéances, obligations et risques à ne pas manquer. L'essentiel à retenir quand le temps presse.",
};

const categoryFaqs: Record<string, { question: string; answer: string }[]> = {
  "droit-social": [
    {
      question: "Quelles sont les obligations de l'employeur en matière de contrat de travail ?",
      answer:
        "L'employeur doit remettre un contrat écrit pour tout CDI à temps partiel et pour tout CDD. Le contrat doit mentionner la qualification, la rémunération, la durée du travail et la convention collective applicable. En cas de CDI à temps plein, l'écrit n'est pas légalement obligatoire mais reste fortement recommandé.",
    },
    {
      question: "Quels sont les délais de préavis en cas de licenciement ?",
      answer:
        "Le préavis dépend de l'ancienneté du salarié : 1 mois pour une ancienneté de 6 mois à 2 ans, 2 mois au-delà de 2 ans. La convention collective peut prévoir des durées plus favorables. Le préavis ne s'applique pas en cas de faute grave ou lourde.",
    },
    {
      question: "Comment gérer les heures supplémentaires dans l'entreprise ?",
      answer:
        "Les heures supplémentaires sont celles effectuées au-delà de 35 heures par semaine. Elles donnent lieu à une majoration de salaire (25 % pour les 8 premières heures, 50 % au-delà) ou à un repos compensateur équivalent. Le contingent annuel est fixé par accord collectif ou, à défaut, à 220 heures par salarié.",
    },
  ],
  economie: [
    {
      question: "Qu'est-ce que la réduction générale de cotisations patronales (ex-réduction Fillon) ?",
      answer:
        "La réduction générale est un allègement de charges patronales applicable aux salaires inférieurs à 1,6 SMIC. Elle permet de réduire significativement le coût du travail sur les bas salaires en diminuant les cotisations de sécurité sociale, de retraite complémentaire et d'assurance chômage.",
    },
    {
      question: "Quelles aides existent pour l'embauche en 2025 ?",
      answer:
        "Les principales aides à l'embauche incluent l'aide à l'apprentissage (jusqu'à 6 000 euros), les exonérations en zone de revitalisation rurale (ZRR), les contrats aidés (PEC, CIE) et les réductions spécifiques pour l'embauche de travailleurs handicapés. Les montants et conditions évoluent chaque année.",
    },
    {
      question: "Comment fonctionne l'épargne salariale pour les PME ?",
      answer:
        "Les PME peuvent mettre en place un plan d'épargne entreprise (PEE) ou un plan d'épargne retraite collectif (PERECO). L'intéressement et la participation permettent d'associer les salariés aux résultats de l'entreprise avec un cadre fiscal avantageux pour l'employeur comme pour le salarié.",
    },
  ],
  jurisprudence: [
    {
      question: "Pourquoi suivre la jurisprudence de la Cour de cassation en droit social ?",
      answer:
        "La Cour de cassation fixe l'interprétation des textes de loi et peut modifier profondément les pratiques RH. Un revirement de jurisprudence peut rendre illicite une pratique jusque-là tolérée (barèmes d'indemnités, motifs de licenciement, obligations de sécurité). Suivre les arrêts permet d'anticiper les risques contentieux.",
    },
    {
      question: "Un arrêt de la Cour de cassation s'applique-t-il immédiatement à toutes les entreprises ?",
      answer:
        "Un arrêt de la Cour de cassation n'a en principe qu'une autorité relative : il tranche le litige entre les parties. Mais en pratique, les juridictions du fond suivent la position de la Cour de cassation, ce qui rend ses décisions opposables de fait à toutes les entreprises.",
    },
    {
      question: "Comment anticiper les conséquences d'une nouvelle décision de justice ?",
      answer:
        "Il faut analyser la portée de l'arrêt (confirmation ou revirement), vérifier s'il concerne un cas isolé ou une règle générale, puis adapter les process internes (contrats, règlement intérieur, pratiques managériales). Un audit RH régulier permet de s'assurer de la conformité aux dernières évolutions jurisprudentielles.",
    },
  ],
  decryptage: [
    {
      question: "Comment savoir si une nouvelle loi impacte mon entreprise ?",
      answer:
        "Chaque loi publiée au Journal officiel doit être analysée sous l'angle de son champ d'application (taille d'entreprise, secteur, type de contrat). Les décrets d'application, souvent publiés plusieurs mois après, précisent les modalités concrètes. En Clair décrypte chaque texte avec ses implications pratiques.",
    },
    {
      question: "Quelle est la différence entre une loi, un décret et un arrêté ?",
      answer:
        "La loi est votée par le Parlement et fixe les principes généraux. Le décret, pris par le gouvernement, précise les modalités d'application. L'arrêté, pris par un ministre ou un préfet, détaille les mesures techniques. Les trois sont contraignants mais à des niveaux différents de la hiérarchie des normes.",
    },
    {
      question: "Comment se préparer à une réforme sociale avant son entrée en vigueur ?",
      answer:
        "Il faut identifier les dispositions qui vous concernent, évaluer l'impact sur vos contrats et votre masse salariale, former les équipes RH et paie, et mettre à jour vos process internes. Anticiper permet d'éviter les erreurs coûteuses dans les premières semaines d'application.",
    },
  ],
  alerte: [
    {
      question: "Quelles sont les échéances sociales à ne pas manquer chaque année ?",
      answer:
        "Les principales échéances incluent la déclaration annuelle des données sociales (DSN), l'index égalité professionnelle (avant le 1er mars), les NAO (négociations annuelles obligatoires), le versement de la participation, et les entretiens professionnels bisannuels. Manquer ces échéances expose l'employeur à des pénalités financières.",
    },
    {
      question: "Que risque une entreprise qui ne respecte pas une obligation légale en droit social ?",
      answer:
        "Les sanctions vont de l'amende administrative (jusqu'à 1 % de la masse salariale pour l'index égalité) au redressement URSSAF, en passant par des dommages et intérêts en cas de contentieux prud'homal. Certaines infractions (travail dissimulé, harcèlement) relèvent du pénal avec des peines d'emprisonnement.",
    },
    {
      question: "Comment mettre en place une veille réglementaire efficace ?",
      answer:
        "Une veille efficace combine la surveillance du Journal officiel, le suivi des circulaires ministérielles, l'analyse de la jurisprudence et la lecture de sources spécialisées fiables. En Clair synthétise ces informations pour les dirigeants et responsables RH, avec des alertes ciblées sur les changements à impact immédiat.",
    },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!validCategories.includes(category)) return {};
  const label = getCategoryLabel(category);
  const description =
    editorialDescriptions[category] ||
    `Toutes les analyses ${label.toLowerCase()} d'En Clair. Droit, économie et jurisprudence décryptés pour les dirigeants.`;
  return {
    title: `${label} — En Clair`,
    description,
    alternates: {
      canonical: `/rubriques/${category}`,
    },
    openGraph: {
      title: `${label} — En Clair`,
      description,
      type: "website",
      url: `https://enclair.media/rubriques/${category}`,
      locale: "fr_FR",
      siteName: "En Clair",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${label} — En Clair`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!validCategories.includes(category)) notFound();

  const articles = getArticlesByCategory(category);
  const label = getCategoryLabel(category);
  const description = editorialDescriptions[category];
  const topArticles = articles.slice(0, 3);
  const remainingArticles = articles.slice(3);
  const faqs = categoryFaqs[category] || [];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="mb-14">
        <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-3">
          Rubrique
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold text-alinea-950 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {label}
        </h1>
        <p className="mt-4 text-lg text-alinea-500 leading-relaxed">
          {description}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-alinea-400 text-lg">Les premiers articles arrivent bientôt.</p>
      ) : (
        <>
          {/* Top articles */}
          {topArticles.length > 0 && (
            <section className="mb-16">
              <h2
                className="text-xl font-bold text-alinea-950 mb-8 pb-3 border-b border-alinea-100"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Top articles
              </h2>
              <div className="space-y-10">
                {topArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} featured />
                ))}
              </div>
            </section>
          )}

          {/* All articles */}
          {remainingArticles.length > 0 && (
            <section className="mb-20">
              <h2
                className="text-xl font-bold text-alinea-950 mb-8 pb-3 border-b border-alinea-100"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Tous les articles
              </h2>
              <div className="space-y-12">
                {remainingArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* FAQ section visible for users */}
      {faqs.length > 0 && (
        <section className="mb-20">
          <h2
            className="text-xl font-bold text-alinea-950 mb-8 pb-3 border-b border-alinea-100"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Questions frequentes
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-[16px] font-semibold text-alinea-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-[15px] text-alinea-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <NewsletterForm />
    </div>
  );
}
