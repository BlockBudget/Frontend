import { X } from "lucide-react";
import { useState } from "react";

const SendFund = ({
	handleSend,
	amount,
	setIsSendModalOpen,
	setAmount,
	recipient,
	isLoading,
	setRecipient,
	handleTransfer,
	maxWithdrawableAmount,
}: any) => {

	const [withdrawalAmount, setWithdrawalAmount] = useState('');
	const handleMaxWithdraw = () => {
        setWithdrawalAmount(maxWithdrawableAmount);
    };

	return (
		<>
			<div
				onClick={() => setIsSendModalOpen(false)}
				className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-white rounded-2xl p-6 w-full max-w-md relative"
				>
					<button
						onClick={() => setIsSendModalOpen(false)}
						className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</button>
					<h3 className="text-xl text-black font-bold mb-4">Send Funds</h3>
					<form onSubmit={handleSend}>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Recipient Addresss
								</label>
								<input
									type="text"
									value={recipient}
									onChange={(e) => setRecipient(e.target.value)}
									className="w-full border rounded-lg p-1 focus:outline-nonem text-black "
									placeholder="0xa7F87590b8aE36947E5105aE5112761B7d0D5d7D"
								/>
							</div>
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
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
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
								onClick={handleTransfer}
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
									"Send"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default SendFund;
