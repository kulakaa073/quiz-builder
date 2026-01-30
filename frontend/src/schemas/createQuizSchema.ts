import * as Yup from "yup";

const questionOptionSchema = Yup.object({
  text: Yup.string().required("Option text is required"),
  isCorrect: Yup.boolean().required(),
  order: Yup.number().integer().min(0).optional(),
});

const booleanQuestionSchema = Yup.object({
  type: Yup.string().oneOf(["BOOLEAN"]).required(),
  text: Yup.string().trim().required("Question text is required"),
  order: Yup.number().integer().min(0).optional(),
  correctBoolean: Yup.boolean().required("Select True or False"),
});

const inputQuestionSchema = Yup.object({
  type: Yup.string().oneOf(["INPUT"]).required(),
  text: Yup.string().trim().required("Question text is required"),
  order: Yup.number().integer().min(0).optional(),
  correctText: Yup.string().trim().required("Correct answer is required"),
});

const checkboxQuestionSchema = Yup.object({
  type: Yup.string().oneOf(["CHECKBOX"]).required(),
  text: Yup.string().trim().required("Question text is required"),
  order: Yup.number().integer().min(0).optional(),
  options: Yup.array()
    .of(questionOptionSchema)
    .min(1, "Add at least one option")
    .required("Options are required"),
});

const questionSchema = Yup.lazy((value) => {
  const type = (value as { type?: string })?.type;
  if (type === "BOOLEAN") return booleanQuestionSchema;
  if (type === "INPUT") return inputQuestionSchema;
  if (type === "CHECKBOX") return checkboxQuestionSchema;
  return Yup.object({ type: Yup.string().required() });
}) as Yup.Schema<unknown>;

export function createQuizValidationSchema() {
  return Yup.object({
    title: Yup.string()
      .trim()
      .required("Quiz title is required")
      .max(200, "Title is too long"),
    questions: Yup.array()
      .of(questionSchema)
      .min(1, "Add at least one question")
      .required("Questions are required"),
  });
}
