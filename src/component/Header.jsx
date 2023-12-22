import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, AlignCenter, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const navigation = [
	{ name: "Home", to: "/" },
	{ name: "Smartphones", to: "/smartphones" },
	{ name: "Search", to: "/search" },
	{ name: "AddProduct", to: "/addProducts" },
];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<header className="absolute inset-x-0 top-0 z-50">
			<nav
				className="flex items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link
						to="/"
						className="-m-1.5 p-1.5"
					>
						<span className="sr-only">Your Company</span>
						<img
							className="w-auto h-8"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<AlignCenter
							className="w-6 h-6"
							aria-hidden="true"
						/>
					</button>
				</div>

				<Fade
					className="hidden mx-6 lg:flex lg:gap-x-12"
					cascade
					triggerOnce
					damping={0.3}
					// direction="bottom-right"
				>
					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.to}
							className="text-sm font-semibold leading-6 text-gray-700"
						>
							{item.name}
						</Link>
					))}
				</Fade>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<button className="text-sm font-semibold leading-6 text-gray-700">
						<ShoppingBag />
					</button>
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-50" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto shadow-2xl shadow-gray-800/85 bg-orange-50 sm:max-w-xs sm:ring-1 sm:ring-gray-400">
					<div className="flex items-center justify-between">
						<Link
							to="/"
							className="-m-1.5 p-1.5"
						>
							<span className="sr-only">Your Company</span>
							<img
								className="w-auto h-8"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<X
								className="w-6 h-6"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="flow-root mt-6">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="py-6 space-y-2">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
									>
										{item.name}
									</Link>
								))}
							</div>
							<div className="py-6">
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Log in
								</a>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
};

export default Header;
