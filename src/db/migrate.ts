import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import env from "../config/env";

const runMigrations = async () => {
  console.log("[migrate] Starting database migrations...");
  
  const sql = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql);
  
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("[migrate] Migrations completed successfully");
  } catch (error) {
    console.error("[migrate] Migration failed:", error);
    throw error;
  } finally {
    await sql.end();
  }
};

runMigrations();
