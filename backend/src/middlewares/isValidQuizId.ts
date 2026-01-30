import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

/** CUIDs are ~25 alphanumeric chars; allow non-empty string with reasonable length */
const MIN_ID_LENGTH = 20;
const MAX_ID_LENGTH = 50;

export function isValidQuizId(
  req: Request<{ id: string }>,
  _res: Response,
  next: NextFunction
): void {
  const id = req.params.id;
  if (!id || typeof id !== "string" || id.trim() === "") {
    next(createHttpError(400, "Quiz ID is required"));
    return;
  }
  const trimmed = id.trim();
  if (trimmed.length < MIN_ID_LENGTH || trimmed.length > MAX_ID_LENGTH) {
    next(createHttpError(400, "Invalid quiz ID format"));
    return;
  }
  next();
}
