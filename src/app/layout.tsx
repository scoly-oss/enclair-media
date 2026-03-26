import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BASE_URL = "https://enclair.media";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "En Clair — Ce qui peut vous coûter cher, avant que ça vous coûte cher",
    template: "%s — En Clair",
  },
  description:
    "Droit social, paie, jurisprudence — le brief hebdo pour les dirigeants, DRH, DAF et experts-comptables qui veulent voir les risques avant de les payer.",
  openGraph: {
    title: "En Clair — Le brief juridique hebdomadaire",
    description:
      "Ce qui peut vous coûter cher — avant que ça vous coûte cher. Le brief juridique pour ceux qui décident.",
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "En Clair",
  },
  twitter: {
    card: "summary_large_image",
    title: "En Clair — Le brief juridique hebdomadaire",
    description:
      "Ce qui peut vous coûter cher — avant que ça vous coûte cher. Le brief juridique pour ceux qui décident.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "En Clair",
    url: BASE_URL,
    description:
      "Le brief juridique hebdomadaire pour dirigeants, DRH et experts-comptables",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "En Clair",
      url: BASE_URL,
    },
  };

  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
