"use client";

import { useEffect, useState } from "react";
import { abi2 } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IndentDecrease } from "lucide-react";

const CreateWallet = ({setHasWallet}:any) => {
  const { writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [walletTxHash, setWalletTxHash] = useState("" as `0x${string}`);

  const { isSuccess: isWalletTxConfirmed } = useWaitForTransactionReceipt({
    hash: walletTxHash || undefined,
  });

  // Effect for wallet creation confirmation
  useEffect(() => {
    if (isWalletTxConfirmed && walletTxHash) {
      setIsLoading(false);
      toast.success("Wallet created successfully!");
      setWalletTxHash("" as `0x${string}`);
      // Redirect to registration page after successful wallet creation
      setHasWallet(true);
    }
  }, [isWalletTxConfirmed, walletTxHash, router]);

  const handleCreateWallet = async (e: any) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet!");
      return;
    }
    setIsLoading(true);

    try {
      const tx = await writeContractAsync({
        abi: abi2,
        address: contractAddress2,
        functionName: "createBlockBudget",
        account: address,
      });

      setWalletTxHash(tx as `0x${string}`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      toast.error("Wallet creation failed. Please try again.", error);
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
          Create your Wallet
        </h2>

        <div className="text-center">
          <p className="mb-4 text-gray-600">
            First, create your wallet to get started
          </p>
          <button
            onClick={handleCreateWallet}
            disabled={isLoading}
            className={`w-full bg-[#003aceda] ${
              isLoading ? "bg-[#003ace9c]" : "bg-[#003aceda]"
            } hover:bg-[#003aceda] text-white font-medium py-2 px-4 rounded-md focus:outline-none`}
          >
            {isLoading ? "Creating..." : "Create Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;