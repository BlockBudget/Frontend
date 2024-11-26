import { abi } from "../context/abi";
import { contractAddress2 } from "../context/contractAddress";
import { useReadContract } from "wagmi";

export const useGetCampaignDetails = () => {
  const getCampaignDetails = (campaignId: string) => {
    return useReadContract({
      abi,
      address: contractAddress2,
      functionName: "getCampaignDetails",
      args: [campaignId],
    });
  };

  return { getCampaignDetails };
};
