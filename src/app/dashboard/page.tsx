// "use client";
// import { Bar } from "react-chartjs-2";

// import {
// 	PiggyBank,
// 	Vault,
// 	HandCoins,
// 	LockKeyhole,
// 	Users,
// 	Banknote,
// 	Bell,
// } from "lucide-react";

// import {
// 	Chart as ChartJS,
// 	LinearScale,
// 	CategoryScale,
// 	BarElement,
// 	ChartData,
// 	ChartOptions,
// } from "chart.js";
// import Navbar from "../../components/Navbar";
// import Link from "next/link";
// import { useAccount } from "wagmi";
// // Register components to prevent missing scale errors
// ChartJS.register(LinearScale, CategoryScale, BarElement);

// const page = () => {
// 	const { address, isConnected } = useAccount();
// 	const revenueData = {
// 		labels: [
// 			"Jan",
// 			"Feb",
// 			"Mar",
// 			"Apr",
// 			"May",
// 			"Jun",
// 			"Jul",
// 			"Aug",
// 			"Sep",
// 			"Oct",
// 			"Nov",
// 			"Dec",
// 		],
// 		datasets: [
// 			{
// 				label: "Locked savings",
// 				data: [6, 16, 12, 15, 10, 20, 19, 30, 25, 20, 27, 16],
// 				backgroundColor: "rgba(253, 111, 65, 1)",
// 			},
// 			{
// 				label: "Group savings",
// 				data: [4, 14, 10, 12, 10, 18, 17, 25, 20, 24, 17, 13],
// 				backgroundColor: "rgba(255, 255, 255, 1)",
// 			},
// 		],
// 	};

// 	const revenueDataOptions: ChartOptions<"bar"> = {
// 		scales: {
// 			x: {
// 				grid: {
// 					display: false,
// 				},
// 			},
// 			y: {
// 				beginAtZero: true,
// 				ticks: {
// 					stepSize: 10,
// 					callback: function (value: any) {
// 						if (value === 0 || value === 10 || value === 20 || value === 30) {
// 							return `${value}k`;
// 						}
// 						return "";
// 					},
// 				},
// 				max: 30,
// 			},
// 		},
// 		plugins: {
// 			legend: {
// 				display: false,
// 			},
// 		},
// 		barThickness: 10,
// 		borderWidth: 2,
// 		borderColor: "transparent",
// 		borderRadius: 10,
// 	};

// 	return (
// 		<div className=" text-white">
// 			{/* Dashboard Header */}
// 			<div className="flex flex-col md:flex-row   justify-between items-center py-9">
// 				<h1 className="text-2xl md:text-4xl ml-9 font-semibold">Dashboard</h1>
// 				<div className="flex  gap-4 pl-[500px]">
// 					<img
// 						src="/user10.jpg"
// 						alt="Profile Picture"
// 						className="rounded-full"
// 						width="50"
// 						height="50"
// 					/>
// 					<div>
// 						<div className="text-sm">Welcome back!</div>
// 						<h2 className="text-lg font-semibold">Jerome Bell</h2>
// 					</div>
// 					<a href="#" className="relative">
// 						<Bell />
// 						<span className="block size-2 bg-red-500 rounded-full absolute top-0 right-0">
// 							{" "}
// 						</span>
// 					</a>
// 				</div>
// 			</div>

// 			<div className="grid grid-cols-12 gap-6">
// 				<div className="flex flex-col col-span-9">
// 					{/* Summary Boxes */}
// 					<div className="grid grid-cols-3 gap-2  h-[150px] mb-6">
// 						{/* Box 1 */}
// 						<div className="p-4 h-[150px] rounded-[16px] bg-dark-gray border border-borderColor text-center">
// 							<div className="m-auto flex gap-2 w-214px h-[60px] mt-8 ml-8">
// 								<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_0px_20px_8px_rgba(0,0,0,0.25)]">
// 									<PiggyBank className="text-dark-gray" />
// 								</div>

