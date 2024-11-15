import React from "react";
import { Target, PiggyBank, Command } from "lucide-react";

const MonthlySavings = () => {
    return (
		<div className="min-h-screen text-gray-300 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-10">
					<h1 className="text-2xl font-semibold text-white">
						Monthly Savings
					</h1>
					<p className="text-sm text-gray-400 w-11/12 m-auto mt-3 flex  md:flex-row flex-col justify-between">
						<span>Created by James Henry</span>
						<span>Close date: Jan 24, 2025</span>
						<span>Distribution method: Distribute at End of Period</span>
					</p>
				</div>

				<div className="grid grid-cols-3 gap-6 mb-10">
					<div className="bg-[#191E24] md:col-span-1 col-span-3 border-2 space-x-3 flex border-[#344054] p-6 rounded-lg shadow-md text-center">
						<div className="bg-[#FFFFFF] shadow-sm p-3 rounded-full">
							<Target className="text-[#1E1E1E]" size={27}/>
						</div>
						<div>
							<h3 className="text-sm text-gray-400">Target Savings</h3>
							<p className="text-2xl font-bold text-white">₦632,000</p>
						</div>
					</div>
          <div className="bg-[#191E24]  md:col-span-1 col-span-3 border-2 space-x-3 flex border-[#344054] p-6 rounded-lg shadow-md text-center">
						<div className="bg-[#FFFFFF] shadow-sm p-3 rounded-full">
							<PiggyBank className="text-[#1E1E1E]" size={27}/>
						</div>
						<div>
							<h3 className="text-sm text-gray-400">Total Accumulated</h3>
							<p className="text-2xl font-bold text-white">₦632,000</p>
						</div>
					</div>
          <div className="bg-[#191E24]  md:col-span-1 col-span-3 border-2 space-x-3 flex border-[#344054] p-6 rounded-lg shadow-md text-center">
						<div className="bg-[#FFFFFF] shadow-sm p-3 rounded-full">
							<Command className="text-[#1E1E1E]" size={27}/>
						</div>
						<div>
							<h3 className="text-sm text-gray-400">My Contributions</h3>
							<p className="text-2xl font-bold text-white">₦632,000</p>
						</div>
					</div>
				</div>

				
				<div className="flex md:flex-row flex-col justify-between items-center my-10">
					<p className="text-gray-400">
						<span className="font-semibold text-white">Next payment due:</span>{" "}
						Oct 4, 2024
					</p>
					<div className="space-x-4">
						<button className="px-6 py-2 border border-gray-500 text-sm text-white rounded-xl shadow-md ">
							Pay Now
						</button>
						<button className="px-6 py-2 border border-gray-500 text-sm text-gray-300 rounded-xl hover:border-white">
							Pay All Now
						</button>
					</div>
				</div>

			
				<div className="overflow-x-auto bg-transparent">
					<table className="min-w-full text-sm text-left text-[#FFFFFF]">
						<thead className="bg-[#131418] text-gray-300">
							<tr>
								<th className="px-4 py-3">S/N</th>
								<th className="px-4 py-3">Group Members</th>
								<th className="px-4 py-3">Amount Contributed</th>
								<th className="px-4 py-3">Outstanding Payment</th>
							</tr>
						</thead>
						<tbody>
							{[
								{
									id: 1,
									name: "December Savings",
									contributed: "₦500,000",
									outstanding: "none",
								},
								{
									id: 2,
									name: "December Savings",
									contributed: "₦400,000",
									outstanding: "₦100,000",
								},
								{
									id: 3,
									name: "December Savings",
									contributed: "₦450,000",
									outstanding: "₦50,000",
								},
								{
									id: 4,
									name: "December Savings",
									contributed: "₦500,000",
									outstanding: "none",
								},
								{
									id: 5,
									name: "December Savings",
									contributed: "₦350,000",
									outstanding: "₦150,000",
								},
								{
									id: 6,
									name: "December Savings",
									contributed: "₦500,000",
									outstanding: "none",
								},
							].map((item) => (
								<tr
									key={item.id}
									className="border-t border-[#EAECF0] bg-transparent hover:bg-[#2D3748]"
								>
									<td className="px-4 py-3">{item.id}</td>
									<td className="px-4 py-3">{item.name}</td>
									<td className="px-4 py-3">{item.contributed}</td>
									<td className="px-4 py-3">{item.outstanding}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};


export default MonthlySavings;