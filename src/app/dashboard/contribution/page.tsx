"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReadContract, useAccount, useReadContracts } from "wagmi";
import { contractAddress2 } from "@/context/contractAddress";
import { abi, abi2 } from "@/context/abi";
import React from "react";
import { formatEther } from "viem";

const ContributionList = () => {
	const router = useRouter();
	const { isConnected, address } = useAccount();
	const [contributions, setContributions] = useState<any>([]);
	const [userContractAddress, setUserContractAddress] = useState(
		"" as `0x${string}`,
	);

	const { data: userAddress } = useReadContract({
		abi: abi2,
		address: contractAddress2,
		functionName: "getUserBudget",
		args: [address],
		account: address,
	});

	useEffect(()=>{
		if(!isConnected && !userAddress){
			router.push("/")
		}
	}, [])
	

	useEffect(() => {
		if (
			userAddress &&
			userAddress !== "0x0000000000000000000000000000000000000000"
		) {
			setUserContractAddress(userAddress as `0x${string}`);
		}
	}, [userAddress]);

	const { data: campaignIds, isSuccess }:any = useReadContract({
		abi: abi2,
		address: userContractAddress,
		args: [address],
		functionName: "getCampaignsOfUser",
		account: address,
	});


	const {data:campaignDetailsQueries, isSuccess:success} = useReadContracts({
		contracts:
		campaignIds?.map((campaignId: any) => ({
				abi: abi2,
				address: userContractAddress,
				functionName: "getCampaignDetails",
				args: [campaignId],
			})) || [],
	});
	 
	useEffect(() => {
		if (success && campaignDetailsQueries) {
			console.log(campaignDetailsQueries);
		}},[campaignDetailsQueries])

	const handleClick = (id: any) => {
		router.push(`/dashboard/contribution/${id}`);
	};

	return (
		<div className="min-h-screen  text-[#000]">
			<div className="flex justify-between mb-20">
				<h1 className="text-2xl font-bold ">All Contributions</h1>
				<Link
					href="/dashboard/create-contribution"
					className="px-6 py-2  border bg-[#003ace8f]  text-sm text-white rounded-xl shadow-md "
				>
					Create Contribution
				</Link>
			</div>
			<div className="space-y-4">
				{campaignDetailsQueries ? (
					<div className="space-y-5">
						{campaignDetailsQueries.map((contribution:any, index) => (
					<div
						key={campaignIds[index]}
						
						className="flex justify-between items-center border hover:bg-[#0039CE1A] px-6 py-4 rounded-lg cursor-pointer shadow-md"
					>
						
						<div>
							<h2 className="text-lg font-semibold">{contribution.result[0]}</h2>
							<p className="text-sm text-gray-400">
								Due: {new Date(Number(contribution.result[4]) * 1000).toDateString()}
							</p>
						</div>
						<div className="">
							<p>Target Savings</p>
							<span className="text-lg font-bold">{formatEther(contribution.result[3].toString())} LSK</span>
							</div>
						<button className="px-6 py-2  font-medium border bg-[#003ace8f]  text-sm text-white rounded-xl shadow-md " onClick={()=>handleClick(campaignIds[index])}>
							View details
						</button>
					</div>
				))}
					</div>
				) : (
					<p className="text-center">You don't have any Campaign</p>
				)}
			</div>
		</div>
	);
};

export default ContributionList;