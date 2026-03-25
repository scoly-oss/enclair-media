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

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Qui sommes-nous</h2>
        <p>
          En Clair est un média indépendant fondé par des avocats en droit social.
          Notre rédaction combine l&apos;expertise juridique de praticiens en exercice avec
          la puissance de l&apos;intelligence artificielle pour produire du contenu fiable à un rythme
          que les rédactions traditionnelles ne peuvent pas tenir.
        </p>
        <p>
          Directeur de la publication :{" "}
          <a href="https://sofianecoly.com" target="_blank" rel="noopener noreferrer">Sofiane Coly</a>,
          avocat au Barreau de Lyon.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>Nos recommandations</h2>
        <p>
          Parce que l&apos;information ne suffit pas toujours, nous recommandons des professionnels
          de confiance pour passer à l&apos;action :
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <Link
          href="https://dairia-avocats.fr"
          target="_blank"
          className="block border border-alinea-200 rounded-xl p-5 hover:bg-alinea-50 transition-all"
        >
          <h3 className="font-semibold text-alinea-950">Contentieux prud&apos;homal</h3>
          <p className="mt-1 text-sm text-alinea-500">
            Un cabinet d&apos;avocats spécialisé en droit social
            pour accompagner les employeurs.
          </p>
        </Link>
        <Link
          href="https://dairia-ia.fr"
          target="_blank"
          className="block border border-alinea-200 rounded-xl p-5 hover:bg-alinea-50 transition-all"
        >
          <h3 className="font-semibold text-alinea-950">IA &amp; conformité</h3>
          <p className="mt-1 text-sm text-alinea-500">
            Des solutions d&apos;intelligence artificielle pour automatiser
            la veille et la conformité RH.
          </p>
        </Link>
        <Link
          href="https://gerermesatmp.fr"
          target="_blank"
          className="block border border-alinea-200 rounded-xl p-5 hover:bg-alinea-50 transition-all"
        >
          <h3 className="font-semibold text-alinea-950">Optimisation AT/MP</h3>
          <p className="mt-1 text-sm text-alinea-500">
            Audit et contestation des taux de cotisation
            accidents du travail et maladies professionnelles.
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
