"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // 0-3
  explanation: string;
}

export interface QuizData {
  chapter: number;
  title: string;
  questions: QuizQuestion[];
}

interface GuideQuizProps {
  quiz: QuizData;
  nextChapterSlug?: string; // e.g. "/guides/transfert-entreprise/chapitre-2"
  guideSlug?: string; // e.g. "/guides/transfert-entreprise"
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GuideQuiz({
  quiz,
  nextChapterSlug,
  guideSlug = "/guides",
}: GuideQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];

  /* Handle answer click */
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (hasAnswered) return;
      setSelectedAnswer(optionIndex);
      setHasAnswered(true);
      if (optionIndex === currentQuestion.correct) {
        setScore((s) => s + 1);
      }
    },
    [hasAnswered, currentQuestion.correct],
  );

  /* Go to next question or finish */
  const handleNext = useCallback(() => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setFinished(true);
    }
  }, [currentIndex, total]);

  /* Restart quiz */
  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setFinished(false);
  }, []);

  /* Score message */
  const getScoreMessage = () => {
    if (score === total) return "Parfait ! Vous ma\u00eetrisez ce chapitre.";
    if (score >= total - 1) return "Bon niveau. Relisez les points manqu\u00e9s.";
    return "Ce chapitre m\u00e9rite une relecture attentive.";
  };

  const getScoreColor = () => {
    if (score === total) return "text-teal-700";
    if (score >= total - 1) return "text-amber-700";
    return "text-red-600";
  };

  /* ---------------------------------------------------------------- */
  /*  Render: finished state                                          */
  /* ---------------------------------------------------------------- */

  if (finished) {
    return (
      <div className="mt-12 border border-alinea-200 rounded-2xl p-8 md:p-10 bg-white">
        {/* Header */}
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-teal-700 mb-2">
          Quiz termin\u00e9
        </p>
        <h3
          className="text-2xl font-bold text-alinea-950 mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Votre r\u00e9sultat
        </h3>

        {/* Score */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-teal-200 flex items-center justify-center bg-teal-50">
            <span className="text-2xl font-bold text-teal-800">
              {score}/{total}
            </span>
          </div>
          <p className={`text-lg font-medium ${getScoreColor()}`}>
            {getScoreMessage()}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-alinea-100 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-700"
            style={{ width: `${(score / total) * 100}%` }}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleRestart}
            className="border border-alinea-200 text-alinea-700 px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
          >
            Recommencer le quiz
          </button>

          {nextChapterSlug && (
            <Link
              href={nextChapterSlug}
              className="bg-teal-700 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-teal-800 transition-colors"
            >
              Module suivant &rarr;
            </Link>
          )}

          <Link
            href={guideSlug}
            className="border border-alinea-200 text-alinea-500 px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-50 hover:border-alinea-300 transition-colors"
          >
            Retour au guide
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render: question state                                          */
  /* ---------------------------------------------------------------- */

  return (
    <div className="mt-12 border border-alinea-200 rounded-2xl p-8 md:p-10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-teal-700">
          Quiz &mdash; Chapitre {quiz.chapter}
        </p>
        <span className="text-[13px] text-alinea-400 font-medium">
          Question {currentIndex + 1}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-alinea-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + (hasAnswered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3
        className="text-lg md:text-xl font-bold text-alinea-950 mb-6 leading-snug"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === currentQuestion.correct;

          let borderColor = "border-alinea-200 hover:border-alinea-300";
          let bgColor = "bg-white hover:bg-alinea-50";
          let textColor = "text-alinea-700";
          let indicatorColor = "bg-alinea-100 text-alinea-500";

          if (hasAnswered) {
            if (isCorrect) {
              borderColor = "border-teal-300";
              bgColor = "bg-teal-50";
              textColor = "text-teal-900";
              indicatorColor = "bg-teal-500 text-white";
            } else if (isSelected && !isCorrect) {
              borderColor = "border-red-300";
              bgColor = "bg-red-50";
              textColor = "text-red-900";
              indicatorColor = "bg-red-500 text-white";
            } else {
              borderColor = "border-alinea-100";
              bgColor = "bg-white";
              textColor = "text-alinea-400";
              indicatorColor = "bg-alinea-100 text-alinea-300";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={hasAnswered}
              className={`
                w-full flex items-center gap-4 p-4 rounded-xl border text-left
                transition-all duration-300 ease-out
                ${borderColor} ${bgColor} ${textColor}
                ${!hasAnswered ? "cursor-pointer" : "cursor-default"}
              `}
            >
              <span
                className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  text-[13px] font-semibold transition-all duration-300
                  ${indicatorColor}
                `}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-[15px] leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after answering) */}
      {hasAnswered && (
        <div
          className="mb-6 p-5 rounded-xl bg-alinea-50 border border-alinea-100 animate-fade-in"
          style={{
            animation: "fadeSlideIn 0.4s ease-out forwards",
          }}
        >
          <p className="text-[13px] font-semibold text-teal-700 mb-1.5 uppercase tracking-wide">
            Explication
          </p>
          <p className="text-[14px] text-alinea-600 leading-relaxed">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {hasAnswered && (
        <button
          onClick={handleNext}
          className="bg-alinea-950 text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-alinea-800 transition-colors"
          style={{
            animation: "fadeSlideIn 0.3s ease-out forwards",
          }}
        >
          {currentIndex + 1 < total ? "Question suivante \u2192" : "Voir mon r\u00e9sultat \u2192"}
        </button>
      )}

      {/* Inline animation keyframes */}
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
