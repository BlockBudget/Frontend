import { abi } from "../context/abi";
import { contractAddress } from "../context/contractAddress";
import { useReadContract } from "wagmi";

export const useGetCampaignDetails = () => {
  const getCampaignDetails = (campaignId: string) => {
    return useReadContract({
      abi,
      address: contractAddress,
      functionName: "getCampaignDetails",
      args: [campaignId],
    });
  };

  return { getCampaignDetails };
};
