"use client";

import { Formik, Field, FieldArray, Form } from "formik";
import Link from "next/link";
import type { QuestionType, QuizFormValues, QuestionOptionForm } from "@/types/quiz";
import { emptyQuestion, emptyOption, isCheckboxQuestion } from "@/utils/formUtils";
import { createQuizValidationSchema } from "@/schemas/createQuizSchema";
import { createQuiz, formatCreateQuizPayload } from "@/lib/api";
import ErrorMessage from "@/components/shared/ErrorMessage";
import Alert from "@/components/shared/Alert";

const initialValues: QuizFormValues = {
  title: "",
  questions: [emptyQuestion(0)],
};

export default function CreateQuizForm() {
  const validationSchema = createQuizValidationSchema();

  return (
    <Formik<QuizFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(null);
        try {
          const payload = formatCreateQuizPayload(values);
          await createQuiz(payload);
          setStatus({ type: "success" });
        } catch (e) {
          setStatus({
            type: "error",
            message: e instanceof Error ? e.message : "Failed to create quiz",
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, status, isSubmitting, setFieldValue }) => (
        <Form className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Quiz title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Geography Quiz"
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <ErrorMessage name="title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Questions</label>
            <FieldArray name="questions">
              {(arrayHelpers) => (
                <div className="space-y-6">
                  {values.questions.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-slate-500">Question {qIndex + 1}</span>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(qIndex)}
                          disabled={values.questions.length <= 1}
                          className="text-sm text-red-600 hover:text-red-800 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
                          <Field
                            as="select"
                            name={`questions.${qIndex}.type`}
                            className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                              const type = e.target.value as QuestionType;
                              setFieldValue(`questions.${qIndex}.type`, type);
                              if (type === "BOOLEAN") {
                                setFieldValue(`questions.${qIndex}.correctBoolean`, false);
                              }
                              if (type === "INPUT") {
                                setFieldValue(`questions.${qIndex}.correctText`, "");
                              }
                              if (type === "CHECKBOX") {
                                setFieldValue(`questions.${qIndex}.options`, [emptyOption(0)]);
                              }
                            }}
                          >
                            <option value="BOOLEAN">True / False</option>
                            <option value="INPUT">Short text answer</option>
                            <option value="CHECKBOX">Multiple choice (several correct)</option>
                          </Field>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Question text</label>
                          <Field
                            name={`questions.${qIndex}.text`}
                            as="textarea"
                            rows={2}
                            placeholder="Enter the question"
                            className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <ErrorMessage name={`questions.${qIndex}.text`} />
                        </div>

                        {question.type === "BOOLEAN" && (
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Correct answer</label>
                            <div className="flex gap-4" role="radiogroup" aria-label="True or False">
                              <label className="inline-flex items-center gap-2 cursor-pointer">
                                <Field
                                  type="radio"
                                  name={`questions.${qIndex}.correctBoolean`}
                                  value="true"
                                  className="text-indigo-600"
                                />
                                <span>True</span>
                              </label>
                              <label className="inline-flex items-center gap-2 cursor-pointer">
                                <Field
                                  type="radio"
                                  name={`questions.${qIndex}.correctBoolean`}
                                  value="false"
                                  className="text-indigo-600"
                                />
                                <span>False</span>
                              </label>
                            </div>
                          </div>
                        )}

                        {question.type === "INPUT" && (
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Correct answer</label>
                            <Field
                              name={`questions.${qIndex}.correctText`}
                              type="text"
                              placeholder="Expected short answer"
                              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                            />
                            <ErrorMessage name={`questions.${qIndex}.correctText`} />
                          </div>
                        )}

                        {question.type === "CHECKBOX" && isCheckboxQuestion(question) && (
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">
                              Options (check correct answers)
                            </label>
                            <FieldArray name={`questions.${qIndex}.options`}>
                              {(optHelpers: {
                                push: (opt: QuestionOptionForm) => void;
                                remove: (i: number) => void;
                              }) => (
                                <div className="space-y-2">
                                  {question.options.map((opt, oIndex) => (
                                    <div key={oIndex} className="flex items-center gap-2">
                                      <Field
                                        type="checkbox"
                                        name={`questions.${qIndex}.options.${oIndex}.isCorrect`}
                                        className="rounded border-slate-300 text-indigo-600"
                                      />
                                      <Field
                                        name={`questions.${qIndex}.options.${oIndex}.text`}
                                        type="text"
                                        placeholder="Option text"
                                        className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => optHelpers.remove(oIndex)}
                                        disabled={question.options.length <= 1}
                                        className="text-slate-400 hover:text-red-600 disabled:opacity-40 text-sm"
                                        aria-label="Remove option"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => optHelpers.push(emptyOption(question.options.length))}
                                    className="text-sm text-indigo-600 hover:text-indigo-800"
                                  >
                                    + Add option
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                            <ErrorMessage name={`questions.${qIndex}.options`} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => arrayHelpers.push(emptyQuestion(values.questions.length))}
                    className="w-full rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    + Add question
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          {status?.type === "error" && (
            <Alert variant="error">{(status as { message: string }).message}</Alert>
          )}
          {status?.type === "success" && (
            <Alert variant="success">
              Quiz created. <Link href="/" className="underline font-medium">Go home</Link>
            </Alert>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating…" : "Create quiz"}
            </button>
            <Link
              href="/"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
