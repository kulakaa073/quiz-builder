import type { QuizListItem, QuizDetail, QuizFormValues, QuestionOptionForm } from "@/types/quiz";

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
}

export async function fetchQuizzes(): Promise<QuizListItem[]> {
  const res = await fetch(`${getApiUrl()}/quizzes`);
  if (!res.ok) throw new Error("Failed to load quizzes");
  return res.json();
}

export async function fetchQuizById(id: string): Promise<QuizDetail | null> {
  const res = await fetch(`${getApiUrl()}/quizzes/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load quiz");
  return res.json();
}

export type CreateQuizPayload = {
  title: string;
  questions: Array<
    | { type: "BOOLEAN"; text: string; order: number; correctBoolean: boolean }
    | { type: "INPUT"; text: string; order: number; correctText: string }
    | {
        type: "CHECKBOX";
        text: string;
        order: number;
        options: Array<{ text: string; isCorrect: boolean; order: number }>;
      }
  >;
};

export async function createQuiz(payload: CreateQuizPayload): Promise<QuizDetail> {
  const res = await fetch(`${getApiUrl()}/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { message?: string }).message ?? data.error ?? `Failed to create quiz (${res.status})`);
  }
  return res.json();
}

export async function deleteQuiz(id: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/quizzes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete quiz");
}

export function formatCreateQuizPayload(values: QuizFormValues): CreateQuizPayload {
  return {
    title: values.title.trim(),
    questions: values.questions.map((q, i) => {
      const order = i;
      if (q.type === "BOOLEAN") {
        const correctBoolean =
          (q as { correctBoolean?: boolean | string }).correctBoolean === true ||
          String((q as { correctBoolean?: boolean | string }).correctBoolean) === "true";
        return { type: "BOOLEAN" as const, text: q.text.trim(), order, correctBoolean };
      }
      if (q.type === "INPUT") {
        return {
          type: "INPUT" as const,
          text: q.text.trim(),
          order,
          correctText: (q as { correctText: string }).correctText.trim(),
        };
      }
      const opts = (q as { options: QuestionOptionForm[] }).options
        .filter((o) => o.text.trim())
        .map((o, j) => ({ text: o.text.trim(), isCorrect: o.isCorrect, order: j }));
      return { type: "CHECKBOX" as const, text: q.text.trim(), order, options: opts };
    }),
  };
}
