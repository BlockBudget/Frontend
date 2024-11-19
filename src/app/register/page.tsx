"use client";

import React, { useState } from "react";
import { abi } from "@/context/abi";
import { contractAddress } from "@/context/contractAddress";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function RegisterUser() {
	const { writeContract, isPending, isSuccess, isError } = useWriteContract();
	const { address } = useAccount();
	const [userName, setUserName] = useState("");
	const router = useRouter();

	const handleCreateUser = (e: any) => {
		e.preventDefault();
		try {
			writeContract({
				abi: abi,
				address: contractAddress,
				functionName: "registerUser",
				args: [userName],
				account: address,
			});
			if (isSuccess) {
				toast.success("Registered successfully!", {
					icon: "✅",
				});
			}
			router.push("/dashboard");
		} catch (error) {
			toast.error("Registration Failed. Please try again.", {
				icon: "❌",
			});
		}
	};
	return (
		<>
			<div className="min-h-screen flex items-center -mt-12 justify-center p-6">
				<div className="w-full relative max-w-lg bg-[#00000] border-2 border-gray-700 rounded-[48px] p-8 shadow-lg overflow-hidden text-gray-300">
					<h2 className="text-2xl font-montserrat font-semibold text-center text-white mb-8">
						Create Account
					</h2>

					<form onSubmit={handleCreateUser} className="space-y-5 relative z-50">
						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Account name
							</label>
							<input
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								type="text"
								placeholder="Enter your name"
								className="w-full px-4 py-2 placeholder:text-sm bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<button
							type="submit"
							disabled={isPending}
							className={`w-full py-2 mt-4 border border-gray-700 ${
								isPending ? "bg-[#1f2024]" : "bg-[#131418]"
							}  shadow-sm  text-white font-semibold rounded-full hover:bg-[#131418]  transition duration-200`}
						>
							{isPending ? "loading..." : "Create Account"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default RegisterUser;
