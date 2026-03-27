"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-alinea-100">
      <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span
            className="text-2xl font-bold tracking-tight text-alinea-950"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            En Clair
          </span>
          <span className="text-[11px] text-alinea-400 tracking-[0.15em] uppercase mt-0.5">
            Droit · Économie · Décisions
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-alinea-500">
          <Link href="/articles" className="hover:text-alinea-900 transition-colors">
            Articles
          </Link>
          <Link href="/guides" className="hover:text-alinea-900 transition-colors">
            Guides
          </Link>
          <Link href="/apprendre" className="hover:text-alinea-900 transition-colors font-medium text-accent-dark">
            Apprendre
          </Link>
          <Link href="/rubriques" className="hover:text-alinea-900 transition-colors">
            Rubriques
          </Link>
          <Link href="/modeles" className="hover:text-alinea-900 transition-colors">
            Modèles
          </Link>
          <Link href="/a-propos" className="hover:text-alinea-900 transition-colors">
            À propos
          </Link>
          <Link
            href="/#newsletter"
            className="bg-alinea-950 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            S&apos;abonner
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-alinea-950 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-alinea-950 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-alinea-950 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-alinea-100 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-4 flex flex-col gap-4">
            <Link href="/articles" onClick={() => setMenuOpen(false)} className="text-[15px] text-alinea-600 hover:text-alinea-900 py-2">
              Articles
            </Link>
            <Link href="/guides" onClick={() => setMenuOpen(false)} className="text-[15px] text-alinea-600 hover:text-alinea-900 py-2">
              Guides
            </Link>
            <Link href="/apprendre" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-accent-dark py-2">
              Apprendre
            </Link>
            <Link href="/rubriques" onClick={() => setMenuOpen(false)} className="text-[15px] text-alinea-600 hover:text-alinea-900 py-2">
              Rubriques
            </Link>
            <Link href="/modeles" onClick={() => setMenuOpen(false)} className="text-[15px] text-alinea-600 hover:text-alinea-900 py-2">
              Modèles
            </Link>
            <Link href="/a-propos" onClick={() => setMenuOpen(false)} className="text-[15px] text-alinea-600 hover:text-alinea-900 py-2">
              À propos
            </Link>
            <Link
              href="/#newsletter"
              onClick={() => setMenuOpen(false)}
              className="bg-alinea-950 text-white px-5 py-3 rounded-lg text-[14px] font-medium text-center hover:bg-alinea-800 transition-colors"
            >
              S&apos;abonner
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
