"use client";
import { X } from "lucide-react";
import {  useUserProfile } from "@/hooks/RegisteredUser"
import { useState } from "react";


const Receive = ({setIsReceiveModalOpen}:any) => {
  const [copied, setCopied] = useState(false);
  const { userAddress }:any = useUserProfile();
  const handleCopy = () => {
    navigator.clipboard.writeText(userAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
   <>
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setIsReceiveModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Receive Funds</h3>
            <div className="text-center">
              <p className="text-gray-600 mb-4">Your wallet address:</p>
              <div className="bg-gray-100 p-4 rounded-lg break-all">
                {userAddress}
              </div>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-700"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy Address"}
              </button>
            </div>
          </div>
        </div>
   </>
  )
}

export default Receive