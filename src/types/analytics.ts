import { z } from "zod";

export const analyticsEventSchema = z.object({
  eventName: z.string().min(1),
  userId: z.string().min(1),
  sessionId: z.string().optional(),
  roomId: z.string().optional(),
  roomType: z.string().optional(),
  projectId: z.string().optional(),
  occurredAt: z.coerce.date().optional(),
  payload: z.record(z.string(), z.any()).optional(),
  device: z
    .object({
      os: z.string().optional(),
      browser: z.string().optional(),
      category: z.enum(["mobile", "tablet", "desktop"]).optional(),
    })
    .optional(),
  network: z
    .object({
      latencyMs: z.number().optional(),
      jitterMs: z.number().optional(),
      packetLossPct: z.number().optional(),
    })
    .optional(),
});

export const analyticsBatchSchema = z.object({
  events: z.array(analyticsEventSchema).min(1).max(100),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
