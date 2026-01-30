"use client";

import Link from "next/link";
import PageLayout from "@/components/shared/PageLayout";
import QuizList from "@/components/quizzesPage/QuizList";

export default function QuizListPage() {
  return (
    <PageLayout
      backHref="/"
      backLabel="Home"
      title="Quizzes"
      action={
        <Link
          href="/create"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Create quiz
        </Link>
      }
    >
      <QuizList />
    </PageLayout>
  );
}
