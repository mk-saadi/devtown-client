import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
// import { X } from "@heroicons/react/24/outline";
// import { StarIcon } from "@heroicons/react/20/solid";
import { StarIcon, X } from "lucide-react";

const product = {
	name: "Basic Tee 6-Pack ",
	price: "$192",
	rating: 3.9,
	reviewCount: 117,
	href: "#",
	imageSrc:
		"https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
	imageAlt: "Two each of gray, white, and black shirts arranged on table.",
	colors: [
		{ name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
		{ name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
		{ name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
	],
	sizes: [
		{ name: "XXS", inStock: true },
		{ name: "XS", inStock: true },
		{ name: "S", inStock: true },
		{ name: "M", inStock: true },
		{ name: "L", inStock: true },
		{ name: "XL", inStock: true },
		{ name: "XXL", inStock: true },
		{ name: "XXXL", inStock: false },
	],
};

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Hero = ({ it }) => {
	const [open, setOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

	return (
		<>
			<div>
				<button onClick={() => setOpen(true)}>Quick view</button>
			</div>
			<Transition.Root
				show={open}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex items-stretch justify-center min-h-full text-center md:items-center md:px-2 lg:px-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
								enterTo="opacity-100 translate-y-0 md:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 md:scale-100"
								leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
							>
								<Dialog.Panel className="flex w-full text-base text-left transition transform md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
									<div className="relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 rounded-xl md:p-6 lg:p-8">
										<button
											type="button"
											className="absolute text-gray-400 right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
											onClick={() => setOpen(false)}
										>
											<span className="sr-only">
												Close
											</span>
											<X
												className="w-6 h-6"
												aria-hidden="true"
											/>
										</button>

										<div className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
											<div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-3 aspect-w-2 sm:col-span-4 lg:col-span-5">
												<img
													src={it.mainPhoto}
													alt={product.imageAlt}
													className="object-cover object-center"
												/>
											</div>
											<div className="sm:col-span-8 lg:col-span-7">
												<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
													{it.productName}
												</h2>

												<section
													aria-labelledby="information-heading"
													className="mt-2"
												>
													<h3
														id="information-heading"
														className="sr-only"
													>
														Product information
													</h3>

													<p className="mt-2">
														{it.overview}
													</p>

													<p className="text-2xl text-gray-900">
														$ {it.price}
													</p>
													<p className="mt-1 text-sm font-medium text-orange-600/80">
														{it.quantity} in stock
													</p>
												</section>

												<section
													aria-labelledby="options-heading"
													className="mt-10"
												>
													<h3
														id="options-heading"
														className="sr-only"
													>
														Product options
													</h3>

													<div>
														<p>
															Available colors{" "}
															{it.color
																.split(".")
																.join(" ")}
														</p>

														<p className="mt-2">
															Operating System{" "}
															{it.os}
														</p>

														<p className="mt-2">
															Processor {it.brand}
														</p>
													</div>
												</section>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default Hero;
