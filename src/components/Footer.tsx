export default function Footer() {
  return (
    <footer className="border-t border-alinea-200 bg-white mt-16">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-alinea-950 text-lg" style={{ fontFamily: "var(--font-serif)" }}>
              En Clair
            </h3>
            <p className="mt-2 text-sm text-alinea-500 leading-relaxed">
              Le droit et l&apos;économie qui comptent.<br />
              Sans le jargon. Sans le bruit.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-alinea-700 text-sm uppercase tracking-wide">Rubriques</h4>
            <ul className="mt-3 space-y-2 text-sm text-alinea-500">
              <li>Droit social</li>
              <li>Économie &amp; Finance</li>
              <li>Jurisprudence</li>
              <li>Décryptages</li>
              <li>Alertes réglementaires</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-alinea-700 text-sm uppercase tracking-wide">À propos</h4>
            <p className="mt-3 text-sm text-alinea-500 leading-relaxed">
              En Clair est un média indépendant propulsé par l&apos;intelligence artificielle,
              sous direction éditoriale humaine. Chaque source est vérifiable.
              Chaque analyse est sourcée.
            </p>
            <p className="mt-3 text-xs text-alinea-400">
              Direction de la publication :{" "}
              <a href="https://sofianecoly.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-alinea-600">
                Sofiane Coly
              </a>
              {" "}· Avocat au Barreau de Lyon
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-alinea-100 text-center text-xs text-alinea-400">
          © {new Date().getFullYear()} En Clair — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
