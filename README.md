# Alinéa

**Le droit et l'économie, sans le jargon.**

Alinéa est un média numérique indépendant propulsé par l'intelligence artificielle, sous direction éditoriale humaine. Il produit de l'analyse juridique et économique de qualité professionnelle — sourcée, vérifiable, actionnable — à destination des dirigeants, DRH, DAF et décideurs.

## La thèse

Les éditeurs juridiques traditionnels (Dalloz, LexisNexis, Lefebvre) facturent 3 000 à 15 000 €/an pour de l'information juridique destinée aux juristes. Les médias économiques grand public (Les Echos, Challenges) ne vont pas assez en profondeur sur le droit.

**Alinéa se positionne entre les deux** : la profondeur d'un éditeur juridique, l'accessibilité d'un média business, le format d'une newsletter moderne — à un coût de production quasi nul grâce à l'IA.

## Le positionnement

> L'information juridique et économique qui compte, expliquée pour ceux qui décident.

- **Cible** : dirigeants de PME/ETI, DRH, DAF, experts-comptables, CGP
- **Ton** : direct, factuel, pas de jargon, pas de langue de bois
- **Format** : newsletter + site web + LinkedIn
- **Différenciateur** : articles sourcés en temps réel depuis Légifrance, le BOSS, le Journal Officiel

## Stack technique

- **Frontend** : Next.js 15 + TypeScript + Tailwind CSS
- **Contenu** : articles en Markdown avec frontmatter (dans `content/articles/`)
- **Newsletter** : API intégrée (compatible Beehiiv, Resend, Mailchimp)
- **Génération** : pipeline IA connecté à Légifrance, BOSS, JORF, jurisprudence, conventions collectives

## Sources automatisées

Le pipeline de génération interroge directement les bases juridiques officielles :

| Source | API | Contenu |
|--------|-----|---------|
| **Légifrance — Jurisprudence** | JURI | Arrêts Cour de cassation, cours d'appel |
| **Légifrance — Codes** | CODE | Code du travail, Code civil, Code de commerce... |
| **Légifrance — Lois/Décrets** | LODA | Textes législatifs et réglementaires |
| **Journal Officiel** | JORF | Publications quotidiennes, décrets, arrêtés |
| **BOSS** | BOSS | Bulletin Officiel de la Sécurité Sociale |
| **Conventions collectives** | KALI | Articles et avenants des conventions |

Chaque article cite ses sources avec les références exactes (numéro de pourvoi, article de loi, numéro NOR).

## Structure du projet

```
alinea-media/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── page.tsx            # Homepage
│   │   ├── articles/           # Liste + pages articles
│   │   └── api/newsletter/     # API inscription newsletter
│   ├── components/             # Composants React
│   └── lib/                    # Utilitaires (parsing articles, etc.)
├── content/
│   └── articles/               # Articles en Markdown
├── scripts/
│   └── generate-article.ts     # Pipeline de génération
└── data/
    └── subscribers.json        # Base abonnés (local)
```

## Rubriques

- **Droit social** : analyses de fond sur le droit du travail
- **Jurisprudence** : décryptage des arrêts importants
- **Décryptage** : réformes, lois, décrets expliqués
- **Économie** : conjoncture et indicateurs pour décideurs
- **Alerte** : changements réglementaires urgents

## Business model

### Phase 1 — Acquisition (mois 1-6)
- Newsletter gratuite 2-3x/semaine
- Distribution via LinkedIn (profils Sofiane Coly + Loïc Guitton)
- Cross-promo avec d'autres newsletters business
- Objectif : 5 000 abonnés

### Phase 2 — Monétisation (mois 6-12)
- Sponsoring newsletter (30-80€ CPM sur cible dirigeants)
- Abonnement premium (analyses approfondies, 9-15€/mois)
- Objectif : 10 000 abonnés, 3 000-6 000€/mois

### Phase 3 — Scale (mois 12+)
- B2B : newsletters marque blanche pour cabinets, CGP, fintechs
- Événementiel : petits-déjeuners thématiques
- Lead generation pour cabinet DAIRIA Avocats
- Objectif : 20 000+ abonnés, 8 000-15 000€/mois

## Coûts d'exploitation

| Poste | Coût mensuel |
|-------|-------------|
| API IA (Claude) | 100-300€ |
| Plateforme newsletter | 0-50€ |
| Hébergement / domaine | 15€ |
| Temps éditorial humain | 30 min/jour |
| **Total** | **~200-500€/mois** |

## Direction éditoriale

- **Directeur de la publication** : Sofiane Coly
- **Éditeur** : DAIRIA Avocats
- **Production** : assistée par IA, supervisée par des avocats en exercice

## Développement

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## Licence

Contenu éditorial © Alinéa / DAIRIA Avocats — Tous droits réservés.
Code source sous licence MIT.
