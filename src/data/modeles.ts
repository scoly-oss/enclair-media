export interface Modele {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  keywords: string[];
}

export const categories = [
  'Embauche',
  'Avenants',
  'Rupture',
  'Rupture conventionnelle',
  'Discipline',
  'Organisation',
  'Accords / DUE',
  'IRP',
  'Divers',
] as const;

export type Category = (typeof categories)[number];

export const modeles: Modele[] = [
  // ── Embauche ──────────────────────────────────────────
  {
    slug: 'contrat-cdi-temps-plein',
    title: 'Contrat CDI temps plein',
    category: 'Embauche',
    description:
      "Modèle complet de contrat à durée indéterminée pour un emploi à temps plein. Inclut les clauses essentielles : période d'essai, rémunération, durée du travail, obligations, confidentialité.",
    longDescription:
      "Le contrat de travail à durée indéterminée (CDI) à temps plein est la forme normale et générale de la relation de travail (article L.1221-2 du Code du travail). Ce modèle couvre l'ensemble des clauses indispensables : identification des parties, fonctions et qualification, lieu de travail, durée du travail, rémunération, période d'essai et son renouvellement, obligations de loyauté et de confidentialité, clause de non-concurrence éventuelle.\n\nIl est recommandé de formaliser le CDI par écrit même si la loi ne l'impose pas strictement pour un temps plein. L'écrit permet de prouver les conditions convenues et de prévenir tout litige ultérieur. Ce modèle est conforme aux exigences du Code du travail et intègre les mentions obligatoires issues de la directive européenne 2019/1152 sur les conditions de travail transparentes.\n\nAttention : ce modèle doit être adapté à la convention collective applicable dans votre entreprise. Certaines conventions imposent des clauses spécifiques (classification, grille de salaires, durée de période d'essai). Vérifiez également les accords d'entreprise en vigueur.",
    keywords: ['CDI', 'contrat de travail', 'temps plein', 'embauche'],
  },
  {
    slug: 'contrat-cdi-temps-partiel',
    title: 'Contrat CDI temps partiel',
    category: 'Embauche',
    description:
      "Modèle de CDI à temps partiel conforme aux articles L.3123-6 et suivants du Code du travail. Mentions obligatoires : durée hebdomadaire, répartition, heures complémentaires.",
    longDescription:
      "Le contrat de travail à temps partiel doit obligatoirement être établi par écrit (article L.3123-6 du Code du travail). À défaut, le contrat est présumé à temps complet, ce qui expose l'employeur à un rappel de salaire conséquent. Ce modèle intègre toutes les mentions légales obligatoires : durée hebdomadaire ou mensuelle de travail, répartition entre les jours de la semaine ou les semaines du mois, limites des heures complémentaires, modalités de modification de la répartition.\n\nLa durée minimale de travail est fixée à 24 heures par semaine (sauf dérogations légales ou conventionnelles). Les heures complémentaires sont limitées à 1/10e de la durée contractuelle (ou 1/3 si accord de branche). Les heures complémentaires au-delà de 1/10e sont majorées de 25 %.\n\nCe modèle prévoit les clauses de priorité de passage à temps complet (obligation légale) et d'égalité de traitement avec les salariés à temps plein. Adaptez-le impérativement à votre convention collective qui peut prévoir des dispositions plus favorables.",
    keywords: ['CDI', 'temps partiel', 'contrat de travail', '24 heures'],
  },
  {
    slug: 'contrat-cdi-cadre-dirigeant',
    title: 'Contrat CDI cadre dirigeant',
    category: 'Embauche',
    description:
      "Modèle de CDI pour cadre dirigeant au sens de l'article L.3111-2 du Code du travail. Clauses spécifiques : autonomie, rémunération forfaitaire, exclusion de la durée du travail.",
    longDescription:
      "Le statut de cadre dirigeant est défini par l'article L.3111-2 du Code du travail : il s'agit des cadres auxquels sont confiées des responsabilités dont l'importance implique une grande indépendance dans l'organisation de leur emploi du temps, qui sont habilités à prendre des décisions de façon largement autonome et qui perçoivent une rémunération se situant dans les niveaux les plus élevés de l'entreprise.\n\nCe modèle est spécifiquement conçu pour ce profil. Il exclut l'application des dispositions relatives à la durée du travail, au repos quotidien et hebdomadaire, et aux jours fériés (sauf le 1er mai). La rémunération est forfaitaire et inclut tous les dépassements horaires. Le contrat prévoit des clauses renforcées de confidentialité, de non-concurrence et de loyauté.\n\nAttention : la qualification de cadre dirigeant fait l'objet d'un contentieux abondant. Les trois critères (responsabilités importantes, autonomie dans l'emploi du temps, rémunération parmi les plus élevées) sont cumulatifs. Un cadre qui ne remplit pas ces conditions pourrait revendiquer l'application du droit commun de la durée du travail, avec des conséquences financières majeures (rappels d'heures supplémentaires).",
    keywords: ['cadre dirigeant', 'CDI', 'forfait', 'autonomie', 'direction'],
  },
  {
    slug: 'contrat-cdi-forfait-jours',
    title: 'Contrat CDI forfait jours',
    category: 'Embauche',
    description:
      "Modèle de CDI avec convention de forfait en jours sur l'année. Conforme aux articles L.3121-58 et suivants. Inclut les garanties obligatoires de suivi de la charge de travail.",
    longDescription:
      "La convention de forfait en jours permet aux cadres autonomes et à certains salariés dont la durée du travail ne peut être prédéterminée de travailler selon un décompte en jours (et non en heures) sur l'année. Elle est encadrée par les articles L.3121-58 et suivants du Code du travail.\n\nCe modèle intègre les mentions essentielles : nombre de jours travaillés (maximum 218 par an sauf accord collectif), modalités de décompte, droit à la déconnexion, suivi de la charge de travail, entretien annuel obligatoire sur la charge de travail et l'articulation vie professionnelle/vie personnelle.\n\nLa convention de forfait en jours doit impérativement reposer sur un accord collectif (accord d'entreprise ou de branche) qui prévoit les garanties minimales. À défaut d'accord collectif conforme, la convention est nulle et le salarié peut réclamer le paiement d'heures supplémentaires. La Cour de cassation a annulé de nombreuses conventions de forfait pour insuffisance des garanties de suivi (Cass. soc., 29 juin 2011, n°09-71.107). Ce modèle prévoit les garanties exigées par la jurisprudence récente.",
    keywords: ['forfait jours', 'CDI', 'cadre autonome', '218 jours', 'charge de travail'],
  },
  {
    slug: 'fiche-de-poste',
    title: 'Fiche de poste',
    category: 'Embauche',
    description:
      "Modèle de fiche de poste structurée : intitulé, missions, compétences requises, conditions d'exercice, rattachement hiérarchique, critères d'évaluation.",
    longDescription:
      "La fiche de poste n'est pas un document juridiquement obligatoire, mais elle constitue un outil de gestion RH indispensable. Elle décrit de manière détaillée les missions, responsabilités, compétences requises et conditions d'exercice d'un poste. Elle sert de référence lors du recrutement, de l'évaluation annuelle et de la gestion des carrières.\n\nCe modèle structuré couvre : l'intitulé du poste, le rattachement hiérarchique et fonctionnel, la description des missions principales et secondaires, les compétences techniques et comportementales requises, les conditions d'exercice (lieu, déplacements, horaires), les moyens mis à disposition, les critères d'évaluation de la performance.\n\nLa fiche de poste joue un rôle important en cas de contentieux : elle permet de justifier un licenciement pour insuffisance professionnelle en objectivant les attendus du poste. Elle est également utile pour démontrer l'absence de modification du contrat de travail lors d'une réorganisation. Attention toutefois : la fiche de poste ne se substitue pas au contrat de travail et ne peut pas modifier unilatéralement les fonctions contractuelles du salarié.",
    keywords: ['fiche de poste', 'recrutement', 'missions', 'compétences', 'RH'],
  },

  // ── Avenants ──────────────────────────────────────────
  {
    slug: 'avenant-contrat-travail',
    title: 'Avenant au contrat de travail',
    category: 'Avenants',
    description:
      "Modèle d'avenant pour modifier un élément essentiel du contrat de travail : rémunération, fonctions, lieu de travail, durée du travail. Procédure de proposition et d'acceptation.",
    longDescription:
      "Toute modification d'un élément essentiel du contrat de travail (rémunération, qualification, durée du travail, lieu de travail lorsqu'il est contractualisé) nécessite l'accord exprès du salarié, formalisé par un avenant. L'employeur ne peut pas imposer unilatéralement une telle modification, sous peine de voir le salarié prendre acte de la rupture aux torts de l'employeur.\n\nCe modèle d'avenant couvre les situations les plus courantes : augmentation ou modification de la rémunération, changement de fonctions, modification du temps de travail, changement de lieu de travail. Il prévoit un délai de réflexion pour le salarié, conformément à la jurisprudence.\n\nEn cas de modification pour motif économique (article L.1222-6 du Code du travail), l'employeur doit adresser la proposition par lettre recommandée avec accusé de réception et le salarié dispose d'un délai d'un mois pour répondre. Le silence vaut acceptation. En dehors du motif économique, aucun délai légal n'est imposé mais un délai raisonnable est recommandé. Le refus du salarié ne constitue pas en soi un motif de licenciement.",
    keywords: ['avenant', 'modification contrat', 'rémunération', 'fonctions'],
  },
  {
    slug: 'avenant-clause-non-concurrence',
    title: 'Avenant clause de non-concurrence',
    category: 'Avenants',
    description:
      "Modèle d'avenant pour insérer, modifier ou supprimer une clause de non-concurrence. Conditions de validité, contrepartie financière, limites géographiques et temporelles.",
    longDescription:
      "La clause de non-concurrence interdit au salarié, après la rupture de son contrat, d'exercer une activité concurrente. Pour être valable, elle doit cumulativement : être indispensable à la protection des intérêts légitimes de l'entreprise, être limitée dans le temps et dans l'espace, tenir compte des spécificités de l'emploi du salarié, et prévoir une contrepartie financière (Cass. soc., 10 juillet 2002, n°00-45.135).\n\nCe modèle d'avenant permet d'introduire une clause de non-concurrence dans un contrat existant ou de modifier ses termes. Il prévoit une contrepartie financière versée mensuellement après la rupture du contrat (généralement entre 25 % et 50 % de la rémunération brute mensuelle).\n\nAttention aux points sensibles : une contrepartie dérisoire rend la clause nulle. L'employeur peut renoncer à la clause au moment de la rupture (dans le délai prévu par la convention collective ou, à défaut, dans un délai raisonnable). La clause doit être proportionnée : un périmètre géographique trop large ou une durée excessive (au-delà de 2 ans) risquent d'être jugés abusifs.",
    keywords: ['non-concurrence', 'avenant', 'contrepartie financière', 'clause'],
  },
  {
    slug: 'avenant-temps-travail',
    title: 'Avenant modification temps de travail',
    category: 'Avenants',
    description:
      "Modèle d'avenant pour modifier la durée du travail : passage temps plein/temps partiel, modification des horaires contractuels, forfait jours.",
    longDescription:
      "La durée du travail constitue un élément essentiel du contrat lorsqu'elle est contractualisée. Sa modification nécessite l'accord du salarié formalisé par un avenant. Ce principe s'applique notamment au passage de temps plein à temps partiel (et inversement), à la modification du volume horaire d'un temps partiel, ou à la mise en place d'un forfait jours.\n\nCe modèle couvre les principales hypothèses de modification du temps de travail. Il intègre les mentions obligatoires propres au temps partiel (répartition des horaires, heures complémentaires, priorité de retour à temps plein) et les clauses spécifiques au forfait jours (accord collectif applicable, nombre de jours, suivi de la charge).\n\nLe passage à temps partiel est un droit pour certains salariés (congé parental, création d'entreprise, maladie grave d'un proche). Le refus de l'employeur doit être motivé par des raisons objectives liées à l'activité. À l'inverse, l'employeur ne peut pas imposer un passage à temps partiel, même en cas de difficultés économiques, sans l'accord du salarié.",
    keywords: ['temps de travail', 'avenant', 'temps partiel', 'forfait jours', 'horaires'],
  },

  // ── Rupture ───────────────────────────────────────────
  {
    slug: 'lettre-licenciement-faute-grave',
    title: 'Lettre de licenciement pour faute grave',
    category: 'Rupture',
    description:
      "Modèle de lettre de licenciement pour faute grave. Expose les faits, la qualification juridique, les conséquences (absence de préavis et d'indemnité de licenciement).",
    longDescription:
      "Le licenciement pour faute grave sanctionne un fait ou un ensemble de faits imputables au salarié qui constituent une violation des obligations résultant du contrat de travail d'une importance telle qu'elle rend impossible le maintien du salarié dans l'entreprise, même pendant la durée du préavis (Cass. soc., 27 septembre 2007, n°06-43.867).\n\nLa lettre de licenciement fixe les limites du litige : les motifs qui y sont énoncés sont les seuls que le juge peut examiner. Ce modèle est conçu pour exposer les faits de manière précise, datée et circonstanciée, conformément aux exigences jurisprudentielles. Il rappelle les conséquences de la faute grave : absence de préavis (ou préavis non exécuté), absence d'indemnité de licenciement, maintien du droit aux indemnités de congés payés.\n\nLa procédure de licenciement pour faute grave doit être engagée dans un délai restreint après la connaissance des faits par l'employeur (pas de délai légal mais la jurisprudence exige une réaction rapide). La prescription des faits fautifs est de 2 mois (article L.1332-4 du Code du travail). La charge de la preuve de la faute grave incombe à l'employeur.",
    keywords: ['licenciement', 'faute grave', 'lettre', 'rupture', 'préavis'],
  },
  {
    slug: 'lettre-licenciement-economique',
    title: 'Lettre de licenciement économique',
    category: 'Rupture',
    description:
      "Modèle de lettre de licenciement pour motif économique individuel. Motif économique, recherche de reclassement, priorité de réembauche, CSP ou congé de reclassement.",
    longDescription:
      "Le licenciement économique est défini par l'article L.1233-3 du Code du travail : il résulte d'une suppression ou transformation d'emploi, ou d'une modification refusée d'un élément essentiel du contrat de travail, consécutive à des difficultés économiques, des mutations technologiques, une réorganisation nécessaire à la sauvegarde de la compétitivité ou une cessation d'activité.\n\nCe modèle de lettre intègre l'ensemble des mentions obligatoires : exposé précis du motif économique et de sa matérialité, mention de l'impossibilité de reclassement après recherche effective, proposition du contrat de sécurisation professionnelle (CSP) pour les entreprises de moins de 1 000 salariés, mention de la priorité de réembauche pendant 12 mois, délais de préavis applicables.\n\nLe licenciement économique individuel obéit à une procédure stricte : convocation à entretien préalable, entretien (au moins 5 jours ouvrables après présentation de la convocation), notification du licenciement (au moins 7 jours ouvrables après l'entretien, 15 jours pour les cadres). Le non-respect de ces délais rend le licenciement irrégulier. Ce modèle ne concerne que le licenciement individuel ; les procédures collectives obéissent à des règles spécifiques (consultation du CSE, plan de sauvegarde de l'emploi).",
    keywords: ['licenciement économique', 'motif économique', 'reclassement', 'CSP'],
  },
  {
    slug: 'rupture-periode-essai',
    title: "Courrier de rupture de période d'essai",
    category: 'Rupture',
    description:
      "Modèle de courrier de rupture de période d'essai par l'employeur. Respect du délai de prévenance, motivation non obligatoire mais recommandée.",
    longDescription:
      "La période d'essai permet à l'employeur d'évaluer les compétences du salarié et au salarié d'apprécier si les fonctions lui conviennent (article L.1221-20 du Code du travail). Pendant cette période, chaque partie peut rompre librement le contrat sans avoir à justifier d'un motif, sous réserve de respecter un délai de prévenance.\n\nLe délai de prévenance par l'employeur est fixé par l'article L.1221-25 : 24 heures en dessous de 8 jours de présence, 48 heures entre 8 jours et 1 mois, 2 semaines après 1 mois, 1 mois après 3 mois. Le non-respect du délai de prévenance ouvre droit à une indemnité compensatrice mais ne requalifie pas la rupture en licenciement.\n\nCe modèle est rédigé de manière factuelle. Bien que la loi n'impose pas de motiver la rupture de la période d'essai, il est recommandé d'indiquer des éléments objectifs liés aux compétences professionnelles pour se prémunir contre une action en abus de droit. La rupture de la période d'essai est abusive lorsqu'elle est fondée sur un motif étranger à l'évaluation des compétences (discrimination, état de santé, exercice d'un droit).",
    keywords: ['période d\'essai', 'rupture', 'délai de prévenance', 'essai'],
  },
  {
    slug: 'convocation-entretien-prealable',
    title: 'Convocation à entretien préalable',
    category: 'Rupture',
    description:
      "Modèle de convocation à entretien préalable au licenciement. Mentions obligatoires : objet, date, heure, lieu, droit à l'assistance.",
    longDescription:
      "La convocation à l'entretien préalable au licenciement est une étape obligatoire de la procédure de licenciement pour motif personnel ou économique (articles L.1232-2 et L.1233-11 du Code du travail). Son non-respect constitue une irrégularité de procédure ouvrant droit à une indemnité pouvant aller jusqu'à un mois de salaire.\n\nCe modèle intègre toutes les mentions obligatoires : objet de l'entretien (envisager un éventuel licenciement), date, heure et lieu de l'entretien, rappel du droit du salarié de se faire assister par une personne de son choix appartenant au personnel de l'entreprise ou, en l'absence de représentants du personnel, par un conseiller extérieur inscrit sur la liste départementale (avec indication de l'adresse de la mairie ou de l'inspection du travail où cette liste est consultable).\n\nLa convocation doit être adressée par lettre recommandée avec accusé de réception ou remise en main propre contre décharge. L'entretien ne peut avoir lieu moins de 5 jours ouvrables après la présentation de la lettre. Le salarié n'est pas tenu de se présenter ; son absence ne constitue pas une faute et n'empêche pas la poursuite de la procédure.",
    keywords: ['entretien préalable', 'convocation', 'licenciement', 'assistance'],
  },

  // ── Rupture conventionnelle ───────────────────────────
  {
    slug: 'convocation-rupture-conventionnelle',
    title: 'Convocation entretien rupture conventionnelle',
    category: 'Rupture conventionnelle',
    description:
      "Modèle de convocation à un entretien en vue d'une rupture conventionnelle. Rappel du droit à l'assistance et de la liberté de consentement.",
    longDescription:
      "La rupture conventionnelle (articles L.1237-11 et suivants du Code du travail) permet à l'employeur et au salarié de convenir d'un commun accord des conditions de la rupture du CDI. Elle suppose au moins un entretien au cours duquel les parties conviennent des conditions de la rupture.\n\nBien que la loi n'impose pas de formalisme particulier pour la convocation à cet entretien, il est fortement recommandé de formaliser cette invitation par écrit. Ce modèle rappelle le droit du salarié de se faire assister (par une personne de son choix dans l'entreprise ou, en l'absence de représentants du personnel, par un conseiller extérieur). Si le salarié se fait assister, l'employeur peut également se faire assister.\n\nLa liberté de consentement est un élément fondamental : la rupture conventionnelle peut être annulée si le consentement du salarié a été vicié (pression, harcèlement, contexte conflictuel). Ce modèle insiste sur le caractère volontaire de la démarche et l'absence de contrainte.",
    keywords: ['rupture conventionnelle', 'convocation', 'entretien', 'commun accord'],
  },
  {
    slug: 'retractation-rupture-conventionnelle',
    title: 'Courrier de rétractation rupture conventionnelle',
    category: 'Rupture conventionnelle',
    description:
      "Modèle de courrier de rétractation d'une rupture conventionnelle dans le délai de 15 jours calendaires. Exercice du droit de rétractation sans motivation.",
    longDescription:
      "Après la signature de la convention de rupture conventionnelle, chaque partie dispose d'un droit de rétractation de 15 jours calendaires (article L.1237-13 du Code du travail). Ce délai court à compter du lendemain de la date de signature de la convention. La rétractation n'a pas à être motivée et est un droit discrétionnaire.\n\nCe modèle de courrier permet d'exercer ce droit de rétractation dans les formes. Il est recommandé d'envoyer la rétractation par lettre recommandée avec accusé de réception ou par remise en main propre contre décharge pour se ménager une preuve de la date. Le cachet de la poste fait foi.\n\nLa rétractation a pour effet d'annuler la convention de rupture : le contrat de travail se poursuit dans les conditions antérieures. L'exercice du droit de rétractation ne peut donner lieu à aucune sanction ni constituer un motif de licenciement. L'absence de demande d'homologation après le délai de rétractation ne vaut pas rétractation implicite.",
    keywords: ['rétractation', 'rupture conventionnelle', '15 jours', 'droit de rétractation'],
  },

  // ── Discipline ────────────────────────────────────────
  {
    slug: 'lettre-avertissement',
    title: "Lettre d'avertissement",
    category: 'Discipline',
    description:
      "Modèle de lettre d'avertissement disciplinaire. Expose les faits reprochés, le rappel des obligations et les conséquences en cas de récidive.",
    longDescription:
      "L'avertissement est une sanction disciplinaire mineure qui n'a pas d'incidence immédiate sur la présence du salarié, sa fonction, sa carrière ou sa rémunération. Il constitue un rappel à l'ordre formel adressé au salarié pour un comportement fautif (article L.1331-1 du Code du travail).\n\nContrairement aux sanctions plus lourdes, l'avertissement ne nécessite pas d'entretien préalable (sauf si le règlement intérieur ou la convention collective le prévoit). Il doit être notifié par écrit et énoncer précisément les griefs reprochés au salarié. Il doit intervenir dans les 2 mois suivant la connaissance des faits par l'employeur.\n\nCe modèle décrit les faits de manière factuelle et datée, rappelle les obligations du salarié et les conséquences d'une éventuelle récidive. L'avertissement peut être contesté devant le conseil de prud'hommes. Attention : un avertissement ne peut pas être invoqué au-delà de 3 ans pour justifier une sanction ultérieure (article L.1332-5). L'accumulation d'avertissements peut justifier un licenciement pour faute si les manquements se répètent.",
    keywords: ['avertissement', 'sanction', 'discipline', 'rappel à l\'ordre'],
  },
  {
    slug: 'mise-a-pied-conservatoire',
    title: 'Notification de mise à pied conservatoire',
    category: 'Discipline',
    description:
      "Modèle de notification de mise à pied conservatoire dans l'attente d'une procédure disciplinaire. Distinction avec la mise à pied disciplinaire.",
    longDescription:
      "La mise à pied conservatoire est une mesure provisoire, distincte de la mise à pied disciplinaire. Elle permet à l'employeur d'écarter temporairement le salarié de l'entreprise dans l'attente de la décision définitive, lorsque les faits reprochés sont d'une gravité telle que le maintien du salarié dans l'entreprise est impossible, même provisoirement.\n\nLa mise à pied conservatoire n'est pas une sanction : elle est une mesure d'urgence qui doit être immédiatement suivie de l'engagement de la procédure disciplinaire (convocation à entretien préalable). À défaut, elle peut être requalifiée en mise à pied disciplinaire.\n\nCe modèle prévoit la notification de la mise à pied conservatoire avec précision de sa date d'effet et l'engagement simultané de la procédure disciplinaire. La durée de la mise à pied conservatoire n'est pas légalement limitée mais doit rester raisonnable. Si le licenciement pour faute grave est finalement prononcé, la période de mise à pied n'est pas rémunérée. Si la sanction est moindre, la période doit être rémunérée.",
    keywords: ['mise à pied', 'conservatoire', 'discipline', 'mesure provisoire'],
  },
  {
    slug: 'convocation-entretien-sanction',
    title: 'Convocation entretien préalable à sanction',
    category: 'Discipline',
    description:
      "Modèle de convocation à entretien préalable à une sanction disciplinaire (autre que l'avertissement). Mentions obligatoires et droit à l'assistance.",
    longDescription:
      "L'entretien préalable est obligatoire pour toute sanction disciplinaire ayant une incidence sur la présence du salarié, sa fonction, sa carrière ou sa rémunération (mise à pied disciplinaire, rétrogradation, mutation disciplinaire, licenciement). Il n'est pas obligatoire pour un simple avertissement, sauf disposition conventionnelle contraire.\n\nCe modèle de convocation respecte les exigences des articles L.1332-2 et R.1332-1 du Code du travail : indication de l'objet de l'entretien, date, heure et lieu, rappel du droit du salarié de se faire assister par une personne de son choix appartenant au personnel de l'entreprise.\n\nLa convocation doit être adressée par lettre recommandée ou remise en main propre contre décharge. L'entretien ne peut avoir lieu moins de 2 jours ouvrables après la notification (pour une sanction autre que le licenciement) ou 5 jours ouvrables (pour un licenciement). Au cours de l'entretien, l'employeur expose les motifs de la sanction envisagée et recueille les explications du salarié. La sanction ne peut intervenir moins de 2 jours ouvrables ni plus d'un mois après l'entretien.",
    keywords: ['entretien préalable', 'sanction', 'discipline', 'convocation'],
  },

  // ── Organisation ──────────────────────────────────────
  {
    slug: 'reglement-interieur',
    title: 'Règlement intérieur',
    category: 'Organisation',
    description:
      "Modèle de règlement intérieur conforme aux articles L.1321-1 et suivants. Hygiène, sécurité, discipline, harcèlement, droit de la défense, sanctions.",
    longDescription:
      "Le règlement intérieur est obligatoire dans les entreprises employant au moins 50 salariés (article L.1311-2 du Code du travail). Il fixe exclusivement les règles relatives à l'hygiène et la sécurité, la discipline (nature et échelle des sanctions), et rappelle les dispositions relatives au harcèlement moral et sexuel et aux agissements sexistes.\n\nCe modèle couvre l'ensemble du contenu obligatoire : règles d'hygiène et de sécurité, interdictions (alcool, drogues, tabac), utilisation des équipements de protection, procédure disciplinaire et échelle des sanctions, rappel des droits de la défense du salarié, dispositions relatives au harcèlement et à la discrimination, clause de neutralité le cas échéant.\n\nLe règlement intérieur doit être soumis pour avis au CSE avant sa mise en œuvre. Il doit être déposé au greffe du conseil de prud'hommes et communiqué à l'inspecteur du travail en deux exemplaires. Il ne peut contenir de clauses contraires aux lois, règlements, conventions et accords collectifs applicables, ni restreindre les droits des personnes ou les libertés individuelles au-delà de ce qui est justifié par la nature de la tâche à accomplir.",
    keywords: ['règlement intérieur', 'discipline', 'hygiène', 'sécurité', 'sanctions'],
  },
  {
    slug: 'charte-teletravail',
    title: 'Charte télétravail',
    category: 'Organisation',
    description:
      "Modèle de charte de télétravail unilatérale. Conditions d'éligibilité, modalités de mise en œuvre, équipements, droit à la déconnexion, contrôle du temps de travail.",
    longDescription:
      "Le télétravail désigne toute forme d'organisation du travail dans laquelle un travail qui aurait pu être exécuté dans les locaux de l'employeur est effectué hors de ces locaux de façon volontaire en utilisant les technologies de l'information (article L.1222-9 du Code du travail). Il peut être mis en place par accord collectif ou, à défaut, par une charte élaborée par l'employeur après avis du CSE.\n\nCe modèle de charte couvre : les conditions d'éligibilité au télétravail, les modalités de passage en télétravail et de retour sur site, les conditions de mise en œuvre (nombre de jours, plages horaires de disponibilité), la prise en charge des frais, les équipements fournis, les règles de sécurité informatique, le droit à la déconnexion, les modalités de contrôle du temps de travail.\n\nLe refus d'accorder le télétravail à un salarié qui occupe un poste éligible doit être motivé par l'employeur. Le refus du salarié d'accepter un poste en télétravail ne constitue pas un motif de licenciement. En cas de circonstances exceptionnelles (pandémie, force majeure), la mise en œuvre du télétravail peut être imposée sans l'accord du salarié.",
    keywords: ['télétravail', 'charte', 'travail à distance', 'déconnexion', 'remote'],
  },
  {
    slug: 'charte-informatique',
    title: 'Charte informatique',
    category: 'Organisation',
    description:
      "Modèle de charte d'utilisation des outils informatiques et numériques. Droits et obligations, usage personnel, messagerie, données personnelles, sanctions.",
    longDescription:
      "La charte informatique définit les règles d'utilisation des moyens informatiques mis à disposition des salariés par l'entreprise. Annexée au règlement intérieur, elle acquiert force obligatoire et permet de sanctionner les manquements. En dehors de cette annexion, elle constitue un document de référence mais les sanctions ne peuvent s'appuyer que sur le règlement intérieur.\n\nCe modèle couvre : les principes généraux d'utilisation (usage professionnel, tolérance d'un usage personnel raisonnable), les règles relatives à la messagerie électronique et à Internet, la gestion des mots de passe, la protection des données personnelles et du secret professionnel, les conditions de contrôle de l'activité par l'employeur (dans le respect de la vie privée), les sanctions applicables.\n\nLa charte doit respecter le RGPD et les recommandations de la CNIL. L'employeur ne peut pas accéder aux fichiers identifiés comme personnels par le salarié (sauf en présence de l'intéressé ou si celui-ci a été dûment appelé, ou en cas de risque grave). La mise en place d'outils de surveillance doit être proportionnée et les salariés doivent en être informés.",
    keywords: ['charte informatique', 'BYOD', 'messagerie', 'données', 'numérique'],
  },

  // ── Accords / DUE ─────────────────────────────────────
  {
    slug: 'accord-teletravail',
    title: "Accord d'entreprise télétravail",
    category: 'Accords / DUE',
    description:
      "Modèle d'accord collectif d'entreprise sur le télétravail. Négocié avec les délégués syndicaux ou approuvé par référendum. Cadre complet conforme à l'ANI 2020.",
    longDescription:
      "L'accord d'entreprise sur le télétravail est le mode privilégié de mise en place du télétravail (article L.1222-9 du Code du travail). Il prime sur la charte unilatérale et offre un cadre juridique plus sécurisé. Ce modèle est conforme à l'Accord National Interprofessionnel (ANI) du 26 novembre 2020 sur le télétravail.\n\nIl couvre : le champ d'application et les conditions d'éligibilité, les modalités d'acceptation et de mise en œuvre, les conditions de retour à une exécution sans télétravail (réversibilité), les modalités de contrôle du temps de travail et de régulation de la charge, la détermination des plages horaires de disponibilité, les équipements et leur maintenance, la prise en charge des frais professionnels, le droit à la déconnexion, les mesures de prévention de l'isolement.\n\nL'accord doit être négocié avec les délégués syndicaux ou, à défaut, selon les modalités dérogatoires prévues par le Code du travail (articles L.2232-21 et suivants). Il doit être déposé auprès de la DREETS et du greffe du conseil de prud'hommes.",
    keywords: ['accord télétravail', 'accord d\'entreprise', 'ANI', 'négociation'],
  },
  {
    slug: 'accord-amenagement-temps-travail',
    title: 'Accord aménagement du temps de travail',
    category: 'Accords / DUE',
    description:
      "Modèle d'accord d'aménagement du temps de travail sur une période supérieure à la semaine. Annualisation, modulation, heures supplémentaires, lissage de la rémunération.",
    longDescription:
      "L'accord d'aménagement du temps de travail permet de répartir la durée du travail sur une période supérieure à la semaine et au plus égale à l'année (articles L.3121-41 et suivants du Code du travail). Il remplace les anciens dispositifs de modulation et de cycles.\n\nCe modèle prévoit : la période de référence (trimestre, semestre ou année), les conditions de variation de la durée hebdomadaire, les limites hautes et basses, les conditions de prise en compte des absences et des arrivées/départs en cours de période, le décompte des heures supplémentaires (au-delà de 1 607 heures annuelles ou au-delà de la limite haute hebdomadaire), les modalités de lissage de la rémunération.\n\nL'accord doit prévoir les modalités d'information des salariés sur les changements de durée ou d'horaires (délai de prévenance de 7 jours minimum, sauf urgence). Il doit être compatible avec les contraintes de la convention collective. Pour les entreprises de moins de 50 salariés sans délégué syndical, l'accord peut être négocié avec un salarié mandaté ou approuvé par référendum à la majorité des 2/3.",
    keywords: ['aménagement temps de travail', 'annualisation', 'modulation', 'heures supplémentaires'],
  },
  {
    slug: 'due-prime-partage-valeur',
    title: 'DUE prime de partage de la valeur',
    category: 'Accords / DUE',
    description:
      "Modèle de décision unilatérale de l'employeur pour la mise en place de la prime de partage de la valeur (ex-prime Macron). Montant, bénéficiaires, versement.",
    longDescription:
      "La prime de partage de la valeur (PPV), anciennement prime exceptionnelle de pouvoir d'achat (PEPA ou « prime Macron »), peut être mise en place par décision unilatérale de l'employeur (DUE) après consultation du CSE (article 1er de la loi n°2022-1158 du 16 août 2022). Ce modèle de DUE formalise cette mise en place.\n\nIl prévoit : le montant de la prime (plafonné à 3 000 euros ou 6 000 euros en cas de mise en œuvre d'un dispositif d'intéressement ou de participation volontaire), les bénéficiaires (l'ensemble des salariés ou ceux dont la rémunération est inférieure à un plafond), les critères de modulation éventuels (rémunération, ancienneté, classification, durée de présence effective, temps de travail), la date de versement (possibilité de fractionner en 4 versements trimestriels maximum).\n\nLe régime fiscal et social de la PPV dépend du montant et de la rémunération du bénéficiaire. La DUE doit être précédée d'une information-consultation du CSE. Ce modèle intègre les mentions nécessaires pour sécuriser le dispositif et bénéficier des exonérations prévues par la loi.",
    keywords: ['PPV', 'prime partage valeur', 'DUE', 'prime Macron'],
  },
  {
    slug: 'due-complementaire-sante',
    title: 'DUE complémentaire santé',
    category: 'Accords / DUE',
    description:
      "Modèle de DUE pour la mise en place d'une complémentaire santé obligatoire. Panier de soins ANI, financement, dispenses d'affiliation, portabilité.",
    longDescription:
      "Depuis le 1er janvier 2016, tout employeur du secteur privé doit proposer une couverture complémentaire santé collective à ses salariés (article L.911-7 du Code de la sécurité sociale). La mise en place peut se faire par accord collectif, référendum ou décision unilatérale de l'employeur (DUE).\n\nCe modèle de DUE couvre : la description des garanties (conformes au minimum au panier de soins ANI : intégralité du ticket modérateur, forfait journalier hospitalier, frais dentaires et optiques à hauteur des planchers légaux), le financement (prise en charge d'au moins 50 % de la cotisation par l'employeur), les cas de dispense d'affiliation (CDD de courte durée, bénéficiaires de la CSS, salariés à temps très partiel), le caractère obligatoire de l'adhésion, la portabilité des droits après la rupture du contrat.\n\nLa DUE doit être remise individuellement à chaque salarié contre émargement. Le contrat d'assurance doit être « responsable » pour bénéficier des avantages fiscaux et sociaux. Ce modèle intègre les références réglementaires nécessaires et les cas de dispense légaux.",
    keywords: ['complémentaire santé', 'mutuelle', 'DUE', 'ANI', 'panier de soins'],
  },

  // ── IRP ───────────────────────────────────────────────
  {
    slug: 'convocation-cse',
    title: 'Convocation réunion CSE',
    category: 'IRP',
    description:
      "Modèle de convocation à une réunion ordinaire ou extraordinaire du CSE. Ordre du jour, délai de convocation, documents joints.",
    longDescription:
      "Le comité social et économique (CSE) se réunit au moins une fois par mois dans les entreprises d'au moins 300 salariés et au moins une fois tous les deux mois dans celles de 50 à 299 salariés (article L.2315-28 du Code du travail). Des réunions extraordinaires peuvent être convoquées à la demande de la majorité des membres ou en cas d'urgence.\n\nCe modèle de convocation intègre : l'ordre du jour (établi conjointement par le président et le secrétaire du CSE), la date, l'heure et le lieu de la réunion, les documents et informations nécessaires à la consultation. L'ordre du jour doit être communiqué aux membres du CSE au moins 3 jours avant la réunion.\n\nLe défaut de convocation ou le non-respect du délai constitue un délit d'entrave (article L.2317-1 du Code du travail). L'employeur doit veiller à convoquer l'ensemble des membres titulaires et les suppléants (qui ne siègent qu'en l'absence du titulaire). L'inspecteur du travail doit être informé de la date et de l'ordre du jour des réunions portant sur la santé, la sécurité et les conditions de travail.",
    keywords: ['CSE', 'convocation', 'ordre du jour', 'réunion', 'comité social'],
  },
  {
    slug: 'pv-consultation-salaries',
    title: 'PV de consultation des salariés',
    category: 'IRP',
    description:
      "Modèle de procès-verbal de consultation des salariés (référendum). Validation d'un accord d'entreprise ou approbation d'une DUE à la majorité des 2/3.",
    longDescription:
      "La consultation des salariés par référendum est prévue dans plusieurs hypothèses par le Code du travail : ratification d'un accord proposé par l'employeur dans les entreprises de moins de 11 salariés (article L.2232-21), validation d'un accord négocié avec un salarié mandaté, ou approbation d'un projet d'accord dans les entreprises de 11 à 20 salariés sans élu (article L.2232-23).\n\nCe modèle de procès-verbal formalise le déroulement de la consultation : date et heure du scrutin, question posée aux salariés, liste des salariés consultés, conditions du vote (secret, urne), résultats (nombre de votants, bulletins nuls, pour, contre), proclamation du résultat.\n\nL'accord est validé s'il est approuvé à la majorité des 2/3 du personnel. Le PV doit être annexé à l'accord lors de son dépôt auprès de la DREETS. Le scrutin doit intervenir dans un délai de 15 jours à compter de la communication du projet d'accord aux salariés. Les conditions de confidentialité et de sincérité du vote doivent être garanties.",
    keywords: ['référendum', 'consultation', 'PV', 'majorité 2/3', 'vote'],
  },

  // ── Divers ────────────────────────────────────────────
  {
    slug: 'delegation-pouvoirs',
    title: 'Délégation de pouvoirs',
    category: 'Divers',
    description:
      "Modèle de délégation de pouvoirs du dirigeant vers un collaborateur. Conditions de validité : compétence, autorité, moyens. Transfert de responsabilité pénale.",
    longDescription:
      "La délégation de pouvoirs est un mécanisme juridique par lequel le dirigeant transfère à un collaborateur une partie de ses pouvoirs et, corrélativement, la responsabilité pénale qui y est attachée. Elle est admise par la jurisprudence depuis longtemps (Cass. crim., 11 mars 1993, n°91-80.958) et est désormais consacrée par l'article 121-3 du Code pénal.\n\nPour être valable, la délégation doit réunir trois conditions cumulatives : le délégataire doit avoir la compétence technique nécessaire, l'autorité suffisante pour faire respecter la réglementation, et les moyens (humains, matériels, financiers) pour accomplir sa mission. La délégation doit être limitée dans son objet et précise dans son périmètre.\n\nCe modèle couvre : l'identification des parties, le domaine de la délégation (hygiène et sécurité, environnement, représentation du personnel...), les pouvoirs délégués, les moyens mis à disposition, la durée, les conditions de révocation. La délégation ne se présume pas et doit être acceptée expressément par le délégataire. Elle ne peut pas être consentie à un subordonné qui n'a pas le pouvoir de prendre les décisions nécessaires.",
    keywords: ['délégation de pouvoirs', 'responsabilité', 'dirigeant', 'pénal'],
  },
  {
    slug: 'accord-confidentialite',
    title: 'Accord de confidentialité (NDA)',
    category: 'Divers',
    description:
      "Modèle d'accord de confidentialité bilatéral (NDA). Définition des informations confidentielles, obligations, durée, exceptions, sanctions.",
    longDescription:
      "L'accord de confidentialité (ou Non-Disclosure Agreement, NDA) est un contrat par lequel les parties s'engagent à ne pas divulguer les informations confidentielles échangées dans le cadre de leurs discussions ou de leur relation commerciale. Il est essentiel lors de négociations précontractuelles, de partenariats, de cessions d'entreprise ou de projets collaboratifs.\n\nCe modèle bilatéral (les deux parties sont à la fois émetteur et récepteur d'informations confidentielles) couvre : la définition précise des informations confidentielles (par nature, par marquage ou par contexte), les obligations de confidentialité et de non-utilisation, les exceptions (informations déjà publiques, obtenues indépendamment, imposées par la loi), la durée de l'obligation, les modalités de restitution des informations, les sanctions en cas de violation.\n\nL'accord doit être suffisamment précis dans la définition des informations protégées pour être opposable. Une clause pénale prévoyant une indemnité forfaitaire en cas de violation renforce l'efficacité du dispositif. La durée de confidentialité est généralement de 2 à 5 ans après la fin de la relation.",
    keywords: ['NDA', 'confidentialité', 'secret', 'non-divulgation'],
  },
  {
    slug: 'entretien-professionnel',
    title: 'Trame entretien professionnel',
    category: 'Divers',
    description:
      "Modèle de trame pour l'entretien professionnel biennal. Bilan du parcours, perspectives d'évolution, besoins de formation, souhaits du salarié.",
    longDescription:
      "L'entretien professionnel est obligatoire tous les deux ans (article L.6315-1 du Code du travail) et doit être proposé systématiquement au salarié qui reprend son activité après certaines absences (congé maternité, congé parental, arrêt longue maladie, etc.). Il ne porte pas sur l'évaluation du travail du salarié mais sur ses perspectives d'évolution professionnelle.\n\nCe modèle de trame structurée couvre : le bilan de la période écoulée (formations suivies, certifications obtenues, progression salariale), l'évaluation des compétences acquises et à développer, les souhaits d'évolution du salarié (mobilité, promotion, reconversion), les besoins de formation identifiés, l'information sur le compte personnel de formation (CPF), la validation des acquis de l'expérience (VAE) et le conseil en évolution professionnelle (CEP).\n\nTous les 6 ans, un état des lieux récapitulatif doit vérifier que le salarié a bénéficié des entretiens prévus et d'au moins une action de formation non obligatoire. À défaut, dans les entreprises d'au moins 50 salariés, l'employeur doit abonder le CPF du salarié de 3 000 euros. Ce modèle intègre une section spécifique pour l'état des lieux sexennal.",
    keywords: ['entretien professionnel', 'formation', 'évolution', 'CPF', 'bilan'],
  },
  {
    slug: 'attestation-temoin',
    title: 'Attestation de témoin',
    category: 'Divers',
    description:
      "Modèle d'attestation de témoin conforme à l'article 202 du Code de procédure civile. Formalisme strict : identité, lien avec les parties, mention manuscrite.",
    longDescription:
      "L'attestation de témoin est un document écrit par lequel une personne relate des faits dont elle a eu personnellement connaissance. Elle est régie par les articles 200 à 203 du Code de procédure civile et doit respecter un formalisme strict pour être recevable en justice.\n\nCe modèle intègre toutes les mentions obligatoires de l'article 202 : identité complète du témoin (nom, prénoms, date et lieu de naissance, adresse, profession), lien de parenté, d'alliance, de subordination, de collaboration ou de communauté d'intérêts avec les parties, relation des faits auxquels le témoin a assisté ou qu'il a personnellement constatés, mention manuscrite selon laquelle le témoin sait que la fausse attestation l'expose à des sanctions pénales.\n\nL'attestation doit être accompagnée d'une copie de la pièce d'identité du témoin. Elle doit être rédigée de manière factuelle, sans appréciation juridique. L'attestation de complaisance ou mensongère est punie de peines pouvant aller jusqu'à 3 ans d'emprisonnement et 45 000 euros d'amende (article 441-7 du Code pénal). Ce modèle peut être utilisé devant toute juridiction (conseil de prud'hommes, tribunal judiciaire, tribunal de commerce).",
    keywords: ['attestation', 'témoin', 'article 202', 'preuve', 'justice'],
  },
];

export function getModeleBySlug(slug: string): Modele | undefined {
  return modeles.find((m) => m.slug === slug);
}

export function getModelesByCategory(category: string): Modele[] {
  return modeles.filter((m) => m.category === category);
}
