import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const recent = articles.slice(1, 7); // 6 derniers articles seulement

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="text-center py-20 md:py-28">
        <p className="text-[13px] font-medium text-accent-dark uppercase tracking-[0.15em] mb-6">
          Pour les dirigeantes et dirigeants, DRH, DAF et experts-comptables
        </p>
        <h1
          className="text-4xl md:text-[3.5rem] font-bold text-alinea-950 leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ce qui va vous coûter cher<br />
          <span className="text-accent-dark">— si personne ne vous le dit.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-alinea-500 max-w-xl mx-auto leading-relaxed">
          Droit social, paie, jurisprudence, réformes — chaque semaine,
          les risques que vous ne voyez pas et les décisions que vous devez prendre.
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

      {/* Articles — 6 derniers seulement */}
      {recent.length > 0 && (
        <section className="mb-20">
          <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-8">
            Dernières analyses
          </p>
          <div className="space-y-12">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/articles"
              className="inline-block border border-alinea-200 text-alinea-700 px-8 py-3.5 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
            >
              Voir toutes les analyses →
            </a>
          </div>
        </section>
      )}

      {/* Value prop — disease awareness */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16 mb-10 border-t border-alinea-100">
        <div>
          <p className="text-accent-dark text-lg mb-2">⚠️</p>
          <h3 className="font-semibold text-alinea-950 text-[15px] mb-2">Les risques que vous ignorez</h3>
          <p className="text-[15px] text-alinea-500 leading-relaxed">
            Forfait jours nul, consultation CSE oubliée, CDD requalifié —
            chaque article révèle un risque concret que vous pouvez éviter.
          </p>
        </div>
        <div>
          <p className="text-accent-dark text-lg mb-2">⚖️</p>
          <h3 className="font-semibold text-alinea-950 text-[15px] mb-2">Sourcé. Vérifiable.</h3>
          <p className="text-[15px] text-alinea-500 leading-relaxed">
            Numéros de pourvoi, articles du Code du travail, décrets —
            chaque affirmation est traçable sur Légifrance.
          </p>
        </div>
        <div>
          <p className="text-accent-dark text-lg mb-2">🎯</p>
          <h3 className="font-semibold text-alinea-950 text-[15px] mb-2">Ce que vous devez faire lundi</h3>
          <p className="text-[15px] text-alinea-500 leading-relaxed">
            Pas de théorie. Chaque analyse se termine par une action
            concrète applicable dans votre entreprise.
          </p>
        </div>
      </section>

      {/* Apprendre CTA */}
      <section className="mb-20 border border-accent/20 rounded-2xl p-8 md:p-12 bg-accent/5 text-center">
        <p className="text-accent-dark text-sm font-semibold uppercase tracking-[0.12em] mb-3">Nouveau</p>
        <h2
          className="text-2xl md:text-3xl font-bold text-alinea-950 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Testez vos réflexes juridiques
        </h2>
        <p className="mt-4 text-alinea-500 max-w-md mx-auto leading-relaxed text-[15px]">
          Quizz, cas pratiques, mises en situation — évaluez vos connaissances
          en droit social et identifiez vos angles morts. Gratuit.
        </p>
        <a
          href="/apprendre"
          className="inline-block mt-6 bg-accent-dark text-white px-6 py-3 rounded-xl text-[15px] font-semibold hover:bg-accent transition-colors"
        >
          Commencer un quizz →
        </a>
      </section>
    </div>
  );
}
