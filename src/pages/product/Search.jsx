import axios from "axios";
import { Key, Globe, MoveRight, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Hero from "../home/Hero";

const Search = () => {
	const [item, setItem] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					"https://devtown-server-lniza185a-mk-saadi.vercel.app/products"
				);
				setItem(response.data);
			} catch (error) {
				console.log(error.message);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500);
			}
		};

		fetchData();
	}, []);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredItems = item.filter(
		(it) =>
			it.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			it.brand.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="max-w-2xl min-h-screen px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 overflow-x-none">
			<Header />

			<Fade
				cascade
				direction="up"
				triggerOnce
				className="w-full mt-10 col-span-full md:mt-0"
			>
				<div className="relative -mt-6 rounded-md shadow-md">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<span className="text-gray-500 sm:text-sm">
							<Globe />
						</span>
					</div>
					<input
						type="text"
						name="price"
						id="price"
						className="md:text-base block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6 pl-12"
						required
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</div>
			</Fade>

			<div className="grid grid-cols-1 mt-16 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{searchQuery.length === 0 ? (
					<p>Search product by typing</p>
				) : filteredItems.length === 0 ? (
					<div className="flex flex-col items-center justify-center text-center col-span-full">
						<div className="flex items-center justify-center gap-3 text-5xl font-bold text-red-700/60">
							<ShieldAlert size={70} />
						</div>
						<h3>Oops</h3>
						<p>Did you made a typo?</p>
						<p>Cause we don't have any product in that name.</p>
					</div>
				) : loading ? (
					<div className="flex items-center justify-center col-span-full">
						<p className="text-3xl text-gray-700/80">Loading...</p>
					</div>
				) : (
					filteredItems.map((it) => (
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
					))
				)}
			</div>
		</div>
	);
};

export default Search;
