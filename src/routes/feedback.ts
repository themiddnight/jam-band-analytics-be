import { Router } from "express";
import { ZodError } from "zod";

import { db } from "../db/client";
import { feedbackSubmissions } from "../db/schema";
import { feedbackSubmissionSchema } from "../types/feedback";

const router = Router();

router.post("/feedback", async (req, res, next) => {
  try {
    const data = feedbackSubmissionSchema.parse(req.body);

    const now = new Date();

    await db.insert(feedbackSubmissions).values({
      userId: data.userId,
      isAuthenticated: data.isAuthenticated ?? false,
      authenticatedUserId: data.authenticatedUserId ?? null,
      sessionId: data.sessionId ?? null,
      satisfactionScore: data.satisfactionScore,
      roles: data.roles,
      otherRoleNote: data.otherRoleNote ?? null,
      skillLevel: data.skillLevel,
      favoriteRoom: data.favoriteRoom,
      latencyTolerance: data.latencyTolerance,
      returnLikelihood: data.returnLikelihood,
      comments: data.comments ?? null,
      submittedAt: now,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid payload", errors: error.flatten() });
      return;
    }
    next(error);
  }
});

export default router;
