"use client";
import { useState } from 'react';
import { WalletIcon, Send, ArrowUpRight, ArrowDownRight, Copy, Plus, CreditCard, History } from 'lucide-react';
import Receive from '@/components/Receive';
import SendFund from '@/components/Send';

const WalletDashboard = () => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
 
  const recentTransactions = [
    { type: 'Received', amount: '0.245 ETH', date: '2024-03-15', from: '0x1234...5678' },
    { type: 'Sent', amount: '0.1 ETH', date: '2024-03-14', to: '0x8765...4321' },
    { type: 'Received', amount: '0.5 ETH', date: '2024-03-13', from: '0x9876...1234' },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Main Wallet Card */}
      <div className="bg-gradient-to-r from-[#003acecc] to-[#003ace86] rounded-2xl p-6 text-white mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <WalletIcon className="w-6 h-6" />
            <span className="font-semibold">Main Wallet</span>
          </div>
          <button className="bg-white/20 rounded-lg px-3 py-1 text-sm">
            Hide Balance
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-2">2.458 ETH</h2>
        <p className="text-white/80 text-lg">≈ $4,578.23 USD</p>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button onClick={() => setIsSendModalOpen(true)} className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition">
            <Send className="w-5 h-5" />
            <span>Send</span>
          </button>
          <button onClick={() => setIsReceiveModalOpen(true)} className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition">
            <Plus className="w-5 h-5" />
            <span>Receive</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/20 rounded-xl p-3 hover:bg-white/30 transition">
            <CreditCard className="w-5 h-5" />
            <span>Buy</span>
          </button>
        </div>
      </div>
      {isSendModalOpen && <SendFund setIsSendModalOpen= {setIsSendModalOpen} amount= {amount} setAmount= {setAmount} recipient={recipient} setRecipient={setRecipient} /> }
      {isReceiveModalOpen && <Receive setIsReceiveModalOpen= {setIsReceiveModalOpen} /> }
    
      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Transactions</h3>
          <button className="text-purple-600 flex items-center gap-1">
            <History className="w-4 h-4" />
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((tx, index) => (
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
                  <p className="text-sm text-gray-500">{tx.date}</p>
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
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default WalletDashboard;