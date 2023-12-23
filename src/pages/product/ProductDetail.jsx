import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { MoveLeft, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent1 from "../../component/PostContent";

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
			.get(`http://localhost:2100/products/${id}`)
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

	return (
		<div className="container grid max-w-5xl max-h-screen mx-auto overflow-hidden">
			<div className="grid h-screen grid-cols-1 gap-4 overflow-hidden lg:grid-cols-2">
				{/* col 1 */}
				<div className="col-span-1 mt-10">
					<div className="flex items-center justify-center">
						<img
							src={item.mainPhoto}
							alt=""
							className="max-h-[550px]"
						/>
					</div>
				</div>

				{/* col 2 */}
				<div className="col-span-1 my-10 overflow-y-auto storyModal">
					<button
						className="flex items-center justify-center gap-2 text-xl font-semibold text-orange-400 bg-transparent group"
						onClick={handleGoBack}
					>
						Go Back{" "}
						<MoveLeft className="duration-200 group-hover:ml-2" />
					</button>
					<p className="mt-4 text-xl font-semibold uppercase text-gray-500/50">
						Smartphone
					</p>

					<div className="flex flex-col">
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
						{/* <p className="mt-4 text-xl font-semibold text-gray-500/50">
							{item.brand}
						</p> */}

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
										Smartphone Processor {item.processor}.
									</p>
									<p>
										Smartphone Hard Disk Storage{" "}
										{item.storage}.
									</p>
									<p>
										Smartphone Operating System {item.os}.
									</p>
								</div>
								<div className="max-w-[55ch]">
									<PostContent1 content={item.description} />
								</div>

								<div>
									{/* <p>{item.material}</p> */}
									<ul className="my-6 text-gray-700 list-disc list-inside border-t border-gray-900/30">
										<p className="font-medium">Material</p>
										<div className="flex items-center justify-start gap-2">
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
										<div className="flex items-center justify-start gap-2">
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
		</div>
	);
};

export default ProductDetail;
