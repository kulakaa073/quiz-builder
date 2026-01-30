"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchQuizById } from "@/lib/api";
import type { QuizDetail } from "@/types/quiz";
import PageLayout from "@/components/shared/PageLayout";
import QuizDetailContent from "@/components/quizDetailPage/QuizDetailContent";
import Alert from "@/components/shared/Alert";

export default function QuizDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchQuizById(id);
        if (!cancelled) {
          if (data) setQuiz(data);
          else setError("Quiz not found");
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load quiz");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) {
    return (
      <PageLayout backHref="/quizzes" backLabel="Quizzes" title="Quiz">
        <p className="text-slate-600">Invalid quiz.</p>
        <Link href="/quizzes" className="mt-2 inline-block text-indigo-600 hover:underline">
          Back to quizzes
        </Link>
      </PageLayout>
    );
  }

  if (loading) {
    return (
      <PageLayout backHref="/quizzes" backLabel="Quizzes" title="Quiz">
        <p className="text-slate-600">Loading…</p>
      </PageLayout>
    );
  }

  if (error || !quiz) {
    return (
      <PageLayout backHref="/quizzes" backLabel="Quizzes" title="Quiz">
        <Alert variant="error">{error ?? "Quiz not found"}</Alert>
        <Link href="/quizzes" className="mt-2 inline-block text-indigo-600 hover:underline">
          Back to quizzes
        </Link>
      </PageLayout>
    );
  }

  return (
    <PageLayout backHref="/quizzes" backLabel="Quizzes" title={quiz.title}>
      <QuizDetailContent quiz={quiz} />
    </PageLayout>
  );
}
