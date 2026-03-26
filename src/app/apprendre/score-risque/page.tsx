"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  question: string;
  category: string;
  options: { label: string; score: number }[];
  insight: string;
}

const questions: Question[] = [
  {
    question: "Vos salariés en forfait jours ont-ils un entretien annuel dédié à la charge de travail (distinct de l'entretien annuel d'évaluation) ?",
    category: "Temps de travail",
    options: [
      { label: "Oui, systématiquement avec CR signé", score: 0 },
      { label: "Oui, mais pas toujours formalisé", score: 1 },
      { label: "On le fait dans l'entretien annuel classique", score: 2 },
      { label: "Non", score: 3 },
    ],
    insight: "Sans entretien dédié formalisé, la convention de forfait peut être privée d'effet — et ouvrir droit à des rappels d'heures supplémentaires sur 3 ans (Cass. soc. 10 janv. 2024, n°22-13.200).",
  },
  {
    question: "Avez-vous un système de décompte du temps de travail pour vos salariés non-cadres ?",
    category: "Temps de travail",
    options: [
      { label: "Oui, pointeuse ou logiciel dédié", score: 0 },
      { label: "Oui, tableau signé chaque semaine", score: 0 },
      { label: "On fait confiance, pas de système formel", score: 3 },
      { label: "Je ne sais pas", score: 3 },
    ],
    insight: "L'article L.3171-2 impose à l'employeur de décompter le temps de travail. Sans système, un simple tableau Excel du salarié suffit à faire basculer un contentieux heures sup (Cass. soc. 18 mars 2020, n°18-10.919).",
  },
  {
    question: "Quand un salarié déclare un accident du travail, formulez-vous des réserves motivées auprès de la CPAM dans les 10 jours ?",
    category: "AT/MP",
    options: [
      { label: "Systématiquement quand il y a un doute", score: 0 },
      { label: "Parfois, quand on y pense", score: 2 },
      { label: "Rarement ou jamais", score: 3 },
      { label: "Je ne savais pas que c'était possible", score: 3 },
    ],
    insight: "Sans réserves, la CPAM peut reconnaître l'AT sans instruction contradictoire. Vos taux de cotisation augmentent sans que vous ayez été entendu.",
  },
  {
    question: "Votre document unique d'évaluation des risques professionnels (DUERP) est-il à jour ?",
    category: "Santé / Sécurité",
    options: [
      { label: "Oui, mis à jour dans les 12 derniers mois", score: 0 },
      { label: "Il existe mais date de plus d'un an", score: 2 },
      { label: "Il existe mais je ne sais pas quand il a été mis à jour", score: 2 },
      { label: "On n'en a pas / je ne sais pas ce que c'est", score: 3 },
    ],
    insight: "Le DUERP est obligatoire pour TOUTE entreprise dès le 1er salarié (art. R.4121-1). Son absence est une infraction pénale et un argument massue en cas de contentieux sur l'obligation de sécurité.",
  },
  {
    question: "Quand un salarié signale du harcèlement moral, quelle est votre procédure ?",
    category: "Harcèlement",
    options: [
      { label: "Enquête interne formalisée avec auditions et rapport", score: 0 },
      { label: "On convoque les parties pour en discuter", score: 2 },
      { label: "On gère au cas par cas, pas de procédure écrite", score: 2 },
      { label: "Ça ne nous est jamais arrivé / on verra le moment venu", score: 3 },
    ],
    insight: "Le juge ne vous reprochera pas de ne pas avoir empêché le harcèlement. Il vous reprochera de ne pas avoir enquêté. L'absence d'enquête = manquement à l'obligation de sécurité, même si le harcèlement n'est pas caractérisé.",
  },
  {
    question: "Vos CDD de remplacement mentionnent-ils le nom du salarié remplacé, le motif précis et le terme (date ou événement) ?",
    category: "Contrats",
    options: [
      { label: "Oui, systématiquement vérifié", score: 0 },
      { label: "En général oui, mais pas toujours vérifié", score: 1 },
      { label: "On utilise un modèle standard, je ne vérifie pas le détail", score: 2 },
      { label: "Je ne suis pas sûr(e)", score: 3 },
    ],
    insight: "Un CDD sans mention obligatoire = requalification automatique en CDI (art. L.1242-12). Le salarié empoche l'indemnité de requalification (min. 1 mois de salaire) + potentiellement des indemnités de licenciement sans cause.",
  },
  {
    question: "Lors d'un licenciement, respectez-vous un délai de réflexion d'au moins 2 jours ouvrables entre l'entretien préalable et l'envoi de la lettre ?",
    category: "Licenciement",
    options: [
      { label: "Toujours, c'est dans notre process", score: 0 },
      { label: "En général oui", score: 1 },
      { label: "Pas toujours, ça dépend de l'urgence", score: 2 },
      { label: "Je ne connaissais pas ce délai", score: 3 },
    ],
    insight: "Le délai de 2 jours ouvrables est impératif (art. L.1232-6). Une lettre envoyée trop tôt = irrégularité de procédure. En disciplinaire, attention aussi au délai maximum d'1 mois (art. L.1332-2).",
  },
  {
    question: "Avez-vous un référent harcèlement sexuel désigné au sein du CSE ?",
    category: "Harcèlement",
    options: [
      { label: "Oui, formé et identifié par les salariés", score: 0 },
      { label: "Oui, désigné mais pas vraiment actif", score: 1 },
      { label: "Non, on n'a pas de CSE", score: 1 },
      { label: "Non alors qu'on a un CSE", score: 3 },
    ],
    insight: "Depuis le 1er janvier 2019, tout CSE doit désigner un référent harcèlement sexuel (art. L.2314-1). Dans les entreprises de 250+, l'employeur doit aussi désigner un référent RH (art. L.1153-5-1).",
  },
  {
    question: "Les entretiens professionnels obligatoires (tous les 2 ans) sont-ils réalisés et formalisés pour chaque salarié ?",
    category: "Formation",
    options: [
      { label: "Oui, à jour pour tous les salariés", score: 0 },
      { label: "Pour la plupart, quelques retards", score: 1 },
      { label: "On les fait quand on peut", score: 2 },
      { label: "Non, ou très partiellement", score: 3 },
    ],
    insight: "Dans les entreprises de 50+, l'absence d'entretien professionnel sur 6 ans déclenche un abondement correctif de 3 000€ par salarié sur le CPF (art. L.6315-1). C'est automatique.",
  },
  {
    question: "Votre règlement intérieur a-t-il été déposé au greffe du conseil de prud'hommes et transmis à l'inspection du travail ?",
    category: "Conformité",
    options: [
      { label: "Oui, avec preuve de dépôt", score: 0 },
      { label: "Je crois que oui mais je n'ai pas la preuve", score: 1 },
      { label: "On a un règlement intérieur mais je ne sais pas s'il a été déposé", score: 2 },
      { label: "On n'a pas de règlement intérieur (et on a 50+ salariés)", score: 3 },
    ],
    insight: "Le règlement intérieur est obligatoire dès 50 salariés (art. L.1311-2). Sans dépôt, il est inopposable aux salariés — vos sanctions disciplinaires fondées dessus tombent.",
  },
  {
    question: "Consultez-vous le CSE avant chaque licenciement pour inaptitude ?",
    category: "Inaptitude",
    options: [
      { label: "Oui, systématiquement avant toute proposition de reclassement", score: 0 },
      { label: "Oui, mais parfois après avoir déjà proposé un poste", score: 2 },
      { label: "Pas toujours", score: 3 },
      { label: "On n'a pas de CSE / pas concerné", score: 1 },
    ],
    insight: "La consultation du CSE est obligatoire AVANT les propositions de reclassement (art. L.1226-10). Une consultation postérieure aux offres = licenciement sans cause réelle et sérieuse.",
  },
  {
    question: "Vos clauses de non-concurrence prévoient-elles une contrepartie financière versée après la rupture du contrat ?",
    category: "Contrats",
    options: [
      { label: "Oui, avec un montant défini dans le contrat", score: 0 },
      { label: "Oui, selon la convention collective", score: 0 },
      { label: "Je ne suis pas sûr(e) du montant", score: 2 },
      { label: "Non, ou la contrepartie est dérisoire", score: 3 },
    ],
    insight: "Une clause de non-concurrence sans contrepartie financière est nulle (Cass. soc. 10 juill. 2002). Mais attention : même nulle, si vous ne la levez pas, le salarié peut réclamer des dommages-intérêts pour le préjudice subi.",
  },
  {
    question: "En cas de rupture conventionnelle, vérifiez-vous que l'indemnité est au moins égale à l'indemnité légale de licenciement ?",
    category: "Rupture",
    options: [
      { label: "Oui, calcul systématique avant signature", score: 0 },
      { label: "En général oui", score: 1 },
      { label: "On négocie un montant global sans vérifier le plancher", score: 2 },
      { label: "Je ne savais pas qu'il y avait un minimum", score: 3 },
    ],
    insight: "L'indemnité de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement (art. L.1237-13). Si c'est le cas, la DREETS refuse l'homologation — ou le juge annule la convention.",
  },
  {
    question: "Vos bulletins de paie mentionnent-ils la convention collective applicable ?",
    category: "Paie",
    options: [
      { label: "Oui", score: 0 },
      { label: "Je crois que oui", score: 1 },
      { label: "Je ne sais pas", score: 2 },
      { label: "Non", score: 3 },
    ],
    insight: "La mention de la convention collective sur le bulletin est obligatoire (art. R.3243-1). Son absence peut entraîner une amende et, surtout, le salarié peut revendiquer l'application de la convention la plus favorable.",
  },
  {
    question: "Avez-vous informé vos salariés licenciés pour motif économique de leur priorité de réembauche ?",
    category: "Licenciement",
    options: [
      { label: "Oui, c'est mentionné dans la lettre de licenciement", score: 0 },
      { label: "Parfois", score: 2 },
      { label: "Non", score: 3 },
      { label: "Pas concerné, jamais fait de licenciement économique", score: 0 },
    ],
    insight: "La priorité de réembauche dure 1 an (art. L.1233-45). Si vous embauchez sur un poste compatible sans prévenir l'ancien salarié, c'est une indemnité minimale de 2 mois de salaire — et ça remet en cause le motif économique.",
  },
  {
    question: "Votre affichage obligatoire est-il complet et à jour dans vos locaux ?",
    category: "Conformité",
    options: [
      { label: "Oui, vérifié récemment", score: 0 },
      { label: "Il y a un panneau mais je ne sais pas s'il est à jour", score: 1 },
      { label: "Partiellement", score: 2 },
      { label: "Je ne sais pas ce qui doit être affiché", score: 3 },
    ],
    insight: "L'absence d'affichage des horaires collectifs, des consignes de sécurité, ou des coordonnées de l'inspection du travail expose à une amende de 750€ par infraction constatée. C'est le premier truc que l'inspecteur regarde.",
  },
  {
    question: "Avez-vous négocié sur l'égalité professionnelle femmes-hommes dans les 4 dernières années ?",
    category: "Conformité",
    options: [
      { label: "Oui, accord ou plan d'action en vigueur", score: 0 },
      { label: "On y travaille", score: 1 },
      { label: "Non, pas encore", score: 2 },
      { label: "Pas concerné (moins de 50 salariés)", score: 0 },
    ],
    insight: "Les entreprises de 50+ doivent négocier ou établir un plan d'action sous peine de pénalité financière jusqu'à 1% de la masse salariale (art. L.2242-8). L'inspection du travail contrôle de plus en plus.",
  },
  {
    question: "Quand vous rompez une période d'essai, calculez-vous le délai de prévenance en fonction de l'ancienneté ?",
    category: "Contrats",
    options: [
      { label: "Oui, systématiquement (24h / 48h / 2 sem / 1 mois)", score: 0 },
      { label: "En général oui", score: 1 },
      { label: "On prévient le salarié, sans calculer précisément", score: 2 },
      { label: "Je ne savais pas qu'il y avait un délai de prévenance", score: 3 },
    ],
    insight: "Le délai de prévenance ne prolonge PAS la période d'essai (art. L.1221-25). Si vous rompez trop tard, vous devez une indemnité compensatrice. C'est un compte à rebours, pas un filet de sécurité.",
  },
  {
    question: "Vos managers sont-ils formés aux bases du droit du travail (procédure disciplinaire, harcèlement, temps de travail) ?",
    category: "Management",
    options: [
      { label: "Oui, formation régulière", score: 0 },
      { label: "Certains, pas tous", score: 1 },
      { label: "Non, ils gèrent au feeling", score: 2 },
      { label: "Non, c'est le job des RH", score: 3 },
    ],
    insight: "Un manager qui promet un CDI en entretien, qui annonce un licenciement oralement, ou qui ignore un signalement de harcèlement engage la responsabilité de l'entreprise. 78% des avocats considèrent que les managers ne sont pas formés au droit du travail.",
  },
  {
    question: "Avez-vous vérifié que votre mutuelle d'entreprise respecte le panier de soins minimum conventionnel ?",
    category: "Paie",
    options: [
      { label: "Oui, vérifié avec notre courtier/branche", score: 0 },
      { label: "On a une mutuelle, je pense qu'elle est conforme", score: 1 },
      { label: "Je ne sais pas ce qu'est le panier minimum", score: 2 },
      { label: "On n'a pas de mutuelle d'entreprise", score: 3 },
    ],
    insight: "La mutuelle est obligatoire pour tous les salariés depuis 2016 (ANI + art. L.911-7 CSS). Le non-respect du panier minimum ou de la convention collective expose à un redressement URSSAF sur l'ensemble des cotisations patronales.",
  },
];

