import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import * as quizService from "../services/quizService.js";

export async function createQuizController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body = req.body as quizService.CreateQuizInput;
  const quiz = await quizService.createQuiz(body);
  res.status(201).json(quiz);
}

export async function getQuizzesController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const quizzes = await quizService.getQuizzes();
  res.json(quizzes);
}

export async function getQuizByIdController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const quiz = await quizService.getQuizById(id);
  if (!quiz) {
    throw createHttpError(404, "Quiz not found");
  }
  res.json(quiz);
}

export async function deleteQuizController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const quiz = await quizService.getQuizById(id);
  if (!quiz) {
    throw createHttpError(404, "Quiz not found");
  }
  await quizService.deleteQuiz(id);
  res.status(204).send();
}
