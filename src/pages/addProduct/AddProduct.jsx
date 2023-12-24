/* eslint-disable react/no-unescaped-entities */
import { useState, Fragment } from "react";
import { Switch, Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Image, Check, ImagePlus } from "lucide-react";
import Toast from "../../component/Toast";
import useToast from "../../component/useToast";
import imageCompression from "browser-image-compression";
import { Fade, Slide } from "react-awesome-reveal";
import axios from "axios";
import "./add.css";
import Header from "../../component/Header";

const brand = [
	{ name: "Apple iPhone" },
	{ name: "BlackBurry" },
	{ name: "BlackMagic" },
	{ name: "Google Pixel" },
	{ name: "Huawei" },
	{ name: "Honor" },
	{ name: "Infinix" },
	{ name: "Itel" },
	{ name: "IQOO" },
	{ name: "Motorola" },
	{ name: "OnePlus" },
	{ name: "Oppo" },
	{ name: "Realme" },
	{ name: "Redmi" },
	{ name: "Samsung" },
	{ name: "Symphony" },
	{ name: "Sony" },
	{ name: "Tecno" },
	{ name: "Vivo" },
	{ name: "Walton" },
	{ name: "Xiaomi" },
];

const processor = [
	{ name: "Apple Bionic" },
	{ name: "Google Tensor" },
	{ name: "HiSilicon Kirin" },
	{ name: "MediaTek" },
	{ name: "Qualcomm Snapdragon" },
	{ name: "Samsung Exynos" },
	{ name: "UNISOC" },
];
const memory = [
	{ name: "2 GB" },
	{ name: "3 GB" },
	{ name: "4 GB" },
	{ name: "6 GB" },
	{ name: "8 GB" },
	{ name: "12 GB" },
	{ name: "16 GB" },
	{ name: "32 GB" },
];

const storage = [
	{ name: "4 GB" },
	{ name: "6 GB" },
	{ name: "8 GB" },
	{ name: "12 GB" },
	{ name: "16 GB" },
	{ name: "32 GB" },
	{ name: "64 GB" },
	{ name: "128 GB" },
	{ name: "256 GB" },
	{ name: "512 GB" },
	{ name: "1 TB" },
];

const operatingSystem = [
	{ name: "Android OS" },
	{ name: "iOS" },
	{ name: "GrapheneOS" },
	{ name: "Android One" },
	{ name: "Harmony OS" },
	{ name: "Symbian OS" },
	{ name: "Palm OS" },
	{ name: "WebOS" },
	{ name: "ColorOS" },
	{ name: "One UI" },
	{ name: "OxygenOS" },
	{ name: "MIUI" },
	{ name: "Realme UI" },
	{ name: "Funtouch OS" },
	{ name: "HiOS" },
	{ name: "MagicOS" },
	{ name: "Emotion UI" },
	{ name: "XOS" },
];

