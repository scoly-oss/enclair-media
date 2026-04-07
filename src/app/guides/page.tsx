import { getAllGuides } from "@/lib/guides";
import GuidesClient from "./GuidesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides pratiques | Droit du travail, RGPD, santé au travail",
  description:
    "Guides pratiques pour employeurs : visite médicale, RGPD en RH, surveillance des salariés, charte informatique. Étape par étape, accessible et sourcé.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Guides pratiques | Droit du travail, RGPD, santé au travail — En Clair",
    description:
      "Guides pratiques pour employeurs : visite médicale, RGPD en RH, surveillance des salariés, charte informatique. Étape par étape, accessible et sourcé.",
    type: "website",
    url: "https://enclair.media/guides",
    locale: "fr_FR",
    siteName: "En Clair",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides pratiques — En Clair",
    description:
      "Guides pratiques pour employeurs : visite médicale, RGPD en RH, surveillance des salariés, charte informatique.",
  },
};

export default async function GuidesPage() {
  const guides = await getAllGuides();
  return <GuidesClient guides={guides} />;
}
