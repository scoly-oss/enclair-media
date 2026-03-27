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
  'Congés et absences',
  'Santé et sécurité',
  'Négociation et accords',
  'CSE',
  'RGPD et données',
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

  // ── Embauche compléments ────────────────────────────────
  {
    slug: 'cdd-remplacement',
    title: 'CDD de remplacement',
    category: 'Embauche',
    description:
      "Modèle de contrat à durée déterminée pour remplacement d'un salarié absent. Conforme aux articles L.1242-1 et suivants du Code du travail. Terme précis ou imprécis.",
    longDescription:
      "Le CDD de remplacement est l'un des motifs de recours les plus fréquents au contrat à durée déterminée. Il permet de remplacer un salarié absent (maladie, congé maternité, congé parental, congé sabbatique, etc.) ou dont le contrat est suspendu. Ce modèle intègre les deux options : terme précis (date de fin connue) ou terme imprécis (fin au retour du salarié remplacé, avec durée minimale obligatoire).\n\nLa mention du nom et de la qualification du salarié remplacé est obligatoire (article L.1242-12). Le CDD de remplacement peut être conclu avant le départ du salarié remplacé pour permettre un tuilage. Attention : depuis la loi du 21 décembre 2022, un même CDD de remplacement peut servir à remplacer plusieurs salariés absents (expérimentation dans certains secteurs).",
    keywords: ['CDD', 'remplacement', 'absence', 'contrat durée déterminée', 'intérim'],
  },
  {
    slug: 'cdd-accroissement',
    title: "CDD accroissement d'activité",
    category: 'Embauche',
    description:
      "Modèle de CDD pour accroissement temporaire de l'activité de l'entreprise. Durée maximale de 18 mois, renouvelable deux fois.",
    longDescription:
      "Le CDD pour accroissement temporaire d'activité (article L.1242-2, 2° du Code du travail) permet de faire face à une hausse ponctuelle de l'activité : surcroît de commandes, lancement de produit, projet exceptionnel, etc. La durée maximale est de 18 mois (renouvellements inclus), sauf dispositions conventionnelles. Le contrat doit mentionner précisément le motif de recours.\n\nAttention : le recours abusif à des CDD successifs pour accroissement d'activité peut entraîner la requalification en CDI si le poste correspond à un besoin permanent de l'entreprise. L'indemnité de précarité (10 %) est due en fin de contrat.",
    keywords: ['CDD', 'accroissement', 'surcroît', 'activité temporaire'],
  },
  {
    slug: 'cdd-saisonnier',
    title: 'CDD saisonnier',
    category: 'Embauche',
    description:
      "Modèle de CDD saisonnier conforme aux articles L.1242-2 et L.1244-2 du Code du travail. Clause de reconduction, pas d'indemnité de précarité.",
    longDescription:
      "Le CDD saisonnier est réservé aux emplois dont les tâches se répètent chaque année à des dates à peu près fixes, en fonction du rythme des saisons ou des modes de vie collectifs. Ce modèle inclut la possibilité d'une clause de reconduction d'une saison sur l'autre (article L.1244-2). Le CDD saisonnier ne donne pas droit à l'indemnité de précarité (article L.1243-10).\n\nLes secteurs concernés sont notamment l'agriculture, le tourisme, l'hôtellerie-restauration et l'agroalimentaire. L'ancienneté du salarié saisonnier est calculée en cumulant les durées des contrats successifs.",
    keywords: ['CDD', 'saisonnier', 'saison', 'tourisme', 'agriculture'],
  },
  {
    slug: 'contrat-apprentissage',
    title: "Contrat d'apprentissage",
    category: 'Embauche',
    description:
      "Modèle de contrat d'apprentissage conforme aux articles L.6221-1 et suivants. Formation en alternance, maître d'apprentissage, rémunération en pourcentage du SMIC.",
    longDescription:
      "Le contrat d'apprentissage est un contrat de travail en alternance permettant à un jeune (16 à 29 ans révolus, sauf dérogations) d'obtenir une qualification professionnelle sanctionnée par un diplôme ou un titre. Ce modèle couvre toutes les mentions obligatoires : identification du CFA, désignation du maître d'apprentissage, grille de rémunération par année.\n\nLa rupture est libre pendant les 45 premiers jours de formation pratique. Au-delà, la rupture est encadrée (accord des parties, licenciement, démission avec procédure spécifique). L'employeur bénéficie d'aides à l'embauche (jusqu'à 6 000 € pour les entreprises < 250 salariés).",
    keywords: ['apprentissage', 'alternance', 'CFA', 'formation', 'jeune'],
  },
  {
    slug: 'contrat-professionnalisation',
    title: 'Contrat de professionnalisation',
    category: 'Embauche',
    description:
      "Modèle de contrat de professionnalisation (CDD ou CDI) conforme aux articles L.6325-1 et suivants. Alternance, tuteur, qualification professionnelle.",
    longDescription:
      "Le contrat de professionnalisation permet à un salarié d'acquérir une qualification professionnelle reconnue (diplôme, titre, CQP). Il s'adresse aux jeunes de 16 à 25 ans, aux demandeurs d'emploi de 26 ans et plus, et aux bénéficiaires de minima sociaux. Il peut prendre la forme d'un CDD (6 à 12 mois, extensible à 36 mois) ou d'un CDI avec action de professionnalisation.\n\nLa durée de la formation représente entre 15 % et 25 % de la durée du contrat (minimum 150 heures), sauf accord de branche. La rémunération varie selon l'âge et le niveau de qualification.",
    keywords: ['professionnalisation', 'alternance', 'qualification', 'CQP', 'formation'],
  },
  {
    slug: 'convention-stage',
    title: 'Convention de stage',
    category: 'Embauche',
    description:
      "Modèle de convention de stage tripartite conforme aux articles L.124-1 et suivants du Code de l'éducation. Gratification, durée maximale, droits du stagiaire.",
    longDescription:
      "La convention de stage est obligatoire pour tout stage en entreprise. Elle est signée par trois parties : l'organisme d'accueil, l'établissement d'enseignement et le stagiaire. Ce modèle intègre toutes les mentions obligatoires : activités confiées, durée, horaires, gratification, tuteur et enseignant référent.\n\nLa durée maximale est de 6 mois par année d'enseignement. Au-delà de 2 mois, la gratification est obligatoire (minimum 4,35 €/heure en 2024). Le stagiaire bénéficie des titres-restaurant, du remboursement transport et de la protection contre le harcèlement.",
    keywords: ['stage', 'convention', 'stagiaire', 'gratification', 'étudiant'],
  },
  {
    slug: 'promesse-embauche',
    title: "Promesse unilatérale d'embauche",
    category: 'Embauche',
    description:
      "Modèle de promesse unilatérale d'embauche valant engagement ferme. Conforme à la jurisprudence Cass. soc. 21 septembre 2017. Délai d'acceptation.",
    longDescription:
      "La promesse unilatérale d'embauche est un acte par lequel l'employeur s'engage fermement à embaucher un candidat à des conditions définies (poste, rémunération, date d'entrée). Depuis les arrêts du 21 septembre 2017, la Cour de cassation distingue l'offre de contrat de travail (rétractable) de la promesse unilatérale (irrétractable).\n\nLa rétractation d'une promesse unilatérale avant l'expiration du délai d'acceptation constitue un licenciement sans cause réelle et sérieuse, ouvrant droit à dommages-intérêts. Ce modèle formalise l'engagement avec toutes les mentions essentielles.",
    keywords: ['promesse', 'embauche', 'engagement', 'offre', 'recrutement'],
  },
  {
    slug: 'lettre-engagement',
    title: "Lettre d'engagement",
    category: 'Embauche',
    description:
      "Modèle de lettre d'engagement confirmant les conditions d'embauche avant la signature du contrat. Documents à fournir, date de prise de poste.",
    longDescription:
      "La lettre d'engagement est un document de confirmation adressé au futur salarié récapitulant les conditions essentielles de son embauche : poste, rémunération, date d'entrée, avantages. Elle constitue un outil pratique de gestion RH, distinct de la promesse d'embauche. Elle liste également les documents à fournir le premier jour et annonce la remise du contrat de travail.\n\nCe modèle ne constitue pas en lui-même un contrat de travail mais permet de sécuriser la relation avant la prise de fonctions.",
    keywords: ['lettre', 'engagement', 'embauche', 'confirmation', 'intégration'],
  },
  {
    slug: 'registre-personnel',
    title: 'Registre unique du personnel',
    category: 'Embauche',
    description:
      "Modèle de registre unique du personnel conforme à l'article L.1221-13 du Code du travail. Mentions obligatoires, conservation 5 ans après le départ.",
    longDescription:
      "Le registre unique du personnel est un document obligatoire dans tout établissement employant des salariés (article L.1221-13). Il doit mentionner les noms, prénoms, nationalité, date de naissance, sexe, emploi, qualification, dates d'entrée et de sortie de chaque salarié, stagiaire ou intérimaire. Ce modèle inclut toutes les mentions obligatoires de l'article D.1221-23.\n\nLe registre doit être tenu à jour en temps réel et conservé 5 ans après le départ du salarié. Le défaut de tenue est sanctionné par une amende de 750 € par salarié concerné.",
    keywords: ['registre', 'personnel', 'obligation', 'embauche', 'DPAE'],
  },
  {
    slug: 'fiche-accueil',
    title: 'Fiche d\'accueil nouveau salarié',
    category: 'Embauche',
    description:
      "Modèle de fiche d'accueil et d'intégration du nouveau salarié. Checklist documents, formalités administratives, matériel, formation.",
    longDescription:
      "La fiche d'accueil est un outil RH indispensable pour structurer l'intégration d'un nouveau collaborateur. Ce modèle couvre l'ensemble du parcours d'onboarding : documents remis (contrat, règlement intérieur, charte informatique), documents collectés (identité, RIB, diplômes), formalités administratives (DPAE, registre du personnel, mutuelle, visite médicale), mise à disposition du matériel et planning de la première semaine.\n\nUne intégration réussie réduit significativement le turnover en période d'essai et accélère la montée en compétences du salarié.",
    keywords: ['accueil', 'intégration', 'onboarding', 'nouveau salarié', 'checklist'],
  },

  // ── Avenants compléments ────────────────────────────────
  {
    slug: 'avenant-temps-partiel',
    title: 'Avenant passage temps partiel',
    category: 'Avenants',
    description:
      "Modèle d'avenant pour passage à temps partiel. Répartition horaire, heures complémentaires, priorité de retour à temps plein.",
    longDescription:
      "Le passage d'un temps plein à un temps partiel constitue une modification du contrat de travail nécessitant l'accord du salarié formalisé par un avenant. Ce modèle intègre toutes les mentions obligatoires : nouvelle durée hebdomadaire, répartition des horaires, limites des heures complémentaires et priorité de retour à temps complet (article L.3123-3 du Code du travail).\n\nLa durée minimale de travail à temps partiel est de 24 heures hebdomadaires (sauf dérogations). L'avenant doit être signé avant la mise en œuvre du temps partiel.",
    keywords: ['avenant', 'temps partiel', 'réduction', 'horaires', '24 heures'],
  },
  {
    slug: 'avenant-promotion',
    title: 'Avenant promotion',
    category: 'Avenants',
    description:
      "Modèle d'avenant pour formaliser une promotion : nouveau poste, nouvelle classification, revalorisation salariale, période probatoire.",
    longDescription:
      "La promotion d'un salarié, lorsqu'elle modifie des éléments essentiels du contrat (fonctions, classification, rémunération), doit être formalisée par un avenant. Ce modèle prévoit la description du nouveau poste, la nouvelle classification conventionnelle, la revalorisation salariale et, le cas échéant, une période probatoire.\n\nEn cas de non-confirmation à l'issue de la période probatoire, le salarié retrouve son poste précédent ou un poste équivalent sans diminution de rémunération. La promotion ne peut jamais être imposée sans accord du salarié.",
    keywords: ['avenant', 'promotion', 'évolution', 'classification', 'rémunération'],
  },
  {
    slug: 'avenant-teletravail',
    title: 'Avenant télétravail',
    category: 'Avenants',
    description:
      "Modèle d'avenant formalisant le télétravail régulier. Rythme, plages de disponibilité, équipement, frais, réversibilité, droit à la déconnexion.",
    longDescription:
      "L'avenant de télétravail formalise les conditions du travail à distance conformément aux articles L.1222-9 et suivants du Code du travail. Il couvre le rythme (nombre de jours), les plages de disponibilité, l'équipement fourni, la prise en charge des frais (allocation forfaitaire URSSAF), la protection des données, la réversibilité et les règles en matière d'accident du travail.\n\nDepuis les ordonnances Macron de 2017, le télétravail peut être mis en place par accord collectif, charte ou simple accord entre employeur et salarié. L'avenant reste recommandé pour sécuriser la relation.",
    keywords: ['avenant', 'télétravail', 'remote', 'domicile', 'déconnexion'],
  },
  {
    slug: 'avenant-lieu-travail',
    title: 'Avenant changement lieu de travail',
    category: 'Avenants',
    description:
      "Modèle d'avenant pour modification du lieu de travail. Motif, mesures d'accompagnement, maintien des conditions.",
    longDescription:
      "Le changement de lieu de travail peut constituer une modification du contrat (si le lieu est contractualisé ou si le changement dépasse le même secteur géographique) ou un simple changement des conditions de travail. Ce modèle formalise l'accord du salarié en cas de modification contractuelle.\n\nLa jurisprudence apprécie la notion de secteur géographique au cas par cas (distance, temps de transport, desserte en transports en commun). Ce modèle prévoit les éventuelles mesures d'accompagnement (prise en charge du déménagement, prime de mobilité).",
    keywords: ['avenant', 'lieu de travail', 'mutation', 'mobilité', 'déménagement'],
  },
  {
    slug: 'avenant-forfait-jours',
    title: 'Avenant forfait jours',
    category: 'Avenants',
    description:
      "Modèle d'avenant instaurant une convention individuelle de forfait en jours. Garanties de suivi, droit à la déconnexion, entretien annuel.",
    longDescription:
      "La convention individuelle de forfait en jours doit être formalisée par un accord écrit du salarié (article L.3121-55). Ce modèle d'avenant installe le forfait jours pour un salarié déjà en poste, en s'appuyant sur l'accord collectif applicable. Il intègre toutes les garanties exigées par la jurisprudence : suivi mensuel de la charge, entretien annuel, droit d'alerte, droit à la déconnexion, respect des repos.\n\nSans ces garanties, la convention de forfait est nulle et le salarié peut réclamer le paiement d'heures supplémentaires sur 3 ans.",
    keywords: ['avenant', 'forfait jours', '218 jours', 'cadre autonome', 'suivi charge'],
  },

  // ── Discipline compléments ──────────────────────────────
  {
    slug: 'rappel-ordre',
    title: 'Lettre de rappel à l\'ordre',
    category: 'Discipline',
    description:
      "Modèle de rappel à l'ordre (non qualifié de sanction disciplinaire). Valeur préventive, pas de procédure disciplinaire requise.",
    longDescription:
      "Le rappel à l'ordre est une mesure préventive qui ne constitue pas une sanction disciplinaire au sens de l'article L.1331-1 du Code du travail. Il ne nécessite donc pas de procédure disciplinaire préalable (pas d'entretien préalable). Il permet d'alerter formellement le salarié sur un comportement inapproprié sans engager de procédure.\n\nAttention : si le rappel à l'ordre affecte la présence, la carrière ou la rémunération du salarié, il pourrait être requalifié en sanction disciplinaire par le juge, avec les conséquences d'une procédure irrégulière.",
    keywords: ['rappel à l\'ordre', 'avertissement informel', 'prévention', 'comportement'],
  },
  {
    slug: 'lettre-blame',
    title: 'Lettre de blâme',
    category: 'Discipline',
    description:
      "Modèle de notification d'un blâme (sanction disciplinaire). Inscription au dossier, pas d'impact sur la rémunération.",
    longDescription:
      "Le blâme est une sanction disciplinaire inscrite au dossier du salarié, plus sévère que l'avertissement mais sans impact sur la rémunération, la présence ou la carrière. Selon le règlement intérieur, la procédure disciplinaire complète (entretien préalable) peut ou non être requise.\n\nLe blâme doit être motivé et notifié dans le respect du délai de 2 mois à compter de la connaissance des faits (article L.1332-4). Il peut être contesté devant le conseil de prud'hommes dans un délai de 2 ans.",
    keywords: ['blâme', 'sanction', 'discipline', 'dossier'],
  },
  {
    slug: 'mise-a-pied-disciplinaire',
    title: 'Notification mise à pied disciplinaire',
    category: 'Discipline',
    description:
      "Modèle de notification de mise à pied disciplinaire. Suspension du contrat, privation de salaire, durée déterminée.",
    longDescription:
      "La mise à pied disciplinaire est une sanction qui suspend le contrat de travail pour une durée déterminée, avec privation de rémunération. Sa durée maximale est fixée par le règlement intérieur (obligatoire). Elle nécessite la procédure disciplinaire complète : convocation à un entretien préalable, entretien, notification motivée.\n\nAttention à ne pas confondre avec la mise à pied conservatoire (mesure d'attente dans le cadre d'une procédure de licenciement). La mise à pied disciplinaire doit être proportionnée à la faute commise (article L.1333-2).",
    keywords: ['mise à pied', 'disciplinaire', 'suspension', 'sanction', 'salaire'],
  },
  {
    slug: 'notification-retrogradation',
    title: 'Notification de rétrogradation',
    category: 'Discipline',
    description:
      "Modèle de notification de rétrogradation disciplinaire. Modification du contrat nécessitant l'accord du salarié, coupon-réponse.",
    longDescription:
      "La rétrogradation disciplinaire entraîne un changement de poste, de classification et/ou de rémunération. Comme elle constitue une modification du contrat de travail, elle nécessite l'accord exprès du salarié. En cas de refus, l'employeur peut soit renoncer à la sanction, soit prononcer une autre sanction pouvant aller jusqu'au licenciement.\n\nCe modèle inclut un coupon-réponse permettant au salarié de formaliser son acceptation ou son refus. La procédure disciplinaire complète (entretien préalable) est obligatoire.",
    keywords: ['rétrogradation', 'sanction', 'modification contrat', 'classification'],
  },
  {
    slug: 'convocation-conseil-discipline',
    title: 'Convocation conseil de discipline',
    category: 'Discipline',
    description:
      "Modèle de convocation devant le conseil de discipline. Composition, droits de la défense, procédure contradictoire.",
    longDescription:
      "Le conseil de discipline est une instance prévue par certaines conventions collectives ou règlements intérieurs. Il émet un avis (consultatif ou lié selon les textes) avant le prononcé de la sanction. Ce modèle de convocation informe le salarié de ses droits : assistance, production de documents, audition de témoins.\n\nLa composition du conseil, ses attributions et la portée de son avis dépendent des textes conventionnels applicables. Le non-respect de cette procédure peut entraîner l'annulation de la sanction.",
    keywords: ['conseil de discipline', 'convocation', 'procédure', 'défense'],
  },
  {
    slug: 'pv-conseil-discipline',
    title: 'PV de conseil de discipline',
    category: 'Discipline',
    description:
      "Modèle de procès-verbal de conseil de discipline. Composition, auditions, délibération, avis motivé, résultat du vote.",
    longDescription:
      "Le procès-verbal du conseil de discipline retrace le déroulement de la séance : composition du conseil, présentation des faits, audition du salarié et des témoins, délibération et avis. Ce modèle structuré permet de garantir le respect du contradictoire et de tracer la procédure.\n\nL'avis du conseil est consultatif (sauf disposition contraire de la convention collective). L'employeur n'est pas tenu de le suivre mais doit le prendre en considération. Le PV constitue une pièce importante en cas de contentieux.",
    keywords: ['PV', 'conseil de discipline', 'procès-verbal', 'avis', 'vote'],
  },
  {
    slug: 'mutation-disciplinaire',
    title: 'Lettre de mutation disciplinaire',
    category: 'Discipline',
    description:
      "Modèle de notification de mutation disciplinaire. Changement de lieu ou de poste, accord du salarié requis.",
    longDescription:
      "La mutation disciplinaire consiste à affecter le salarié à un autre poste ou un autre lieu de travail en raison d'un comportement fautif. Comme la rétrogradation, elle constitue une modification du contrat nécessitant l'accord du salarié. En cas de refus, l'employeur peut prononcer une sanction alternative.\n\nCe modèle inclut un coupon-réponse acceptation/refus et rappelle les conséquences d'un éventuel refus.",
    keywords: ['mutation', 'disciplinaire', 'affectation', 'sanction', 'transfert'],
  },

  // ── Rupture compléments ─────────────────────────────────
  {
    slug: 'licenciement-faute-simple',
    title: 'Lettre licenciement faute simple',
    category: 'Rupture',
    description:
      "Modèle de lettre de licenciement pour faute simple (cause réelle et sérieuse). Préavis dû, indemnité de licenciement, portabilité.",
    longDescription:
      "Le licenciement pour faute simple constitue un licenciement pour cause réelle et sérieuse. Le salarié conserve le droit au préavis (ou à l'indemnité compensatrice), à l'indemnité légale ou conventionnelle de licenciement et au maintien de la mutuelle/prévoyance (portabilité). Ce modèle intègre la motivation précise et circonstanciée des faits, exigée par l'article L.1232-6.\n\nDepuis les ordonnances de 2017, le salarié peut demander des précisions sur les motifs dans les 15 jours de la notification. Les motifs énoncés dans la lettre fixent les limites du litige.",
    keywords: ['licenciement', 'faute simple', 'cause réelle et sérieuse', 'préavis'],
  },
  {
    slug: 'licenciement-faute-lourde',
    title: 'Lettre licenciement faute lourde',
    category: 'Rupture',
    description:
      "Modèle de licenciement pour faute lourde (intention de nuire). Rupture immédiate, pas de préavis ni d'indemnité, congés payés maintenus.",
    longDescription:
      "La faute lourde se distingue de la faute grave par l'intention de nuire à l'entreprise. Elle entraîne la rupture immédiate du contrat sans préavis ni indemnité de licenciement. Depuis la décision du Conseil constitutionnel du 2 mars 2016, le salarié licencié pour faute lourde conserve son droit à l'indemnité compensatrice de congés payés.\n\nLa preuve de l'intention de nuire incombe à l'employeur. Les exemples classiques incluent le détournement de fonds, le sabotage, la divulgation de secrets commerciaux à un concurrent.",
    keywords: ['licenciement', 'faute lourde', 'intention de nuire', 'rupture immédiate'],
  },
  {
    slug: 'licenciement-insuffisance-pro',
    title: 'Lettre licenciement insuffisance professionnelle',
    category: 'Rupture',
    description:
      "Modèle de licenciement pour insuffisance professionnelle. Motif non disciplinaire, objectivation des carences, mesures d'accompagnement préalables.",
    longDescription:
      "L'insuffisance professionnelle constitue un motif de licenciement non disciplinaire. Elle se distingue de la faute : il ne s'agit pas d'un comportement volontaire mais d'une incapacité objective à remplir les fonctions confiées. L'employeur doit démontrer des insuffisances précises et vérifiables, les moyens mis à disposition du salarié et les actions d'accompagnement mises en œuvre (formation, tutorat, objectifs réajustés).\n\nLe salarié conserve tous ses droits : préavis, indemnité de licenciement, portabilité. Le barème Macron s'applique en cas de contestation.",
    keywords: ['licenciement', 'insuffisance professionnelle', 'incompétence', 'performance'],
  },
  {
    slug: 'licenciement-inaptitude',
    title: 'Lettre licenciement inaptitude',
    category: 'Rupture',
    description:
      "Modèle de licenciement pour inaptitude (professionnelle ou non). Recherche de reclassement, dispense, indemnités spécifiques.",
    longDescription:
      "Le licenciement pour inaptitude intervient après un avis d'inaptitude du médecin du travail et l'impossibilité de reclasser le salarié. Ce modèle distingue l'inaptitude d'origine professionnelle (articles L.1226-10 et suivants) de l'inaptitude non professionnelle (articles L.1226-2 et suivants), car les conséquences diffèrent.\n\nEn cas d'inaptitude professionnelle : indemnité spéciale doublée + indemnité compensatrice de préavis. En cas de dispense de reclassement par le médecin du travail (mention expresse dans l'avis), l'employeur n'a pas à rechercher de reclassement.",
    keywords: ['licenciement', 'inaptitude', 'reclassement', 'médecin du travail', 'AT/MP'],
  },
  {
    slug: 'mise-retraite',
    title: 'Notification mise à la retraite',
    category: 'Rupture',
    description:
      "Modèle de mise à la retraite par l'employeur. Conditions d'âge (67-70 ans), procédure d'interrogation, indemnité, préavis.",
    longDescription:
      "La mise à la retraite est la rupture du contrat à l'initiative de l'employeur lorsque le salarié a atteint l'âge légal. Elle est possible sans condition à 70 ans. Entre 67 et 70 ans, l'employeur doit interroger le salarié chaque année sur son intention de partir en retraite ; en cas de refus, il ne peut pas procéder à la mise à la retraite.\n\nL'indemnité de mise à la retraite est au moins égale à l'indemnité légale de licenciement. Le salarié bénéficie d'un préavis équivalent à celui du licenciement.",
    keywords: ['retraite', 'mise à la retraite', '70 ans', 'départ', 'seniors'],
  },
  {
    slug: 'accuse-reception-demission',
    title: 'Accusé réception démission',
    category: 'Rupture',
    description:
      "Modèle d'accusé de réception de la démission d'un salarié. Préavis, dispense éventuelle, obligations de fin de contrat.",
    longDescription:
      "L'accusé de réception de démission formalise la prise en compte de la décision du salarié de quitter l'entreprise. Il précise les modalités du préavis (exécution, dispense à l'initiative de l'employeur avec indemnité, ou dispense à la demande du salarié sans indemnité) et rappelle les obligations subsistantes (confidentialité, non-concurrence).\n\nLa démission doit résulter d'une volonté claire et non équivoque du salarié. En cas de doute, la requalification en prise d'acte ou en licenciement sans cause réelle et sérieuse est possible.",
    keywords: ['démission', 'accusé réception', 'préavis', 'départ volontaire'],
  },
  {
    slug: 'dispense-preavis',
    title: 'Dispense de préavis',
    category: 'Rupture',
    description:
      "Modèle de dispense d'exécution du préavis. Distinction selon l'initiative (employeur ou salarié), conséquences sur l'indemnité compensatrice.",
    longDescription:
      "La dispense de préavis permet au salarié de ne pas travailler pendant la période de préavis. Ses conséquences diffèrent selon qu'elle émane de l'employeur (indemnité compensatrice due) ou du salarié (pas d'indemnité). Ce modèle distingue clairement les deux situations et précise la date de fin effective du contrat.\n\nPendant la dispense à l'initiative de l'employeur, le contrat reste en cours : le salarié conserve ses obligations de loyauté et peut cumuler un nouvel emploi.",
    keywords: ['dispense', 'préavis', 'indemnité compensatrice', 'fin de contrat'],
  },
  {
    slug: 'recu-solde-tout-compte',
    title: 'Reçu pour solde de tout compte',
    category: 'Rupture',
    description:
      "Modèle de reçu pour solde de tout compte conforme à l'article L.1234-20. Détail des sommes, délai de dénonciation de 6 mois.",
    longDescription:
      "Le reçu pour solde de tout compte est un document obligatoire remis au salarié lors de la rupture du contrat. Il fait l'inventaire des sommes versées lors de la rupture. Le salarié dispose de 6 mois pour le dénoncer par lettre recommandée ; passé ce délai, le reçu devient libératoire pour l'employeur.\n\nCe modèle détaille chaque composante (salaire, indemnités, congés payés, primes) avec les montants bruts et nets. Le salarié n'est pas obligé de le signer ; s'il ne le signe pas, le reçu n'a pas d'effet libératoire.",
    keywords: ['solde de tout compte', 'reçu', 'fin de contrat', 'indemnités', 'dénonciation'],
  },

  // ── Congés et absences ──────────────────────────────────
  {
    slug: 'demande-conge',
    title: 'Formulaire demande de congé',
    category: 'Congés et absences',
    description:
      "Modèle de formulaire de demande de congé (CP, RTT, événement familial). Circuit de validation, solde de congés.",
    longDescription:
      "Ce formulaire standardisé permet au salarié de formaliser sa demande de congé (congés payés, RTT, congé sans solde, congé pour événement familial). Il intègre un circuit de validation : demande du salarié, décision du responsable hiérarchique, validation RH.\n\nLe formulaire précise le type de congé, les dates, le nombre de jours et le solde restant. L'employeur dispose du pouvoir de fixer les dates de congés et d'en refuser le report, sous réserve de respecter les règles légales et conventionnelles.",
    keywords: ['congé', 'demande', 'formulaire', 'CP', 'RTT', 'absence'],
  },
  {
    slug: 'refus-conge',
    title: 'Refus de congé motivé',
    category: 'Congés et absences',
    description:
      "Modèle de refus motivé d'une demande de congé. Nécessités de service, proposition de dates alternatives.",
    longDescription:
      "L'employeur peut refuser une demande de congés payés pour des raisons objectives liées aux nécessités de service (article L.3141-16). Le refus doit être motivé et notifié dans un délai raisonnable. Ce modèle propose une réponse structurée avec le motif du refus et une proposition de dates alternatives.\n\nAttention : le refus abusif ou discriminatoire de congés payés peut engager la responsabilité de l'employeur. Certains congés (maternité, paternité, événements familiaux) ne peuvent pas être refusés.",
    keywords: ['refus', 'congé', 'motivation', 'nécessités de service'],
  },
  {
    slug: 'convocation-contre-visite',
    title: 'Convocation contre-visite médicale',
    category: 'Congés et absences',
    description:
      "Modèle de convocation à une contre-visite médicale pendant un arrêt de travail. Droit de l'employeur, obligations du salarié.",
    longDescription:
      "L'employeur qui verse un complément de salaire pendant un arrêt maladie peut faire procéder à une contre-visite médicale par un médecin de son choix (article L.1226-1). Le salarié doit se soumettre à cette visite sous peine de perdre le bénéfice du maintien de salaire.\n\nLa contre-visite doit avoir lieu au domicile du salarié pendant les heures de sortie autorisées (ou à tout moment si l'arrêt est sans sortie). Ce modèle formalise la convocation avec les informations pratiques.",
    keywords: ['contre-visite', 'arrêt maladie', 'contrôle médical', 'maintien salaire'],
  },
  {
    slug: 'mise-en-demeure-absence',
    title: 'Mise en demeure absence injustifiée',
    category: 'Congés et absences',
    description:
      "Modèle de mise en demeure pour absence injustifiée. Sommation de justifier et reprendre le poste, avertissement disciplinaire.",
    longDescription:
      "Lorsqu'un salarié ne se présente pas à son poste sans justification, l'employeur doit le mettre en demeure de justifier son absence et de reprendre son travail avant d'engager toute procédure disciplinaire. Cette mise en demeure par LRAR constitue un préalable indispensable.\n\nL'absence injustifiée n'est plus présumée constituer une démission depuis la loi du 21 décembre 2022 (procédure de présomption de démission codifiée à l'article L.1237-1-1). L'employeur doit suivre cette procédure spécifique.",
    keywords: ['absence injustifiée', 'mise en demeure', 'abandon de poste', 'reprise'],
  },
  {
    slug: 'reponse-conge-sabbatique',
    title: 'Congé sabbatique réponse employeur',
    category: 'Congés et absences',
    description:
      "Modèle de réponse à une demande de congé sabbatique. Acceptation, report ou refus motivé (entreprises < 300 salariés).",
    longDescription:
      "Le congé sabbatique (6 à 11 mois) est un droit pour les salariés justifiant de 36 mois d'ancienneté et de 6 ans d'activité professionnelle. L'employeur peut accepter, reporter (si trop de salariés sont déjà absents) ou refuser (uniquement dans les entreprises de moins de 300 salariés, si le congé est préjudiciable à la bonne marche de l'entreprise).\n\nLe salarié dispose d'un recours devant le conseil de prud'hommes en cas de refus. Pendant le congé, le contrat est suspendu et aucune rémunération n'est versée.",
    keywords: ['congé sabbatique', 'réponse', 'report', 'refus', 'suspension contrat'],
  },
  {
    slug: 'reponse-conge-parental',
    title: 'Congé parental réponse',
    category: 'Congés et absences',
    description:
      "Modèle de réponse à une demande de congé parental d'éducation. Congé de droit, modalités (total ou temps partiel), rappels.",
    longDescription:
      "Le congé parental d'éducation est un droit pour tout salarié justifiant d'un an d'ancienneté (article L.1225-47). L'employeur ne peut pas le refuser. Ce modèle accuse réception de la demande et confirme les modalités : congé total (suspension du contrat) ou passage à temps partiel (minimum 16 heures).\n\nLe congé a une durée initiale d'un an, renouvelable deux fois, jusqu'au troisième anniversaire de l'enfant. L'ancienneté est prise en compte pour moitié. Au retour, le salarié retrouve son emploi ou un emploi similaire.",
    keywords: ['congé parental', 'éducation', 'temps partiel', 'enfant', 'PreParE'],
  },
  {
    slug: 'accord-don-jours',
    title: 'Don de jours de repos',
    category: 'Congés et absences',
    description:
      "Modèle d'accord d'entreprise organisant le don de jours de repos entre salariés. Loi Mathys, bénéficiaires, jours cessibles.",
    longDescription:
      "Le don de jours de repos (loi Mathys du 9 mai 2014, articles L.1225-65-1 et L.1225-65-2) permet à un salarié de renoncer anonymement à des jours de repos au profit d'un collègue dont un proche est gravement malade. Ce modèle d'accord définit les bénéficiaires, les jours cessibles (5e semaine de CP, RTT, repos compensateurs), la procédure et les conditions de maintien de la rémunération du bénéficiaire.\n\nLe don est volontaire, anonyme et sans contrepartie. L'absence du bénéficiaire est assimilée à du temps de travail effectif.",
    keywords: ['don de jours', 'repos', 'solidarité', 'maladie', 'loi Mathys'],
  },
  {
    slug: 'notification-report-cp',
    title: 'Report congés payés',
    category: 'Congés et absences',
    description:
      "Modèle de notification de report de congés payés non pris. Délai de report, motifs légitimes, conséquences.",
    longDescription:
      "Les congés payés non pris avant la fin de la période de prise (généralement le 31 mai) sont en principe perdus, sauf report autorisé. Ce modèle notifie au salarié les conditions du report : motif (arrêt maladie, impossibilité imputable à l'employeur, accord collectif), délai pour les poser et conséquences en l'absence de prise.\n\nDepuis les arrêts de la Cour de cassation du 13 septembre 2023, les congés payés s'acquièrent également pendant les arrêts maladie, avec un droit au report de 15 mois.",
    keywords: ['report', 'congés payés', 'CP', 'délai', 'non pris'],
  },

  // ── Santé et sécurité ───────────────────────────────────
  {
    slug: 'signalement-danger',
    title: 'Fiche de signalement danger grave',
    category: 'Santé et sécurité',
    description:
      "Modèle de fiche de signalement d'un danger grave et imminent. Registre spécial, droit de retrait, enquête et mesures correctives.",
    longDescription:
      "La fiche de signalement d'un danger grave et imminent est l'outil formalisé du droit d'alerte prévu par les articles L.4131-1 et L.4132-2 du Code du travail. Tout salarié ou représentant du personnel qui constate un danger grave et imminent doit en alerter l'employeur. Le signalement est inscrit au registre spécial (article D.4132-1).\n\nL'employeur doit immédiatement prendre les mesures nécessaires et procéder à une enquête. Le salarié peut exercer son droit de retrait sans encourir de sanction ni de retenue de salaire.",
    keywords: ['danger', 'signalement', 'droit de retrait', 'alerte', 'registre'],
  },
  {
    slug: 'declaration-at',
    title: 'Déclaration accident du travail',
    category: 'Santé et sécurité',
    description:
      "Modèle de déclaration d'accident du travail (DAT). Circonstances, témoins, lésions. Délai de 48 heures à la CPAM.",
    longDescription:
      "L'employeur est tenu de déclarer tout accident du travail à la CPAM dans les 48 heures (hors dimanche et jours fériés), sous peine de sanctions pénales (article L.441-2 du Code de la sécurité sociale). Ce modèle structuré couvre toutes les informations requises : identité de la victime, circonstances de l'accident, nature des lésions, témoins, premiers soins.\n\nL'employeur peut formuler des réserves motivées dans le même délai. La déclaration peut être effectuée en ligne sur net-entreprises.fr.",
    keywords: ['accident du travail', 'DAT', 'déclaration', 'CPAM', '48 heures'],
  },
  {
    slug: 'reserves-motivees-at',
    title: 'Réserves motivées AT',
    category: 'Santé et sécurité',
    description:
      "Modèle de réserves motivées sur le caractère professionnel d'un accident du travail. Contestation, motifs, instruction CPAM.",
    longDescription:
      "L'employeur peut formuler des réserves motivées sur le caractère professionnel d'un accident déclaré (article R.441-6 du Code de la sécurité sociale). Les réserves doivent être précises et circonstanciées (absence de témoin, déclaration tardive, incohérence des circonstances, etc.). Elles déclenchent une instruction contradictoire par la CPAM.\n\nLes réserves doivent être envoyées à la CPAM dans le même délai que la DAT (en pratique, accompagner ou suivre immédiatement la déclaration). Des réserves bien motivées peuvent conduire au refus de prise en charge.",
    keywords: ['réserves', 'accident du travail', 'contestation', 'CPAM', 'instruction'],
  },
  {
    slug: 'convocation-visite-medicale',
    title: 'Convocation visite médicale',
    category: 'Santé et sécurité',
    description:
      "Modèle de convocation à la visite médicale du travail. VIP, examen d'aptitude, visite de reprise, visite de mi-carrière.",
    longDescription:
      "L'employeur est responsable de l'organisation des visites médicales obligatoires auprès du service de santé au travail. Ce modèle couvre toutes les situations : visite d'information et de prévention (VIP) à l'embauche, examen d'aptitude pour les postes à risques, visite de reprise après un arrêt prolongé, visite de mi-carrière.\n\nLe temps consacré à la visite est considéré comme du temps de travail effectif. Le refus du salarié de se soumettre à la visite médicale peut constituer un motif de sanction disciplinaire.",
    keywords: ['visite médicale', 'médecine du travail', 'VIP', 'aptitude', 'reprise'],
  },
  {
    slug: 'plan-prevention',
    title: 'Plan de prévention coactivité',
    category: 'Santé et sécurité',
    description:
      "Modèle de plan de prévention pour les opérations de coactivité avec des entreprises extérieures. Analyse des risques, mesures de sécurité.",
    longDescription:
      "Le plan de prévention est obligatoire lorsqu'une entreprise extérieure intervient dans les locaux de l'entreprise utilisatrice et que l'opération présente des risques liés à la coactivité (articles R.4512-6 et suivants). Il est systématiquement requis pour les travaux dangereux (liste fixée par arrêté) ou lorsque le volume d'heures dépasse 400 heures sur 12 mois.\n\nCe modèle structuré couvre l'inspection commune préalable, l'analyse croisée des risques, les mesures de prévention, les consignes de sécurité et le suivi.",
    keywords: ['plan de prévention', 'coactivité', 'entreprise extérieure', 'risques', 'sécurité'],
  },
  {
    slug: 'consignes-securite',
    title: 'Consignes de sécurité incendie',
    category: 'Santé et sécurité',
    description:
      "Modèle de consignes de sécurité incendie à afficher. Alerte, évacuation, point de rassemblement, organisation de la sécurité.",
    longDescription:
      "Les consignes de sécurité incendie doivent être affichées de manière visible dans chaque local de travail (article R.4227-37 du Code du travail). Elles sont obligatoires dans les établissements de plus de 50 salariés et ceux manipulant des matières inflammables. Ce modèle couvre : l'alerte, la lutte contre le feu, l'évacuation, le point de rassemblement et l'organisation de la sécurité (équipiers d'évacuation, SST).\n\nDes exercices d'évacuation doivent être organisés au minimum tous les 6 mois (article R.4227-39).",
    keywords: ['incendie', 'sécurité', 'évacuation', 'consignes', 'affichage obligatoire'],
  },
  {
    slug: 'fiche-penibilite',
    title: 'Fiche pénibilité poste',
    category: 'Santé et sécurité',
    description:
      "Modèle de fiche d'évaluation de la pénibilité au poste de travail. Facteurs de risques, seuils, C2P, mesures de prévention.",
    longDescription:
      "La fiche d'évaluation de la pénibilité permet d'identifier et de quantifier l'exposition des salariés aux 6 facteurs de risques professionnels du Compte Professionnel de Prévention (C2P) : activités en milieu hyperbare, températures extrêmes, bruit, travail de nuit, travail en équipes successives alternantes, travail répétitif.\n\nL'employeur doit déclarer les expositions dépassant les seuils réglementaires via la DSN. Les salariés exposés cumulent des points C2P permettant de financer des formations, un passage à temps partiel ou un départ anticipé en retraite.",
    keywords: ['pénibilité', 'C2P', 'facteurs de risques', 'exposition', 'prévention'],
  },

  // ── Négociation et accords ──────────────────────────────
  {
    slug: 'accord-nao',
    title: 'Accord NAO',
    category: 'Négociation et accords',
    description:
      "Modèle d'accord de négociation annuelle obligatoire (NAO). Rémunération, temps de travail, partage de la valeur ajoutée.",
    longDescription:
      "La négociation annuelle obligatoire (NAO) est imposée dans les entreprises dotées d'au moins un délégué syndical (articles L.2242-1 et suivants). Elle porte sur : les salaires effectifs, la durée et l'organisation du temps de travail, le partage de la valeur ajoutée (intéressement, participation, épargne salariale, PPV).\n\nCe modèle d'accord couvre les principales mesures négociées : augmentation générale, enveloppe d'augmentations individuelles, primes, mesures sur le temps de travail. L'accord est déposé sur TéléAccords et au greffe du CPH.",
    keywords: ['NAO', 'négociation annuelle', 'salaires', 'augmentation', 'valeur ajoutée'],
  },
  {
    slug: 'accord-egalite-pro',
    title: 'Accord égalité professionnelle',
    category: 'Négociation et accords',
    description:
      "Modèle d'accord sur l'égalité professionnelle femmes-hommes. Index égalité, objectifs, indicateurs de suivi, actions correctives.",
    longDescription:
      "L'accord relatif à l'égalité professionnelle est obligatoire dans les entreprises de 50 salariés et plus (articles L.2242-17 et suivants). Il doit couvrir au moins 3 domaines parmi 9 (dont obligatoirement la rémunération) : embauche, formation, promotion, qualification, classification, conditions de travail, sécurité et santé, rémunération, articulation vie pro/perso.\n\nCe modèle intègre des objectifs chiffrés, des indicateurs de suivi et des actions concrètes. L'absence d'accord expose l'entreprise à une pénalité financière pouvant atteindre 1 % de la masse salariale.",
    keywords: ['égalité professionnelle', 'femmes-hommes', 'index', 'rémunération', 'discrimination'],
  },
  {
    slug: 'accord-gepp',
    title: 'Accord GPEC/GEPP',
    category: 'Négociation et accords',
    description:
      "Modèle d'accord GEPP (ex-GPEC). Cartographie des emplois, formation, mobilité interne, accompagnement des parcours, seniors.",
    longDescription:
      "La négociation sur la gestion des emplois et des parcours professionnels (GEPP, ex-GPEC) est obligatoire tous les 3 ans dans les entreprises de 300 salariés et plus (article L.2242-20). Elle vise à anticiper les évolutions des emplois et des compétences.\n\nCe modèle couvre : le diagnostic et la cartographie des emplois (stables, en tension, en évolution, menacés, émergents), le plan de développement des compétences, la mobilité interne, l'accompagnement des parcours et les mesures spécifiques pour les seniors.",
    keywords: ['GEPP', 'GPEC', 'compétences', 'emplois', 'mobilité', 'formation'],
  },
  {
    slug: 'accord-interessement',
    title: 'Accord intéressement',
    category: 'Négociation et accords',
    description:
      "Modèle d'accord d'intéressement. Formule de calcul, critères de performance, répartition, plafonds, affectation épargne salariale.",
    longDescription:
      "L'intéressement est un dispositif facultatif d'épargne salariale permettant d'associer les salariés aux résultats ou aux performances de l'entreprise (articles L.3312-1 et suivants). Ce modèle d'accord définit la formule de calcul (résultat ou critères de performance), les modalités de répartition (uniforme, proportionnelle au salaire ou au temps de présence) et les conditions de versement.\n\nL'intéressement bénéficie d'exonérations sociales et fiscales. Le montant global ne peut excéder 20 % de la masse salariale, et le montant individuel est plafonné à 75 % du PASS. L'accord doit être déposé sur TéléAccords dans les 15 jours.",
    keywords: ['intéressement', 'épargne salariale', 'performance', 'prime', 'PEE'],
  },
  {
    slug: 'accord-participation',
    title: 'Accord participation',
    category: 'Négociation et accords',
    description:
      "Modèle d'accord de participation aux résultats. Formule légale ou dérogatoire, répartition, blocage 5 ans, cas de déblocage anticipé.",
    longDescription:
      "La participation est obligatoire dans les entreprises de 50 salariés et plus (article L.3322-2). Elle permet de redistribuer une part des bénéfices aux salariés. Ce modèle propose la formule légale (RSP = 1/2 x (B - 5%C) x S/VA) et la possibilité d'une formule dérogatoire (au moins aussi favorable).\n\nLes sommes sont bloquées 5 ans (sauf cas de déblocage anticipé : mariage, naissance du 3e enfant, divorce, achat résidence principale, etc.). L'accord définit les supports de placement (PEE, PERECO, compte courant bloqué).",
    keywords: ['participation', 'bénéfices', 'épargne salariale', 'blocage', 'RSP'],
  },
  {
    slug: 'accord-forfait-jours',
    title: 'Accord forfait jours',
    category: 'Négociation et accords',
    description:
      "Modèle d'accord collectif instaurant le forfait annuel en jours. Salariés éligibles, 218 jours, garanties de suivi, déconnexion.",
    longDescription:
      "L'accord collectif sur le forfait jours est le préalable indispensable à la conclusion de conventions individuelles de forfait (article L.3121-63). Il doit définir : les catégories de salariés éligibles, le nombre de jours travaillés (max 218), les modalités de suivi de la charge de travail, le droit à la déconnexion et les garanties de repos.\n\nLa Cour de cassation annule les conventions de forfait lorsque l'accord collectif ne prévoit pas de garanties suffisantes de suivi de la charge de travail. Ce modèle intègre toutes les garanties exigées par la jurisprudence.",
    keywords: ['accord', 'forfait jours', '218 jours', 'déconnexion', 'charge de travail'],
  },
  {
    slug: 'denonciation-accord',
    title: "Dénonciation d'un accord",
    category: 'Négociation et accords',
    description:
      "Modèle de dénonciation d'un accord collectif d'entreprise. Préavis de 3 mois, survie 12 mois, négociation de substitution.",
    longDescription:
      "La dénonciation d'un accord collectif est régie par les articles L.2261-9 et suivants du Code du travail. Elle doit être notifiée aux signataires par LRAR et déposée auprès de la DREETS. Un préavis de 3 mois s'applique (sauf stipulation contraire). L'accord continue de produire ses effets pendant 12 mois après le préavis (durée de survie).\n\nUne négociation de substitution doit s'engager dans les 3 mois. À défaut d'accord de substitution, les salariés conservent les avantages individuels acquis.",
    keywords: ['dénonciation', 'accord collectif', 'préavis', 'survie', 'substitution'],
  },
  {
    slug: 'denonciation-usage',
    title: "Dénonciation d'un usage",
    category: 'Négociation et accords',
    description:
      "Modèle de dénonciation d'un usage d'entreprise. Trois conditions cumulatives : information CSE, information individuelle, délai de prévenance.",
    longDescription:
      "L'usage d'entreprise (avantage accordé de manière constante, générale et fixe) peut être dénoncé unilatéralement par l'employeur sous réserve de respecter trois conditions cumulatives posées par la jurisprudence (Cass. soc., 25 février 1988) : information du CSE, information individuelle de chaque salarié concerné, respect d'un délai de prévenance suffisant.\n\nCe modèle couvre les deux volets de l'information (CSE et salariés). Le non-respect de l'une des trois conditions rend la dénonciation irrégulière et l'usage continue de s'appliquer.",
    keywords: ['dénonciation', 'usage', 'avantage acquis', 'CSE', 'prévenance'],
  },

  // ── CSE ─────────────────────────────────────────────────
  {
    slug: 'ordre-jour-cse',
    title: 'Ordre du jour CSE',
    category: 'CSE',
    description:
      "Modèle d'ordre du jour de réunion du CSE. Établi conjointement, communication 3 jours avant, points obligatoires.",
    longDescription:
      "L'ordre du jour de la réunion du CSE est établi conjointement par le président et le secrétaire du CSE (article L.2315-29). Il doit être communiqué aux membres au moins 3 jours avant la réunion. Ce modèle structuré couvre : approbation du PV précédent, informations de la direction, consultations, réclamations, santé-sécurité, activités sociales et culturelles, questions diverses.\n\nLes consultations obligatoires et les questions relatives à la santé et la sécurité doivent être inscrites de plein droit à l'ordre du jour.",
    keywords: ['ordre du jour', 'CSE', 'réunion', 'secrétaire', 'président'],
  },
  {
    slug: 'pv-reunion-cse',
    title: 'PV réunion CSE',
    category: 'CSE',
    description:
      "Modèle de procès-verbal de réunion du CSE. Participants, délibérations, votes, avis motivés, réclamations.",
    longDescription:
      "Le procès-verbal de réunion du CSE est établi par le secrétaire et retrace les délibérations du comité. Il doit être transmis à l'employeur et aux membres dans le délai fixé par accord (ou 15 jours à défaut). Il est approuvé lors de la réunion suivante puis diffusé aux salariés.\n\nCe modèle structuré couvre : la liste des présents/absents, les informations de la direction, les consultations avec les votes et avis motivés, les réclamations et les questions diverses. Le PV constitue un document juridique important en cas de contentieux.",
    keywords: ['PV', 'procès-verbal', 'CSE', 'réunion', 'délibération', 'avis'],
  },
  {
    slug: 'information-consultation-cse',
    title: 'Information consultation CSE',
    category: 'CSE',
    description:
      "Modèle de note d'information-consultation du CSE. Présentation du projet, impact, documents, délai pour rendre l'avis.",
    longDescription:
      "L'information-consultation du CSE est obligatoire pour de nombreuses décisions de l'employeur : réorganisation, licenciement économique, modification des conditions de travail, introduction de nouvelles technologies, etc. (articles L.2312-8 et suivants). Ce modèle de note présente le projet de manière complète : contexte, description, impacts sur l'emploi et les conditions de travail, mesures d'accompagnement.\n\nLe CSE dispose d'un délai d'un mois pour rendre son avis (2 mois avec expert, 3 mois en cas de double consultation). À défaut, il est réputé avoir rendu un avis négatif.",
    keywords: ['information', 'consultation', 'CSE', 'avis', 'projet', 'réorganisation'],
  },
  {
    slug: 'designation-rp',
    title: 'Désignation représentant de proximité',
    category: 'CSE',
    description:
      "Modèle de désignation d'un représentant de proximité par le CSE. Attributions, moyens, heures de délégation, protection.",
    longDescription:
      "Le représentant de proximité est une institution facultative créée par accord d'entreprise (article L.2313-7). Il assure un relais local du CSE, notamment dans les entreprises multi-sites. Sa désignation est effectuée par le CSE parmi ses membres ou parmi les salariés de l'établissement.\n\nCe modèle formalise la désignation avec les résultats du vote, les attributions définies par l'accord, les moyens (heures de délégation, liberté de circulation) et la durée du mandat. Le représentant de proximité bénéficie de la protection contre le licenciement.",
    keywords: ['représentant de proximité', 'CSE', 'désignation', 'local', 'réclamations'],
  },
  {
    slug: 'pap-cse',
    title: 'Protocole accord préélectoral',
    category: 'CSE',
    description:
      "Modèle de protocole d'accord préélectoral (PAP) pour les élections du CSE. Collèges, sièges, calendrier, vote.",
    longDescription:
      "Le protocole d'accord préélectoral (PAP) est négocié entre l'employeur et les organisations syndicales invitées (articles L.2314-5 et suivants). Il fixe les modalités d'organisation des élections du CSE : effectif, nombre de sièges, collèges électoraux, répartition des sièges, dates du scrutin, candidatures, vote par correspondance ou électronique.\n\nLe PAP doit respecter la règle de représentation équilibrée femmes-hommes (article L.2314-30). Il est valide si signé par la majorité des syndicats ayant participé à la négociation, dont les syndicats majoritaires.",
    keywords: ['PAP', 'élections', 'CSE', 'protocole', 'préélectoral', 'scrutin'],
  },
  {
    slug: 'pv-carence-cse',
    title: 'PV de carence CSE',
    category: 'CSE',
    description:
      "Modèle de procès-verbal de carence aux élections du CSE. Constat d'absence de candidature, transmission à l'inspection du travail.",
    longDescription:
      "Le procès-verbal de carence est établi lorsqu'aucun candidat ne se présente aux élections du CSE ou qu'aucun siège n'est pourvu. Il doit être transmis à l'inspection du travail dans les 15 jours et affiché dans l'entreprise (article L.2314-9).\n\nLa carence peut être totale (aucun élu dans aucun collège) ou partielle. En cas de carence totale, de nouvelles élections doivent être organisées dans les 6 mois si un salarié ou un syndicat en fait la demande. Le PV de carence permet à l'employeur de justifier l'absence de CSE auprès de l'inspection du travail.",
    keywords: ['carence', 'PV', 'élections', 'CSE', 'absence de candidat'],
  },
  {
    slug: 'reglement-interieur-cse',
    title: 'Règlement intérieur du CSE',
    category: 'CSE',
    description:
      "Modèle de règlement intérieur du CSE. Composition, bureau, réunions, PV, moyens, heures de délégation, commissions.",
    longDescription:
      "Le règlement intérieur du CSE détermine ses modalités de fonctionnement (article L.2315-24). Il est adopté par un vote des membres du CSE. Ce modèle couvre : la composition et le bureau (secrétaire, trésorier), la périodicité des réunions, l'ordre du jour, les procès-verbaux, les heures de délégation (mutualisation, report), le local, les budgets (fonctionnement 0,20 % et ASC) et les commissions.\n\nLe règlement intérieur ne peut pas imposer à l'employeur des obligations non prévues par la loi sans son accord. Il est modifiable par un vote majoritaire des membres.",
    keywords: ['règlement intérieur', 'CSE', 'fonctionnement', 'bureau', 'commissions'],
  },

  // ── RGPD et données ─────────────────────────────────────
  {
    slug: 'registre-traitements-rh',
    title: 'Registre des traitements RH',
    category: 'RGPD et données',
    description:
      "Modèle de registre des traitements de données personnelles RH (article 30 RGPD). Recrutement, gestion du personnel, paie, contrôle.",
    longDescription:
      "Le registre des traitements est obligatoire pour tout responsable de traitement (article 30 du RGPD). Ce modèle spécialisé RH couvre les principaux traitements : recrutement, gestion administrative du personnel, paie, contrôle du temps de travail, vidéosurveillance. Pour chaque traitement : finalité, base légale, catégories de données, destinataires, durées de conservation, mesures de sécurité.\n\nLe registre doit être tenu à jour et mis à la disposition de la CNIL sur demande. Il constitue le socle de la conformité RGPD de l'entreprise.",
    keywords: ['registre', 'traitements', 'RGPD', 'données personnelles', 'RH', 'CNIL'],
  },
  {
    slug: 'information-rgpd-salarie',
    title: 'Information salarié données personnelles',
    category: 'RGPD et données',
    description:
      "Modèle d'information du salarié sur le traitement de ses données personnelles (articles 13-14 RGPD). Finalités, droits, DPO.",
    longDescription:
      "L'employeur doit informer chaque salarié des conditions de traitement de ses données personnelles (articles 13 et 14 du RGPD). Ce modèle couvre toutes les informations obligatoires : identité du responsable de traitement, coordonnées du DPO, données collectées, finalités et bases légales, destinataires, durées de conservation, droits (accès, rectification, effacement, portabilité, opposition).\n\nCette information est remise lors de l'embauche et à chaque nouveau traitement. L'accusé de réception formalise la prise de connaissance par le salarié.",
    keywords: ['RGPD', 'information', 'données personnelles', 'salarié', 'droits', 'DPO'],
  },
  {
    slug: 'charte-videosurveillance',
    title: 'Charte vidéosurveillance',
    category: 'RGPD et données',
    description:
      "Modèle de charte de vidéosurveillance en entreprise. Finalités, zones filmées, durée de conservation, droits des salariés, consultation CSE.",
    longDescription:
      "La mise en place d'un dispositif de vidéosurveillance en entreprise est encadrée par le RGPD, le Code du travail (articles L.1121-1 et L.1222-4) et le Code de la sécurité intérieure. Ce modèle de charte définit : les finalités (sécurité, pas de surveillance des salariés), les zones filmées et exclues (postes de travail, vestiaires), la durée de conservation (30 jours max), les accès autorisés et les droits des salariés.\n\nLa consultation préalable du CSE est obligatoire. Les salariés doivent être individuellement informés. Les lieux ouverts au public nécessitent une autorisation préfectorale.",
    keywords: ['vidéosurveillance', 'caméras', 'RGPD', 'vie privée', 'CSE'],
  },
  {
    slug: 'reponse-droit-acces',
    title: 'Réponse droit d\'accès salarié',
    category: 'RGPD et données',
    description:
      "Modèle de réponse à une demande de droit d'accès d'un salarié (article 15 RGPD). Communication des données, délai d'un mois.",
    longDescription:
      "Tout salarié a le droit d'obtenir une copie de ses données personnelles détenues par l'employeur (article 15 du RGPD). L'employeur dispose d'un mois pour répondre (extensible à 3 mois en cas de complexité). Ce modèle structure la réponse : liste des données traitées, finalités, destinataires, durées de conservation, rappel des droits complémentaires.\n\nLa communication doit être gratuite (sauf copies supplémentaires). L'employeur peut refuser de communiquer certaines données si elles portent atteinte aux droits de tiers (article 15.4).",
    keywords: ['droit d\'accès', 'RGPD', 'données personnelles', 'réponse', 'copie'],
  },
  {
    slug: 'aipd-simplifiee',
    title: 'Analyse d\'impact (AIPD) simplifiée',
    category: 'RGPD et données',
    description:
      "Modèle simplifié d'analyse d'impact relative à la protection des données (article 35 RGPD). Description, nécessité, risques, mesures.",
    longDescription:
      "L'analyse d'impact relative à la protection des données (AIPD) est obligatoire lorsqu'un traitement est susceptible d'engendrer un risque élevé pour les droits et libertés des personnes (article 35 du RGPD). En RH, elle est requise notamment pour la surveillance systématique des salariés, le traitement de données biométriques ou le profilage.\n\nCe modèle simplifié couvre : la description du traitement, l'évaluation de la nécessité et de la proportionnalité, l'analyse des risques (accès non autorisé, modification, perte, détournement) et les mesures d'atténuation. Si les risques résiduels restent élevés, une consultation préalable de la CNIL est requise.",
    keywords: ['AIPD', 'analyse d\'impact', 'RGPD', 'risques', 'CNIL', 'données sensibles'],
  },

  // ── Divers compléments ──────────────────────────────────
  {
    slug: 'contrat-sous-traitance',
    title: 'Contrat de sous-traitance',
    category: 'Divers',
    description:
      "Modèle de contrat de sous-traitance. Obligations réciproques, vigilance sociale, confidentialité, responsabilité.",
    longDescription:
      "Le contrat de sous-traitance formalise la relation entre un donneur d'ordre et un sous-traitant (loi du 31 décembre 1975). Ce modèle couvre : l'objet des prestations, le prix, les obligations du sous-traitant (règles de l'art, délais, assurances, réglementation sociale), l'obligation de vigilance du donneur d'ordre (attestation URSSAF, Kbis, assurance RC), la sous-traitance de second rang, la confidentialité et la résiliation.\n\nLe donneur d'ordre engage sa responsabilité solidaire en cas de travail dissimulé par le sous-traitant (articles L.8222-1 et suivants du Code du travail).",
    keywords: ['sous-traitance', 'contrat', 'prestation', 'vigilance', 'donneur d\'ordre'],
  },
  {
    slug: 'mise-en-demeure-client',
    title: 'Mise en demeure client',
    category: 'Divers',
    description:
      "Modèle de mise en demeure de payer adressée à un client. Factures impayées, pénalités de retard, indemnité forfaitaire de recouvrement.",
    longDescription:
      "La mise en demeure est un courrier formel exigeant le paiement d'une créance dans un délai déterminé. Elle constitue un préalable recommandé avant toute action judiciaire et fait courir les intérêts de retard. Ce modèle détaille les factures impayées, rappelle les pénalités de retard applicables (article L.441-10 du Code de commerce) et l'indemnité forfaitaire de recouvrement de 40 € (article D.441-5).\n\nEn cas de non-paiement après mise en demeure, l'entreprise peut engager une procédure d'injonction de payer (rapide et peu coûteuse) ou une assignation au fond.",
    keywords: ['mise en demeure', 'impayé', 'facture', 'recouvrement', 'pénalités'],
  },
  {
    slug: 'attestation-employeur',
    title: 'Attestation employeur',
    category: 'Divers',
    description:
      "Modèle d'attestation employeur polyvalente. Attestation d'emploi, de revenus, de domiciliation bancaire.",
    longDescription:
      "L'attestation employeur est un document courant délivré à la demande du salarié pour justifier de sa situation professionnelle auprès de tiers (banque, bailleur, administration). Ce modèle polyvalent propose plusieurs variantes : attestation d'emploi (confirmation du poste et du type de contrat), attestation de revenus (rémunération brute et nette), attestation de domiciliation bancaire.\n\nL'employeur n'est pas légalement tenu de délivrer ce type d'attestation (sauf le certificat de travail en fin de contrat), mais il est d'usage de répondre favorablement aux demandes raisonnables.",
    keywords: ['attestation', 'employeur', 'emploi', 'revenus', 'banque', 'logement'],
  },
  {
    slug: 'certificat-travail',
    title: 'Certificat de travail',
    category: 'Divers',
    description:
      "Modèle de certificat de travail obligatoire en fin de contrat (article L.1234-19). Dates, fonctions, portabilité prévoyance/mutuelle.",
    longDescription:
      "Le certificat de travail est un document obligatoire remis au salarié à l'expiration de tout contrat de travail, quel que soit le motif de la rupture (article L.1234-19). Il doit mentionner : les dates d'entrée et de sortie, la nature de l'emploi (ou des emplois successifs) et les périodes correspondantes, ainsi que le maintien gratuit des garanties de prévoyance et de frais de santé (portabilité, article L.911-8 du CSS).\n\nLe défaut de remise du certificat de travail est sanctionné par une amende de 4e classe (750 €) et peut donner lieu à des dommages-intérêts si le salarié justifie d'un préjudice.",
    keywords: ['certificat de travail', 'fin de contrat', 'portabilité', 'document obligatoire'],
  },
  {
    slug: 'recu-signalement-harcelement',
    title: 'Reçu dépôt plainte harcèlement',
    category: 'Divers',
    description:
      "Modèle de reçu de signalement de harcèlement. Accusé de réception, engagement d'enquête, protection du déclarant, confidentialité.",
    longDescription:
      "L'employeur a l'obligation de prévenir et de traiter tout signalement de harcèlement moral (article L.1152-4) ou sexuel (article L.1153-5). Ce modèle de reçu formalise la réception du signalement, engage l'employeur à diligenter une enquête interne dans un délai défini, à protéger le déclarant contre les représailles et à garantir la confidentialité.\n\nLe référent harcèlement du CSE (obligatoire dans toutes les entreprises avec CSE) et le référent employeur (obligatoire dans les entreprises de 250 salariés et plus) sont associés à la démarche. L'absence de réaction de l'employeur face à un signalement engage sa responsabilité civile et pénale.",
    keywords: ['harcèlement', 'signalement', 'enquête', 'protection', 'référent'],
  },
];

export function getModeleBySlug(slug: string): Modele | undefined {
  return modeles.find((m) => m.slug === slug);
}

export function getModelesByCategory(category: string): Modele[] {
  return modeles.filter((m) => m.category === category);
}