const AddProduct = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [selectedProcessor, setSelectedProcessor] = useState(processor[0]);
	const [selectedOS, setSelectedOS] = useState(operatingSystem[0]);
	const [selectedMemory, setSelectedMemory] = useState(memory[0]);
	const [selectedStorage, setSelectedStorage] = useState(storage[0]);
	const [selectedBrand, setSelectedBrand] = useState(brand[0]);

	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";

	const uploadToImgbb = async (imageFile) => {
		let formData = new FormData();
		formData.append("image", imageFile);
		formData.append("key", imgbbApiKey);

		try {
			const response = await axios.post(
				"https://api.imgbb.com/1/upload",
				formData
			);
			return response.data.data.url;
		} catch (error) {
			showToast("error", "Image upload failed. Please try again");
			throw new Error("Image upload to Imgbb failed");
		}
	};

	function getRandomNumber() {
		for (let attempt = 0; attempt < 4; attempt++) {
			const randomNumber = Math.floor(Math.random() * 5) + 1;
			if (randomNumber <= 5) {
				return randomNumber;
			}
		}
		return 3;
	}

	const handleAddProduct = async (e) => {
		e.preventDefault();
		showToast("loading", "Please wait!");

		const form = e.target;
		const productName = form.productName.value;
		const mainPhoto = form.elements.image.files[0];

		const options = {
			maxSizeMB: 0.3,
			maxWidthOrHeight: 1440,
			useWebWorker: true,
		};

		try {
			const compressedMainPhoto = await imageCompression(
				mainPhoto,
				options
			);
			const mainPhotoUrl = await uploadToImgbb(compressedMainPhoto);

			const overview = form.overview.value;
			const price = parseFloat(form.price.value);
			const color = form.color.value;
			const material = form.material.value;
			const description = form.description.value;
			const processor = selectedProcessor.name;
			const brand = selectedBrand.name;
			const memory = selectedMemory.name;
			const storage = selectedStorage.name;
			const os = selectedOS.name;
			const quantity = parseFloat(form.quantity.value);

			const listItem = {
				productName,
				mainPhoto: mainPhotoUrl,
				overview,
				price,
				color,
				material,
				description,
				processor,
				brand,
				os,
				quantity,
				memory,
				storage,
				randomValue: getRandomNumber(),
			};

			try {
				const response = await axios.post(
					"https://devtown-server-lniza185a-mk-saadi.vercel.app/products",
					listItem
				);
				if (response.data.acknowledged === true) {
					showToast("success", "Product added to database!");
					// form.reset();
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				}
			} catch (error) {
				showToast(
					"error",
					"Failed to add product to database. Please try again!"
				);
			}
		} catch (error) {
			return;
		}
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const handleChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
			const imageUrl = URL.createObjectURL(file);
			setImagePreview(imageUrl);
		}
	};

	return (
		<div className="relative">
			<Header />
			<div className="px-6 py-24 bg-orange-50 isolate sm:py-32 lg:px-8">
				{toastType && (
					<Toast
						type={toastType}
						message={toastMessage}
						onHide={hideToast}
					/>
				)}
				<div
					className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
					aria-hidden="true"
				>
					<div
						className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
						Add new Mobile to Database
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-500">
						Enter all the required fields to add the smartphone in
						the database.
					</p>
				</div>
				<form
					action="#"
					method="POST"
					onSubmit={handleAddProduct}
					className="max-w-xl mx-auto mt-16 sm:mt-20"
				>
					<div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
						<Fade
							cascade
							direction="up"
							triggerOnce
							className="w-full col-span-full "
						>
							<label
								htmlFor="productName"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Mobile Name
							</label>
							<div className="-mt-6">
								<input
									type="text"
									name="productName"
									id="productName"
									autoComplete="product-name"
									className="md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
									required
								/>
							</div>
						</Fade>
						<Fade
							cascade
							direction="up"
							triggerOnce
							className="w-full col-span-full "
						>
							<label
								htmlFor="price"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Price
							</label>
							<div className="relative -mt-6 rounded-md shadow-md">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<span className="text-gray-500 sm:text-sm">
										$
									</span>
								</div>
								<input
									type="text"
									name="price"
									id="price"
									className="md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6 pl-7"
									required
								/>
							</div>
						</Fade>
						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="overview"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Quick Overview{" "}
								<span className="ml-2 opacity-70">
									( use comma ( , ) between each point )
								</span>
							</label>
							<div className="-mt-6">
								<textarea
									type="text"
									name="overview"
									id="overview"
									autoComplete="organization"
									rows={5}
									className="md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
									defaultValue={""}
									required
								></textarea>
							</div>
						</Fade>

						{/* upload main photo */}
						<div className="w-full col-span-full ">
							<label
								htmlFor="preview-image"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Main Photo
							</label>
							<div className="p-2 mt-2 h-[210px] border border-dashed bg-white rounded-lg  overflow-hidden border-gray-900/50 shadow-md">
								{selectedFile ? (
									<label
										htmlFor="preview-image"
										className="flex flex-col items-center justify-center gap-2 text-gray-500 cursor-pointer"
									>
										{imagePreview && (
											<img
												id="preview-image"
												src={imagePreview}
												alt="Image preview"
												className="h-[150px] w-fit object-cover rounded-md  -md "
											/>
										)}
										{selectedFile.name.length > 45
											? `${selectedFile.name.slice(
													0,
													25
											  )}...`
											: selectedFile.name}
									</label>
								) : (
									<>
										<div className="flex justify-center px-6 py-10 mt-2">
											<div className="text-center">
												<Image
													className="w-12 h-12 mx-auto text-gray-300"
													aria-hidden="true"
												/>
												<div className="flex mt-4 text-sm leading-6 text-gray-600">
													<label
														htmlFor="preview-image"
														className="relative font-semibold text-[#fab07a] bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
													>
														<span>
															Upload a file
														</span>
													</label>
													<p className="pl-1">
														or drag and drop
													</p>
												</div>
												<p className="text-xs leading-5 text-gray-600">
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
										</div>
									</>
								)}
								<input
									type="file"
									id="preview-image"
									name="image"
									accept="image/*"
									onChange={handleChange}
									style={{ display: "none" }}
									required
									className="sr-only"
								/>
							</div>
						</div>

						<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
							<Listbox
								value={selectedBrand}
								onChange={setSelectedBrand}
								required
								name="brand"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="brand"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select Smartphone Brand
									</label>
									<Listbox.Button className="relative w-full mt-2.5 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">
											{selectedBrand.name}
										</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{brand.map((br, brIdx) => (
												<Listbox.Option
													key={brIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={br}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? "font-medium"
																		: "font-normal"
																}`}
															>
																{br.name}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						{/* processor select BELOW */}
						<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
							<Listbox
								value={selectedProcessor}
								onChange={setSelectedProcessor}
								required
								name="processor"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="processor"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select Smartphone Processor
									</label>
									<Listbox.Button className="relative w-full mt-2.5 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">
											{selectedProcessor.name}
										</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{processor.map((ps, psIdx) => (
												<Listbox.Option
													key={psIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={ps}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? "font-medium"
																		: "font-normal"
																}`}
															>
																{ps.name}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						{/* os select below */}
						<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
							<Listbox
								value={selectedOS}
								onChange={setSelectedOS}
								required
								name="os"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="os"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select OS Brand
									</label>
									<Listbox.Button className="relative w-full mt-2.5 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">
											{selectedOS.name}
										</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{operatingSystem.map(
												(os, osIdx) => (
													<Listbox.Option
														key={osIdx}
														className={({
															active,
														}) =>
															`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
																active
																	? "bg-amber-100 text-amber-900"
																	: "text-gray-900"
															}`
														}
														value={os}
													>
														{({ selected }) => (
															<>
																<span
																	className={`block truncate ${
																		selected
																			? "font-medium"
																			: "font-normal"
																	}`}
																>
																	{os.name}
																</span>
																{selected ? (
																	<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																		<Check
																			className="w-5 h-5"
																			aria-hidden="true"
																		/>
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												)
											)}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						{/* memory select below */}
						<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
							<Listbox
								value={selectedMemory}
								onChange={setSelectedMemory}
								required
								name="memory"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="memory"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select Memory
									</label>
									<Listbox.Button className="relative w-full mt-2.5 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">
											{selectedMemory.name}
										</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{memory.map((mr, mrIdx) => (
												<Listbox.Option
													key={mrIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={mr}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? "font-medium"
																		: "font-normal"
																}`}
															>
																{mr.name}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						{/* storage select below */}
						<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
							<Listbox
								value={selectedStorage}
								onChange={setSelectedStorage}
								required
								name="brand"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="brand"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select Storage
									</label>
									<Listbox.Button className="relative w-full mt-2.5 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">
											{selectedStorage.name}
										</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{storage.map((st, stIdx) => (
												<Listbox.Option
													key={stIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={st}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? "font-medium"
																		: "font-normal"
																}`}
															>
																{st.name}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="quantity"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Quantity
							</label>
							<div className="-mt-6">
								<input
									type="number"
									name="quantity"
									id="quantity"
									autoComplete="number"
									className="md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
									required
								/>
							</div>
						</Fade>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="color"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Color{" "}
								<span className="ml-2 opacity-70">
									( use comma ( , ) between each color name )
								</span>
							</label>
							<div
								// className="mt-2.5"
								className="-mt-6"
							>
								<input
									type="text"
									name="color"
									id="color"
									autoComplete="color"
									className="md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
									required
								/>
							</div>
						</Fade>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="material"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Material{" "}
								<span className="ml-2 opacity-70">
									( use comma ( , ) between each point )
								</span>
							</label>
							<div
								// className="mt-2.5"
								className="-mt-6"
							>
								<input
									type="text"
									name="material"
									id="material"
									autoComplete="material"
									className=" md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
									required
								/>
							</div>
						</Fade>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="description"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Product Description
							</label>
							<div
								// className="mt-2.5"
								className="-mt-6"
							>
								<textarea
									name="description"
									id="description"
									rows={8}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6 shadow-md md:text-base"
									defaultValue={""}
									required
								/>
							</div>
						</Fade>
					</div>
					{/* // className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" */}
					<Fade
						triggerOnce
						direction="up"
						className="mt-7 col-span-full "
					>
						<button
							type="submit"
							style={{ width: "100%" }}
							className="w-full submitButton focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-orange-400"
						>
							Upload Product
						</button>
					</Fade>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
