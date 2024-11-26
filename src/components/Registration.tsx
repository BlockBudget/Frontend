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

const Registration = () => {
  const { writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userTxHash, setUserTxHash] = useState("" as `0x${string}`);
  const [userContractAddress, setUserContractAddress] = useState("" as `0x${string}`);

  // Check if user has a wallet
  const { data: userAddress, isSuccess: success } = useReadContract({
    abi: abi2,
    address: contractAddress2,
    functionName: 'getUserBudget',
    args: [address],
    account: address,
  });

  useEffect(() => {
    // If no wallet is found, redirect to wallet creation
    if (success && (!userAddress || userAddress === '0x0000000000000000000000000000000000000000')) {
      toast.error("Please create a wallet first!");
      return;
    }

    if (success && userAddress) {
      setUserContractAddress(userAddress as `0x${string}`);
    }
  }, [userAddress, success, router]);

  const { isSuccess: isUserTxConfirmed } = useWaitForTransactionReceipt({
    hash: userTxHash || undefined,
  });

  // Effect for user creation confirmation
  useEffect(() => {
    if (isUserTxConfirmed && userTxHash) {
      setIsLoading(false);
      toast.success("Account created successfully!");
      router.push("/dashboard/wallet");
      setUserTxHash("" as `0x${string}`);
    }
  }, [isUserTxConfirmed, userTxHash, router]);

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (!userContractAddress) {
      toast.error("Please wait for wallet setup to complete!");
      return;
    }
    if (userName === "") {
      toast.error("Please enter your name!");
      return;
    }
    
    setIsLoading(true);

    try {
      const tx = await writeContractAsync({
        abi: abi2,
        address: userContractAddress,
        functionName: "registerUser",
        args: [userName],
        account: address,
      });

      setUserTxHash(tx as `0x${string}`);
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
          <Link href="/create-wallet" className="flex left-10 top-10 absolute space-x-2">
            <IndentDecrease className="text-black " size={20} />{" "}
            <span className="text-black font-montserrat font-semibold text-sm">
              Back
            </span>
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create your Account
        </h2>

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
            disabled={isLoading || !userContractAddress}
            onClick={handleCreateUser}
            className={`w-full bg-[#003aceda] ${
              isLoading || !userContractAddress ? "bg-[#003ace9c]" : "bg-[#003aceda]"
            } hover:bg-[#003aceda] text-white font-medium py-2 px-4 rounded-md focus:outline-none`}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;