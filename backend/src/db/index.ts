import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DB_URL) {
	throw new Error("DB_URL is not defined in the environment variables.");
}

// Initialize Postgres connection pool
const pool = new Pool({ connectionString: ENV.DB_URL });

// log when first connection is made
pool.on("connect", () => {
	console.log("Database connected successfully");
});

// log when an error occurs
pool.on("error", (err) => {
	console.error("Database connection error: ", err);
});
export const db = drizzle({
	client: pool,
	schema, 
});
