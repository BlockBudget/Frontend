"use client";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

import ProgressBar from "@/components/ProgressBar";
import { PiggyBank, TargetIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/RegisteredUser";
import Link from "next/link";

const SavingsPage = () => {
	const { userProfile, isConnected } = useUserProfile();

	const mockPriceHistory = [
		{ date: "Jan", price: 4000 },
		{ date: "Feb", price: 3000 },
		{ date: "Mar", price: 5000 },
		{ date: "Apr", price: 4800 },
		{ date: "May", price: 6000 },
		{ date: "Jun", price: 5500 },
	];

	const recentTransactions = [
		{
			type: "Received",
			amount: "0.245 ETH",
			date: "2024-03-15",
			from: "0x1234...5678",
		},
		{
			type: "Sent",
			amount: "0.1 ETH",
			date: "2024-03-14",
			to: "0x8765...4321",
		},
		{
			type: "Received",
			amount: "0.5 ETH",
			date: "2024-03-13",
			from: "0x9876...1234",
		},
	];

	const completionPercentage = 39;

	return (
		<>
			<div className="flex justify-end w-11/12 mb-3 m-auto">
				<Link href="/dashboard" className=" flex space-x-2">
					<PiggyBank className="text-black " size={20} />{" "}
					<span className="text-black font-montserrat font-semibold text-base">
						Goal Savings
					</span>
				</Link>
			</div>

			<div className="p-8  text-black h-full">
				{/* Header Section */}

				<div>
					<div className="text-base font-normal">Welcome back!</div>

					<h2 className="text-2xl font-semibold">{userProfile?.name}</h2>
				</div>

				<div className="justify-center text-center ">
					<p className="text-md mt-4 font-semibold">December Savings</p>

					<p className="text-sm text-gray-400">Created on: 30 Nov 2024 </p>

					<p className="text-sm text-gray-400"> Locked until: 20 Dec 2024 </p>
				</div>

				{/* Progress Bar */}
				<ProgressBar percentage={completionPercentage} />

				{/* Target and Total Accumulated Boxes */}

				<div className="grid grid-cols-2 gap-4 my-6 text-left">
					<div className="flex gap-4 relative overflow-hidden p-8 rounded-lg border bg-white shadow-lg ">
						<div className="flex">
							<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#003aceda] shadow-sm ">
								<TargetIcon className="text-white" />
							</div>
							<div>
								<h3 className="text-md text-gray-700">Target Savings</h3>

								<p className="text-xl font-bold">₦ 632,000</p>
							</div>
						</div>
						<div className="flex items-center -right-20 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
							<div className="bg-[#003ace28] w-40 relative h-40 rounded-full">
								<div className="bg-[#003ace59] absolute left-7 top-7 w-28 h-28 rounded-full"></div>
							</div>
						</div>
					</div>

					<div className="flex gap-4 p-8 relative overflow-hidden  rounded-lg border bg-white shadow-lg ">
						<div className="flex">
							<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#003aceda] shadow-sm ">
								<PiggyBank className="text-white" />
							</div>
							<div>
								<h3 className="text-md text-gray-700">Total Accumulated</h3>

								<p className="text-xl font-bold">₦ 632,000</p>
							</div>
						</div>
						<div className="flex items-center -right-20 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
							<div className="bg-[#003ace28] w-40 relative h-40 rounded-full">
								<div className="bg-[#003ace59] absolute left-7 top-7 w-28 h-28 rounded-full"></div>
							</div>
						</div>
					</div>
				</div>

				{/* Withdrawal Section */}

				<div className="my-6 flex justify-between gap-6">
					<div>
						<p className="text-sm text-black">
							Available for withdrawal:{" "}
							<span className="text-lg text-black">
								Withdrawal not yet available
							</span>
						</p>
					</div>

					<div>
						<button className="px-6 w-[405px] h-12 py-2 bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#8f2add] hover:to-[#3069fc] rounded-xl">
							Withdraw
						</button>
					</div>
				</div>

				<div className="my-6 flex justify-between gap-6">
					<div>
						<p className="text-lg mt-2 font-bold">
							Next payment due:{" "}
							<span className="text-sm text-gray-400">Oct 4, 2024</span>
						</p>
					</div>

					<div className="flex space-x-4 my-2">
						<button className="px-6 h-12 py-2 w-48 rounded-xl bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#8f2add] hover:to-[#3069fc] ">
							Pay now
						</button>

						<button className="px-6 h-12 py-2 w-48 rounded-xl bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#8f2add] hover:to-[#3069fc]">
							Pay all now
						</button>
					</div>
				</div>

				{/* Savings Journey Chart */}
				<div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-semibold">My Savings Journey</h3>
						<div className="flex gap-2">
							<button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg text-sm">
								1D
							</button>
							<button className="text-gray-500 px-3 py-1 rounded-lg text-sm">
								1W
							</button>
							<button className="text-gray-500 px-3 py-1 rounded-lg text-sm">
								1M
							</button>
						</div>
					</div>
					<div className="bg-gradient-to-b from-purple-50 to-white p-4 rounded-xl">
						<ResponsiveContainer width="100%" height={200}>
							<AreaChart data={mockPriceHistory}>
								<defs>
									<linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#6B5AED" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#6B5AED" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
								<XAxis
									dataKey="date"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#6B7280" }}
								/>
								<YAxis hide={true} />
								<Area
									type="monotone"
									dataKey="price"
									stroke="#6B5AED"
									strokeWidth={2}
									fill="url(#colorPrice)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</>
	);
};

export default SavingsPage;
