import express from "express";
import { ENV } from "./config/env";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
	res.json({
		message:
			"Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
		endpoints: {
			user: "/api/users",
			products: "/api/products",
			comments: "/api/comments",
		},
	});
});

app.listen(ENV.PORT, () => {
	console.log("Server is Running on PORT 3000");
});
