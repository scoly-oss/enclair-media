"use client";

import Link from "next/link";
import { useState } from "react";

interface ModuleLink {
  slug: string;
  number: number;
  title: string;
  part: string;
  partLabel: string;
}

interface GuideSidebarProps {
  modules: ModuleLink[];
  currentSlug: string;
}

const partOrder = ["fondamentaux", "mise-en-oeuvre", "situations-particulieres"];

function SidebarContent({
  grouped,
  currentSlug,
  onNavigate,
}: {
  grouped: { part: string; label: string; items: ModuleLink[] }[];
  currentSlug: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {grouped.map((group) => (
        <div key={group.part} className="mb-4">
          <p className="text-[11px] font-semibold text-alinea-400 uppercase tracking-[0.1em] mb-2 mt-3 first:mt-0">
            {group.label}
          </p>
          {group.items.map((m) => (
            <Link
              key={m.slug}
              href={`/guide/transfert-entreprise/${m.slug}`}
              onClick={onNavigate}
              className={`block py-1.5 pl-3 text-[13px] border-l-2 transition-colors ${
                m.slug === currentSlug
                  ? "border-accent text-alinea-950 font-medium"
                  : "border-transparent text-alinea-500 hover:text-alinea-800 hover:border-alinea-300"
              }`}
            >
              <span className="text-alinea-400 mr-1.5">{m.number}.</span>
              {m.title}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

export function GuideMobileNav({ modules, currentSlug }: GuideSidebarProps) {
  const [open, setOpen] = useState(false);
  const current = modules.find((m) => m.slug === currentSlug);

  const grouped = partOrder.map((part) => {
    const items = modules.filter((m) => m.part === part);
    return { part, label: items[0]?.partLabel ?? part, items };
  });

  return (
    <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-alinea-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-3 text-[14px] font-medium text-alinea-700"
      >
        <span className="truncate">
          Module {current?.number ?? "?"}/{modules.length} — {current?.title ?? ""}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <nav className="border-t border-alinea-100 bg-alinea-50 max-h-[60vh] overflow-y-auto px-4 py-3">
          <SidebarContent grouped={grouped} currentSlug={currentSlug} onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}

export function GuideDesktopSidebar({ modules, currentSlug }: GuideSidebarProps) {
  const grouped = partOrder.map((part) => {
    const items = modules.filter((m) => m.part === part);
    return { part, label: items[0]?.partLabel ?? part, items };
  });

  return (
    <aside className="hidden lg:block w-72 shrink-0 sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-y-auto pr-6">
      <Link
        href="/guide/transfert-entreprise"
        className="text-[13px] text-accent-dark font-medium hover:text-alinea-950 transition-colors mb-6 inline-block"
      >
        &larr; Tous les modules
      </Link>
      <nav>
        <SidebarContent grouped={grouped} currentSlug={currentSlug} />
      </nav>
    </aside>
  );
}

// Default export for backward compatibility
export default function GuideSidebar(props: GuideSidebarProps) {
  return (
    <>
      <GuideMobileNav {...props} />
      <GuideDesktopSidebar {...props} />
    </>
  );
}
