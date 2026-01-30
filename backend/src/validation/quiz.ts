import Joi from "joi";

const questionOptionSchema = Joi.object({
  text: Joi.string().required().messages({
    "string.base": "Option text must be a string",
    "any.required": "Option text is required",
  }),
  isCorrect: Joi.boolean().required().messages({
    "any.required": "Option isCorrect is required",
  }),
  order: Joi.number().integer().min(0),
});

const booleanQuestionSchema = Joi.object({
  type: Joi.string().valid("BOOLEAN").required(),
  text: Joi.string().required().messages({
    "string.base": "Question text must be a string",
    "any.required": "Question text is required",
  }),
  order: Joi.number().integer().min(0),
  correctBoolean: Joi.boolean().required().messages({
    "any.required": "Correct answer (true/false) is required for Boolean questions",
  }),
});

const inputQuestionSchema = Joi.object({
  type: Joi.string().valid("INPUT").required(),
  text: Joi.string().required().messages({
    "string.base": "Question text must be a string",
    "any.required": "Question text is required",
  }),
  order: Joi.number().integer().min(0),
  correctText: Joi.string().required().messages({
    "any.required": "Correct answer text is required for Input questions",
  }),
});

const checkboxQuestionSchema = Joi.object({
  type: Joi.string().valid("CHECKBOX").required(),
  text: Joi.string().required().messages({
    "string.base": "Question text must be a string",
    "any.required": "Question text is required",
  }),
  order: Joi.number().integer().min(0),
  options: Joi.array()
    .items(questionOptionSchema)
    .min(1)
    .required()
    .messages({
      "array.min": "Checkbox questions must have at least one option",
      "any.required": "Options are required for Checkbox questions",
    }),
});

const questionSchema = Joi.alternatives().try(
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema
);

export const createQuizSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "Quiz title must be a string",
    "any.required": "Quiz title is required",
    "string.empty": "Quiz title cannot be empty",
  }),
  questions: Joi.array()
    .items(questionSchema)
    .min(1)
    .required()
    .messages({
      "array.base": "Questions must be an array",
      "array.min": "At least one question is required",
      "any.required": "Questions are required",
    }),
});
