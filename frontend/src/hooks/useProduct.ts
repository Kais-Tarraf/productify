import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
} from "../lib/api";

export const useProduct = () => {
	const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts });
	return result;
};

export const useCreateProduct = () => {
	const result = useMutation({ mutationFn: createProduct });
	return result;
};

export const useProductId = (id) => {
	const result = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProductById(id),
		enabled: !!id,
	});
	return result;
};

export const useDeleteProduct = () => {
	const result = useMutation({ mutationFn: deleteProduct });
	return result;
};
