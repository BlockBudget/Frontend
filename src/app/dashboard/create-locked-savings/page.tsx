import { IndentDecrease } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function CreateLockedSavings() {

	return (
		<>
			<div className="w-full m-auto">
				<Link href="/dashboard" className="flex space-x-2">
					<IndentDecrease className="text-white " size={20} />{" "}
					<span className="text-white font-montserrat font-semibold text-sm">
						Back
					</span>
				</Link>
			</div>
			<div className="min-h-screen flex items-center -mt-12 justify-center p-6">
				<div className="w-full relative max-w-lg bg-gradient-to-b from-gray-900 to-[#1d1f24] border-2 border-gray-700 rounded-[48px] p-8 shadow-lg overflow-hidden text-gray-300">
					<h2 className="text-2xl font-montserrat font-semibold text-center text-white mb-8">
						Create a new locked savings
					</h2>

					<form className="space-y-5 relative z-50">
						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Savings name
							</label>
							<input
								type="text"
								placeholder="Enter a name for this savings"
								className="w-full px-4 py-1 placeholder:text-sm bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Target amount
							</label>
							<input
								type="number"
								placeholder="Set your savings target"
								className="w-full px-4 py-1 bg-[#131418] placeholder:text-sm border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Savings life span
							</label>
							<div className="flex space-x-4">
								<input
									type="date"
									className="w-full px-4 py-1 bg-[#131418]  border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{/* <input
									type="date"
									className="w-full px-4 py-1 bg-[#131418]  border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/> */}
							</div>
						</div>

						<button
							type="submit"
							className="w-full py-2 mt-4 bg-[#131418]  text-white font-semibold rounded-full hover:bg-[#131418]  transition duration-200"
						>
							Create Savings
						</button>
					</form>

					<div className="absolute bg-opacity-40 z-0 backdrop-blur-lg bg-gray-800 left-0 right-0 h-full -z-5 w-full rounded-full -bottom-[200px]">
						<div className="bg-gray-700/20 h-1/2 m-auto mt-20 w-3/5 blur-sm rounded-full"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateLockedSavings;
