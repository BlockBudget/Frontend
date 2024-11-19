import React from "react";
import { ConnectBtn } from "./ConnectBtn";
import Link from "next/link";

const Navbar = () => {
	return (
		<>
			<div className="flex justify-between  items-center text-white  h-28 py-6">
				<div className="text-lg  font-semibold">
					<Link href="/" className="font-semibold flex gap-3 items-center">
					
					<img src="/Frame.png" alt="logo" className="h-8 w-8" />
					BlockBudget
					</Link>
				</div>
				<ConnectBtn />
			</div>
		</>
	);
};

export const Navbar2 = () => {
	return (
		<>
			<div className="flex justify-between  text-white  h-28 py-6">
				<div className="text-lg  font-semibold">
					
				</div>
				<ConnectBtn />
			</div>
		</>
	);
};
export default Navbar;