"use client";

import { Line } from "react-chartjs-2";

import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";
import ProgressBar from "@/components/ProgressBar";
import { PiggyBank, TargetIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/RegisteredUser";
import Link from "next/link";

// Register ChartJS components

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SavingsPage = () => {
	const { userProfile, isConnected } = useUserProfile();
	const data = {
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
				label: "Savings",
				data: [21.3, 22, 22.5, 23, 23.4, 24.35, 23.3, 21.35, 20, 22, 23, 24], // Exact data points
				borderColor: "#FF8C00", // Line color (orange)
				borderWidth: 2,
				tension: 0.1, // Smooth curves
				fill: true, // Enable fill below the line
				backgroundColor: "#EB996E", // Fill color for the area below the line
				pointRadius: 0, // Remove points
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false, // Hide legend
			},
			tooltip: {
				enabled: true, // Enable tooltips
				backgroundColor: "#333",
				titleColor: "#FFF",
				bodyColor: "#FFF",
			},
		},
		scales: {
			x: {
				grid: {
					display: false, // Remove grid lines
				},
				ticks: {
					display: true, // Display X-axis labels
					padding: 5, // Increase spacing between labels and axis
					maxRotation: 0, // Prevent label rotation for clarity
				},
			},
			y: {
				min: 0,
				max: 30,
				grid: {
					display: false, // Remove grid lines
				},
				ticks: {
					display: false, // Hide Y-axis labels
				},
				beginAtZero: false, // Do not start at zero
			},
		},
		animation: {
			duration: 0, // Disable animations
		},
	};

	// export default options;

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
					<div className="flex gap-4 p-8 rounded-lg border bg-white shadow-lg ">
						<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#0039CE] shadow-sm ">
							<TargetIcon className="text-white" />
						</div>
						<div>
							<h3 className="text-md text-gray-400">Target Savings</h3>

							<p className="text-xl font-bold">₦ 632,000</p>
						</div>
					</div>

					<div className="flex gap-4 p-8 rounded-lg border bg-white shadow-lg ">
						<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#0039CE] shadow-sm">
							<PiggyBank className="text-white" />
						</div>
						<div>
							<h3 className="text-md text-gray-400">Total Accumulated</h3>

							<p className="text-xl font-bold">₦ 632,000</p>
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

				<div className="bg-white shadow-lg rounded-lg w-full h-[304px] p-4 border">
					<h3 className="text-lg mb-4">My Savings Journey</h3>
					<div className=" w-full h-[240px]">
						<Line data={data} options={options} />
					</div>
				</div>
			</div>
		</>
	);
};

export default SavingsPage;
