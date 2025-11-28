import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";

import env from "./config/env";
import healthRouter from "./routes/health";
import analyticsRouter from "./routes/analytics";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN ?? "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", healthRouter);
app.use("/", analyticsRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(env.PORT, () => {
  console.log(`[server] listening on port ${env.PORT}`);
});
