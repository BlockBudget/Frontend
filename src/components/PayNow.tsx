import { X } from "lucide-react";
import { useUserProfile } from "@/hooks/RegisteredUser";
import { useParams } from 'next/navigation'
import {
	useWriteContract,
	useReadContract,
	useWaitForTransactionReceipt,
} from "wagmi";

const PayNow = ({ setPayIsModalOpen, isLoading, handlePay, amount, setAmount }: any) => {
    const params = useParams()
	const contributionAddress =  params.contributionId;

	return (
		<>
			<div onClick={() => setPayIsModalOpen(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
				<div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-full max-w-md relative">
					<button
						onClick={() => setPayIsModalOpen(false)}
						className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</button>
					<h3 className="text-xl font-bold mb-4">Pay</h3>
					<form>
						<div className="space-y-4">
							<div>		
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Amount
								</label>
								<input
									type="number"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className="w-full border rounded-lg p-1 focus:outline-none"
									placeholder="0.0"
									step="0.000001"
								/>
							</div>
							<button
								type="submit"
                            onClick={handlePay}
								className="w-full bg-[#003aceb9]  text-white rounded-lg py-1 px-4 hover:bg-blue-700 disabled:bg-blue-300"
							>
								{isLoading ? "Paying..." : "Pay"}
							</button>
						</div>
                        </div>
					</form>
				</div>
			</div>
		</>
	);
};

export default PayNow;
