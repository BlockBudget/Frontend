"use client";
import { useEffect, useState } from 'react';
import { WalletIcon, Send, ArrowUpRight, ArrowDownRight, Copy, Plus, CreditCard, History, Eye, EyeOff } from 'lucide-react';
import Receive from '@/components/Receive';
import SendFund from '@/components/Send';
import {  useUserProfile } from "@/hooks/RegisteredUser"
import { useAccount, useReadContract } from 'wagmi';
import { abi2 } from '@/context/abi';
import { isNull } from 'util';
import toast from 'react-hot-toast';
import { isAddress } from 'viem';

const WalletDashboard = () => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const { userAddress }:any = useUserProfile();
  const [recipient, setRecipient] = useState('');
  const { isConnected, address } = useAccount();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("" as `0x${string}`);
  const [transactions, setTransactions] = useState([]);

  // toggle balance visibility
  const toggleBalance = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const formatBalance = (value:any) => {
    return isBalanceHidden ? '****' : value;
  };
 
  // get balance
  const { data, isSuccess, }:any = useReadContract({
    abi:abi2,
    address: userAddress,
    functionName: "getBalance",
    account: address,
  });

  useEffect(() => {
    if (isConnected && isSuccess && data) {
      setBalance(data);
    } 
  }, [isConnected, data, isSuccess]);


  // transfer function
  const handleTransfer = async (e: any) => {
		e.preventDefault();
		if (!isConnected) {
			toast.error("Please connect your wallet!");
			return;
		}
		
		setIsLoading(true);

		try {
			if (amount === "" || recipient === "") {
				toast.error("Please enter amount and recipient address!");
				setIsLoading(false);
				return;
			}else if(isAddress(recipient) === false){
				toast.error("Please enter a valid recipient address!");
				setIsLoading(false);
				return;
			}
			const amountInWei = BigInt(amount) * BigInt(10 ** 18);


			const tx = await writeContractAsync({
				abi: abi2,
				address: userAddress,
				functionName: "transfer",
				args: [ recipient, amountInWei],
				account: address,
			});

			setTxHash(tx as unknown as `0x${string}`);
		} catch (error: any) {
			setIsLoading(false);
			toast.error("Transfer Failed.");
		}
	};



  //  recentTransactions  
  const { data: output, isSuccess: isSuccess2, }:any = useReadContract({
    abi:abi2,
    address: userAddress,
    functionName: "getTransactionHistory",
    account: address,
  });
  useEffect(() => {
    if (isConnected && isSuccess2 && output) {
      setTransactions(data);
      
    } 
  }, [isConnected, output, isSuccess2]);

 

  return (
    <div className="min-h-screen p-6">
      {/* Main Wallet Card */}
      <div className="bg-gradient-to-r from-[#003acecc] to-[#003ace86] rounded-2xl p-6 text-white mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <WalletIcon className="w-6 h-6" />
          <span className="font-semibold">Main Wallet</span>
        </div>
        <button 
          onClick={toggleBalance}
          className="bg-white/20 rounded-lg px-3 py-1 text-sm flex items-center gap-2 hover:bg-white/30 transition"
        >
          {isBalanceHidden ? (
            <>
              <Eye className="w-4 h-4" />
              <span>Show Balance</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hide Balance</span>
            </>
          )}
        </button>
      </div>
      
      <h2 className="text-3xl font-bold mb-2">
      {formatBalance(balance ? `${balance} ETH` : '0 ETH')}
      </h2>
      <p className="text-white/80 text-lg">
      {formatBalance('≈ $0 USD')}
      </p>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <button 
          onClick={() => setIsSendModalOpen(true)} 
          className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition"
        >
          <Send className="w-5 h-5" />
          <span>Send</span>
        </button>
        <button 
          onClick={() => setIsReceiveModalOpen(true)} 
          className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Receive</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition">
          <CreditCard className="w-5 h-5" />
          <span>Buy</span>
        </button>
      </div>
    </div>
      {isSendModalOpen && <SendFund setIsSendModalOpen= {setIsSendModalOpen} handleTransfer={handleTransfer} isLoading={isLoading} setIsLoading={setIsLoading} amount= {amount} setAmount= {setAmount} recipient={recipient} setRecipient={setRecipient} /> }
      {isReceiveModalOpen && <Receive setIsReceiveModalOpen= {setIsReceiveModalOpen} /> }
    
      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Transactions</h3>
          <button className="text-blue-700 flex items-center gap-1">
            <History className="w-4 h-4" />
            View All
          </button>
        </div>
        <div className="space-y-4">

          <p className='text-center text-sm text-gray-500'>No recent transactions.</p>
          {/* {transactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                {tx.type === 'Received' ? (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <ArrowDownRight className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-red-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.sender}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{tx.amount}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {tx.from || tx.to}
                  <Copy className="w-4 h-4 cursor-pointer hover:text-purple-600" />
                </p>
              </div>
            </div>
          ))} */}
        </div>
      </div>

     
    </div>
  );
};

export default WalletDashboard;

function writeContractAsync(arg0: { abi: ({ anonymous: boolean; inputs: { indexed: boolean; internalType: string; name: string; type: string; }[]; name: string; type: string; outputs?: undefined; stateMutability?: undefined; } | { inputs: { internalType: string; name: string; type: string; }[]; name: string; outputs: { internalType: string; name: string; type: string; }[]; stateMutability: string; type: string; anonymous?: undefined; } | { inputs: { internalType: string; name: string; type: string; }[]; name: string; type: string; anonymous?: undefined; outputs?: undefined; stateMutability?: undefined; } | { inputs: never[]; name: string; outputs: { components: { internalType: string; name: string; type: string; }[]; internalType: string; name: string; type: string; }[]; stateMutability: string; type: string; anonymous?: undefined; } | { stateMutability: string; type: string; anonymous?: undefined; inputs?: undefined; name?: undefined; outputs?: undefined; })[]; address: any; functionName: string; args: any[]; account: `0x${string}` | undefined; }) {
  throw new Error('Function not implemented.');
}
