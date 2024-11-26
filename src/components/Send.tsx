import { X } from "lucide-react";
import { useUserProfile } from "@/hooks/RegisteredUser";
import {
	useWriteContract,
	useReadContract,
	useWaitForTransactionReceipt,
} from "wagmi";

const SendFund = ({
	handleSend,
	amount,
	setIsSendModalOpen,
	setAmount,
	recipient,
	isLoading,
	setRecipient,
  handleTransfer
}: any) => {
	const { userAddress }: any = useUserProfile();
	

	return (
		<>
			<div onClick={() => setIsSendModalOpen(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
				<div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-full max-w-md relative">
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
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Amount
								</label>
								<input
									type="number"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className="w-full border rounded-lg p-1 text-black focus:outline-none"
									placeholder="0.0"
									step="0.000001"
								/>
							</div>
							<button
								type="submit"
                onClick={handleTransfer}
								className="w-full bg-[#003aceb9]  text-white rounded-lg py-1 px-4 hover:bg-blue-700 disabled:bg-blue-300"
							>
								{isLoading ? "Sending..." : "Send"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default SendFund;
