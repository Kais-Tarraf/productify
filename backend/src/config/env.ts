import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
	PORT: process.env.PORT,
	DB_URL: process.env.DATABASE_URL,
	DATABASE_URL_POOLED: process.env.DATABASE_URL_POOLED,
	NODE_ENV: process.env.NODE_ENV,
	FRONTEND_URL: process.env.FRONTEND_URL,
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};
