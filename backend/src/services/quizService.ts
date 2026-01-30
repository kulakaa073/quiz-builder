import { prisma } from "../lib/db.js";
import { QuestionType } from "@prisma/client";

export type CreateQuizInput = {
  title: string;
  questions: Array<
    | { type: "BOOLEAN"; text: string; order?: number; correctBoolean: boolean }
    | { type: "INPUT"; text: string; order?: number; correctText: string }
    | {
        type: "CHECKBOX";
        text: string;
        order?: number;
        options: Array<{ text: string; isCorrect: boolean; order?: number }>;
      }
  >;
};

export async function createQuiz(data: CreateQuizInput) {
  return prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((q, i) => {
          const order = q.order ?? i;
          if (q.type === "BOOLEAN") {
            return {
              type: QuestionType.BOOLEAN,
              text: q.text,
              order,
              correctBoolean: q.correctBoolean,
            };
          }
          if (q.type === "INPUT") {
            return {
              type: QuestionType.INPUT,
              text: q.text,
              order,
              correctText: q.correctText,
            };
          }
          return {
            type: QuestionType.CHECKBOX,
            text: q.text,
            order,
            options: {
              create: (q.options ?? []).map((opt, j) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
                order: opt.order ?? j,
              })),
            },
          };
        }),
      },
    },
    include: {
      questions: {
        include: { options: true },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getQuizzes() {
  const quizzes = await prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      _count: { select: { questions: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return quizzes.map((q) => ({
    id: q.id,
    title: q.title,
    questionCount: q._count.questions,
  }));
}

export async function getQuizById(id: string) {
  return prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        include: { options: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function deleteQuiz(id: string) {
  return prisma.quiz.delete({ where: { id } });
}
