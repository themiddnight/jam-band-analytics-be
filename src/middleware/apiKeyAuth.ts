import type { Request, Response, NextFunction } from "express";
import env from "../config/env";

const HEADER_NAME = "x-api-key";

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const providedKey = req.header(HEADER_NAME);

  if (!providedKey || providedKey !== env.API_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
}
