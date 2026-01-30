import type { Request, Response, NextFunction } from "express";
import createHttpError, { type HttpError } from "http-errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (createHttpError.isHttpError(err)) {
    const httpErr = err as HttpError & { details?: unknown };
    res.status(httpErr.status).json({
      status: httpErr.status,
      message: httpErr.message,
      ...(httpErr.details != null && { errors: httpErr.details }),
    });
    return;
  }

  // Prisma "record not found" (e.g. findUnique, delete on missing id)
  const prismaErr = err as { code?: string };
  if (prismaErr.code === "P2025") {
    res.status(404).json({ status: 404, message: "Not found" });
    return;
  }

  const message = err instanceof Error ? err.message : "Something went wrong";
  res.status(500).json({
    status: 500,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { error: message }),
  });
}
