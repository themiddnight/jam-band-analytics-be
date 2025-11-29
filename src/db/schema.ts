import { pgTable, uuid, text, jsonb, timestamp, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  eventName: text("event_name").notNull(),
  userId: text("user_id").notNull(),
  sessionId: text("session_id"),
  roomId: text("room_id"),
  roomType: text("room_type"),
  projectId: text("project_id"),
  payload: jsonb("payload"),
  device: jsonb("device"),
  network: jsonb("network"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow().notNull(),
});

export const feedbackSubmissions = pgTable("feedback_submissions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  sessionId: text("session_id"),
  satisfactionScore: integer("satisfaction_score").notNull(),
  roles: jsonb("roles").notNull(), // array of role strings
  otherRoleNote: text("other_role_note"),
  skillLevel: text("skill_level").notNull(), // beginner | intermediate | professional
  favoriteRoom: text("favorite_room").notNull(), // perform | arrange
  latencyTolerance: integer("latency_tolerance").notNull(),
  returnLikelihood: integer("return_likelihood").notNull(),
  comments: text("comments"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
});
