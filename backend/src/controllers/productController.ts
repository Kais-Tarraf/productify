import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await queries.getAllProducts();
		res.status(200).json(products);
	} catch (error) {
		console.error("Error getting products: ", error);
		res.status(500).json({ error: "Failed to get products " });
	}
};

// get products by current user
export const getMyProducts = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId) return res.status(401).json({ error: "Unauthorized" });
		const products = await queries.getProductsByUserId(userId);
		res.status(200).json(products);
	} catch (error) {
		console.error("Error getting user products: ", error);
		res.status(500).json({ error: "Failed to get user products" });
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await queries.getProductById(id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.status(200).json(product);
	} catch (error) {
		console.error("Error getting product: ", error);
		res.status(500).json({ error: "Failed to get product" });
	}
};

// create
export const createProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		const { title, description, imageUrl } = req.body;
		if (!title || !description || !imageUrl) {
			res.status(400).json({ error: "Ops!, some required field are missing" });
			return;
		}
		const product = await queries.createProduct({
			title,
			description,
			imageUrl,
			userId,
		});
		res.status(201).json(product);
	} catch (error) {
		console.error("Error creating product", error);
		res.status(500).json({ error: "Failed to create product" });
	}
};
// Update
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		const { id } = req.params;
		const { title, description, imageUrl } = req.body;
		const existingProduct = await queries.getProductById(id);
		if (!existingProduct) {
			res.status(404).json({ error: "Product not found" });
			return;
		}
		if (existingProduct.userId !== userId) {
			res
				.status(403)
				.json({ error: "You are not allowed to update other's products" });
			return;
		}

		const updatedProduct = await queries.updateProduct(id, {
			title,
			description,
			imageUrl,
		});
		res.status(200).json(updatedProduct);
	} catch (error) {
		console.error("Failed to save product updates", error);
		res.status(500).json({ error: "Failed to save product updates" });
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		const { id } = req.params;
		const existingProduct = await queries.getProductById(id);
		if (!existingProduct) {
			res.status(404).json({ error: "Product not found" });
			return;
		}
		if (existingProduct.userId !== userId) {
			res
				.status(403)
				.json({ error: "You are not allowed to delete other's products" });
			return;
		}
		await queries.deleteProduct(id);
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting product", error);
		res.status(500).json({ error: "Failed to delete product" });
	}
};
