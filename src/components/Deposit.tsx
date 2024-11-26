import { X } from "lucide-react";
import React from "react";
import Image from "next/image";

interface DepositProps {
    setIsDepositModalOpen: (open: boolean) => void;
    handleDeposite: (e: React.FormEvent) => void;
    depositAmount: string;
    setDepositAmount: (amount: string) => void;
    isLoading: boolean;
}

const Deposit: React.FC<DepositProps> = ({
    setIsDepositModalOpen,
    handleDeposite,
    depositAmount,
    setDepositAmount,
    isLoading,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleDeposite(e);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsDepositModalOpen(false)}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsDepositModalOpen(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-6 text-center">
                    Deposit Funds
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="depositAmount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Amount
                        </label>
                        <div className="relative">
                            <input
                                id="depositAmount"
                                type="number"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-1 pl-14 focus:outline-none "
                                placeholder="Enter deposit amount"
                                step="0.000001"
                                min="0"
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
                        disabled={isLoading}
                        className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isLoading ? (
                            <div className="relative w-5 h-5 m-auto">
                                <div className="absolute inset-0 border-2 border-blue-100 rounded-full animate-spin-slow"></div>
                                <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Deposit"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Deposit;