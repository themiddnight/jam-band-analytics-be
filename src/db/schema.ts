import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  eventName: text("event_name").notNull(),
  userId: text("user_id").notNull(),
  sessionId: text("session_id"),
  roomType: text("room_type"),
  projectId: text("project_id"),
  payload: jsonb("payload"),
  device: jsonb("device"),
  network: jsonb("network"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow().notNull(),
});
