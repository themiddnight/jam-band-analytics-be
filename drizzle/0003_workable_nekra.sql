ALTER TABLE "analytics_events" ADD COLUMN "is_authenticated" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "analytics_events" ADD COLUMN "authenticated_user_id" text;--> statement-breakpoint
ALTER TABLE "feedback_submissions" ADD COLUMN "is_authenticated" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "feedback_submissions" ADD COLUMN "authenticated_user_id" text;