// 								<div>
// 									<div className="text-xs text-lavender-gray">
// 										Total savings
// 									</div>
// 									<h2 className="text-xl">₦ 632.000</h2>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Box 2 */}
// 						<div className="p-4  h-[150px] rounded-[16px] bg-dark-gray border border-borderColor text-center">
// 							<div className="m-auto flex gap-2 w-214px h-[60px] mt-8 ml-8">
// 								<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_0px_20px_8px_rgba(0,0,0,0.25)]">
// 									<Vault className="text-dark-gray" />
// 								</div>
// 								<div>
// 									<div className="text-xs text-lavender-gray">
// 										Total locked savings
// 									</div>
// 									<h2 className="text-xl">₦ 632.000</h2>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Box 3 */}
// 						<div className="p-4  h-[150px] rounded-[16px] bg-dark-gray border border-borderColor text-center">
// 							<div className="m-auto flex gap-2 h-[60px] mt-8 ml-8">
// 								<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_0px_20px_8px_rgba(0,0,0,0.25)]">
// 									<HandCoins className="text-dark-gray" />
// 								</div>
// 								<div>
// 									<div className="text-xs text-lavender-gray">
// 										Total contributions
// 									</div>
// 									<h2 className="text-xl">₦ 632.000</h2>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Action Buttons */}
// 					<div className="grid grid-cols-3 gap-3 py-5 text-center">
// 						<Link href="/dashboard/create-locked-savings" className="flex w-full col-span-1 items-center justify-center m-auto  gap-2 py-2  bg-primary/10 rounded-[16px] border-[2px] border-white text-sm font-semibold ">
// 							<span>
// 								<LockKeyhole />
// 							</span>
// 							Create locked savings
// 						</Link>
// 						<Link href="/dashboard/create-savings" className="flex items-center justify-center w-full col-span-1 m-auto gap-2  py-2 bg-primary/10 rounded-[16px] border-[2px] border-white text-sm font-semibold ">
// 							<span>
// 								<Users />
// 							</span>
// 							Create group
// 						</Link>
// 						<Link href="/dashboard/create-savings" className="flex items-center justify-center  col-span-1 w-full m-auto gap-2  py-2 bg-primary/10 rounded-[16px] border-[2px] border-white text-sm font-semibold ">
// 							<span>
// 								<Banknote />{" "}
// 							</span>
// 							Join group savings
// 						</Link>
// 					</div>

// 					{/* Savings by Months Chart */}
// 					<div className=" mt-[40px] flex  gap-4 mb-8">
// 						<div className="flex-1 rounded-[16px] bg-dark-gray border-[3px] border-borderColor p-4">
// 							<div className="w-[791px] h-[62px] flex justify-between">
// 								<div>
// 									<h2 className="text-xl">Savings by months</h2>
// 									<div className="text-xs text-lavender-gray">
// 										Savings summary from 1-12 Nov, 2024
// 									</div>
// 								</div>
// 								<div>
// 									<div className="text-xs text-lavender-gray">
// 										Total savings
// 									</div>
// 									<h1 className="text-[32px] leading-[42px]">₦ 1278.45</h1>
// 								</div>
// 							</div>
// 							<div className="m-4 p-[44px]">
// 								<div className="w-full h-full">
// 									<Bar
// 										data={revenueData}
// 										options={revenueDataOptions}
// 										style={{ width: "100%", height: "100%" }}
// 									/>
// 								</div>
// 							</div>
// 							{/* Custom Legend */}
// 							<div className="flex items-center justify-start space-x-4 ">
// 								{/* Locked Savings Legend */}
// 								<div className="flex items-center space-x-2">
// 									<span className="w-3 h-3 rounded-full bg-orange-600"></span>
// 									<span className="text-white text-sm">Locked savings</span>
// 								</div>
// 								{/* Group Savings Legend */}
// 								<div className="flex items-center space-x-2">
// 									<span className="w-3 h-3 rounded-full bg-white"></span>
// 									<span className="text-white text-sm">Group savings</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Right Column: My Group Contributions and Locked Savings */}
// 				<div className="flex  flex-col col-span-3 space-y-4">
// 					{/* My group contributions */}
// 					<div className="relative rounded-[16px]  h-[370px] bg-dark-gray border border-borderColor p-4">
// 						<h3 className="text-lg font-semibold mb-4">
// 							My group contributions
// 						</h3>
// 						<div className="space-y-2 w-full h-[80px] gap-[13px]">
// 							<div className="flex justify-between items-center  h-[80px] border-b-[3px] border-borderColor">
// 								<div className="flex items-center gap-2">
// 									<div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div>
// 									<div>
// 										<div className="text-sm">December Savings</div>
// 										<div className="text-xs text-lavender-gray">
// 											Created: June 2024
// 										</div>
// 									</div>
// 								</div>
// 								<div className="text-xs font-medium text-gray-medium">
// 									₦10,000
// 								</div>
// 							</div>

