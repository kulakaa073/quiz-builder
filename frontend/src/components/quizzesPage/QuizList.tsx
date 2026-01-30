"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchQuizzes, deleteQuiz } from "@/lib/api";
import type { QuizListItem } from "@/types/quiz";
import { formatQuestionCount } from "@/utils/format";
import QuizListItem from "./QuizListItem";
import Alert from "@/components/shared/Alert";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchQuizzes();
        if (!cancelled) setQuizzes(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load quizzes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this quiz? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete quiz");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p className="text-slate-600">Loading quizzes…</p>;
  if (error) return <Alert variant="error">{error}</Alert>;
  if (quizzes.length === 0) {
    return (
      <p className="text-slate-600">
        No quizzes yet. <Link href="/create" className="text-indigo-600 hover:underline">Create one</Link>.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {quizzes.map((quiz) => (
        <QuizListItem
          key={quiz.id}
          quiz={quiz}
          onDelete={() => handleDelete(quiz.id)}
          isDeleting={deletingId === quiz.id}
          questionCountLabel={formatQuestionCount(quiz.questionCount)}
        />
      ))}
    </ul>
  );
}
