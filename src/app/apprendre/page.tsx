import Link from "next/link";
import QuizCard from "@/components/QuizCard";

export const metadata = {
  title: "Apprendre — En Clair",
  description: "Testez vos réflexes juridiques avec nos quizz et cas pratiques interactifs en droit social.",
};

const quizzes = [
  {
    id: "licenciement",
    title: "Licenciement : maîtrisez-vous la procédure ?",
    description: "Entretien préalable, délais, lettre de licenciement — 10 questions pour vérifier que vous ne laissez aucune faille.",
    questions: 10,
    difficulty: "Intermédiaire" as const,
    icon: "📋",
    tags: ["procédure", "entretien préalable", "motif réel et sérieux"],
  },
  {
    id: "forfait-jours",
    title: "Forfait jours : êtes-vous en conformité ?",
    description: "80% des conventions de forfait jours sont attaquables. Testez si les vôtres tiennent la route.",
    questions: 8,
    difficulty: "Avancé" as const,
    icon: "⏱️",
    tags: ["temps de travail", "218 jours", "accord collectif"],
  },
  {
    id: "rupture-conventionnelle",
    title: "Rupture conventionnelle : les pièges à éviter",
    description: "Vice du consentement, indemnité minimale, délai de rétractation — connaissez-vous vraiment les règles ?",
    questions: 8,
    difficulty: "Intermédiaire" as const,
    icon: "🤝",
    tags: ["rupture amiable", "homologation", "indemnité"],
  },
  {
    id: "inaptitude",
    title: "Inaptitude : le parcours sans faute",
    description: "De l'avis du médecin du travail au licenciement — chaque étape est un piège potentiel.",
    questions: 10,
    difficulty: "Avancé" as const,
    icon: "🏥",
    tags: ["reclassement", "CSE", "médecin du travail"],
  },
  {
    id: "cdd",
    title: "CDD : évitez la requalification",
    description: "Motif de recours, durée, renouvellement — un seul faux pas et c'est le CDI.",
    questions: 8,
    difficulty: "Débutant" as const,
    icon: "📄",
    tags: ["contrat", "remplacement", "terme"],
  },
  {
    id: "harcelement",
    title: "Harcèlement : réagir dans les 48h",
    description: "Un salarié signale du harcèlement. Que devez-vous faire ? Dans quel ordre ? Testez vos réflexes.",
    questions: 8,
    difficulty: "Avancé" as const,
    icon: "🚨",
    tags: ["obligation employeur", "enquête", "sanctions"],
  },
];

export default function ApprendrePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <section className="text-center py-12 md:py-16">
        <p className="text-[13px] font-medium text-accent-dark uppercase tracking-[0.15em] mb-4">
          Apprendre
        </p>
        <h1
          className="text-3xl md:text-[2.75rem] font-bold text-alinea-950 leading-[1.15] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Testez vos réflexes juridiques
        </h1>
        <p className="mt-5 text-lg text-alinea-500 max-w-lg mx-auto leading-relaxed">
          Des quizz et cas pratiques tirés de situations réelles.
          Identifiez vos angles morts avant qu&apos;ils ne vous coûtent cher.
        </p>
      </section>

      {/* Risk score CTA */}
      <section className="mb-16 bg-alinea-950 rounded-2xl p-8 md:p-10 text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-[0.12em] mb-2">Nouveau</p>
        <h2
          className="text-xl md:text-2xl font-bold text-white tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Votre score de risque social
        </h2>
        <p className="mt-3 text-alinea-400 max-w-md mx-auto text-[15px] leading-relaxed">
          20 questions sur vos pratiques RH.
          En Clair calcule votre score de risque et vous dit précisément où vous êtes exposé.
        </p>
        <a
          href="/apprendre/score-risque"
          className="inline-block mt-6 bg-accent text-alinea-950 px-6 py-3 rounded-xl text-[15px] font-semibold hover:bg-accent-light transition-colors"
        >
          Calculer mon score →
        </a>
        <p className="mt-3 text-alinea-500 text-[12px]">Gratuit · Anonyme · 5 minutes</p>
      </section>

      {/* Quizz grid */}
      <section className="mb-16">
        <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-8">
          Quizz disponibles
        </p>
        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      {/* CTA newsletter */}
      <section className="border border-alinea-200 rounded-2xl p-8 text-center mb-10">
        <h3
          className="text-xl font-bold text-alinea-950"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Vous voulez aller plus loin ?
        </h3>
        <p className="mt-3 text-alinea-500 text-[15px]">
          Chaque semaine, En Clair vous envoie les risques juridiques
          que vous ne voyez pas — et les actions à prendre.
        </p>
        <Link
          href="#newsletter"
          className="inline-block mt-5 bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
        >
          S&apos;abonner gratuitement
        </Link>
      </section>
    </div>
  );
}
