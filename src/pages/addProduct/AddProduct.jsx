import React from "react";

const AddProduct = () => {
	const handleAddProduct = (e) => {
		e.preventDefault();
	};
	return (
		<div>
			<p>add product page</p>
			<form onSubmit={handleAddProduct}>
				<div>
					<input
						type="text"
						placeholder="phone name"
					/>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
