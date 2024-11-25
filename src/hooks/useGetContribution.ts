import { abi } from "../context/abi";
import { contractAddress } from "../context/contractAddress";
import { useReadContract } from "wagmi";

export const useGetContribution = () => {
  const getContribution = (campaignId: string, contributor: string) => {
    return useReadContract({
      abi,
      address: contractAddress,
      functionName: "getCampaignDetails",
      args: [campaignId, contributor],
    });
  };

  return { getContribution };
};
