"use client"
import React from "react";
import Avatar from "@/components/Avatar";
import { useReadContract,useAccount } from "wagmi";
import { abi } from "../../../context/abi";
import { contractAddress } from "../../../context/contractAddress";
import { useState, useEffect } from "react";
import { formatEther } from "viem";

function CreateLockedSavings() {
    const [lockedSavingsList, setLockedSavingsList] = useState<any>();
    const {address} = useAccount();

    const {data,isLoading,error,isSuccess}:any = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "getTimeLockedAccountDetails",
        args: address ? [address] : []
    });

    useEffect(() => {
        if (isLoading) {
            console.log("Loading contract data...");
        }
        if (error) {
            console.error("Error reading contract:", error);
        }
      
        if (isSuccess && data) {
            console.log("Contract data:", data);
            const transformedList = {
                balance: formatEther(data[0]),
                accruedInterest: data[1],
                lockEndTime: data[2],
                isActive: data[3]
            };
            console.log("Transformed List:", transformedList);
            setLockedSavingsList(transformedList);
        }
    }, [isLoading, error, isSuccess, data]);

    useEffect(() => {
        if (lockedSavingsList) {
            console.log("Updated lockedSavingsList:", lockedSavingsList);
        }
    }, [lockedSavingsList]);

    console.log("Component Rendered");

    return(
        <>
            <div className="avatar flex items-center">
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
                            <th className="border-none py-2 text-white text-left">Balance</th>
                            <th className="border-none py-2 text-white text-left">Accrued Interest</th>
                            <th className="border-none py-2 text-white text-left">Lock End Time</th>
                            <th className="border-none py-2 text-white text-left">Is Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            lockedSavingsList ? (
                            <tr>
                                <td className="border-l-0 pl-2 border-r-0 border py-2 text-gray-500">1</td>
                                <td className="border-l-0 border-r-0 border py-2 text-white">${lockedSavingsList.balance.toString()}</td>
                                <td className="border-l-0 border-r-0 border py-2 text-white">{lockedSavingsList.accruedInterest.toString()}%</td>
                                <td className="border-l-0 border-r-0 border py-2 text-white">{new Date(Number(lockedSavingsList.lockEndTime) * 1000).toLocaleString()}</td>
                                <td className="border-l-0 border-r-0 border py-2 text-white">{lockedSavingsList.isActive ? "Yes" : "No"}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center text-white">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CreateLockedSavings