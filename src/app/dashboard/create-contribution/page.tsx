"use client";
import { IndentDecrease } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { abi2 } from "@/context/abi";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { parseEther } from "viem";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/RegisteredUser";

function CreateContribution() {
	const [savingsName, setSavingsName] = useState("");
	const [description, setDescription] = useState("");
	const { isConnected } = useAccount();
	const [targetAmount, setTargetAmount] = useState("0");
	const [duration, setDuration] = useState("");
	const [isPrivate, setIsPrivate] = useState(true);
	const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
	const { userAddress }: any = useUserProfile();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const { writeContractAsync, isPending } = useWriteContract();

	const convertMonthsToDays = (months: number): number => {
		// Approximate days per month
		return months * 30;
	};
	

	useEffect(()=>{
		if(!isConnected && !userAddress){
			router.push("/")
		}
	}, [])
	

	const handleCreateNewContribution = async (e: any) => {
		e.preventDefault();
		if (description == "") {
			toast.error("Description cannot  be Empty!");
			return;
		}

		setIsLoading(true);

		try {
			const targetAmountToReach = parseEther(targetAmount);
			const durationInDays = convertMonthsToDays(Number(duration));
			console.log(durationInDays);
			const tx = await writeContractAsync({
				address: userAddress,
				abi: abi2,
				functionName: "createCampaign",
				args: [
					savingsName,
					description,
					targetAmountToReach,
					durationInDays,
					isPrivate,
				],
			});

			setTxHash(tx);
			toast.success("Campaign Submitted. Waiting for confirmation...");
		} catch (error) {
			setIsLoading(false);
			console.error("Error creating invoice:", error);
			toast.error("Error creating invoice: " + error);
		}
	};

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash: txHash ?? undefined,
		});

	useEffect(() => {
		if (isConfirmed) {
			setIsLoading(false);
			toast.success("New Campaign Created Successfully");
			router.push("/dashboard/contribution");
		}
	}, [isConfirmed]);
	return (
		<>
			<div className="w-full m-auto">
				<Link href="/dashboard" className="flex space-x-2">
					<IndentDecrease className="text-black " size={20} />{" "}
					<span className="text-black font-montserrat font-semibold text-sm">
						Back
					</span>
				</Link>
			</div>
			<div className="min-h-screen  w-4/5 m-auto flex items-center justify-center p-6">
				<div className="w-full relative max-w-lg  rounded-[48px] p-8 overflow-hidden text-black">
					<h2 className="text-2xl font-montserrat  font-semibold text-center text-[#000] mb-8">
						Create Contribution
					</h2>

					<form className="space-y-5 relative z-50">
						<div>
							<label className="block mb-1 text-sm font-medium text-[#0000]">
								Group Name
							</label>
							<input
								value={savingsName}
								onChange={(e) => setSavingsName(e.target.value)}
								type="text"
								placeholder="Enter a name for the group"
								className="w-full px-4 py-2 placeholder:text-sm  border border-[#DADADA] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#000]">
								Group Description
							</label>
							<input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								type="text"
								placeholder="Enter Group Description"
								className="w-full px-4 py-2 placeholder:text-sm border border-[#DADADA] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#000]">
								Target Amount
							</label>
							<input
								value={targetAmount}
								onChange={(e) => setTargetAmount(e.target.value)}
								type="number"
								placeholder="Enter Target Amount"
								className="w-full px-4 py-2 placeholder:text-sm border border-[#DADADA] 00 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block mb-3 text-sm font-medium text-[#000]">
								Contribution Type
							</label>
							<div className="flex w-11/12 m-auto space-x-4">
								<label className="flex items-center">
									<input
										checked={isPrivate}
										onChange={() => setIsPrivate(true)}
										type="radio"
										name="distributionMethod"
										className="form-radion h-5 w-5 text-black accent-[#3A6FF9]"
									/>
									<span className="ml-2 text-sm">Private</span>
								</label>
								<label className="flex items-center">
									<input
										checked={!isPrivate}
										onChange={() => setIsPrivate(false)}
										type="radio"
										name="distributionMethod"
										className="form-radion h-5 w-5 text-gray-500 accent-[#3A6FF9]"
									/>
									<span className="ml-2 text-sm">Public</span>
								</label>
							</div>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#000]">
								Duration
							</label>
							<select
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								className="w-full px-4 py-2  border border-[#DADADA]  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Lock Duration</option>
								<option value="1">1 Month</option>
								<option value="6">6 Months</option>
								<option value="12">1 Year</option>
							</select>
						</div>

						<button
							onClick={handleCreateNewContribution}
							type="submit"
							className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
								isLoading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
						>
							{isLoading ? (
								<div className="relative w-5 h-5 m-auto">
									<div className="absolute inset-0 border-2 border-blue-100 rounded-full animate-spin-slow"></div>
									<div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
								</div>
							) : (
								"Create Group"
							)}
						</button>
					</form>

				</div>
			</div>
		</>
	);
}

export default CreateContribution;
