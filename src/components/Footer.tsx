export default function Footer() {
  return (
    <footer className="border-t border-alinea-100 mt-10">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-xs">
            <h3
              className="font-bold text-alinea-950 text-xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              En Clair
            </h3>
            <p className="mt-3 text-[15px] text-alinea-500 leading-relaxed">
              Le droit et l&apos;économie qui comptent.
              Sans le jargon. Sans le bruit.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-[12px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-4">
                Rubriques
              </h4>
              <ul className="space-y-2.5 text-[15px] text-alinea-500">
                <li>Droit social</li>
                <li>Jurisprudence</li>
                <li>Décryptages</li>
                <li>Économie</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-medium text-alinea-400 uppercase tracking-[0.12em] mb-4">
                À propos
              </h4>
              <p className="text-[15px] text-alinea-500 leading-relaxed max-w-[200px]">
                Média indépendant, propulsé par l&apos;IA,
                sous direction éditoriale humaine.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-alinea-100 flex flex-col gap-3 md:flex-row md:justify-between text-[13px] text-alinea-400">
          <span>© {new Date().getFullYear()} En Clair — Tous droits réservés</span>
          <div className="flex gap-4 flex-wrap">
            <a href="/mentions-legales" className="hover:text-alinea-600 transition-colors">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-alinea-600 transition-colors">Confidentialité</a>
            <a
              href="https://sofianecoly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-alinea-600 transition-colors"
            >
              Sofiane Coly
            </a>
            <a
              href="https://dairia-avocats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-alinea-600 transition-colors"
            >
              DAIRIA Avocats
            </a>
            <a
              href="https://dairia.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-alinea-600 transition-colors"
            >
              DAIRIA IA
            </a>
            <a
              href="https://gerermesatmp.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-alinea-600 transition-colors"
            >
              GérerMesATMP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
