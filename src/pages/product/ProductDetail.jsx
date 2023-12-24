import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { MoveLeft, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent1 from "../../component/PostContent";
import Header from "../../component/Header";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
const ProductDetail = () => {
	// const item = useLoaderData();
	const [item, setItem] = useState([]);
	console.log("item: ", item);
	const { id } = useParams();

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		axios
			.get(
				`https://devtown-server-lniza185a-mk-saadi.vercel.app/products/${id}`
			)
			.then((res) => {
				setItem(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [id]);
	const filledStars = Array.from(
		{ length: 5 },
		(_, index) => index < item.rate
	);

	const [quantity, setQuantity] = useState(0);
	const handleAddToCart = () => {
		setQuantity(quantity + 1);
	};

	return (
		<>
			<div className="relative grid max-w-5xl max-h-screen mx-auto lg:overflow-hidden">
				<div className="grid h-screen grid-cols-1 gap-4 lg:overflow-hidden lg:grid-cols-2">
					{/* col 1 */}
					<div className="col-span-1 mt-10">
						<div className="flex items-center justify-center">
							<img
								src={item.mainPhoto}
								alt=""
								className="h-[310px] lg:h-[480px]"
							/>
						</div>
					</div>

					{/* col 2 */}
					<div className="col-span-1 pt-10 pb-32 mx-2 lg:overflow-y-auto storyModal md:mx-4 lg:mx-0">
						<button
							className="flex items-center justify-center gap-2 text-xl font-semibold text-orange-400 bg-transparent group"
							onClick={handleGoBack}
						>
							Go Back{" "}
							<MoveLeft className="duration-200 group-hover:ml-2" />
						</button>

						<div className="flex flex-col">
							<p className="mt-4 text-xl font-semibold uppercase text-gray-500/50">
								Smartphone
							</p>
							<p className="text-4xl font-semibold text-gray-800">
								{item.productName}
							</p>
							<div className="flex items-center mt-3">
								{filledStars.map((filled, index) => (
									<StarIcon
										key={index}
										className={`h-5 w-5 flex-shrink-0 ${
											filled
												? "text-orange-400"
												: "text-orange-400/40"
										}`}
										aria-hidden="true"
									/>
								))}
								<p className="sr-only">
									{item.rate} out of 5 stars
								</p>
							</div>

							<div>
								<div className="mt-5 border-t border-gray-900/30">
									<ul className="mt-1 mb-3 text-gray-700 list-disc list-inside">
										<p className="font-medium">
											Quick overview
										</p>
										{item?.overview &&
											item?.overview
												.split(",")
												.slice(0, 5)
												.map((it, index) => (
													<li
														key={index}
														className="ml-4"
													>
														{it}
													</li>
												))}
									</ul>
								</div>

								<div>
									<div className="mb-4 space-y-1 font-semibold text-gray-900/80">
										<p>
											Smartphone Processor{" "}
											{item.processor}.
										</p>
										<p>
											Smartphone Hard Disk Storage{" "}
											{item.storage}.
										</p>
										<p>
											Smartphone Operating System{" "}
											{item.os}.
										</p>
									</div>
									<div className="max-w-[55ch]">
										<PostContent1
											content={item.description}
										/>
									</div>

									<div>
										{/* <p>{item.material}</p> */}
										<ul className="my-6 text-gray-700 list-disc list-inside border-t border-gray-900/30">
											<p className="font-medium">
												Material
											</p>
											<div className="flex flex-col justify-start gap-2 md:items-center md:flex-row">
												{item?.material &&
													item?.material
														.split(",")
														.slice(0, 5)
														.map((it, index) => (
															<li
																key={index}
																className="ml-4"
															>
																{it}
															</li>
														))}
											</div>
										</ul>

										<ul className="my-6 text-gray-700 list-disc list-inside border-t border-gray-900/30">
											<p className="font-medium">
												Available Colors
											</p>
											<div className="flex flex-col justify-start gap-2 md:items-center md:flex-row">
												{item?.color &&
													item?.color
														.split(",")
														.slice(0, 5)
														.map((it, index) => (
															<li
																key={index}
																className="ml-4"
															>
																{it}
															</li>
														))}
											</div>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="fixed w-full lg:absolute bottom-6">
					<div className="flex items-center justify-between px-2.5 py-2.5 mx-1 bg-white md:px-10 md:py-5 md:mx-8 absoluteShadow rounded-xl">
						<div className="flex items-center justify-start gap-4">
							<img
								src={item.mainPhoto}
								className="w-auto h-12"
								alt=""
							/>
							<div>
								<p className="text-sm font-medium text-gray-700 md:text-base">
									{item.productName}
								</p>
								<p className="text-xs font-medium md:text-base text-gray-700/50">
									{item.brand}
								</p>
							</div>
						</div>

						<div className="flex flex-col items-center justify-start gap-y-1 md:gap-y-0 md:gap-x-5 md:justify-center md:flex-row">
							<p className="font-bold text-gray-700">
								$ {item.price}
							</p>
							<button
								className="px-2 py-1 text-sm font-semibold text-white duration-200 bg-orange-400 shadow-xl md:py-2 md:px-4 rounded-xl shadow-orange-600 hover:shadow-lg hover:shadow-orange-700 hover:rounded-3xl md:text-base"
								onClick={handleAddToCart}
							>
								Add to Cart {quantity}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
