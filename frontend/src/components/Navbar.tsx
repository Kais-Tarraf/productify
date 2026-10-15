import { SignInButton, SignUpButton, useAuth } from "@clerk/react";
import { PlusIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
	const { isSignedIn } = useAuth();
	return (
		<div className="navbar bg-base-300 ">
			<div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
				<div className="flex-1">
					<Link to="/" className="btn btn-ghost gap-2">
						<ShoppingBagIcon className="size-5 text-primary" />
						<span className="text-lg font-bold font-mono uppercase tracking-tight">
							Productify
						</span>
					</Link>
				</div>
				<div className="flex gap-2 items-center">
					<ThemeSelector />
					{isSignedIn ? (
						<>
							<Link to="/create" className="btn btn-primary btn-sm gap-1">
								<PlusIcon className="size-4" />
								<span className="hidden sm:inline">New Product</span>
							</Link>
							<Link to="/profile" className="btn btn-ghost btn-sm gap-1">
								<UserIcon className="size-4" />
								<span className="hidden sm:inline">Profile</span>
							</Link>
						</>
					) : (
						<>
							<SignInButton mode="modal">
								<button className="btn btn-ghost btn-sm">Sign In</button>
							</SignInButton>
							<SignUpButton mode="modal">
								<button className="btn btn-primary btn-sm">Get Started</button>
							</SignUpButton>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
