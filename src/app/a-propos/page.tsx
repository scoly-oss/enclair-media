import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "En Clair est le média qui vous montre ce qui peut vous coûter cher — avant que ça vous coûte cher. Fondé par Sofiane Coly, avocat en droit social.",
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title: "À propos — En Clair",
    description:
      "En Clair est le média qui vous montre ce qui peut vous coûter cher — avant que ça vous coûte cher.",
    type: "website",
    url: "https://enclair.media/a-propos",
    locale: "fr_FR",
    siteName: "En Clair",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos — En Clair",
    description:
      "En Clair est le média qui vous montre ce qui peut vous coûter cher — avant que ça vous coûte cher.",
  },
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1
        className="text-3xl md:text-4xl font-bold text-alinea-950 leading-tight mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Pourquoi En Clair existe
      </h1>

      <div className="prose prose-lg max-w-none text-alinea-700">
        <p>
          Vous dirigez une entreprise, un service RH ou un cabinet comptable.
          Le droit du travail change en permanence — décrets, arrêts de la Cour de cassation,
          circulaires, réformes de la paie. Chaque mois, les règles du jeu bougent.
        </p>
        <p>
          Et chaque mois, des entreprises paient le prix d&apos;un risque qu&apos;elles
          n&apos;avaient pas vu venir. Un forfait jours mal encadré, une consultation CSE oubliée,
          un CDD de remplacement qui se transforme en CDI.
        </p>
        <p>
          <strong>En Clair existe pour une raison simple : vous montrer ce qui peut vous coûter cher
          — avant que ça vous coûte cher.</strong>
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Pour qui</h2>
        <p>
          En Clair s&apos;adresse aux personnes qui prennent les décisions dans l&apos;entreprise
          et qui n&apos;ont pas le temps de lire le Journal Officiel :
        </p>
        <ul>
          <li><strong>Dirigeantes et dirigeants de PME/ETI</strong> — vous signez les contrats, vous portez le risque</li>
          <li><strong>DRH et responsables RH</strong> — vous gérez les situations au quotidien</li>
          <li><strong>DAF</strong> — vous chiffrez les provisions et les risques sociaux</li>
          <li><strong>Expertes-comptables et experts-comptables</strong> — vous accompagnez vos clients sur la paie et le social</li>
        </ul>
        <p>
          En Clair est votre allié. Pas un journal. Pas un service juridique.
          Un média qui parle votre langue et vous dit ce que vous devez savoir.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Comment ça marche</h2>
        <p>
          Nos articles sont produits à partir des <strong>sources officielles</strong> — Légifrance,
          le Bulletin Officiel de la Sécurité Sociale, le Journal Officiel, les conventions
          collectives — et supervisés par des avocats en exercice.
        </p>
        <p>
          Chaque source est citée. Chaque numéro de pourvoi est vérifiable. Chaque article
          de loi est référencé. Pas d&apos;opinion déguisée en information. Pas de contenu
          sponsorisé déguisé en analyse.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Apprendre en pratiquant</h2>
        <p>
          Parce que lire ne suffit pas, En Clair propose des <strong>quizz et des cas pratiques
          interactifs</strong> pour tester vos réflexes juridiques. Chaque quizz est ancré dans
          une situation réelle — le genre de situation qui atterrit sur votre bureau un lundi matin.
        </p>
        <p>
          C&apos;est gratuit, c&apos;est anonyme, et c&apos;est le meilleur moyen de découvrir
          vos angles morts avant qu&apos;ils ne vous coûtent cher.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Transparence</h2>
        <p>
          En Clair utilise l&apos;intelligence artificielle pour accélérer la production de contenu.
          Nous l&apos;assumons. Voici notre engagement :
        </p>
        <ul>
          <li><strong>Sources toujours citées</strong> — numéro de pourvoi, article de loi, référence NOR</li>
          <li><strong>Supervision humaine</strong> — chaque article est relu par un avocat en exercice</li>
          <li><strong>Pas de conseil juridique</strong> — En Clair informe, il ne remplace pas votre avocat</li>
          <li><strong>Indépendance éditoriale</strong> — aucun contenu sponsorisé dans les analyses</li>
        </ul>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Qui sommes-nous</h2>
        <p>
          En Clair est un média indépendant fondé par des avocats en droit social.
          Directeur de la publication :{" "}
          <a href="https://sofianecoly.com" target="_blank" rel="noopener noreferrer">Sofiane Coly</a>,
          avocat au Barreau de Lyon.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>L&apos;écosystème DAIRIA</h2>
        <p>
          En Clair fait partie d&apos;un ensemble d&apos;outils et de services conçus pour
          les employeurs qui veulent maîtriser leurs risques juridiques :
        </p>
        <ul>
          <li><a href="https://dairia-avocats.com" target="_blank" rel="noopener noreferrer"><strong>DAIRIA Avocats</strong></a> — Cabinet de droit social côté employeur</li>
          <li><a href="https://dairia.ai" target="_blank" rel="noopener noreferrer"><strong>DAIRIA IA</strong></a> — Assistant juridique IA pour employeurs, à 90&nbsp;€/mois</li>
          <li><a href="https://gerermesatmp.fr" target="_blank" rel="noopener noreferrer"><strong>GérerMesATMP</strong></a> — Outil de gestion des accidents du travail et maladies professionnelles</li>
          <li><a href="https://sofianecoly.com" target="_blank" rel="noopener noreferrer"><strong>Sofiane Coly</strong></a> — Site personnel du fondateur</li>
        </ul>
      </div>

      <div className="mt-12">
        <NewsletterForm />
      </div>
    </div>
  );
}
