import { useLoaderData } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const ProductDetail = () => {
	const item = useLoaderData();
	console.log("item: ", item);

	return (
		<div className="grid max-w-3xl mx-auto ">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="col-span-1">
					<img
						src={item.mainPhoto}
						alt=""
					/>
				</div>
				<div className="col-span-1">
					<button className="flex items-center justify-start gap-3 text-base text-orange-400 hover:cursor-pointer">
						<MoveLeft /> Go back
					</button>
					<p className="text-2xl font-semibold text-gray-500/50">
						Smartphone
					</p>
					<p>{item.productName}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
