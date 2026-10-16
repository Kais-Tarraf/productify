import type {
	CreateCommentData,
	CreateProductData,
	Product,
	UpdateProductData,
	UserData,
} from "../types";
import api from "./axios";

// Users API
export const syncUser = async (userData: UserData): Promise<any> => {
	const { data } = await api.post("/users/sync", userData);
	return data;
};

// Products API
export const getAllProducts = async (): Promise<Product[]> => {
	const { data } = await api.get("/products");
	return data;
};

export const getProductById = async (id: string): Promise<Product> => {
	const { data } = await api.get(`/products/${id}`);
	return data;
};

export const getMyProducts = async (): Promise<Product[]> => {
	const { data } = await api.get("products/my");
	return data;
};

export const createProduct = async (
	productData: CreateProductData,
): Promise<Product> => {
	const { data } = await api.post("/products", productData);
	return data;
};

export const updateProduct = async ({
	id,
	...productData
}: UpdateProductData): Promise<Product> => {
	const { data } = await api.put(`/products/${id}`, productData);
	return data;
};

export const deleteProduct = async (id: string): Promise<any> => {
	const { data } = await api.delete(`/products/${id}`);
	return data;
};

// Comments API
export const createComment = async ({
	productId,
	content,
}: CreateCommentData): Promise<Comment> => {
	const { data } = await api.post(`/comments/${productId}`, { content });
	return data;
};

export const deleteComment = async ({
	commentId,
}: {
	commentId: string;
}): Promise<any> => {
	const { data } = await api.delete(`/comments/${commentId}`);
	return data;
};
