
"use client";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

import { abi, abi2 } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";
import { Command, Minus, PiggyBank, Plus, Target, X } from "lucide-react";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { } from "viem";
import WhitelistModal from "@/components/WhitelistModal";
import { useParams } from 'next/navigation'
import ProgressBar from "@/components/ProgressBar";
import { formatEther } from "viem";

const SavingsDashboard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userAddress1, setUserAddress] = useState("");
	const [campaignId, setCampaignId] = useState("");
	const { writeContract } = useWriteContract();
	const params = useParams()
	const { isConnected, address } = useAccount();
	const [campaignDetail, setCampaignDetails] = useState<any>();


	const mockPriceHistory = [
		{ date: "Jan", price: 4000 },
		{ date: "Feb", price: 3000 },
		{ date: "Mar", price: 5000 },
		{ date: "Apr", price: 4800 },
		{ date: "May", price: 6000 },
		{ date: "Jun", price: 5500 },
	];

	const [userContractAddress, setUserContractAddress] = useState("" as `0x${string}`);
	

	const { data: userAddress, isSuccess: success, error} = useReadContract({
		abi:abi2,
		address: contractAddress2,
		functionName: 'getUserBudget',
		args: [address],
		account: address,
	  });


	  useEffect(() => {
		if (userAddress && userAddress !== '0x0000000000000000000000000000000000000000') {
		  setUserContractAddress(userAddress as `0x${string}`);
		}
	  }, [userAddress]);


	const {data:details, isSuccess}:any = useReadContract({
		abi: abi2,
		address: userContractAddress,
		args: [params.contributionId],
		functionName: 'getCampaignDetails',
		account: address,
	  });

	  useEffect(()=>{
		if (isConnected && isSuccess && details) {
      
			const campaignDetails = {
				name: details[0],
				description: details[1],
				owner: details[2],
				targetAmount: formatEther(details[3]),
				deadline: details[4],
				totalContributed: formatEther(details[5]),
				contributorCount: details[6],
				isActive: details[7],
				isPrivate: details[8],
			};
			setCampaignDetails(campaignDetails);
		
		  } 
	  },[details,isSuccess ]);

console.log(campaignDetail);


	  
	const handleAddUsers = (addresses: any) => {
		try {
			if (userAddress1.trim() === "") {
				toast.error("Please enter an address!");
				return;
			} else if (!isAddress(userAddress1)) {
				toast.error("Please enter a valid address!");
			}
			writeContract({
				abi: abi,
				address: contractAddress2,
				functionName: "whitelistAddresses",
				args: [
					campaignId ? campaignId : null,
					userAddress1 ? userAddress1.split(",").map((addr) => addr.trim()) : [],
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
	const completionPercentage = 39;
	return (
		<>
			<div className="min-h-screen  from-white to-gray-100 p-6">
				{/* Welcome Header */}
				<div className="mb-8 flex gap-4">
					<div className="bg-white bg-gradient-to-r from-[#003aceb7] to-[#003ace8f]  overflow-hidden relative  md:w-[512px] h-[215px] border-2 space-x-3 flex p-6 rounded-lg shadow-md justify-center text-center">
						<div className="text-white py-5">
							<p className="text-sm font-bold my-3">Available for withdrawal</p>
							<h3 className="text-sm  my-3">$ {campaignDetail?.totalContributed ?campaignDetail?.totalContributed : "0.00" }</h3>

							<button className=" text-white font-medium py-2 px-4 bg-gradient-to-r from-[#003aceda] to-[#003aceaf] shadow-md w-72 rounded-full">
								Withdraw
							</button>
						</div>

					</div>

					<div className="bg-white p-6 rounded-lg shadow-md md:w-[725px]">
						<p className="text-xl font-bold text-black">{campaignDetail?.name} Contribution</p>
						<p className="text-black text-sm"><span className="text-black font-bold">Close date:</span> {new Date(Number(campaignDetail?.deadline) * 1000).toDateString() }</p>
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
								<p className="text-2xl font-bold text-black">$ {campaignDetail?.targetAmount}</p>
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
								<p className="text-2xl font-bold text-black">$ {campaignDetail?.totalContributed ?campaignDetail?.totalContributed : "0.00" }</p>
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
						<button className="px-6 py-2 border bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] font-medium  text-sm text-black rounded-xl hover:">
							Refund
						</button>
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
					</div>

					{/* Member Contributions */}
					<div className="md:w-[404px] bg-white  rounded-lg shadow-md ">
						<p className="w-full text-white rounded-full text-base bg-gradient-to-r from-[#9C2CF399] to-[#3A6FF999] py-3 font-bold  justify-center text-center">Whitelist member contributions</p>
						<div className="mt-4 space-y-8 p-6">
							{["john paul", "john paul", "john paul", "john paul", "John Doe"].map((name, index) => (
								<div key={index} className="flex justify-between items-center text-gray-600">
									<span>{name}</span>
									<span>₦100,000,000</span>
								</div>
							))}
						</div>

						<button className="w-full mt-14 bg-gradient-to-r from-[#9C2CF399] to-[#3A6FF999] text-white py-2  rounded-full ">
							Add New Member
						</button>
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

		</>
	);
};

export default SavingsDashboard;

