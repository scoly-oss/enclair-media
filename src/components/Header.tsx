import Link from "next/link";

export default function Header() {
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
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-alinea-500">
          <Link href="/articles" className="hover:text-alinea-900 transition-colors">
            Articles
          </Link>
          <Link href="/apprendre" className="hover:text-alinea-900 transition-colors font-medium text-accent-dark">
            Apprendre
          </Link>
          <Link href="/rubriques" className="hover:text-alinea-900 transition-colors">
            Rubriques
          </Link>
          <Link href="/a-propos" className="hover:text-alinea-900 transition-colors">
            À propos
          </Link>
          <Link
            href="#newsletter"
            className="bg-alinea-950 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            S&apos;abonner
          </Link>
        </nav>
      </div>
    </header>
  );
}
