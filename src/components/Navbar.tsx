import React from "react";
import { ConnectBtn } from "./ConnectBtn";
import Link from "next/link";

const Navbar = () => {
	return (
		<>
			<div className=" items-center text-white bg-[#9d2cf3e5] py-4">
				<div className="w-11/12 m-auto flex justify-between ">
				<div className="text-lg  font-semibold">
					<Link href="/" className="font-semibold flex gap-3 items-center">
						<img src="/Frame.png" alt="logo" className="h-8 w-8" />
						BlockBudget
					</Link>
				</div>
				<div className="flex gap-10 text-sm">
					<Link href="/" className="font-semibold flex gap-3 items-center">
						Market
					</Link>
					<Link href="/" className="font-semibold flex gap-3 items-center">
						How it works
					</Link>
					<Link href="/" className="font-semibold flex gap-3 items-center">
						News
					</Link>
					<Link href="/" className="font-semibold flex gap-3 items-center">
						Defi
					</Link>
				</div>
				<ConnectBtn />
			</div>
			</div>
		</>
	);
};

export const Navbar2 = () => {
	return (
		<>
			<div className="flex justify-end text-white top-0  h-28 py-6">
				<ConnectBtn />
			</div>

		</>

	);
};
export default Navbar;
