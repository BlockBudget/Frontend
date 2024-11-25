import { abi } from "@/context/abi";
import { contractAddress } from "@/context/contractAddress";
import { useState } from "react";
import { useWriteContract } from "wagmi";

export const useRefundContribution = () => {
  const { writeContractAsync } = useWriteContract({}); // Add the correct parameters
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const refundContribution = async (
    campaignId: string,
    contributor: string
  ) => {
    setIsPending(true);
    setIsSuccess(false);
    try {
      await writeContractAsync({
        abi,
        address: contractAddress,
        functionName: "refundContribution",
        args: [campaignId, contributor],
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    isSuccess,
    refundContribution,
  };
};
