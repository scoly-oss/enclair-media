import { getGuideBySlug, getAllGuides, extractHeadings, addHeadingIds } from "@/lib/guides";
import { notFound } from "next/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";
import TableOfContents from "./TableOfContents";

const BASE_URL = "https://enclair.media";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};

  const url = `${BASE_URL}/guides/${slug}`;

  return {
    title: `${guide.title} — Guide pratique | En Clair`,
    description: guide.excerpt,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      url,
      locale: "fr_FR",
      siteName: "En Clair",
      publishedTime: guide.date,
      authors: ["Sofiane Coly"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const contentWithIds = addHeadingIds(guide.contentHtml);
  const headings = extractHeadings(contentWithIds);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.excerpt,
    datePublished: guide.date,
    author: {
      "@type": "Person",
      name: "Sofiane Coly",
      url: "https://sofianecoly.com",
    },
    publisher: {
      "@type": "Organization",
      name: "En Clair",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/guides/${slug}`,
    },
    inLanguage: "fr-FR",
  };

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
            Guide pratique
          </span>
          <span className="text-[13px] text-alinea-400">{guide.date}</span>
          <span className="text-[13px] text-alinea-400">&middot; {guide.readTime}</span>
        </div>

        <h1
          className="text-3xl md:text-[2.75rem] font-bold text-alinea-950 leading-[1.15] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {guide.title}
        </h1>

        <p className="mt-5 text-lg md:text-xl text-alinea-500 leading-relaxed">
          {guide.excerpt}
        </p>
      </header>

      {/* Table of contents */}
      {headings.length > 1 && (
        <TableOfContents headings={headings} />
      )}

      {/* Content */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentWithIds }}
      />

      {/* Sources */}
      {guide.sources && guide.sources.length > 0 && (
        <div className="mt-16 pt-8 border-t border-alinea-100">
          <h3 className="text-[12px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-4">
            Sources
          </h3>
          <ul className="space-y-2">
            {guide.sources.map((source, i) => (
              <li key={i} className="text-[14px] text-alinea-500 leading-relaxed">
                <span className="text-alinea-400">[{i + 1}]</span>{" "}
                {source}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PDF CTA */}
      <div className="mt-16 border border-alinea-200 rounded-2xl p-8 text-center bg-alinea-50/50">
        <p className="text-[13px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-2">
          Garder ce guide sous la main
        </p>
        <h3
          className="text-xl font-bold text-alinea-950"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Télécharger ce guide en PDF
        </h3>
        <p className="mt-3 text-alinea-500 text-[15px]">
          Imprimable, partageable avec votre équipe RH.
        </p>
        <button
          disabled
          className="inline-block mt-5 bg-alinea-300 text-white px-6 py-3 rounded-xl text-[14px] font-medium cursor-not-allowed"
        >
          Bientôt disponible
        </button>
      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <NewsletterForm />
      </div>
    </div>
  );
}
