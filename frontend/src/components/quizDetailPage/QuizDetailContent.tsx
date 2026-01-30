"use client";

import type { QuizDetail } from "@/types/quiz";
import { formatQuestionCount } from "@/utils/format";
import QuestionReadOnly from "./QuestionReadOnly";

type Props = { quiz: QuizDetail };

export default function QuizDetailContent({ quiz }: Props) {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{quiz.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {formatQuestionCount(quiz.questions.length)}
        </p>
      </header>

      <div className="space-y-6">
        {quiz.questions.map((q, index) => (
          <QuestionReadOnly key={q.id} question={q} index={index} />
        ))}
      </div>
    </>
  );
}
