CREATE TABLE "feedback_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"session_id" text,
	"satisfaction_score" integer NOT NULL,
	"roles" jsonb NOT NULL,
	"other_role_note" text,
	"skill_level" text NOT NULL,
	"favorite_room" text NOT NULL,
	"latency_tolerance" integer NOT NULL,
	"return_likelihood" integer NOT NULL,
	"comments" text,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
