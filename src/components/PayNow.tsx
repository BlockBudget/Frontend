import { X } from "lucide-react";
import { useUserProfile } from "@/hooks/RegisteredUser";
import { useParams } from "next/navigation";
import {
	useWriteContract,
	useReadContract,
	useWaitForTransactionReceipt,
} from "wagmi";

const PayNow = ({
	setPayIsModalOpen,
	isLoading,
	handlePay,
	amount,
	setAmount,
}: any) => {
	const params = useParams();
	const contributionAddress = params.contributionId;

	return (
		<>
			<div
				onClick={() => setPayIsModalOpen(false)}
				className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-white rounded-2xl p-6 w-full max-w-md relative"
				>
					<button
						onClick={() => setPayIsModalOpen(false)}
						className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</button>
					<h3 className="text-xl font-bold mb-4 text-center">Pay</h3>
					<form >
						<div className="space-y-4">
							
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
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
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
											<span className="text-sm font-medium text-gray-700">
												LSK
											</span>
										</div>
									</div>
								</div>
								<button
									type="submit"
									onClick={handlePay}
									className="w-full bg-[#003aceb9]  text-white rounded-lg py-1 px-4 hover:bg-blue-700 disabled:bg-blue-300"
								>
									{isLoading ? "Paying..." : "Pay"}
								</button>
							
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default PayNow;
