"use client";

import { useEffect, useState } from "react";
import { abi2 } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IndentDecrease } from "lucide-react";

const LoginForm = () => {
	const { writeContractAsync, error } = useWriteContract();
	const { address, isConnected } = useAccount();
	const [userName, setUserName] = useState("");
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const [txHash, setTxHash] = useState("" as `0x${string}`);

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash: txHash,
		});

	// Effect to handle successful confirmation
	useEffect(() => {
		if (isConfirmed) {
			setIsLoading(false);
			toast.success("Registered successfully!");
			router.push("/dashboard");
		}
	}, [isConfirmed, router]);

	const handleCreateUser = async (e: any) => {
		e.preventDefault();
		if(!isConnected) {
			toast.error("Please connect your wallet!");
			return;
		}
		setIsLoading(true);

		try {
			if (userName === "") {
				toast.error("Please enter your name!");
				setIsLoading(false);
				return;
			}

			const tx = await writeContractAsync({
				abi: abi2,
				address: contractAddress2,
				functionName: "createBlockBudget",
				args: [userName],
				account: address,
			});

			setTxHash(tx as `0x${string}`);
		} catch (error:any) {
			setIsLoading(false);
			console.log(error);
			
			toast.error("Registration Failed. Please try again.", error);
		}
	};
	return (
		<div className="min-h-screen  flex items-center gap-8 justify-center">
			<div className="p-8 w-full max-w-md">
				<div className="">
					<Link href="/" className="flex left-10 top-10 absolute space-x-2">
						<IndentDecrease className="text-black " size={20} />{" "}
						<span className="text-black font-montserrat font-semibold text-sm">
							Back
						</span>
					</Link>
				</div>
				<h2 className="text-2xl font-bold mb-6 text-center">
					Create your Account
				</h2>
				<form onSubmit={handleCreateUser}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 font-medium mb-2"
						>
							Account name
						</label>
						<input
							type="type"
							id="name"
							name="name"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none "
							placeholder="Enter your name"
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className={`w-full bg-[#003aceda] ${
							isLoading ? "bg-[#003ace9c]" : "bg-[#003aceda]"
						}  hover:bg-[#003aceda] text-white font-medium py-2 px-4 rounded-md focus:outline-none`}
					>
						{isLoading ? "loading..." : "Create Account"}
					</button>
				</form>
			</div>

			{/* <div className="bg-gradient-to-r relative from-[#003aceda] to-[#003ace9a] h-screen flex flex-col items-center justify-center p-8">
				<div className=" text-center">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Smart Budgeting on the Blockchain
					</h2>
					<p className="text-white text-xl mb-8">
						Track, Save, and Grow Your Wealth Together
					</p>
				</div>
				<div className=" border-b">
							<img src="/Hand.png" alt="hand" className="m-auto w-28 h-28" />
							<div className="flex gap-4">
								<img src="/piggy-bank.png" alt="hand" className="h-28 w-28" />
								<img src="/Plants.png" alt="hand" className="h-28 w-28"/>
							</div>
						</div>
				<div className="absolute top-1/3 left-12 animate-bounce-slow">
					<div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<span className="text-3xl">📊</span>
					</div>
				</div>
				<div className="absolute bottom-1/3 right-12 animate-bounce-delayed">
					<div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<span className="text-3xl">💎</span>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default LoginForm;
