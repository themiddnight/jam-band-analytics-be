import { Router } from "express";
import { ZodError } from "zod";

import { apiKeyAuth } from "../middleware/apiKeyAuth";
import { db } from "../db/client";
import { analyticsEvents } from "../db/schema";
import { analyticsBatchSchema } from "../types/analytics";

const router = Router();

router.post("/analytics", apiKeyAuth, async (req, res, next) => {
  try {
    const { events } = analyticsBatchSchema.parse(req.body);

    const now = new Date();
    const values = events.map((event) => ({
      eventName: event.eventName,
      userId: event.userId,
      isAuthenticated: event.isAuthenticated ?? false,
      authenticatedUserId: event.authenticatedUserId ?? null,
      sessionId: event.sessionId ?? null,
      roomId: event.roomId ?? null,
      roomType: event.roomType ?? null,
      projectId: event.projectId ?? null,
      payload: event.payload ?? null,
      device: event.device ?? null,
      network: event.network ?? null,
      occurredAt: event.occurredAt ?? now,
      receivedAt: now,
    }));

    await db.insert(analyticsEvents).values(values);

    res.status(201).json({ inserted: values.length });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid payload", errors: error.flatten() });
      return;
    }
    next(error);
  }
});

export default router;
