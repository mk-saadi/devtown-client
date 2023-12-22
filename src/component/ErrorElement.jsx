import { Link } from "react-router-dom";
import Header from "./Header";

const ErrorElement = () => {
	return (
		<main className="grid min-h-full px-6 py-24 place-items-center sm:py-32 lg:px-8">
			<Header />
			<div className="text-center">
				<p className="text-base font-semibold text-red-400">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="flex items-center justify-center mt-10 gap-x-6">
					<Link
						to="/"
						className="submitButton"
					>
						Go back home
					</Link>
				</div>
			</div>
		</main>
	);
};

export default ErrorElement;
