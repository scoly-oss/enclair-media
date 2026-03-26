import Link from "next/link";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  icon: string;
  tags: string[];
}

const difficultyColors = {
  "Débutant": "bg-emerald-100 text-emerald-800",
  "Intermédiaire": "bg-amber-100 text-amber-800",
  "Avancé": "bg-red-100 text-red-800",
};

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link
      href={`/apprendre/${quiz.id}`}
      className="block border border-alinea-200 rounded-xl p-6 hover:border-accent/40 hover:bg-accent/5 transition-all group"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{quiz.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${difficultyColors[quiz.difficulty]}`}>
              {quiz.difficulty}
            </span>
            <span className="text-[12px] text-alinea-400">
              {quiz.questions} questions
            </span>
          </div>
          <h3
            className="font-bold text-alinea-950 text-[17px] group-hover:text-accent-dark transition-colors"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {quiz.title}
          </h3>
          <p className="mt-1.5 text-[14px] text-alinea-500 leading-relaxed">
            {quiz.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {quiz.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-alinea-400 bg-alinea-50 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-alinea-300 group-hover:text-accent-dark transition-colors text-lg">
          →
        </span>
      </div>
    </Link>
  );
}
