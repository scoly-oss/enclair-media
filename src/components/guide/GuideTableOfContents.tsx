"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function GuideTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  // Only show h2 headings in the TOC for cleanliness
  const tocHeadings = headings.filter((h) => h.level === 2);
  if (tocHeadings.length === 0) return null;

  return (
    <div className="hidden xl:block w-56 shrink-0 sticky top-8 self-start">
      <button
        onClick={() => setOpen(!open)}
        className="text-[11px] font-semibold text-alinea-400 uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5 hover:text-alinea-600 transition-colors"
      >
        Sommaire du module
        <svg
          className={`w-3 h-3 transition-transform ${open ? "" : "-rotate-90"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <nav className="space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {tocHeadings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-[12px] py-1 pl-3 border-l-2 transition-colors leading-snug ${
                activeId === h.id
                  ? "border-accent text-alinea-950 font-medium"
                  : "border-transparent text-alinea-400 hover:text-alinea-700 hover:border-alinea-300"
              }`}
            >
              {h.text.length > 50 ? h.text.slice(0, 50) + "..." : h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
