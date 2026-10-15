import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

const App = () => {
	return (
		<div className="min-h-screen bg-base-100">
			<Navbar />
			<main className="max-w-5xl mx-auto px-4 py-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/create" element={<CreateProduct />} />
					<Route path="/edit/:id" element={<EditProduct />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
