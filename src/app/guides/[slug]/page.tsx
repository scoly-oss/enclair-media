import { getGuideBySlug, getAllGuides, extractHeadings, addHeadingIds } from "@/lib/guides";
import { notFound } from "next/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";
import TableOfContents from "./TableOfContents";
import GuideContent from "./GuideContent";

const BASE_URL = "https://enclair.media";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = await getAllGuides();
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

      {/* Content with paywall */}
      <GuideContent
        contentHtml={contentWithIds}
        slug={slug}
        title={guide.title}
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

      {/* Newsletter */}
      <div className="mt-20">
        <NewsletterForm />
      </div>
    </div>
  );
}
