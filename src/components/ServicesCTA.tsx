import Link from "next/link";

const services = [
  {
    name: "DAIRIA Avocats",
    description:
      "Un litige prud'homal ? Un licenciement à sécuriser ? Une mise en demeure à gérer ? Nos avocats en droit social vous accompagnent.",
    cta: "Consulter un avocat",
    href: "https://dairia-avocats.fr",
    icon: "⚖️",
    color: "border-blue-200 hover:border-blue-400",
    bgHover: "hover:bg-blue-50",
  },
  {
    name: "DAIRIA IA",
    description:
      "Automatisez vos processus juridiques et RH. Analyse de contrats, veille réglementaire, conformité — propulsés par l'intelligence artificielle.",
    cta: "Découvrir nos solutions",
    href: "https://dairia-ia.fr",
    icon: "🤖",
    color: "border-purple-200 hover:border-purple-400",
    bgHover: "hover:bg-purple-50",
  },
  {
    name: "GérerMesAT/MP",
    description:
      "Taux AT/MP trop élevé ? Contestation de faute inexcusable ? Optimisez vos cotisations accidents du travail et maladies professionnelles.",
    cta: "Optimiser mes taux",
    href: "https://gerermesatmp.fr",
    icon: "📊",
    color: "border-emerald-200 hover:border-emerald-400",
    bgHover: "hover:bg-emerald-50",
  },
];

export default function ServicesCTA() {
  return (
    <section className="mb-14">
      <h2 className="text-sm font-semibold text-alinea-400 uppercase tracking-wide mb-4">
        Vous avez besoin d&apos;agir ?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <Link
            key={service.name}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`block border rounded-xl p-6 transition-all ${service.color} ${service.bgHover}`}
          >
            <div className="text-2xl mb-3">{service.icon}</div>
            <h3 className="font-bold text-alinea-950 text-lg">{service.name}</h3>
            <p className="mt-2 text-sm text-alinea-600 leading-relaxed">
              {service.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-alinea-950 underline decoration-accent underline-offset-4">
              {service.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
