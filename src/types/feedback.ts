import { z } from "zod";

export const feedbackRoleSchema = z.enum([
  "musician",
  "songwriter",
  "producer",
  "teacher_or_student",
  "hobbyist",
  "other",
]);

export const feedbackSkillLevelSchema = z.enum([
  "beginner",
  "intermediate",
  "professional",
]);

export const feedbackFavoriteRoomSchema = z.enum(["perform", "arrange"]);

export const feedbackSubmissionSchema = z.object({
  userId: z.string().min(1),
  isAuthenticated: z.boolean().optional().default(false),
  authenticatedUserId: z.string().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  satisfactionScore: z.number().int().min(1).max(5),
  roles: z.array(feedbackRoleSchema).min(1),
  otherRoleNote: z.string().optional().nullable(),
  skillLevel: feedbackSkillLevelSchema,
  favoriteRoom: feedbackFavoriteRoomSchema,
  latencyTolerance: z.number().int().min(1).max(5),
  returnLikelihood: z.number().int().min(1).max(5),
  comments: z.string().optional(),
});

export type FeedbackSubmissionInput = z.infer<typeof feedbackSubmissionSchema>;
