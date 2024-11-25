








"use client";
import { abi2 } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

import { abi } from "@/context/abi";
import { contractAddress } from "@/context/contractAddress";
import { Command, Minus, PiggyBank, Plus, Target, X } from "lucide-react";
import Link from "next/link";
import React, { useState , useEffect} from "react";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import {} from "viem";
import WhitelistModal from "@/components/WhitelistModal";
import ProgressBar from "@/components/ProgressBar";


const SavingsDashboard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userAddress, setUserAddress] = useState("");
	const [campaignId, setCampaignId] = useState("");
	const { writeContract, isSuccess } = useWriteContract();
	const [isPayNowModalOpen, setIsPayNowModalOpen] = useState(false);
	const [tokenAmount, setTokenAmount] = useState("");
	const [userContractAddress, setUserContractAddress] = useState("" as `0x${string}`);
	const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

	const { isConnected, address } = useAccount();
	const {writeContractAsync,isPending} = useWriteContract();


	const { data:userAddy, isSuccess: success, error} = useReadContract({
		abi:abi2,
		address: contractAddress2,
		functionName: 'getUserBudget',
		args: [address],
		account: address,
	  });

	
	  useEffect(() => {
  
		if (userAddy && userAddy !== '0x0000000000000000000000000000000000000000') {
		  setUserContractAddress(userAddress as `0x${string}`);
	
		}
	  }, [userAddress]);


	  const handlePayNow = async () => {
		console.log(campaignId, "campaignId");

		try {
			const tx = await writeContractAsync({
				address: contractAddress2,
				abi: abi2,
				functionName: "contributeToCompaign",
				account: address,
				args: [campaignId], 
			  });
			toast.success(`Paying ${tokenAmount} tokens`);
			console.log(tx);
			// setIsPayNowModalOpen(false);
			setTokenAmount("");
		} catch (error: any) {
			console.log(error);
		}
	};
	


	const { data: mainAddress } = useReadContract({
		abi: abi,
		address: contractAddress,
		functionName: "getContributions",
		args: [campaignId],
	});

	const mockPriceHistory = [
		{ date: "Jan", price: 4000 },
		{ date: "Feb", price: 3000 },
		{ date: "Mar", price: 5000 },
		{ date: "Apr", price: 4800 },
		{ date: "May", price: 6000 },
		{ date: "Jun", price: 5500 },
	];

	const handleAddUsers = (addresses: any) => {
		try {
			if (userAddress.trim() === "") {
				toast.error("Please enter an address!");
				return;
			} else if (!isAddress(userAddress)) {
				toast.error("Please enter a valid address!");
			}
			writeContract({
				abi: abi,
				address: contractAddress,
				functionName: "whitelistAddresses",
				args: [
					campaignId ? campaignId : null,
					userAddress ? userAddress.split(",").map((addr) => addr.trim()) : [],
				],
			});
			if (isSuccess) {
				toast.success("Address have been successfully whitelisted!");
				setIsModalOpen(false);
				setUserAddress("");
			}
		} catch (error: any) {
			toast.error("Failed to whitelist addresses. Check your inputs:", error);
		}
	};

	const handleWithdraw = async () => {
		try {
			const tx = await writeContract({
				abi: abi,
				address: contractAddress,
				functionName: "withdrawContribution",
				args: [campaignId],
			});
			toast.success("Withdrawal successful!");
			console.log(tx);
			setIsWithdrawModalOpen(false);
		} catch (error: any) {
			toast.error("Failed to withdraw. Please try again.");
			console.log(error);
		}
	};

	const completionPercentage = 39;
	return (
		<>
			<div className="min-h-screen  from-white to-gray-100 p-6">
				{/* Welcome Header */}
				<div className="mb-8 flex gap-4">
					<div className="bg-white bg-gradient-to-r from-[#9C2CF399] to-[#3A6FF999] overflow-hidden relative  md:w-[512px] h-[215px] border-2 space-x-3 flex p-6 rounded-lg shadow-md justify-center text-center">
						<div className="text-white py-5">
							<p className="text-sm font-bold my-3">Available for withdrawal</p>
							<h3 className="text-sm  my-3">₦63,000</h3>

							<button className=" text-white font-medium py-2 px-4 bg-purple-700 shadow-md w-72 rounded-full">
								Withdraw
							</button>
						</div>

					</div>

					<div className="bg-white p-6 rounded-lg shadow-md md:w-[725px]">
						<p className="text-xl font-bold text-black">December Savings</p>
						<p className="text-black text-sm"><span className="text-black font-bold">Close date:</span> Jan 24, 2025</p>
						<div className="my-4">
							<div className="text-black">
								<ProgressBar percentage={completionPercentage} />
							</div>
						</div>
					</div>

				</div>

				{/* Main Section */}
				<div className="grid grid-cols-3 gap-6 mb-10">
					<div className="bg-white overflow-hidden relative md:col-span-1 col-span-3 border-2 space-x-3 flex p-6 rounded-lg shadow-md text-center">
						<div className=" flex gap-4 py-5">
							<div className="bg-[#003aceda] shadow-sm p-3 rounded-full">
								<Target className="text-white" size={27} />
							</div>
							<div>
								<h3 className="text-sm text-gray-800">Target Savings</h3>
								<p className="text-2xl font-bold text-black">₦632,000</p>
							</div>
						</div>
						<div className="flex items-center left-48 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
							<div className="bg-[#003ace28] w-44 relative h-44 rounded-full">
								<div className="bg-[#003ace59] absolute left-5 top-4 w-36 h-36 rounded-full"></div>
							</div>
						</div>
					</div>
					<div className="bg-white overflow-hidden relative md:col-span-1 col-span-3 border-2 space-x-3 flex p-6 rounded-lg shadow-md text-center">
						<div className=" flex gap-4 py-5">
							<div className="bg-[#003aceda] shadow-sm p-3 rounded-full">
								<PiggyBank className="text-white" size={27} />
							</div>
							<div>
								<h3 className="text-sm text-gray-800">Total Accumulated</h3>
								<p className="text-2xl font-bold text-black">₦632,000</p>
							</div>
						</div>
						<div className="flex items-center left-48 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
							<div className="bg-[#003ace28] w-44 relative h-44 rounded-full">
								<div className="bg-[#003ace59] absolute left-5 top-4 w-36 h-36 rounded-full"></div>
							</div>
						</div>
					</div>
					<div className="bg-white overflow-hidden relative  md:col-span-1 col-span-3 border-2 space-x-3 flex p-6 rounded-lg shadow-md text-center">
						<div className=" flex gap-4 py-5">
							<div className="bg-[#003aceda] shadow-sm p-3 rounded-full">
								<Command className="text-white" size={27} />
							</div>
							<div>
								<h3 className="text-sm text-black">My Contributions</h3>
								<p className="text-2xl font-bold text-white">₦632,000</p>
							</div>
						</div>
						<div className="flex items-center left-48 top-0 justify-center w-52 h-52 absolute rounded-full bg-[#003ace11]">
							<div className="bg-[#003ace28] w-44 relative h-44 rounded-full">
								<div className="bg-[#003ace59] absolute left-5 top-4 w-36 h-36 rounded-full"></div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex md:flex-row flex-col justify-between items-center my-10">

					<div className="space-x-4">
						<button
							onClick={() => setIsModalOpen(true)}
							className="px-6 md:w-[405px] rounded-full py-3 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium text-sm text-black  shadow-md "
						>
							Add Contributors
						</button>
						<button className="px-6 md:w-[405px] rounded-full py-3 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium  text-sm text-black  shadow-md ">
							Pay Now
						</button>
						{/* <button className="px-6 py-2 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium  text-sm text-black rounded-xl hover:">
							Withdraw
						</button> */}
					</div>
				</div>

				{/* Savings Metrics */}
				<div className="flex gap-2">
					<div className="md:w-[834px] bg-white p-6 rounded-lg shadow-md mt-8">
						<h3 className="text-lg font-bold text-gray-800">Pool savings metrics</h3>
						<ResponsiveContainer width="100%" height={300}>
							<AreaChart data={mockPriceHistory}>
								<defs>
									<linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#6B5AED" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#6B5AED" stopOpacity={0.1} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Area
									type="monotone"
									dataKey="price"
									stroke="#6B5AED"
									fillOpacity={1}
									fill="url(#colorSavings)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					<div className="flex md:flex-row flex-col justify-between items-center my-10">
						<p className="text-gray-400">
							<span className="font-semibold text-white">
								Next payment due:
							</span>{" "}
							Oct 4, 2024
						</p>
						<div className="space-x-4">
							<button
								onClick={() => setIsModalOpen(true)}
								className="px-6 py-2 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium text-sm text-black rounded-xl shadow-md "
							>
								Add Contributors
							</button>
							<button
								onClick={() => setIsPayNowModalOpen(true)}
								className="px-6 py-2 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium  text-sm text-black rounded-xl shadow-md "
							>
								Pay Now
							</button>
							<button
								onClick={() => setIsWithdrawModalOpen(true)}
								className="px-6 py-2 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium  text-sm text-black rounded-xl shadow-md "
							>
								Withdraw
							</button>
						</div>
					</div>

					<div className="overflow-x-auto bg-[#00000052] p-5 rounded-lg shadow-md border-2 border-[#344054]">
						<table className="min-w-full text-sm text-left text-[#FFFFFF]">
							<thead className="bg-[#131418] text-gray-300">
								<tr>
									<th className="px-4 py-3">S/N</th>
									<th className="px-4 py-3">Group Name</th>
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

			{/* Modal */}
			{isModalOpen && (
				<WhitelistModal
					setIsModalOpen={setIsModalOpen}
					handleAddUsers={handleAddUsers}
				/>
			)}
			{isPayNowModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-lg text-black font-semibold mb-4">Confirm Payment</h2>
						{/* <input
							type="number"
							value={tokenAmount}
							onChange={(e) => setTokenAmount(e.target.value)}
							placeholder="Enter token amount"
							className="w-full p-2 border rounded text-black mb-4"
						/> */}
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setIsPayNowModalOpen(false)}
								className="px-4 py-2 bg-red-500 text-white rounded"
							>
								Cancel
							</button>
							<button
								onClick={handlePayNow}
								className="px-4 py-2 bg-[#003aceaf] text-white rounded"
							>
								Pay
							</button>
						</div>
					</div>
				</div>
			)}
			{isWithdrawModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-lg text-black font-semibold mb-4">Confirm Withdrawal</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setIsWithdrawModalOpen(false)}
								className="px-4 py-2 bg-red-500 text-white rounded"
							>
								Cancel
							</button>
							<button
								onClick={handleWithdraw}
								className="px-4 py-2 bg-[#003aceaf] text-white rounded"
							>
								Proceed
							</button>
						</div>
					</div>
				</div>
			)}

		</>
	);
};

export default SavingsDashboard;

