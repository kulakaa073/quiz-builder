import "dotenv/config";
import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizzes.js";
import { getDocsHtml } from "./docs.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());

/** API documentation and endpoint testing page */
app.get("/", (_req, res) => {
  res.type("html").send(getDocsHtml());
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/quizzes", quizRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
