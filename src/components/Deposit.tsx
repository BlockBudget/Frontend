"use client";
import { X } from "lucide-react";

const Deposit = ({
	setIsDepositModalOpen,
	handleDeposite,
	depositAmount,
	setDepositAmount,
}: any) => {
	return (
		<>
			<div
				onClick={() => setIsDepositModalOpen(false)}
				className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-white rounded-2xl p-6 w-full max-w-md relative"
				>
					<button
						onClick={() => setIsDepositModalOpen(false)}
						className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</button>
					<h3 className="text-xl font-bold mb-4">Deposit Funds</h3>
					<div className="text-center">
						<input
							type="number"
							value={depositAmount}
							onChange={(e) => setDepositAmount(e.target.value)}
							className="w-full border rounded-lg p-1 focus:outline-none"
							placeholder="0.0"
							step="0.000001"
						/>
					</div>
					<button
						type="submit"
						onClick={handleDeposite}
						className="w-full bg-[#003aceb9] mt-3 text-white rounded-lg py-1 px-4 hover:bg-blue-700 disabled:bg-blue-300"
					>
						Deposit
					</button>
				</div>
			</div>
		</>
	);
};

export default Deposit;
