import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="text-center py-20 md:py-28">
        <h1
          className="text-4xl md:text-[3.5rem] font-bold text-alinea-950 leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Le droit et l&apos;économie,<br />
          <span className="text-accent-dark">en clair.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-alinea-500 max-w-xl mx-auto leading-relaxed">
          Chaque semaine, l&apos;essentiel du droit social, de la jurisprudence
          et de l&apos;actualité économique — décrypté pour ceux qui décident.
        </p>
      </section>

      {/* Newsletter */}
      <section className="mb-20">
        <NewsletterForm />
      </section>

      {/* Featured */}
      {featured && (
        <section className="mb-16">
          <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-6">
            À la une
          </p>
          <ArticleCard article={featured} featured />
        </section>
      )}

      <hr className="border-alinea-100 mb-16" />

      {/* Articles */}
      {rest.length > 0 && (
        <section className="mb-20">
          <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-8">
            Dernières analyses
          </p>
          <div className="space-y-12">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Value prop — minimal */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16 mb-10 border-t border-alinea-100">
        <div>
          <p className="text-alinea-400 text-lg mb-2">§</p>
          <h3 className="font-semibold text-alinea-950 text-[15px] mb-2">Sources vérifiables</h3>
          <p className="text-[15px] text-alinea-500 leading-relaxed">
            Chaque article cite ses sources. Articles de loi, décisions
            de justice, textes officiels. Tout est traçable.
          </p>
        </div>
        <div>
          <p className="text-alinea-400 text-lg mb-2">⚡</p>
          <h3 className="font-semibold text-alinea-950 text-[15px] mb-2">Réactivité</h3>
          <p className="text-[15px] text-alinea-500 leading-relaxed">
            Décrets, arrêts, réformes — analysés dans les heures
            qui suivent leur publication.
          </p>
        </div>
        <div>
          <p className="text-alinea-400 text-lg mb-2">→</p>
          <h3 className="font-semibold text-alinea-950 text-[15px] mb-2">Actionnable</h3>
          <p className="text-[15px] text-alinea-500 leading-relaxed">
            Pas de théorie. Chaque analyse dit ce que ça change
            concrètement pour votre entreprise.
          </p>
        </div>
      </section>
    </div>
  );
}
