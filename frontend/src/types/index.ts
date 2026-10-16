// User Types
export interface UserData {
	id: string;
	email: string;
	name?: string | null;
	imageUrl?: string | null;
}

// Product Types
export interface Product {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateProductData {
	title: string;
	description: string;
	imageUrl: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
	id: string;
}

// Comment Types
export interface Comment {
	id: string;
	content: string;
	userId: string;
	productId: string;
	createdAt: string;
}

export interface CreateCommentData {
	productId: string;
	content: string;
}
