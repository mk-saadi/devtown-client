import axios from "axios";
import { ChevronsDown, ChevronsUp, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import Hero from "../home/Hero";
import Header from "../../component/Header";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const AllProducts = () => {
	const [item, setItem] = useState([]);
	const [selectedMemory, setSelectedMemory] = useState("");

	useEffect(() => {
		axios
			.get(
				"https://devtown-server-lniza185a-mk-saadi.vercel.app/products"
			)
			.then((res) => {
				setItem(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const [sortOrder, setSortOrder] = useState("asc");
	const handleSort = () => {
		const sortedItems = [...item];
		sortedItems.sort((a, b) => {
			const priceA = parseFloat(a.price);
			const priceB = parseFloat(b.price);
			return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
		});
		setItem(sortedItems);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	const handleMemoryChange = (event) => {
		setSelectedMemory(event.target.value);
	};

	const filteredItems = selectedMemory
		? item.filter((it) => it.memory.includes(selectedMemory))
		: item;

	return (
		<div className="max-w-2xl min-h-screen px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 overflow-x-none">
			<Header />

			<div className="flex flex-col items-center justify-start mb-4 gap-y-4 md:gap-x-12 md:flex-row">
				<button
					onClick={handleSort}
					className="flex justify-center gap-3 submitButton"
				>
					Sort by Price
					{sortOrder === "asc" ? <ChevronsDown /> : <ChevronsUp />}
				</button>

				<div className="flex items-center justify-start gap-4 ">
					<label
						htmlFor="memoryFilter"
						className="block -mt-4 text-base font-medium text-gray-700 whitespace-nowrap"
					>
						Filter by Ram:
					</label>
					<select
						id="memoryFilter"
						name="memoryFilter"
						value={selectedMemory}
						onChange={handleMemoryChange}
						className="w-full px-2 py-3 mt-1 rounded-lg cursor-default submitButton focus:outline-none "
					>
						<option value="">All</option>
						{item
							.map((it) => it.memory)
							.filter(
								(value, index, self) =>
									self.indexOf(value) === index
							)
							.map((memory, index) => (
								<option
									key={index}
									value={memory}
								>
									{memory}
								</option>
							))}
					</select>
				</div>
			</div>

			<div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredItems.map((it) => (
					<Fade
						direction="up"
						triggerOnce
						key={it._id}
					>
						<div className="relative flex flex-col items-center justify-center p-8 duration-300 border border-gray-900/15 group hover:bg-gray-700/10">
							<Link
								className="group"
								to={`/product/${it._id}`}
							>
								<div className="w-full overflow-hidden duration-100 bg-transparent rounded-lg aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7">
									{it?.mainPhoto && (
										<img
											src={it?.mainPhoto}
											className="object-cover object-center duration-100 drop-shadow-md homeGrid"
										/>
									)}
								</div>
								<h3 className="mt-4 text-sm text-gray-700">
									{it?.productName}
								</h3>
								<p className="mt-1 mb-6 text-lg font-medium text-gray-900">
									$ {it?.price}
								</p>
							</Link>
							<div className="absolute w-full py-2 font-medium text-center duration-300 bg-white bg-opacity-50 opacity-0 bottom-36 group-hover:opacity-100 ">
								<Hero it={it} />
							</div>

							<div className="absolute bottom-0 flex items-center justify-center w-full ">
								<Link
									to={`/product/${it._id}`}
									className="flex justify-center w-full py-2 bg-white group"
								>
									<button className="flex items-center justify-center gap-2 font-semibold text-gray-700 bg-white ">
										View{" "}
										<MoveRight className="duration-200 group-hover:ml-2" />
									</button>
								</Link>
							</div>
						</div>
					</Fade>
				))}
			</div>
		</div>
	);
};

export default AllProducts;
