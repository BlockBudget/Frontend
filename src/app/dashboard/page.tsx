"use client";
import { Bar } from "react-chartjs-2";

import {
	PiggyBank,
	Vault,
	HandCoins,
	LockKeyhole,
	Users,
	Banknote,
	Bell,
	Wallet,
} from "lucide-react";

import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	ChartData,
	ChartOptions,
} from "chart.js";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useGetCampaignDetails } from "@/hooks/useGetCampaignDetails";
import { useUserProfile } from "@/hooks/RegisteredUser";
// Register components to prevent missing scale errors
ChartJS.register(LinearScale, CategoryScale, BarElement);

const page = () => {
	const { getCampaignDetails } = useGetCampaignDetails();
	const { userProfile, isConnected } = useUserProfile();
	const revenueData = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "Locked savings",
				data: [6, 16, 12, 15, 10, 20, 19, 30, 25, 20, 27, 16],
				backgroundColor: "rgba(0, 57, 206, 1)",
				barThickness: 10,
				borderWidth: 2,
				borderColor: "transparent",
				borderRadius: 10,
			},
			{
				label: "Group savings",
				data: [4, 14, 10, 12, 10, 18, 17, 25, 20, 24, 17, 13],
				backgroundColor: "rgba(215, 226, 255, 1)",
				barThickness: 10,
				borderWidth: 2,
				borderColor: "transparent",
				borderRadius: 10,
			},
		],
	};

	const revenueDataOptions: ChartOptions<"bar"> = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 10,
					callback: function (value: any) {
						if (value === 0 || value === 10 || value === 20 || value === 30) {
							return `${value}k`;
						}
						return "";
					},
				},
				max: 30,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<div className=" text-black">
			{/* Dashboard Header */}
			<div className="flex flex-col md:flex-row   justify-start items-center pb-9">
				<div>
					<div className="text-base font-normal">Welcome back!</div>
					<h2 className="text-2xl font-semibold">{userProfile?.name}</h2>
				</div>
			</div>

			<div className="grid md:grid-cols-12 grid-cols-1 gap-5">
				<div className="flex flex-col md:col-span-9 col-span-1">
					{/* Summary Boxes */}
					<div className="grid md:grid-cols-3 grid-cols-1 gap-2 mb-6">
						{/* Box 1 */}
						<div className="p-4 relative overflow-hidden  rounded-[16px] bg-white border shadow-md hover:shadow-lg text-center">
							<div className=" flex gap-4 py-5">
								<div className="flex items-center  justify-center w-[40px] h-[40px] rounded-full bg-[#003aceda] shadow-sm">
									<PiggyBank className="text-white" />
								</div>

								<div className="text-left">
									<div className="text-xs text-black">Total savings</div>
									<h2 className="text-xl">$ 0.00</h2>
								</div>
							</div>
							<div className="flex items-center left-48 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
								<div className="bg-[#003ace28] w-44 relative h-44 rounded-full">
									<div className="bg-[#003ace59] absolute left-5 top-4 w-36 h-36 rounded-full"></div>
								</div>
							</div>
						</div>

						{/* Box 2 */}
						<div className="p-4 relative overflow-hidden  rounded-[16px] shadow-md hover:shadow-lg border bg-white text-center">
							<div className="flex gap-4 py-5">
								<div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#003aceda] shadow-sm">
									<Vault className="text-white" />
								</div>
								<div className="text-left">
									<div className="text-xs text-black">Total locked savings</div>
									<h2 className="text-xl">$ 0.00</h2>
								</div>
							</div>
							<div className="flex items-center left-48 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
								<div className="bg-[#003ace28] w-44 relative h-44 rounded-full">
									<div className="bg-[#003ace59] absolute left-5 top-4 w-36 h-36 rounded-full"></div>
								</div>
							</div>
						</div>

						{/* Box 3 */}
						<div className="p-4 relative overflow-hidden rounded-[16px] bg-white border shadow-md hover:shadow-lg text-center">
							<div className=" flex gap-4 py-5">
								<div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#003aceda] shadow-sm">
									<HandCoins className="text-white" />
								</div>
								<div className="text-left">
									<div className="text-xs text-[black]">
										Total contributions
									</div>
									<h2 className="text-xl">$ 0.00</h2>
								</div>
							</div>
							<div className="flex items-center left-48 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
								<div className="bg-[#003ace28] w-44 relative h-44 rounded-full">
									<div className="bg-[#003ace59] absolute left-5 top-4 w-36 h-36 rounded-full"></div>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="grid md:grid-cols-3 grid-cols-1  gap-3 py-5 text-center">
						<Link
							href="/dashboard/create-locked-savings"
							className="flex w-full col-span-1 border items-center justify-center m-auto text-black hover:text-white bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] gap-2 py-2 rounded-full text-sm font-semibold "
						>
							<span>
								<LockKeyhole />
							</span>
							Create savings
						</Link>
						<Link
							href="/dashboard/create-contribution"
							className="flex w-full col-span-1 border items-center justify-center m-auto text-black hover:text-white bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77]  gap-2 py-2 rounded-full text-sm font-semibold  "
						>
							<span>
								<Users />
							</span>
							Create Contribution
						</Link>
						<Link
							href="/dashboard/wallet"
							className="flex w-full col-span-1 border items-center justify-center m-auto text-black hover:text-white bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] gap-2 py-2 rounded-full text-sm font-semibold "
						>
							<span>
								<Wallet />{" "}
							</span>
							Wallet
						</Link>
					</div>

					{/* Savings by Months Chart */}
					<div className=" mt-[40px] flex  gap-4 mb-8">
						<div className="flex-1 rounded-[16px] border shadow-md  p-4">
							<div className=" h-[62px] flex justify-between">
								<div>
									<h2 className="text-xl">Savings by months</h2>
									<div className="text-xs text-lavender-gray">
										Savings summary from 1-12 Nov, 2024
									</div>
								</div>
								<div>
									<div className="text-xs text-lavender-gray">
										Total savings
									</div>
									<h1 className="text-[32px] leading-[42px]">$ 0.00</h1>
								</div>
							</div>
							<div className="m-4 py-9 px-1">
								<div className="w-full h-full">
									<Bar
										data={revenueData}
										options={revenueDataOptions}
										style={{ width: "100%", height: "100%" }}
									/>
								</div>
							</div>
							{/* Custom Legend */}
							<div className="flex items-center justify-start space-x-4 ">
								{/* Locked Savings Legend */}
								<div className="flex items-center space-x-2">
									<span className="w-3 h-3 rounded-full bg-orange-600"></span>
									<span className="text-black text-sm">Locked savings</span>
								</div>
								{/* Group Savings Legend */}
								<div className="flex items-center space-x-2">
									<span className="w-3 h-3 rounded-full bg-black"></span>
									<span className="text-black text-sm">Group savings</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column: My Group Contributions and Locked Savings */}
				<div className="flex  flex-col col-span-3 space-y-4">
					{/* My group contributions */}
					<div className="relative rounded-[16px]  h-[370px] bg-white border shadow-xl  p-4">
						<h3 className="text-lg font-semibold mb-4">
							My group contributions
						</h3>
						<div className="space-y-2 w-full h-[80px] gap-[13px]">
							<div className="flex justify-between items-center rounded-lg p-2   h-[80px] bg-[#0039CE1A] text-black">
								<div className="flex items-center gap-2">
									<div>
										<div className="text-sm">December Savings</div>
										<div className="text-xs ">Created: June 2024</div>
									</div>
								</div>
								<div className="text-xs font-medium ">$0.00</div>
							</div>

							<div className="flex justify-between items-center rounded-lg p-2  h-[80px] bg-[#0039CE1A] text-black">
								<div className="flex items-center gap-2">
									{/* <div className="w-[40px] h-[40px] rounded-full bg-purple-500"></div> */}
									<div>
										<div className="text-sm">December Savings</div>
										<div className="text-xs ">Created: June 2024</div>
									</div>
								</div>
								<div className="text-xs font-medium ">$0.00</div>
							</div>

							<div className="flex justify-between items-center  rounded-lg p-2  h-[80px] bg-[#0039CE1A] text-black">
								<div className="flex items-center gap-2">
									{/* <div className="w-[40px] h-[40px] rounded-full bg-purple-500"></div> */}
									<div>
										<div className="text-sm">December Savings</div>
										<div className="text-xs text-lavender-gray">
											Created: June 2024
										</div>
									</div>
								</div>
								<div className="text-xs font-medium text-gray-medium">
									$0.00
								</div>
							</div>
						</div>
						<Link
							href="/dashboard/group-list-savings"
							className="absolute bottom-4 left-4 text-sm text-primary"
						>
							See all
						</Link>
					</div>

					{/* My Locked savings */}
					<div className="relative rounded-[16px]  h-[370px] border bg-white shadow-xl p-4">
						<h3 className="text-lg font-semibold mb-4">My Locked savings</h3>
						<div className="space-y-2">
							<div className="flex justify-between items-center rounded-lg p-2  h-[80px] bg-[#0039CE1A] text-black">
								<div className="flex items-center gap-2">
									{/* <div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div> */}
									<div>
										<div className="text-sm">December Savings</div>
										<div className="text-xs ">Created: June 2024</div>
									</div>
								</div>
								<div className="text-xs font-medium">$0.00</div>
							</div>

							<div className="flex justify-between items-center rounded-lg p-2  h-[80px] bg-[#0039CE1A] text-black">
								<div className="flex items-center gap-2">
									{/* <div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div> */}
									<div>
										<div className="text-sm">December Savings</div>
										<div className="text-xs ">Created: June 2024</div>
									</div>
								</div>
								<div className="text-xs font-medium">$0.00</div>
							</div>

							<div className="flex justify-between items-center rounded-lg p-2  hover:text-white  h-[80px] bg-[#0039CE1A] text-black">
								<div className="flex items-center gap-2">
									{/* <div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div> */}
									<div>
										<div className="text-sm">December Savings</div>
										<div className="text-xs">Created: June 2024</div>
									</div>
								</div>
								<div className="text-xs font-medium">$0.00</div>
							</div>
						</div>
						<Link
							href="/dashboard/locked-list-savings"
							className="absolute bottom-4 left-4 text-sm text-primary"
						>
							See all
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;

