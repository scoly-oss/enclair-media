import Link from "next/link";

const resources = [
  {
    name: "Contentieux prud'homal",
    description:
      "Vous faites face à un litige ? Un cabinet spécialisé en droit social peut sécuriser votre procédure et défendre vos intérêts.",
    cta: "Trouver un avocat",
    href: "https://dairia-avocats.fr",
    icon: "⚖️",
    color: "border-alinea-200 hover:border-alinea-300",
    bgHover: "hover:bg-alinea-50",
  },
  {
    name: "IA & conformité RH",
    description:
      "La veille réglementaire et l'analyse de conformité peuvent être automatisées. Des solutions existent pour les PME.",
    cta: "Explorer les solutions",
    href: "https://dairia-ia.fr",
    icon: "⚡",
    color: "border-alinea-200 hover:border-alinea-300",
    bgHover: "hover:bg-alinea-50",
  },
  {
    name: "Cotisations AT/MP",
    description:
      "Votre taux de cotisation accidents du travail est peut-être trop élevé. Un audit peut identifier des leviers d'économie.",
    cta: "Faire un diagnostic",
    href: "https://gerermesatmp.fr",
    icon: "→",
    color: "border-alinea-200 hover:border-alinea-300",
    bgHover: "hover:bg-alinea-50",
  },
];

export default function ServicesCTA() {
  return (
    <section className="mb-14">
      <h2 className="text-sm font-semibold text-alinea-400 uppercase tracking-wide mb-4">
        Passer à l&apos;action
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((r) => (
          <Link
            key={r.name}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`block border rounded-xl p-6 transition-all ${r.color} ${r.bgHover}`}
          >
            <div className="text-xl mb-3 text-alinea-500">{r.icon}</div>
            <h3 className="font-semibold text-alinea-950">{r.name}</h3>
            <p className="mt-2 text-sm text-alinea-500 leading-relaxed">
              {r.description}
            </p>
            <span className="mt-3 inline-block text-sm text-alinea-600 underline underline-offset-4">
              {r.cta}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
