"use client";
import { useEffect, useState } from "react";
import {
	WalletIcon,
	Send,
	ArrowUpRight,
	ArrowDownRight,
	Copy,
	Plus,
	CreditCard,
	History,
	Eye,
	EyeOff,
} from "lucide-react";
import Receive from "@/components/Receive";
import SendFund from "@/components/Send";
import { useUserProfile } from "@/hooks/RegisteredUser";
import {
	useAccount,
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { abi2 } from "@/context/abi";
import toast from "react-hot-toast";
import { formatEther, isAddress, parseEther } from "viem";
import Deposit from "@/components/Deposit";
import axios from "axios";
import Withdrawal from "@/components/Withdraw";

const WalletDashboard = () => {
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
	const [depositModalOpen, setIsDepositModalOpen] = useState(false);
	const [balance, setBalance] = useState<number | any>();
	const [amount, setAmount] = useState("");
	const [depositAmount, setDepositAmount] = useState("");
	const { userAddress }: any = useUserProfile();
	const [recipient, setRecipient] = useState("");
	const { isConnected, address } = useAccount();
	const [isBalanceHidden, setIsBalanceHidden] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [txHash, setTxHash] = useState("" as `0x${string}`);
	const [dxHash, setDxHash] = useState("" as `0x${string}`);
	const [transactions, setTransactions] = useState([]);
	const { writeContractAsync } = useWriteContract();
	const [lskPrice, setLskPrice] = useState<number | any>();
	const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
	const [maxWithdrawableAmount, setMaxWithdrawableAmount] = useState("");

	// toggle balance visibility
	const toggleBalance = () => {
		setIsBalanceHidden(!isBalanceHidden);
	};

	const formatBalance = (value: any) => {
		return isBalanceHidden ? "****" : value;
	};

	// get balance
	const { data, isSuccess }: any = useReadContract({
		abi: abi2,
		address: userAddress,
		functionName: "getBalance",
		account: address,
	});

	useEffect(() => {
		if (isConnected && isSuccess && data) {
			setBalance(formatEther(data));
			setMaxWithdrawableAmount(formatEther(data));
		}
	}, [isConnected, data, isSuccess]);

	useEffect(() => {
		const fetchLSKPrice = async () => {
			if (!balance || parseFloat(balance) === 0) return;
			try {
				const response = await axios.get(
					"https://api.coingecko.com/api/v3/simple/price?ids=lisk&vs_currencies=usd",
				);
				const price = response.data.lisk.usd;
				const value = price * parseFloat(balance);
				console.log(price);

				setLskPrice(value.toFixed(10));
			} catch (error) {
				console.error("Failed to fetch LSK/ETH price", error);
			}
		};
		fetchLSKPrice();
		const interval = setInterval(fetchLSKPrice, 5000); // Update every 5 seconds

		return () => clearInterval(interval);
	}, [balance]);

	// transfer function
	const handleTransfer = async (e: any) => {
		e.preventDefault();
		if (!isConnected) {
			toast.error("Please connect your wallet!");
			return;
		}

		setIsLoading(true);

		if (amount === "" || recipient === "") {
			toast.error("Please enter amount and recipient address!");
			setIsLoading(false);
			return;
		} else if (isAddress(recipient) === false) {
			toast.error("Please enter a valid recipient address!");
			setIsLoading(false);
			return;
		}
		try {
			const amountInWei = parseEther(amount);

			const tx = await writeContractAsync({
				abi: abi2,
				address: userAddress,
				functionName: "transfer",
				args: [recipient, amountInWei],
				account: address,
			});

			setTxHash(tx as `0x${string}`);
		} catch (error: any) {
			setIsLoading(false);
			console.log(error);

			toast.error("Transfer Failed.", error);
		}
	};
	const {
		isLoading: isConfirming,
		isFetched,
		isSuccess: isConfirmed,
	} = useWaitForTransactionReceipt({
		hash: txHash ?? undefined,
	});

	useEffect(() => {
		if (isConfirmed && isFetched) {
			setIsLoading(false);
			setIsSendModalOpen(false);
			toast.success("Transfered Successfully");
		}
	}, [isConfirmed, isFetched]);

	// Deposit function
	const handleDeposite = async (e: any) => {
		e.preventDefault();
		if (!isConnected) {
			toast.error("Please connect your wallet!");
			return;
		}

		setIsLoading(true);

		if (depositAmount === "") {
			toast.error("Please enter an amount!");
			setIsLoading(false);
			return;
		}
		try {
			const tx = await writeContractAsync({
				abi: abi2,
				address: userAddress,
				functionName: "deposit",
				account: address,
				value: parseEther(depositAmount),
			});

			setDxHash(tx as `0x${string}`);
		} catch (error: any) {
			setIsLoading(false);

			toast.error("Something went wrong.", error);
		}
	};
	const { isSuccess: isConfirmedTx } = useWaitForTransactionReceipt({
		hash: dxHash ?? undefined,
	});

	useEffect(() => {
		if (isConfirmedTx) {
			setIsLoading(false);
			setIsDepositModalOpen(false);
			toast.success("Transfered Successfully");
		}
	}, [isConfirmed]);

	//  recentTransactions
	const { data: output, isSuccess: isSuccess2 }: any = useReadContract({
		abi: abi2,
		address: userAddress,
		functionName: "getTransactionHistory",
		account: address,
	});
	useEffect(() => {
		if (isConnected && isSuccess2 && output) {
			setTransactions(output);
			console.log(output);
		}
	}, [isConnected, output, isSuccess2]);

	return (
		<div className="min-h-screen p-6">
			{/* Main Wallet Card */}
			<div className="bg-gradient-to-r from-[#003acea6] to-[#003ace75] rounded-2xl p-6 text-white mb-6">
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
					{formatBalance(balance ? `${balance} LSK` : "0 ETH")}
				</h2>
				<p className="text-white/80 text-lg">
					{formatBalance(`≈ $ ${balance ? lskPrice : "0"} USD`)}
				</p>

				<div className="grid grid-cols-4 gap-4 mt-6">
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
					<button
						onClick={() => setIsDepositModalOpen(true)}
						className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition"
					>
						<CreditCard className="w-5 h-5" />
						<span>Deposit</span>
					</button>
					<button
						onClick={() => setIsWithdrawalModalOpen(true)}
						className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition"
					>
						<CreditCard className="w-5 h-5" />
						<span>Withdraw</span>
					</button>
				</div>
			</div>

			{isSendModalOpen && (
				<SendFund
					setIsSendModalOpen={setIsSendModalOpen}
					handleTransfer={handleTransfer}
					maxWithdrawableAmount={maxWithdrawableAmount}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					amount={amount}
					setAmount={setAmount}
					recipient={recipient}
					setRecipient={setRecipient}
				/>
			)}
			{isReceiveModalOpen && (
				<Receive setIsReceiveModalOpen={setIsReceiveModalOpen} />
			)}
			{depositModalOpen && (
				<Deposit
					setIsDepositModalOpen={setIsDepositModalOpen}
					isLoading={isLoading}
					depositAmount={depositAmount}
					setDepositAmount={setDepositAmount}
					handleDeposite={handleDeposite}
				/>
			)}

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
					{!transactions ? (
						<p className="text-center text-sm text-gray-500">
							No recent transactions.
						</p>
					) : (
						<div>
							{transactions.map((tx: any, index) => (
								<div
									key={index}
									className="flex items-center justify-between py-3 border-b last:border-0"
								>
									<div className="flex items-center gap-3">

										{tx.transactionType === "deposit" ? (

											<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
												<ArrowDownRight className="w-5 h-5 text-green-600" />
											</div>
										) : (
											<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
												<ArrowUpRight className="w-5 h-5 text-red-600" />
											</div>
										)}
										<div>
											<p className="font-medium">{tx.transactionType}</p>
											<p className="text-sm text-gray-500">{tx.recipient}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-medium text-sm">
											{formatEther(tx.amount)} LSK
										</p>
										<p className="text-sm text-gray-500 flex items-center gap-1">
											{tx.sender || tx.recipient}
											<Copy className="w-4 h-4 cursor-pointer hover:text-purple-600" />
										</p>
										<p className="font-medium">
											{new Date(Number(tx.timestamp) * 1000).toDateString()}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{isWithdrawalModalOpen && (
				<Withdrawal
					setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
					maxWithdrawableAmount={maxWithdrawableAmount}
					abi={abi2}
					contractAddress={userAddress}
				/>
			)}
		</div>
	);
};

export default WalletDashboard;
