import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

interface WithdrawalProps {
    setIsWithdrawalModalOpen: (open: boolean) => void;
    maxWithdrawableAmount: string;
    abi: any; 
    contractAddress: `0x${string}`; 
}

const Withdrawal: React.FC<WithdrawalProps> = ({
    setIsWithdrawalModalOpen,
    maxWithdrawableAmount,
    abi,
    contractAddress
}) => {
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    // Wagmi hooks for contract interaction
    const { 
        data: hash, 
        writeContract, 
        isPending, 
        error 
    } = useWriteContract();

    // Wait for transaction confirmation
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ 
        hash 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Convert withdrawal amount to wei
            const withdrawAmount = parseEther(withdrawalAmount);

            // Call contract withdraw function
            writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'withdraw',
                args: [withdrawAmount]
            });
        } catch (error) {
            console.error('Withdrawal error:', error);
        }
    };

    // Handle successful withdrawal
    useEffect(() => {
        if (isSuccess) {
            setIsWithdrawalModalOpen(false);
            setWithdrawalAmount('');
        }
    }, [isSuccess, setIsWithdrawalModalOpen]);

    const handleMaxWithdraw = () => {
        setWithdrawalAmount(maxWithdrawableAmount);
    };

    // Determine if submit button should be disabled
    const isSubmitDisabled = 
        isPending || 
        isConfirming || 
        !withdrawalAmount || 
        parseFloat(withdrawalAmount) <= 0 ||
        parseFloat(withdrawalAmount) > parseFloat(maxWithdrawableAmount);

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsWithdrawalModalOpen(false)}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsWithdrawalModalOpen(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-6 text-center">
                    Withdraw Funds
                </h2>

                {error && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        {error.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label
                                htmlFor="withdrawalAmount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Amount
                            </label>
                            <div className="text-sm text-gray-600">
                                Available: {maxWithdrawableAmount} LSK
                                <button
                                    type="button"
                                    onClick={handleMaxWithdraw}
                                    className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                                >
                                    Max
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                id="withdrawalAmount"
                                type="number"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter withdrawal amount"
                                step="0.000001"
                                max={maxWithdrawableAmount}
                                required
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                {/* <img
                                    src="/images/lsk-logo.png"  // Replace with your actual LSK logo path
                                    alt="LSK Token"
                                    className="w-8 h-8 mr-2"
                                /> */}
                                <span className="text-sm font-medium text-gray-700">LSK</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
                            isSubmitDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {(isPending || isConfirming) ? (
                            <div className="relative w-5 h-5 m-auto">
                                <div className="absolute inset-0 border-2 border-blue-100 rounded-full animate-spin-slow"></div>
                                <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Withdraw"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Withdrawal;