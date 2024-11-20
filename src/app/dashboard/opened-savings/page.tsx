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

// Register ChartJS components

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SavingsPage = () => {
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
		<div className="p-8  text-white h-full">
			{/* Header Section */}

			<div>
				<div className="text-base font-normal">Welcome back!</div>

				<h2 className="text-2xl font-semibold">Jerome Bell</h2>
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
				<div className="flex gap-4 p-8 bg-dark-gray rounded-lg border-[3px] border-gray-700">
					<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_0px_20px_8px_rgba(0,0,0,0.25)]">
						<TargetIcon className="text-dark-gray" />
					</div>
					<div>
						<h3 className="text-md text-gray-400">Target Savings</h3>

						<p className="text-xl font-bold">₦ 632,000</p>
					</div>
				</div>

				<div className="flex gap-4 p-8 bg-dark-gray rounded-lg border-[3px] border-gray-700">
					<div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_0px_20px_8px_rgba(0,0,0,0.25)]">
						<PiggyBank className="text-dark-gray" />
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
					<p className="text-sm text-gray-400">
						Available for withdrawal:{" "}
						<span className="text-lg text-white">
							Withdrawal not yet available
						</span>
					</p>
				</div>

				<div>
					<button className="px-6 w-[405px] h-12 py-2 bg-[#0E131E]  hover:bg-gray-700 border-2 border-gray-700 rounded-xl">
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
					<button className="px-6 h-12 py-2 w-48 bg-[#0E131E] rounded-xl hover:bg-gray-700 border-2 border-gray-700 ">
						Pay now
					</button>

					<button className="px-6 h-12 py-2 w-48 bg-[#0E131E] rounded-xl hover:bg-gray-700 border-2 border-gray-700">
						Pay all now
					</button>
				</div>
			</div>

			{/* Savings Journey Chart */}

			<div className="bg-dark-gray rounded-lg w-full h-[304px] border-[3px] border-gray-700">
				<h3 className="text-lg mb-4">My Savings Journey</h3>
				<div className=" w-full h-[240px]">
					<Line data={data} options={options} />
				</div>
			</div>
		</div>
	);
};

export default SavingsPage;
