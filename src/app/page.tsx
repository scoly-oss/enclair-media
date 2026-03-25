import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import ServicesCTA from "@/components/ServicesCTA";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1
          className="text-4xl md:text-5xl font-bold text-alinea-950 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Le droit et l&apos;économie,<br />
          <span className="text-accent-dark">en clair.</span>
        </h1>
        <p className="mt-4 text-lg text-alinea-600 max-w-2xl mx-auto">
          Chaque semaine, l&apos;essentiel du droit social, de la jurisprudence et de l&apos;actualité
          économique — décrypté pour ceux qui dirigent, embauchent et décident.
        </p>
      </section>

      {/* Newsletter CTA */}
      <section className="mb-14">
        <NewsletterForm />
      </section>

      {/* Featured article */}
      {featured && (
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-alinea-400 uppercase tracking-wide mb-4">
            À la une
          </h2>
          <div className="bg-white rounded-xl border border-alinea-200 p-6 md:p-8">
            <ArticleCard article={featured} />
          </div>
        </section>
      )}

      {/* Articles list */}
      {rest.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-semibold text-alinea-400 uppercase tracking-wide mb-4">
            Dernières analyses
          </h2>
          <div className="bg-white rounded-xl border border-alinea-200 p-6 md:p-8 space-y-6">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Services CTA */}
      <ServicesCTA />

      {/* Value proposition */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white rounded-xl border border-alinea-200 p-6">
          <div className="text-2xl mb-3">§</div>
          <h3 className="font-bold text-alinea-950">Sources vérifiables</h3>
          <p className="mt-2 text-sm text-alinea-500">
            Chaque article cite ses sources : articles de loi, décisions de justice,
            textes officiels. Tout est traçable.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-alinea-200 p-6">
          <div className="text-2xl mb-3">⚡</div>
          <h3 className="font-bold text-alinea-950">Réactivité</h3>
          <p className="mt-2 text-sm text-alinea-500">
            Décrets, arrêts de la Cour de cassation, réformes — analysés
            dans les heures qui suivent leur publication.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-alinea-200 p-6">
          <div className="text-2xl mb-3">→</div>
          <h3 className="font-bold text-alinea-950">Actionnable</h3>
          <p className="mt-2 text-sm text-alinea-500">
            Pas de théorie. Chaque analyse dit ce que ça change concrètement
            pour vous et votre entreprise.
          </p>
        </div>
      </section>
    </div>
  );
}
