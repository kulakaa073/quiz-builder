"use client";

import type { QuestionDetail } from "@/types/quiz";

type Props = { question: QuestionDetail; index: number };

export default function QuestionReadOnly({ question, index }: Props) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-2">
        <span className="text-sm font-medium text-slate-400">Q{index + 1}</span>
        <span className="text-xs text-slate-400 capitalize">({question.type.toLowerCase()})</span>
      </div>
      <p className="mt-1 text-slate-900">{question.text}</p>

      {question.type === "BOOLEAN" && (
        <p className="mt-2 text-sm text-slate-600">
          Correct answer: <strong>{question.correctBoolean ? "True" : "False"}</strong>
        </p>
      )}
      {question.type === "INPUT" && question.correctText && (
        <p className="mt-2 text-sm text-slate-600">
          Correct answer: <strong>{question.correctText}</strong>
        </p>
      )}
      {question.type === "CHECKBOX" && question.options?.length > 0 && (
        <ul className="mt-2 space-y-1">
          <span className="text-sm text-slate-500 block mb-1">Options:</span>
          {question.options.map((opt) => (
            <li key={opt.id} className="flex items-center gap-2 text-sm text-slate-700">
              {opt.isCorrect ? (
                <span className="text-green-600" aria-label="Correct">✓</span>
              ) : (
                <span className="w-4" aria-hidden />
              )}
              <span>{opt.text}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
