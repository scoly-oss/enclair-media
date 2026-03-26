import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — En Clair",
  description: "Comment En Clair collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1
        className="text-3xl md:text-4xl font-bold text-alinea-950 leading-tight mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Politique de confidentialité
      </h1>
      <p className="text-[13px] text-alinea-400 mb-8">Dernière mise à jour : 26 mars 2026</p>

      <div className="prose prose-lg max-w-none text-alinea-700">

        <h2 style={{ fontFamily: "var(--font-serif)" }}>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données est <strong>DAIRIA Avocats</strong>,
          représenté par Sofiane Coly, avocat au Barreau de Lyon.
        </p>
        <p>
          Adresse : 65 rue Jacques Louis Hénon, 69004 Lyon<br />
          Email : <a href="mailto:s.coly@dairia-avocats.com">s.coly@dairia-avocats.com</a><br />
          Téléphone : +33 (0)6.72.42.24.86
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>2. Données collectées</h2>
        <p>
          Lors de votre inscription à la newsletter En Clair, nous collectons uniquement :
        </p>
        <ul>
          <li><strong>Votre adresse email</strong></li>
          <li><strong>La date et l&apos;heure de votre inscription</strong></li>
          <li><strong>La preuve de votre consentement</strong> (horodatage, texte du consentement)</li>
        </ul>
        <p>
          Aucune autre donnée personnelle n&apos;est collectée. Nous ne collectons pas
          votre nom, votre adresse postale, ni aucune donnée de navigation (pas de cookies
          de tracking, pas de pixel de suivi).
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>3. Finalité du traitement</h2>
        <p>
          Vos données sont collectées dans le seul but de vous envoyer la newsletter
          hebdomadaire En Clair, contenant des analyses juridiques et économiques.
          Vos données ne sont jamais utilisées à des fins commerciales, publicitaires
          ou de prospection pour des produits tiers.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>4. Base légale</h2>
        <p>
          Le traitement de vos données repose sur <strong>votre consentement</strong> (article 6.1.a
          du Règlement Général sur la Protection des Données — RGPD). Vous pouvez retirer
          votre consentement à tout moment (voir section 7).
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>5. Durée de conservation</h2>
        <p>
          Vos données sont conservées tant que vous êtes abonné(e) à la newsletter.
          En cas de désinscription, vos données sont supprimées dans un délai de
          <strong> 48 heures</strong>.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>6. Hébergement et sous-traitants</h2>
        <p>Vos données sont hébergées par :</p>
        <ul>
          <li><strong>Vercel Inc.</strong> (hébergement du site) — San Francisco, USA — conforme au Data Privacy Framework UE-US</li>
          <li><strong>Upstash Inc.</strong> (base de données Redis) — conforme RGPD, données chiffrées au repos et en transit</li>
        </ul>
        <p>
          Aucune autre entreprise n&apos;a accès à vos données. Nous ne vendons, ne louons
          et ne partageons jamais vos données avec des tiers.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>7. Vos droits</h2>
        <p>
          Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :
        </p>
        <ul>
          <li><strong>Droit d&apos;accès</strong> — savoir quelles données nous détenons sur vous</li>
          <li><strong>Droit de rectification</strong> — corriger vos données</li>
          <li><strong>Droit de suppression</strong> — demander l&apos;effacement de vos données</li>
          <li><strong>Droit de retrait du consentement</strong> — vous désinscrire à tout moment</li>
          <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
          <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement</li>
        </ul>
        <p>
          Pour exercer ces droits, envoyez un email à{" "}
          <a href="mailto:s.coly@dairia-avocats.com">s.coly@dairia-avocats.com</a>.
          Nous répondons sous 30 jours maximum.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>8. Désinscription</h2>
        <p>
          Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de
          désinscription présent dans chaque email, ou en envoyant un email à{" "}
          <a href="mailto:s.coly@dairia-avocats.com">s.coly@dairia-avocats.com</a>{" "}
          avec l&apos;objet « Désinscription En Clair ».
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>9. Cookies</h2>
        <p>
          Le site enclair.media n&apos;utilise <strong>aucun cookie de tracking</strong>,
          aucun pixel de suivi, aucun outil d&apos;analyse comportementale.
          Aucun bandeau cookie n&apos;est nécessaire.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>10. Réclamation</h2>
        <p>
          Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
          vous pouvez adresser une réclamation à la{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            CNIL (Commission Nationale de l&apos;Informatique et des Libertés)
          </a>.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-[14px] text-alinea-500 hover:text-alinea-700 transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
