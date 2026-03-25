import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "À propos — En Clair",
  description: "En Clair est un média juridique et économique indépendant, propulsé par l'IA, édité par DAIRIA Avocats.",
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
          Le droit du travail change en permanence. Chaque mois, de nouveaux décrets, de nouveaux
          arrêts de la Cour de cassation, de nouvelles circulaires modifient les règles du jeu pour
          les employeurs. Pourtant, l&apos;information juridique reste enfermée dans deux mondes :
        </p>
        <ul>
          <li>Les <strong>éditeurs juridiques</strong> (Dalloz, LexisNexis, Lefebvre) — exhaustifs mais écrits par et pour des juristes, à 5 000-15 000 €/an</li>
          <li>Les <strong>médias généralistes</strong> (Les Echos, BFM Business) — accessibles mais superficiels sur le droit</li>
        </ul>
        <p>
          <strong>En Clair se positionne entre les deux.</strong> La profondeur d&apos;un éditeur juridique,
          l&apos;accessibilité d&apos;un média business, le format d&apos;une newsletter moderne.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Comment ça marche</h2>
        <p>
          En Clair est propulsé par l&apos;intelligence artificielle. Nos articles sont générés à partir
          des <strong>sources officielles</strong> — Légifrance, le Bulletin Officiel de la Sécurité Sociale,
          le Journal Officiel, les bases de jurisprudence — puis supervisés par des avocats en exercice.
        </p>
        <p>
          Chaque source est citée. Chaque numéro de pourvoi est vérifiable. Chaque article de loi
          est référencé. Pas d&apos;opinion déguisée en information. Pas de contenu sponsorisé déguisé
          en analyse.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Qui est derrière</h2>
        <p>
          En Clair est édité par <strong>DAIRIA Avocats</strong>, cabinet spécialisé en droit social.
          Direction de la publication : Sofiane Coly et Loïc Guitton, avocats au Barreau de Lyon.
        </p>
        <p>
          Ce média est né d&apos;un constat simple : nos clients nous posent chaque semaine les mêmes
          questions sur les évolutions du droit du travail. Plutôt que de répondre un par un,
          nous avons décidé de répondre à tous — publiquement, gratuitement, et sans jargon.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>L&apos;écosystème</h2>
        <p>
          En Clair fait partie d&apos;un écosystème de services pour les dirigeants et les DRH :
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <Link
          href="https://dairia-avocats.fr"
          target="_blank"
          className="block border border-blue-200 rounded-xl p-5 hover:bg-blue-50 transition-all"
        >
          <h3 className="font-bold text-alinea-950">DAIRIA Avocats</h3>
          <p className="mt-1 text-sm text-alinea-600">
            Contentieux prud&apos;homal, licenciements, négociations collectives.
            Le cabinet qui défend les employeurs.
          </p>
        </Link>
        <Link
          href="https://dairia-ia.fr"
          target="_blank"
          className="block border border-purple-200 rounded-xl p-5 hover:bg-purple-50 transition-all"
        >
          <h3 className="font-bold text-alinea-950">DAIRIA IA</h3>
          <p className="mt-1 text-sm text-alinea-600">
            Intelligence artificielle appliquée au droit. Automatisation,
            veille, analyse de conformité.
          </p>
        </Link>
        <Link
          href="https://gerermesatmp.fr"
          target="_blank"
          className="block border border-emerald-200 rounded-xl p-5 hover:bg-emerald-50 transition-all"
        >
          <h3 className="font-bold text-alinea-950">GérerMesAT/MP</h3>
          <p className="mt-1 text-sm text-alinea-600">
            Optimisation des taux AT/MP, contestation des décisions,
            audit de vos cotisations.
          </p>
        </Link>
      </div>

      <div className="prose prose-lg max-w-none text-alinea-700 mb-10">
        <h2 style={{ fontFamily: "var(--font-serif)" }}>Transparence</h2>
        <p>
          En Clair utilise l&apos;intelligence artificielle pour la production de contenu.
          Nous l&apos;assumons pleinement. Voici notre engagement :
        </p>
        <ul>
          <li><strong>Sources toujours citées</strong> — numéro de pourvoi, article de loi, référence NOR</li>
          <li><strong>Supervision humaine</strong> — chaque article est relu par un avocat</li>
          <li><strong>Pas de conseil juridique</strong> — En Clair informe, il ne remplace pas un avocat</li>
          <li><strong>Indépendance éditoriale</strong> — aucun contenu sponsorisé dans les analyses</li>
        </ul>
      </div>

      <NewsletterForm />
    </div>
  );
}
