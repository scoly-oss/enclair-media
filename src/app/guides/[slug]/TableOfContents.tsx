"use client";

import { useState } from "react";

interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className="mb-12 border border-alinea-200 rounded-xl p-6 bg-alinea-50/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-[13px] font-medium text-alinea-500 uppercase tracking-[0.12em]">
          Sommaire
        </h2>
        <span className="text-alinea-400 text-sm">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <ol className="mt-4 space-y-2.5">
          {headings.map((heading, i) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className="flex items-start gap-3 text-[14px] text-alinea-600 hover:text-accent-dark transition-colors leading-snug"
              >
                <span className="text-alinea-400 font-medium shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{heading.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
