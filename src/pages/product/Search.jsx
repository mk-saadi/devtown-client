import axios from "axios";
import { Key } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../../component/Header";

const Search = () => {
	const [item, setItem] = useState([]);
	const [searchQuery, setSearchQuery] = useState(""); // State for search query

	useEffect(() => {
		axios
			.get("http://localhost:2100/products")
			.then((res) => {
				setItem(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
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
		<div className="max-w-2xl min-h-screen ...">
			<Header />

			<input
				type="text"
				value={searchQuery}
				onChange={handleSearchChange}
				placeholder="Search by product name or brand"
			/>

			{filteredItems.map((it) => (
				<div key={it._id}>
					<p>{it.productName}</p>
				</div>
			))}
		</div>
	);
};

export default Search;
