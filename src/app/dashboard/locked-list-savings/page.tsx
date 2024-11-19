"use client"
import React from "react";
import Avatar from "@/components/Avatar";
import { useReadContract,useAccount } from "wagmi";
import { abi } from "../../../context/abi";
import { contractAddress } from "../../../context/contractAddress";
import { useState, useEffect } from "react";
import { parseEther } from "viem";

function CreateLockedSavings() {
    const [lockedSavingsList, setLockedSavingsList] = useState<any>();
    const {address} = useAccount();


    const {data:asyncLockedSavingsList,isLoading,error,isSuccess}:any = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "getTimeLockedAccountDetails",
        args: address ? [address] : []
    })

    useEffect(() => {
        if (isLoading) {
            console.log("Loading contract data...");
        }
        if (error) {
            console.error("Error reading contract:", error);
        }
      
        if (isSuccess && asyncLockedSavingsList) {
            const transformedList = {
                balance: asyncLockedSavingsList[0],
                accruedInterest: asyncLockedSavingsList[1],
                lockEndTime: asyncLockedSavingsList[2],
                isActive: asyncLockedSavingsList[3]
            };
            setLockedSavingsList(transformedList);
            // console.log("lockedSavingsList::", transformedList);
            console.log("ASYNCLOCKED", lockedSavingsList);
        }
    }, [isLoading, error, isSuccess, asyncLockedSavingsList]);

   
    return(
        <>
            <div className="avatar  flex items-center">
                <div className="avatar-main">
                <Avatar src="/avatar.svg" alt="User avatar" size={50} />
                </div>
                <div className="greet-and-name ml-5 flex justify-between flex-col">
                    <p className="greeting text-white p-2 font-montserrat">Welcome Back!</p>
                    <p className="name text-white p-2 font-extrabold">Jerome Bell</p>
                </div>
            </div>
            <div className="contribution-table flex mt-8 flex-col">
                <div className="contribution-header text-center">
                    <p className="name text-white p-2 mb-5 font-bold">My locked savings</p>
                </div>
                
                <table className="mx-10">
                <thead>
					<tr className="bg-black">
						<th className="border-none pl-2 py-2 text-white text-left">S/N</th>
						<th className="border-none py-2 text-white text-left">Account Type</th>
						<th className="border-none py-2 text-white text-left">Interest Type</th>
						<th className="border-none py-2 text-white text-left">Lock Duration</th>
						<th className="border-none py-2 text-white text-left">Initial Deposit</th>
					</tr>
				</thead>
                <tbody>
                   
                        <tr>
						  <td  className="border-l-0 pl-2 border-r-0 border  py-2 text-gray-500">1</td>
						  <td  className="border-l-0 border-r-0 border  py-2 text-white">{lockedSavingsList?.balance}</td>
						  <td  className="border-l-0 border-r-0 border  py-2 text-white">{lockedSavingsList?.accruedInterest}</td>
						  <td className="border-l-0 border-r-0 border  py-2 text-white">{lockedSavingsList?.lockEndTime}</td>
						  <td className="border-l-0 border-r-0 border  py-2 text-white">{lockedSavingsList?.isActive ? "Yes" : "No"}</td>
						</tr>

                </tbody>
                </table>
            </div>
        </>
    )
}

export default CreateLockedSavings