// 							<div className="flex justify-between items-center  h-[80px] border-b-[3px] border-borderColor">
// 								<div className="flex items-center gap-2">
// 									<div className="w-[40px] h-[40px] rounded-full bg-purple-500"></div>
// 									<div>
// 										<div className="text-sm">December Savings</div>
// 										<div className="text-xs text-lavender-gray">
// 											Created: June 2024
// 										</div>
// 									</div>
// 								</div>
// 								<div className="text-xs font-medium text-gray-medium">
// 									₦10,000
// 								</div>
// 							</div>

// 							<div className="flex justify-between items-center  h-[80px] border-b-[3px] border-borderColor">
// 								<div className="flex items-center gap-2">
// 									<div className="w-[40px] h-[40px] rounded-full bg-purple-500"></div>
// 									<div>
// 										<div className="text-sm">December Savings</div>
// 										<div className="text-xs text-lavender-gray">
// 											Created: June 2024
// 										</div>
// 									</div>
// 								</div>
// 								<div className="text-xs font-medium text-gray-medium">
// 									₦10,000
// 								</div>
// 							</div>
// 						</div>
// 						<Link href="/dashboard/group-list-savings" className="absolute bottom-4 left-4 text-sm text-primary">
// 							See all
// 						</Link>
// 					</div>

// 					{/* My Locked savings */}
// 					<div className="relative rounded-[16px]  h-[370px] bg-dark-gray border border-borderColor p-4">
// 						<h3 className="text-lg font-semibold mb-4">My Locked savings</h3>
// 						<div className="space-y-2">
// 							<div className="flex justify-between items-center h-[80px] border-b-[3px] border-borderColor">
// 								<div className="flex items-center gap-2">
// 									<div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div>
// 									<div>
// 										<div className="text-sm">December Savings</div>
// 										<div className="text-xs text-lavender-gray">
// 											Created: June 2024
// 										</div>
// 									</div>
// 								</div>
// 								<div className="text-xs font-medium text-gray-medium">
// 									₦1,000,000
// 								</div>
// 							</div>

// 							<div className="flex justify-between items-center h-[80px] border-b-[3px] border-borderColor">
// 								<div className="flex items-center gap-2">
// 									<div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div>
// 									<div>
// 										<div className="text-sm">December Savings</div>
// 										<div className="text-xs text-lavender-gray">
// 											Created: June 2024
// 										</div>
// 									</div>
// 								</div>
// 								<div className="text-xs font-medium text-gray-medium">
// 									₦1,000,000
// 								</div>
// 							</div>

// 							<div className="flex justify-between items-center h-[80px] border-b-[3px] border-borderColor">
// 								<div className="flex items-center gap-2">
// 									<div className="w-[40px] h-[40px] rounded-full bg-orange-500"></div>
// 									<div>
// 										<div className="text-sm">December Savings</div>
// 										<div className="text-xs text-lavender-gray">
// 											Created: June 2024
// 										</div>
// 									</div>
// 								</div>
// 								<div className="text-xs font-medium text-gray-medium">
// 									₦1,000,000
// 								</div>
// 							</div>
// 						</div>
// 						<Link href="/dashboard/locked-list-savings" className="absolute bottom-4 left-4 text-sm text-primary">
// 							See all
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default page;

const page = () => {
  return (
	<div>page</div>
  )
}

export default page