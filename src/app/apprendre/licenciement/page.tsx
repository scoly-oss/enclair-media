"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  source: string;
}

const questions: Question[] = [
  {
    question: "Quel est le délai minimum entre l'entretien préalable et l'envoi de la lettre de licenciement pour motif disciplinaire ?",
    options: [
      "24 heures",
      "2 jours ouvrables",
      "5 jours ouvrables",
      "Aucun délai minimum",
    ],
    correct: 1,
    explanation: "Le délai minimum est de 2 jours ouvrables après l'entretien préalable (art. L.1232-6 du Code du travail). Attention : le jour de l'entretien ne compte pas, et les dimanches et jours fériés non plus.",
    source: "Art. L.1232-6 C. trav.",
  },
  {
    question: "Un salarié peut-il être licencié pour des faits datant de plus de 2 mois ?",
    options: [
      "Non, jamais",
      "Oui, si l'employeur n'en avait pas connaissance",
      "Oui, uniquement en cas de faute lourde",
      "Oui, si le salarié les a dissimulés activement",
    ],
    correct: 1,
    explanation: "Le délai de prescription de 2 mois court à compter du jour où l'employeur a eu connaissance des faits (art. L.1332-4). Si les faits étaient dissimulés, le délai ne court qu'à leur découverte.",
    source: "Art. L.1332-4 C. trav. — Cass. soc., 17 fév. 2021",
  },
  {
    question: "Pendant l'entretien préalable, l'employeur peut-il annoncer sa décision de licencier ?",
    options: [
      "Oui, par souci de transparence",
      "Oui, si le salarié demande une réponse immédiate",
      "Non, la décision ne doit pas être déjà prise",
      "Oui, mais uniquement en présence du conseiller du salarié",
    ],
    correct: 2,
    explanation: "L'entretien préalable a pour objet de recueillir les explications du salarié AVANT la décision. Annoncer le licenciement pendant l'entretien prouve que la décision était déjà prise, ce qui constitue une irrégularité de procédure — voire un vice de fond si l'entretien est privé de tout caractère contradictoire.",
    source: "Art. L.1232-3 C. trav.",
  },
  {
    question: "La lettre de licenciement mentionne 'insuffisance professionnelle' sans autre précision. Quelles sont les conséquences ?",
    options: [
      "Aucune, le motif est valable",
      "Le licenciement est sans cause réelle et sérieuse",
      "L'employeur a 15 jours pour préciser les motifs si le salarié le demande",
      "Le salarié doit contester dans les 12 mois",
    ],
    correct: 2,
    explanation: "Depuis l'ordonnance du 22 sept. 2017, l'employeur peut préciser les motifs dans les 15 jours suivant la notification, de sa propre initiative ou à la demande du salarié. L'insuffisance de motivation à elle seule ne rend plus le licenciement sans cause réelle et sérieuse — elle ouvre droit à une indemnité d'au plus un mois de salaire (art. L.1235-2).",
    source: "Art. L.1235-2 C. trav. (ord. 22 sept. 2017)",
  },
  {
    question: "Un employeur peut-il licencier un salarié en arrêt maladie ?",
    options: [
      "Jamais, c'est un licenciement nul",
      "Oui, mais uniquement pour faute grave",
      "Oui, si le motif est étranger à l'état de santé",
      "Oui, après 6 mois d'absence",
    ],
    correct: 2,
    explanation: "L'arrêt maladie ne crée pas une immunité contre le licenciement. L'employeur peut licencier si le motif est totalement étranger à l'état de santé (ex : faute commise avant l'arrêt, motif économique, désorganisation de l'entreprise nécessitant un remplacement définitif). Ce qui est interdit : licencier EN RAISON de l'état de santé (discrimination, art. L.1132-1).",
    source: "Cass. soc., 16 déc. 2020, n°19-17.637",
  },
  {
    question: "Quel est le plafond d'indemnité pour licenciement sans cause réelle et sérieuse (barème Macron) pour un salarié avec 5 ans d'ancienneté dans une entreprise de 50 salariés ?",
    options: [
      "3 mois de salaire",
      "6 mois de salaire",
      "10 mois de salaire",
      "Pas de plafond",
    ],
    correct: 1,
    explanation: "Pour 5 ans d'ancienneté, le barème Macron prévoit un plancher de 3 mois et un plafond de 6 mois de salaire brut (art. L.1235-3). Attention : ce plafond ne s'applique PAS en cas de licenciement nul (harcèlement, discrimination, etc.) — dans ce cas, le minimum est de 6 mois sans plafond.",
    source: "Art. L.1235-3 C. trav.",
  },
  {
    question: "Le salarié refuse de se présenter à l'entretien préalable. Que doit faire l'employeur ?",
    options: [
      "Reporter l'entretien à une autre date",
      "Envoyer une deuxième convocation",
      "Poursuivre la procédure normalement",
      "Considérer le refus comme une faute supplémentaire",
    ],
    correct: 2,
    explanation: "L'entretien préalable est un DROIT du salarié, pas une obligation. S'il ne se présente pas, l'employeur peut poursuivre la procédure de licenciement normalement, sans avoir à reporter ni reconvoquer. Le refus de se présenter ne constitue pas une faute.",
    source: "Cass. soc., 7 juin 2006, n°04-43.819",
  },
  {
    question: "Un licenciement notifié oralement (pas de lettre recommandée) est :",
    options: [
      "Valable si des témoins sont présents",
      "Irrégulier en la forme mais valable sur le fond",
      "Sans cause réelle et sérieuse",
      "Nul",
    ],
    correct: 2,
    explanation: "Le licenciement doit être notifié par lettre recommandée avec accusé de réception (art. L.1232-6). Un licenciement verbal est considéré comme dépourvu de cause réelle et sérieuse car l'employeur ne peut pas prouver le motif invoqué — la lettre fixant les termes du litige.",
    source: "Art. L.1232-6 C. trav. — Cass. soc., 23 juin 1998",
  },
  {
    question: "La mise à pied conservatoire doit-elle être immédiatement suivie d'une procédure disciplinaire ?",
    options: [
      "Non, l'employeur a 2 mois",
      "Oui, la convocation doit être envoyée dans un délai restreint",
      "Non, elle peut durer aussi longtemps que nécessaire",
      "Oui, dans les 48h maximum",
    ],
    correct: 1,
    explanation: "La mise à pied conservatoire n'est pas une sanction — elle est prise dans l'attente d'une décision. Mais l'employeur doit engager la procédure disciplinaire dans un 'délai restreint' (pas de délai légal précis, mais la jurisprudence sanctionne les délais excessifs). Si le délai est trop long, la mise à pied est requalifiée en sanction disciplinaire, et l'employeur ne peut plus prononcer de licenciement (non bis in idem).",
    source: "Cass. soc., 30 oct. 2013, n°12-22.962",
  },
  {
    question: "Après un licenciement pour motif économique, l'employeur recrute sur le même poste 3 mois plus tard. Quelles sont les conséquences ?",
    options: [
      "Aucune, le délai de priorité est de 1 mois",
      "Le salarié licencié a une priorité de réembauche pendant 1 an",
      "Le licenciement économique est automatiquement sans cause réelle et sérieuse",
      "Le salarié peut demander la nullité du licenciement",
    ],
    correct: 1,
    explanation: "Le salarié licencié pour motif économique bénéficie d'une priorité de réembauche pendant 1 an (art. L.1233-45), à condition d'en faire la demande. Si l'employeur embauche sans respecter cette priorité, il s'expose à une indemnité minimale de 2 mois de salaire. Par ailleurs, recruter sur le même poste peu après un licenciement économique remet en cause la réalité de la suppression de poste.",
    source: "Art. L.1233-45 C. trav.",
  },
];

