import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../lib/api";

const useProduct = () => {
	const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts });
	return result;
};

export default useProduct;
