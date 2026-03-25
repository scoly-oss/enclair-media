import Link from "next/link";

interface ArticleCTAProps {
  type: "avocats" | "ia" | "atmp";
}

const ctas = {
  avocats: {
    text: "Besoin d'un avocat en droit social ?",
    sub: "DAIRIA Avocats accompagne les dirigeants sur les litiges prud'homaux, licenciements et contentieux.",
    href: "https://dairia-avocats.fr",
    label: "Prendre rendez-vous",
    bg: "bg-blue-50 border-blue-200",
  },
  ia: {
    text: "Automatisez votre veille juridique",
    sub: "DAIRIA IA met l'intelligence artificielle au service de votre conformité et de vos process RH.",
    href: "https://dairia-ia.fr",
    label: "En savoir plus",
    bg: "bg-purple-50 border-purple-200",
  },
  atmp: {
    text: "Vos cotisations AT/MP sont trop élevées ?",
    sub: "GérerMesAT/MP analyse votre taux, identifie les leviers et conteste pour vous.",
    href: "https://gerermesatmp.fr",
    label: "Faire un diagnostic",
    bg: "bg-emerald-50 border-emerald-200",
  },
};

export default function ArticleCTA({ type }: ArticleCTAProps) {
  const cta = ctas[type];
  return (
    <div className={`rounded-lg border p-5 my-8 ${cta.bg}`}>
      <p className="font-semibold text-alinea-950">{cta.text}</p>
      <p className="mt-1 text-sm text-alinea-600">{cta.sub}</p>
      <Link
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-alinea-950 underline decoration-accent underline-offset-4"
      >
        {cta.label} →
      </Link>
    </div>
  );
}
