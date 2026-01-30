"use client";

import Link from "next/link";
import type { QuizListItem } from "@/types/quiz";
import DeleteIcon from "@/components/shared/DeleteIcon";

type Props = {
  quiz: QuizListItem;
  onDelete: () => void;
  isDeleting: boolean;
  questionCountLabel: string;
};

export default function QuizListItem({ quiz, onDelete, isDeleting, questionCountLabel }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Link
        href={`/quizzes/${quiz.id}`}
        className="flex-1 min-w-0 hover:text-indigo-600 transition-colors"
      >
        <span className="font-medium text-slate-900 block truncate">{quiz.title}</span>
        <span className="text-sm text-slate-500">{questionCountLabel}</span>
      </Link>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
        aria-label={`Delete ${quiz.title}`}
        title="Delete quiz"
      >
        <DeleteIcon className="w-5 h-5" />
      </button>
    </li>
  );
}
