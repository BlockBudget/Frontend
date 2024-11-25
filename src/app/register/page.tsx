"use client";

import { useEffect, useState } from "react";
import { abi2 } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";
import {
	useWriteContract,
	useReadContract,
	useWaitForTransactionReceipt,
} from "wagmi";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IndentDecrease } from "lucide-react";
import { useUserProfile } from "@/hooks/RegisteredUser";


const LoginForm = () => {
	const { writeContractAsync } = useWriteContract();
	const { address, isConnected } = useAccount();
	const [userName, setUserName] = useState("");
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading1, setIsLoading1] = useState(false);
	const [hasWallet, setHasWallet] = useState(false);
	const [walletTxHash, setWalletTxHash] = useState("" as `0x${string}`);
	const [userTxHash, setUserTxHash] = useState("" as `0x${string}`);
	const { userAddress }:any = useUserProfile();
	

	 const { isSuccess: isWalletTxConfirmed } = useWaitForTransactionReceipt({
		hash: walletTxHash || undefined,
	  });
	
	  const { isSuccess: isUserTxConfirmed } = useWaitForTransactionReceipt({
		hash: userTxHash || undefined,
	  });

	// Effect for wallet creation confirmation
  useEffect(() => {
    if (isWalletTxConfirmed && walletTxHash) {
      setIsLoading1(false);
      setHasWallet(true);
      toast.success("Wallet created successfully!");
      setWalletTxHash("" as `0x${string}`);
    }
  }, [isWalletTxConfirmed, walletTxHash]);

  // Effect for user creation confirmation
  useEffect(() => {
    if (isUserTxConfirmed && userTxHash) {
      setIsLoading(false);
      toast.success("Account created successfully!");
      router.push("/dashboard");
      setUserTxHash("" as `0x${string}`);
    }
  }, [isUserTxConfirmed, userTxHash, router]);
	

	const handleCreateWallet = async (e: any) => {
		e.preventDefault();
		if (!isConnected) {
			toast.error("Please connect your wallet!");
			return;
		}
		setIsLoading1(true);

		try {
			const tx = await writeContractAsync({
				abi: abi2,
				address: contractAddress2,
				functionName: "createBlockBudget",
				account: address,
			});

			setWalletTxHash(tx as `0x${string}`);
		} catch (error: any) {
			setIsLoading1(false);
			console.log(error);
			toast.error("Wallet creation failed. Please try again.", error);
		}
	};

	

	const handleCreateUser = async (e: any) => {
		e.preventDefault();
		if (!isConnected) {
			toast.error("Please connect your wallet!");
			return;
		}
		if (!hasWallet) {
			toast.error("Please create a wallet first!");
			return;
		}
		if (userName === "") {
			toast.error("Please enter your name!");
			setIsLoading(false);
			
			
			return;
		}
		
		setIsLoading(true);

		try {
			
			if(userAddress){
			const tx = await writeContractAsync({
				abi: abi2,
				address: userAddress,
				functionName: "registerUser",
				args: [userName],
				account: address,
			});

			setUserTxHash(tx as `0x${string}`);
		}
		} catch (error: any) {
			setIsLoading(false);
			console.log(error);
			
			toast.error("Registration Failed. Please try again.");
		}
	};


	
	

	return (
		<div className="min-h-screen flex items-center gap-8 justify-center">
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
					{hasWallet ? "Create your Account" : "Create your Wallet"}
				</h2>

				{!hasWallet ? ( 
					// Wallet Creation Step
					<div className="text-center">
						<p className="mb-4 text-gray-600">
							First, create your wallet to get started
						</p>
						<button
							onClick={handleCreateWallet}
							disabled={isLoading1}
							className={`w-full bg-[#003aceda] ${
								isLoading1 ? "bg-[#003ace9c]" : "bg-[#003aceda]"
							} hover:bg-[#003aceda] text-white font-medium py-2 px-4 rounded-md focus:outline-none`}
						>
							{isLoading1 ? "Creating..." : "Create Wallet"}
						</button>
					</div>
				) : (  
					// Registration Form
					<form>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-medium mb-2"
							>
								Account name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
								placeholder="Enter your name"
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							onClick={handleCreateUser}
							className={`w-full bg-[#003aceda] ${
								isLoading ? "bg-[#003ace9c]" : "bg-[#003aceda]"
							} hover:bg-[#003aceda] text-white font-medium py-2 px-4 rounded-md focus:outline-none`}
						>
							{isLoading ? "Creating..." : "Create Account"}
						</button>
					</form>
			 )}  
			</div>
		</div>
	);
};

export default LoginForm;
