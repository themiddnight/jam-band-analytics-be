import { config as loadEnv } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  loadEnv();
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  CORS_ORIGIN: z.string().optional(),
  API_SECRET: z.string().min(1, "API_SECRET is required"),
});

const env = envSchema.parse(process.env);

export default env;
