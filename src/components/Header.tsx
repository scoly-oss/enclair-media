import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-alinea-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-alinea-950" style={{ fontFamily: "var(--font-serif)" }}>
              En Clair
            </span>
            <span className="text-xs text-alinea-500 tracking-wide uppercase">
              Droit · Économie · Décisions
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-alinea-600">
          <Link href="/articles" className="hover:text-alinea-900 transition-colors">
            Articles
          </Link>
          <Link href="/a-propos" className="hover:text-alinea-900 transition-colors">
            À propos
          </Link>
          <Link href="#newsletter" className="bg-alinea-950 text-white px-4 py-2 rounded-md text-sm hover:bg-alinea-800 transition-colors">
            S&apos;abonner
          </Link>
        </nav>
      </div>
    </header>
  );
}
