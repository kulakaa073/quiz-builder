export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export type QuestionOptionForm = {
  text: string;
  isCorrect: boolean;
  order: number;
};

export type QuestionForm =
  | { type: "BOOLEAN"; text: string; order: number; correctBoolean: boolean }
  | { type: "INPUT"; text: string; order: number; correctText: string }
  | { type: "CHECKBOX"; text: string; order: number; options: QuestionOptionForm[] };

export type QuizFormValues = {
  title: string;
  questions: QuestionForm[];
};

export type QuizListItem = {
  id: string;
  title: string;
  questionCount: number;
};

export type QuestionOptionDetail = {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
};

export type QuestionDetail = {
  id: string;
  type: QuestionType;
  text: string;
  order: number;
  correctBoolean: boolean | null;
  correctText: string | null;
  options: QuestionOptionDetail[];
};

export type QuizDetail = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: QuestionDetail[];
};
