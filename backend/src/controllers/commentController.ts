import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import * as quires from "../db/queries";
export const createComment = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		const { productId } = req.params;
		const { content } = req.body;
		if (!content) {
			res.status(400).json({ error: "Comment content required" });
			return;
		}
		const product = await quires.getProductById(productId);
		if (!product) {
			res.status(404).json({ error: "Product not found" });
			return;
		}
		const comment = await quires.createComment({
			content,
			userId,
			productId,
		});
		res.status(201).json(comment);
	} catch (error) {
		console.error("Failed to create comment", error);
		res.status(500).json({ error: "Failed to create comment" });
	}
};
export const deleteComment = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		const { commentId } = req.params;
		const existingComment = await quires.getCommentById(commentId);
		if (!existingComment) {
			res.status(404).json({ error: "Comment not found" });
			return;
		}
		if (existingComment?.userId !== userId) {
			res.status(403).json("You are not allowed to delete this comment");
			return;
		}
		await quires.deleteComment(commentId);
		res.status(201).json({ message: "Comment deleted successfully" });
	} catch (error) {
		console.error("Failed to delete comment", error);
		res.status(500).json({ error: "Failed to delete comment" });
	}
};
