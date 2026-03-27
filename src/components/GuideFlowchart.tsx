"use client";

import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FlowchartStep {
  id: number;
  question: string;
  yesNext: number | "success";
  noResult: string;
}

/* ------------------------------------------------------------------ */
/*  Data — decision tree                                               */
/* ------------------------------------------------------------------ */

const STEPS: FlowchartStep[] = [
  {
    id: 1,
    question:
      "Y a-t-il une op\u00e9ration juridique modifiant la situation de l\u2019employeur ?",
    yesNext: 2,
    noResult:
      "Sans op\u00e9ration juridique modifiant la situation de l\u2019employeur (vente, fusion, scission, etc.), l\u2019article L.1224-1 du Code du travail ne trouve pas \u00e0 s\u2019appliquer. Il n\u2019y a pas de transfert d\u2019entreprise.",
  },
  {
    id: 2,
    question:
      "L\u2019op\u00e9ration porte-t-elle sur une entit\u00e9 \u00e9conomique autonome ?",
    yesNext: 3,
    noResult:
      "L\u2019article L.1224-1 exige le transfert d\u2019une \u00ab\u00a0entit\u00e9 \u00e9conomique autonome\u00a0\u00bb, c\u2019est-\u00e0-dire un ensemble organis\u00e9 de personnes et d\u2019\u00e9l\u00e9ments poursuivant un objectif propre. Sans cette autonomie, il ne s\u2019agit pas d\u2019un transfert au sens de la loi.",
  },
  {
    id: 3,
    question:
      "Cette entit\u00e9 conserve-t-elle son identit\u00e9 apr\u00e8s le transfert ?",
    yesNext: 4,
    noResult:
      "La jurisprudence europ\u00e9enne (Directive 2001/23/CE) et fran\u00e7aise exige que l\u2019entit\u00e9 conserve son identit\u00e9 apr\u00e8s le transfert. Si l\u2019entit\u00e9 est dispers\u00e9e ou perd son autonomie organisationnelle, L.1224-1 ne s\u2019applique pas.",
  },
  {
    id: 4,
    question:
      "L\u2019activit\u00e9 est-elle effectivement poursuivie par le nouvel employeur ?",
    yesNext: "success",
    noResult:
      "La poursuite effective de l\u2019activit\u00e9 par le cessionnaire est une condition n\u00e9cessaire. Si l\u2019activit\u00e9 n\u2019est pas r\u00e9ellement poursuivie ou reprise, le transfert d\u2019entreprise au sens de L.1224-1 n\u2019est pas caract\u00e9ris\u00e9.",
  },
];

const SUCCESS_MESSAGE =
  "C\u2019est un transfert d\u2019entreprise au sens de L.1224-1 du Code du travail. Les contrats de travail sont transf\u00e9r\u00e9s de plein droit au nouvel employeur.";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GuideFlowchart() {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [result, setResult] = useState<{
    type: "success" | "no";
    message: string;
  } | null>(null);
  const [history, setHistory] = useState<number[]>([1]);

  const currentStep = STEPS.find((s) => s.id === currentStepId)!;

  const handleYes = useCallback(() => {
    if (currentStep.yesNext === "success") {
      setResult({ type: "success", message: SUCCESS_MESSAGE });
    } else {
      const nextId = currentStep.yesNext as number;
      setCurrentStepId(nextId);
      setHistory((h) => [...h, nextId]);
    }
  }, [currentStep]);

  const handleNo = useCallback(() => {
    setResult({ type: "no", message: currentStep.noResult });
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStepId(1);
    setResult(null);
    setHistory([1]);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render: result state                                            */
  /* ---------------------------------------------------------------- */

  if (result) {
    const isSuccess = result.type === "success";
    return (
      <div className="mt-12 border border-alinea-200 rounded-2xl p-8 md:p-10 bg-white">
        {/* Header */}
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-teal-700 mb-4">
          Diagnostic &mdash; Transfert d&apos;entreprise
        </p>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((step) => {
            const answered = history.includes(step.id);
            return (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-300
                    ${answered ? "bg-teal-500 text-white" : "bg-alinea-100 text-alinea-400"}
                  `}
                >
                  {step.id}
                </div>
                {step.id < STEPS.length && (
                  <div
                    className={`w-8 h-0.5 ${answered && history.includes(step.id + 1) ? "bg-teal-300" : "bg-alinea-100"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Result card */}
        <div
          className={`
            p-6 rounded-xl border-2 mb-8
            ${isSuccess ? "border-teal-300 bg-teal-50" : "border-red-200 bg-red-50"}
          `}
          style={{ animation: "fadeSlideIn 0.4s ease-out forwards" }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0 mt-0.5">
              {isSuccess ? "\u2705" : "\u274c"}
            </span>
            <div>
              <h4
                className={`text-lg font-bold mb-2 ${isSuccess ? "text-teal-900" : "text-red-900"}`}
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {isSuccess
                  ? "Transfert d\u2019entreprise caract\u00e9ris\u00e9"
                  : "Pas de transfert d\u2019entreprise"}
              </h4>
              <p
                className={`text-[14px] leading-relaxed ${isSuccess ? "text-teal-700" : "text-red-700"}`}
              >
                {result.message}
              </p>
            </div>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="border border-alinea-200 text-alinea-700 px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
        >
          Recommencer le diagnostic
        </button>

        <style jsx>{`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render: question state                                          */
  /* ---------------------------------------------------------------- */

  return (
    <div className="mt-12 border border-alinea-200 rounded-2xl p-8 md:p-10 bg-white">
      {/* Header */}
      <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-teal-700 mb-2">
        Diagnostic interactif
      </p>
      <h3
        className="text-xl md:text-2xl font-bold text-alinea-950 mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Mon op\u00e9ration est-elle un transfert d&apos;entreprise ?
      </h3>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((step) => {
          const isCurrent = step.id === currentStepId;
          const isPast = history.includes(step.id) && !isCurrent;
          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold
                  transition-all duration-300
                  ${isCurrent ? "bg-teal-600 text-white ring-4 ring-teal-100" : ""}
                  ${isPast ? "bg-teal-500 text-white" : ""}
                  ${!isCurrent && !isPast ? "bg-alinea-100 text-alinea-400" : ""}
                `}
              >
                {isPast ? "\u2713" : step.id}
              </div>
              {step.id < STEPS.length && (
                <div
                  className={`w-8 h-0.5 transition-all duration-300 ${isPast ? "bg-teal-300" : "bg-alinea-100"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Question card */}
      <div
        key={currentStepId}
        className="p-6 rounded-xl bg-alinea-50 border border-alinea-100 mb-6"
        style={{ animation: "fadeSlideIn 0.4s ease-out forwards" }}
      >
        <p className="text-[13px] text-alinea-400 mb-2 font-medium">
          \u00c9tape {currentStepId} sur {STEPS.length}
        </p>
        <p
          className="text-lg font-semibold text-alinea-950 leading-snug"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {currentStep.question}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleYes}
          className="flex-1 bg-teal-700 text-white py-3.5 rounded-xl text-[15px] font-semibold hover:bg-teal-800 transition-colors"
        >
          Oui
        </button>
        <button
          onClick={handleNo}
          className="flex-1 border-2 border-alinea-200 text-alinea-700 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
        >
          Non
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