export default function QuizLicenciement() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return { emoji: "🟢", message: "Excellent. Vos réflexes en matière de licenciement sont solides." };
    if (pct >= 60) return { emoji: "🟡", message: "Correct, mais attention — certains angles morts pourraient vous coûter cher." };
    return { emoji: "🔴", message: "Alerte. Plusieurs erreurs qui, en situation réelle, se traduisent par des condamnations prud'homales." };
  };

  if (finished) {
    const { emoji, message } = getScoreMessage();
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-6xl mb-6">{emoji}</p>
        <h1
          className="text-3xl font-bold text-alinea-950 mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {score} / {questions.length}
        </h1>
        <p className="text-lg text-alinea-600 max-w-md mx-auto mb-8">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/apprendre"
            className="px-6 py-3 bg-alinea-950 text-white rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          >
            Autres quizz
          </Link>
          <Link
            href="/articles"
            className="px-6 py-3 border border-alinea-200 text-alinea-700 rounded-xl text-[14px] font-medium hover:bg-alinea-50 transition-colors"
          >
            Lire nos analyses
          </Link>
        </div>
        <p className="mt-10 text-[13px] text-alinea-400">
          Recevez chaque semaine les risques juridiques que vous ne voyez pas →{" "}
          <Link href="#newsletter" className="text-accent-dark underline">S&apos;abonner</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/apprendre" className="text-[13px] text-alinea-400 hover:text-alinea-600 transition-colors">
          ← Retour
        </Link>
        <span className="text-[13px] text-alinea-400 font-medium">
          {current + 1} / {questions.length}
        </span>
      </div>

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
          if (!showExplanation) {
            classes += "border-alinea-200 hover:border-accent/40 hover:bg-accent/5 cursor-pointer";
          } else if (i === q.correct) {
            classes += "border-emerald-300 bg-emerald-50 text-emerald-900";
          } else if (i === selected) {
            classes += "border-red-300 bg-red-50 text-red-900";
          } else {
            classes += "border-alinea-100 text-alinea-400";
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} className={classes} disabled={showExplanation}>
              <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="border border-alinea-200 rounded-xl p-6 mb-8 bg-alinea-50">
          <p className="font-semibold text-alinea-950 text-[15px] mb-2">
            {selected === q.correct ? "✅ Bonne réponse" : "❌ Mauvaise réponse"}
          </p>
          <p className="text-[14px] text-alinea-600 leading-relaxed mb-3">{q.explanation}</p>
          <p className="text-[12px] text-alinea-400 font-medium">{q.source}</p>
        </div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-alinea-950 text-white rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
        >
          {current < questions.length - 1 ? "Question suivante →" : "Voir mon score →"}
        </button>
      )}
    </div>
  );
}
