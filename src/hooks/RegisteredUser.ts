import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { abi } from "@/context/abi";
import { contractAddress } from "@/context/contractAddress";

export const useUserProfile = () => {
  const { isConnected, address } = useAccount();
  const [userProfile, setUserProfile] = useState<any>();
  const [loading, setLoading] = useState(true);

  const { data, isSuccess }:any = useReadContract({
    abi:abi,
    address: contractAddress,
    functionName: "getUserProfile",
    args: [address],
  });

  useEffect(() => {
    if (isConnected && isSuccess && data) {
      const mappedProfile = {
        name: data[0],
        userAddress: data[1],
        registrationDate: Number(data[2]), // Convert BigInt to a regular number
        isRegistered: data[3],
      };
      setUserProfile(mappedProfile);
      setLoading(false);
    } else if (!isConnected) {
      setLoading(false);
    }
  }, [isConnected, data, isSuccess]);

  return { isConnected, userProfile, loading };
};
