import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getMyProducts,
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
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["myProducts"] });
		},
	});
};

export const useMyProducts = () => {
	return useQuery({
		queryKey: ["myProducts"],
		queryFn: getMyProducts,
	});
};
