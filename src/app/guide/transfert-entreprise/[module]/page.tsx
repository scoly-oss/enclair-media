import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllModules, getModuleBySlug } from "@/lib/guide";
import { GuideMobileNav, GuideDesktopSidebar } from "@/components/guide/GuideSidebar";
import GuideTableOfContents from "@/components/guide/GuideTableOfContents";
import GuideProgressBar from "@/components/guide/GuideProgressBar";

interface PageProps {
  params: Promise<{ module: string }>;
}

export async function generateStaticParams() {
  const modules = getAllModules();
  return modules.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = await getModuleBySlug(slug);
  if (!mod) return {};
  return {
    title: `Module ${mod.number} — ${mod.title}`,
    description: `Guide interactif du transfert d'entreprise : ${mod.title}. Tout comprendre en pratique.`,
    alternates: {
      canonical: `/guide/transfert-entreprise/${mod.slug}`,
    },
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { module: slug } = await params;
  const mod = await getModuleBySlug(slug);
  if (!mod) notFound();

  const allModules = getAllModules();
  const prev = allModules.find((m) => m.number === mod.number - 1);
  const next = allModules.find((m) => m.number === mod.number + 1);

  const sidebarModules = allModules.map((m) => ({
    slug: m.slug,
    number: m.number,
    title: m.title,
    part: m.part,
    partLabel: m.partLabel,
  }));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile: sticky top nav */}
      <GuideMobileNav modules={sidebarModules} currentSlug={mod.slug} />

      <div className="flex gap-8 px-6 py-8 lg:py-12">
        {/* Desktop: left sidebar */}
        <GuideDesktopSidebar modules={sidebarModules} currentSlug={mod.slug} />

        {/* Main content */}
        <article className="min-w-0 flex-1 max-w-3xl">
          {/* Progress bar */}
          <div className="mb-8">
            <GuideProgressBar current={mod.number} total={allModules.length} />
          </div>

          {/* Part label */}
          <p className="text-[12px] font-semibold text-accent-dark uppercase tracking-[0.12em] mb-3">
            {mod.partLabel}
          </p>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold text-alinea-950 leading-tight tracking-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {mod.title}
          </h1>

          <div className="flex items-center gap-4 text-[13px] text-alinea-400 mb-10">
            <span>Module {mod.number}/{allModules.length}</span>
            <span>-</span>
            <span>{mod.readTime} de lecture</span>
          </div>

          {/* Content */}
          <div
            className="prose guide-content"
            dangerouslySetInnerHTML={{ __html: mod.contentHtml }}
          />

          {/* Bottom navigation */}
          <nav className="flex items-center justify-between mt-16 pt-8 border-t border-alinea-200 gap-4">
            {prev ? (
              <Link
                href={`/guide/transfert-entreprise/${prev.slug}`}
                className="group flex items-center gap-2 text-[14px] text-alinea-500 hover:text-alinea-950 transition-colors max-w-[45%]"
              >
                <svg
                  className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="truncate">
                  <span className="text-alinea-400">Module {prev.number}.</span> {prev.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/guide/transfert-entreprise"
                className="text-[14px] text-alinea-500 hover:text-alinea-950 transition-colors"
              >
                &larr; Sommaire du guide
              </Link>
            )}
            {next ? (
              <Link
                href={`/guide/transfert-entreprise/${next.slug}`}
                className="group flex items-center gap-2 text-[14px] text-accent-dark hover:text-alinea-950 transition-colors font-medium max-w-[45%] text-right ml-auto"
              >
                <span className="truncate">
                  Module {next.number}. {next.title}
                </span>
                <svg
                  className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/guide/transfert-entreprise"
                className="text-[14px] text-accent-dark hover:text-alinea-950 transition-colors font-medium ml-auto"
              >
                Retour au sommaire &rarr;
              </Link>
            )}
          </nav>
        </article>

        {/* Table of contents (desktop right) */}
        <GuideTableOfContents headings={mod.headings} />
      </div>
    </div>
  );
}
