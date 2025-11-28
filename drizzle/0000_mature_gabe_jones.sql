CREATE TABLE "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_name" text NOT NULL,
	"user_id" text NOT NULL,
	"session_id" text,
	"room_type" text,
	"project_id" text,
	"payload" jsonb,
	"device" jsonb,
	"network" jsonb,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL
);
