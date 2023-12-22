import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import Home from "./pages/home/Home";
import AddProduct from "./pages/addProduct/AddProduct";
import ErrorElement from "./component/ErrorElement";
import Exp from "./component/Exp";
import ProductDetail from "./pages/product/ProductDetail";
import AllProducts from "./pages/product/AllProducts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		errorElement: <ErrorElement />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/addProducts",
				element: <AddProduct />,
			},
			{
				path: "/exp",
				element: <Exp />,
			},
			{
				path: "/product/:id",
				element: <ProductDetail />,
				loader: ({ params }) =>
					fetch(`http://localhost:2100/products/${params.id}`),
			},
			{
				path: "/allSmartphones",
				element: <AllProducts />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<div className="flex flex-col min-h-screen overflow-x-hidden bg-orange-50">
			<RouterProvider router={router} />
		</div>
	</React.StrictMode>
);
