import type { QuestionForm, QuestionOptionForm } from "@/types/quiz";

export function emptyQuestion(order: number): QuestionForm {
  return {
    type: "BOOLEAN",
    text: "",
    order,
    correctBoolean: false,
  };
}

export function emptyOption(order: number): QuestionOptionForm {
  return {
    text: "",
    isCorrect: false,
    order,
  };
}

export function isCheckboxQuestion(
  q: QuestionForm
): q is QuestionForm & { type: "CHECKBOX"; options: QuestionOptionForm[] } {
  return q.type === "CHECKBOX";
}
