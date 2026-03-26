import Link from "next/link";

export const metadata = {
  title: "Mentions légales — En Clair",
  description: "Mentions légales du site enclair.media, éditeur, hébergeur et conditions d'utilisation.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1
        className="text-3xl md:text-4xl font-bold text-alinea-950 leading-tight mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Mentions légales
      </h1>
      <p className="text-[13px] text-alinea-400 mb-8">Dernière mise à jour : 26 mars 2026</p>

      <div className="prose prose-lg max-w-none text-alinea-700">

        <h2 style={{ fontFamily: "var(--font-serif)" }}>1. Éditeur du site</h2>
        <p>
          Le site <strong>enclair.media</strong> est édité par :
        </p>
        <ul>
          <li><strong>DAIRIA Avocats</strong> — SELARL d&apos;Avocats au Barreau de Lyon</li>
          <li>SIRET : 931 261 976 00015</li>
          <li>Adresse : 65 rue Jacques-Louis Hénon, 69004 Lyon</li>
          <li>Directeur de la publication : Sofiane Coly, avocat au Barreau de Lyon</li>
          <li>Email : <a href="mailto:s.coly@dairia-avocats.com">s.coly@dairia-avocats.com</a></li>
          <li>Téléphone : +33 (0)6.72.42.24.86</li>
        </ul>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>2. Hébergement</h2>
        <p>Le site est hébergé par :</p>
        <ul>
          <li><strong>Vercel Inc.</strong></li>
          <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
          <li>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
        </ul>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>3. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus publiés sur enclair.media (articles, analyses,
          infographies, illustrations) sont la propriété exclusive de DAIRIA Avocats,
          sauf mention contraire. Toute reproduction, totale ou partielle, est interdite
          sans autorisation écrite préalable.
        </p>
        <p>
          Les articles publiés sur En Clair constituent des <strong>analyses
          d&apos;information générale</strong> et ne sauraient constituer un conseil juridique
          personnalisé. Pour tout conseil adapté à votre situation, consultez un avocat.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>4. Responsabilité</h2>
        <p>
          DAIRIA Avocats s&apos;efforce de fournir des informations aussi précises et
          actualisées que possible. Toutefois, le contenu publié sur enclair.media est
          fourni à titre informatif et ne constitue en aucun cas un avis juridique.
          L&apos;éditeur ne saurait être tenu responsable de l&apos;utilisation qui
          pourrait être faite des informations publiées.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>5. Données personnelles</h2>
        <p>
          Les modalités de collecte et de traitement des données personnelles sont
          détaillées dans notre{" "}
          <Link href="/confidentialite" className="text-alinea-950 underline">
            politique de confidentialité
          </Link>.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>6. Cookies</h2>
        <p>
          Le site enclair.media n&apos;utilise <strong>aucun cookie de tracking</strong>,
          aucun pixel de suivi, ni aucun outil d&apos;analyse comportementale.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>7. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. DAIRIA Avocats
          n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité
          quant à leur contenu.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>8. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français.
          Tout litige relatif à l&apos;utilisation du site sera soumis à la
          compétence exclusive des tribunaux de Lyon.
        </p>

        <h2 style={{ fontFamily: "var(--font-serif)" }}>9. Crédits</h2>
        <p>
          Site développé avec <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>.
          Hébergé sur <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>.
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
