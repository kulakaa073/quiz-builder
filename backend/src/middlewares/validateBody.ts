import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import type { Schema } from "joi";

export function validateBody(schema: Schema) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const value = await schema.validateAsync(req.body, { abortEarly: false });
      req.body = value;
      next();
    } catch (err) {
      const error = createHttpError(400, (err as Error).message ?? "Bad Request");
      (error as Record<string, unknown>).details = (err as { details?: unknown })?.details;
      next(error);
    }
  };
}
