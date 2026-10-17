import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";

export const useProduct = () => {
	const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts });
	return result;
};

export const useCreateProduct = () => {
	const result = useMutation({ mutationFn: createProduct });
	return result;
};
