import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidQuizId } from "../middlewares/isValidQuizId.js";
import {
  createQuizController,
  getQuizzesController,
  getQuizByIdController,
  deleteQuizController,
} from "../controllers/quizController.js";
import { createQuizSchema } from "../validation/quiz.js";

const router = Router();

router.post("/", validateBody(createQuizSchema), ctrlWrapper(createQuizController));
router.get("/", ctrlWrapper(getQuizzesController));
router.get("/:id", isValidQuizId, ctrlWrapper(getQuizByIdController));
router.delete("/:id", isValidQuizId, ctrlWrapper(deleteQuizController));

export default router;
