import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import env from "../config/env";
import * as schema from "./schema";

const queryClient = postgres(env.DATABASE_URL, {
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(queryClient, { schema });
export type DbClient = typeof db;
