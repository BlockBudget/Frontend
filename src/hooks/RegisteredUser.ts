import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { abi2 } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";

export const useUserProfile = () => {
  const { isConnected, address } = useAccount();
  const [userProfile, setUserProfile] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [userContractAddress, setUserContractAddress] = useState("" as `0x${string}`);

  const { data: userAddress, isSuccess: success, error} = useReadContract({
    abi:abi2,
    address: contractAddress2,
    functionName: 'getUserBudget',
    args: [address],
    account: address,
  });

  useEffect(() => {
  if(success){

    if (userAddress && userAddress !== '0x0000000000000000000000000000000000000000') {
      setUserContractAddress(userAddress as `0x${string}`);

    }
  }
  }, [userAddress, success, userContractAddress]);
 


  const { data, isSuccess, }:any = useReadContract({
    abi:abi2,
    address: userContractAddress,
    functionName: "getUserProfile",
    args: [address],
    account: address,
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


  return { isConnected, userAddress, userProfile, loading };
};
