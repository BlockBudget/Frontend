import { IndentDecrease } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";
import { contractAddress } from "@/context/contractAddress";
import toast from "react-hot-toast";
import { abi } from "@/context/abi";
import { useWriteContract,useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

function CreateSavingsGroup() {
	const [savingsName, setSavingsName] = useState("");
	const [description, setDescription] = useState("");
	const [targetAmount, setTargetAmount] = useState("0");
	const [duration, setDuration] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

	const {writeContractAsync,isPending} = useWriteContract();

	const handleCreateNewSaving = async (e:any) => {
		try {
			e.preventDefault();
			const targetAmountToReach = parseEther(targetAmount);
			const durationTimestamp = Math.floor(new Date(duration).getTime() / 1000);

			const tx = await writeContractAsync({
				address: contractAddress,
				abi: abi,
				functionName: "createCampaign",
				args: [
					savingsName,
					savingsName,
					targetAmountToReach,
					durationTimestamp,
					isPrivate
				]
			})

			console.log(tx);
			setTxHash(tx); 
			toast.success('Campaign Submitted. Waiting for confirmation...', {
				icon: '✅',
			  });
		} catch (error) {
			console.error("Error creating invoice:", error);
      		toast.error("Error creating invoice: " + error);
		}
	}

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
	useWaitForTransactionReceipt({
	  hash: txHash ?? undefined,
	});

	useEffect(() => {
		if (isConfirmed) {
		  toast.success("New Campaign Created Successfully");
		}
	  }, [isConfirmed]);
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
			<div className="min-h-screen  w-4/5 m-auto flex items-center justify-center p-6">
				<div className="w-full relative max-w-lg bg-[#00000052] border-2 border-gray-700 rounded-[48px] p-8 shadow-lg  overflow-hidden text-gray-300">
					<h2 className="text-2xl font-montserrat  font-semibold text-center text-white mb-8">
						Create Contribution
					</h2>

					<form className="space-y-5 relative z-50">
						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Group Name
							</label>
							<input
								type="text"
								placeholder="Enter a name for the group"
								className="w-full px-4 py-1 placeholder:text-sm bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label
								className="block mb-1 text-sm font-medium text-[
            #FFFFFF]"
							>
								Group Description
							</label>
							<input
								type="text"
								placeholder="Enter Group Description"
								className="w-full px-4 py-1 bg-[#131418] placeholder:text-sm border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label
								className="block mb-1 text-sm font-medium text-[
            #FFFFFF]"
							>
								Target Amount
							</label>
							<input
								type="number"
								placeholder="Enter Target Amount"
								className="w-full px-4 py-1 bg-[#131418] placeholder:text-sm border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block mb-3 text-sm font-medium text-[#FFFFFF]">
								Contribution Type
							</label>
							<div className="flex w-11/12 m-auto space-x-4">
								<label className="flex items-center">
									<input
										type="radio"
										name="distributionMethod"
										className="form-radion h-5 w-5 text-gray-500 accent-gray-400"
									/>
									<span className="ml-2 text-sm">
										Private
									</span>
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="distributionMethod"
										className="form-radion h-5 w-5 text-gray-500 accent-gray-400"
									/>
									<span className="ml-2 text-sm">
										Public
									</span>
								</label>
							</div>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Duration
							</label>
							<div className="flex space-x-4">
								<input
									type="date"
									className="w-full px-4 py-1 bg-[#131418]  border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full py-2 mt-4 bg-[#131418]  text-white border font-semibold rounded-xl hover:bg-[#131418]  transition duration-200"
						>
							Create Group
						</button>
					</form>

					{/* <div className="absolute bg-opacity-50  backdrop:blur-lg   bg-gray-800 left-0 right-0 h-full -z-5 w-full rounded-full -bottom-[300px]">
						<div className=" bg-gray-700/20 h-1/2  m-auto mt-20 w-3/5 blur-sm rounded-full"></div>
					</div> */}
				</div>
			</div>
		</>
	);
}

export default CreateSavingsGroup;