const categories = ["Temps de travail", "AT/MP", "Santé / Sécurité", "Harcèlement", "Contrats", "Licenciement", "Formation", "Conformité", "Inaptitude", "Rupture", "Paie", "Management"];

function getScoreData(total: number, max: number) {
  const pct = (total / max) * 100;
  if (pct <= 15) return { level: "Faible", color: "emerald", emoji: "🟢", message: "Vos pratiques RH sont solides. Maintenez cette vigilance — le droit social évolue en permanence." };
  if (pct <= 35) return { level: "Modéré", color: "amber", emoji: "🟡", message: "Quelques angles morts identifiés. Rien de critique, mais chaque point faible est un contentieux potentiel." };
  if (pct <= 55) return { level: "Élevé", color: "orange", emoji: "🟠", message: "Plusieurs zones de risque sérieuses. Un contrôle URSSAF ou un contentieux prud'homal pourrait être douloureux." };
  return { level: "Critique", color: "red", emoji: "🔴", message: "Risque majeur. Plusieurs pratiques vous exposent à des redressements, des condamnations, ou des sanctions pénales. Action immédiate recommandée." };
}

export default function ScoreRisque() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showInsight, setShowInsight] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const maxScore = questions.length * 3;

  const handleAnswer = (optionIndex: number) => {
    if (showInsight) return;
    setSelectedOption(optionIndex);
    setShowInsight(true);
  };

  const handleNext = () => {
    const score = q.options[selectedOption!].score;
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedOption(null);
      setShowInsight(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const total = answers.reduce((a, b) => a + b, 0);
    const { level, emoji, message } = getScoreData(total, maxScore);
    const pct = Math.round((total / maxScore) * 100);

    // Category breakdown
    const categoryScores: Record<string, { score: number; max: number }> = {};
    questions.forEach((q, i) => {
      if (!categoryScores[q.category]) categoryScores[q.category] = { score: 0, max: 3 };
      else categoryScores[q.category].max += 3;
      categoryScores[q.category].score += answers[i] || 0;
    });

    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-6xl mb-4">{emoji}</p>
          <h1
            className="text-3xl md:text-4xl font-bold text-alinea-950 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Risque {level}
          </h1>
          <p className="text-5xl font-bold text-alinea-950 mb-4">{pct}%</p>
          <p className="text-alinea-500 max-w-md mx-auto leading-relaxed">{message}</p>
        </div>

        {/* Score bar */}
        <div className="w-full bg-alinea-100 rounded-full h-3 mb-12">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${pct <= 15 ? "bg-emerald-500" : pct <= 35 ? "bg-amber-500" : pct <= 55 ? "bg-orange-500" : "bg-red-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Category breakdown */}
        <div className="mb-12">
          <h2
            className="text-xl font-bold text-alinea-950 mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Détail par thème
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryScores).map(([cat, { score, max }]) => {
              const catPct = max > 0 ? Math.round((score / max) * 100) : 0;
              return (
                <div key={cat} className="flex items-center gap-4">
                  <span className="text-[13px] text-alinea-500 w-36 shrink-0">{cat}</span>
                  <div className="flex-1 bg-alinea-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${catPct <= 20 ? "bg-emerald-500" : catPct <= 50 ? "bg-amber-500" : catPct <= 70 ? "bg-orange-500" : "bg-red-500"}`}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                  <span className="text-[13px] font-medium text-alinea-700 w-10 text-right">{catPct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-alinea-200 rounded-2xl p-8 text-center mb-8">
          <h3
            className="text-lg font-bold text-alinea-950 mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Chaque semaine, En Clair vous aide à réduire ce score
          </h3>
          <p className="text-[14px] text-alinea-500 mb-5">
            Articles sourcés, alertes réglementaires, cas pratiques — pour les dirigeants, DRH et DAF qui veulent voir les risques avant de les payer.
          </p>
          <Link
            href="#newsletter"
            className="inline-block bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            S&apos;abonner gratuitement
          </Link>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/apprendre" className="text-[14px] text-alinea-500 hover:text-alinea-700 transition-colors">
            ← Autres quizz
          </Link>
          <Link href="/articles" className="text-[14px] text-alinea-500 hover:text-alinea-700 transition-colors">
            Lire nos analyses →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/apprendre" className="text-[13px] text-alinea-400 hover:text-alinea-600 transition-colors">
          ← Retour
        </Link>
        <div className="text-right">
          <span className="text-[13px] text-alinea-400 font-medium">
            {current + 1} / {questions.length}
          </span>
          <p className="text-[11px] text-alinea-300">{q.category}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-alinea-100 rounded-full h-1 mb-10">
        <div
          className="bg-accent-dark h-1 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2
        className="text-xl md:text-2xl font-bold text-alinea-950 leading-snug mb-8"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {q.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {q.options.map((option, i) => {
          let classes = "block w-full text-left px-5 py-4 rounded-xl border text-[15px] transition-all ";
          if (!showInsight) {
            classes += "border-alinea-200 hover:border-accent/40 hover:bg-accent/5 cursor-pointer";
          } else if (i === selectedOption && option.score === 0) {
            classes += "border-emerald-300 bg-emerald-50 text-emerald-900";
          } else if (i === selectedOption && option.score > 0) {
            classes += "border-orange-300 bg-orange-50 text-orange-900";
          } else if (option.score === 0 && selectedOption !== null && q.options[selectedOption].score > 0) {
            classes += "border-emerald-200 bg-emerald-50/50 text-emerald-700";
          } else {
            classes += "border-alinea-100 text-alinea-400";
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} className={classes} disabled={showInsight}>
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Insight */}
      {showInsight && (
        <div className="border border-alinea-200 rounded-xl p-6 mb-8 bg-alinea-50">
          <p className="font-semibold text-alinea-950 text-[15px] mb-2">
            {q.options[selectedOption!].score === 0 ? "✅ Bonne pratique" : "⚠️ Point de vigilance"}
          </p>
          <p className="text-[14px] text-alinea-600 leading-relaxed">{q.insight}</p>
        </div>
      )}

      {showInsight && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-alinea-950 text-white rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
        >
          {current < questions.length - 1 ? "Question suivante →" : "Voir mon score de risque →"}
        </button>
      )}
    </div>
  );
}
