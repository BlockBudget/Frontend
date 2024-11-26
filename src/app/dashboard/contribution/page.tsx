"use client";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReadContract,useAccount } from "wagmi";
import { contractAddress2 } from "@/context/contractAddress";
import {  abi2 } from "@/context/abi";
import React from "react";
import { useUserProfile } from "@/hooks/RegisteredUser";
const ContributionList = () => {
	const {userAddress}:any = useUserProfile();
	const router = useRouter();
	const { isConnected, address } = useAccount();
	

	
	const {data:allContributions, isSuccess} = useReadContract({
		abi: abi2,
		address: userAddress,
		args: [address],
		functionName: 'getCampaignsOfUser',
		account: address,
	  });

	 
		const {data:details} = useReadContract({
		  abi: abi2,
		  address: userAddress,
		  args: ['0x446959a7c0bd6d90f7bd3c4717e55bb49493487975823901a37f0a77fe251514'],
		  functionName: 'getCampaignDetails',
		  account: address,
		});
	

	console.log(allContributions)
	console.log(details)

	const contributions = [
		{
			id: 1,
			name: "December Savings",
			total: "₦632,000",
			dueDate: "Oct 4, 2024",
		},
		{
			id: 2,
			name: "January Savings",
			total: "₦500,000",
			dueDate: "Jan 10, 2025",
		},
		{
			id: 3,
			name: "February Savings",
			total: "₦450,000",
			dueDate: "Feb 15, 2025",
		},
	];

	const handleClick = (id:any) => {
		router.push(`/dashboard/contribution/${id}`);
	};

	return (
		<div className="min-h-screen  text-[#000]">
			<div className="flex justify-between mb-20">
				<h1 className="text-2xl font-bold ">All Contributions</h1>
				<Link href="/dashboard/create-contribution" className="px-6 py-2  border bg-[#003ace8f]  text-sm text-black rounded-xl shadow-md ">
					Create Contribution
				</Link>
			</div>
			<div className="space-y-4">
				{contributions.map((contribution) => (
					<div
						key={contribution.id}
						
						className="flex justify-between items-center bg-[] hover:bg-[#0039CE1A] px-6 py-4 rounded-lg cursor-pointer shadow-md"
					>
						<div>
							<h2 className="text-lg font-semibold">{contribution.name}</h2>
							<p className="text-sm text-gray-400">
								Due: {contribution.dueDate}
							</p>
						</div>
						<div className="">
							<p>Target Savings</p>
							<span className="text-lg font-bold">{contribution.total}</span>
							</div>
						<button className="px-6 py-2  font-medium border bg-[#003ace8f]  text-sm text-black rounded-xl shadow-md " onClick={()=>handleClick("0x446959a7c0bd6d90f7bd3c4717e55bb49493487975823901a37f0a77fe251514")}>
							View details
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ContributionList;
