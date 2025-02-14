import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';
import { disconnectWallet } from '../lib/web3';
import toast from 'react-hot-toast';
import WalletModal from './WalletModal';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { walletAddress, connect, disconnect, isConnecting } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasPurchasedProducts, setHasPurchasedProducts] = useState(true); // Set to true to always show Stake
  const [rebazBalance, setRebazBalance] = useState(150);
  const [rwiRank, setRwiRank] = useState(70);
  const navigate = useNavigate();

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet();
      disconnect();
      toast.success('Wallet disconnected successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to disconnect wallet');
    }
  };

  const handleConnectWallet = async (walletType: string, manualAddress?: string) => {
    try {
      await connect(walletType, manualAddress);
      setIsWalletModalOpen(false);
    } catch (error: any) {
      if (error.message.includes('Please connect your wallet')) {
        return;
      }
      toast.error(error.message || 'Failed to connect wallet');
    }
  };

  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left Section - User Profile */}
          <div className="flex items-center">
            {walletAddress ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-white font-medium">Paul Burg</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">RWI RANK: <span className="text-[#B4F481]">{rwiRank}</span></span>
                  <span className="text-gray-400">voREBAZ: <span className="text-[#B4F481]">{rebazBalance}</span></span>
                </div>
                <button
                  onClick={handleDisconnectWallet}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Disconnect</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <button
                  onClick={() => setIsWalletModalOpen(true)}
                  disabled={isConnecting}
                  className="bg-[#B4F481] text-black px-4 py-1.5 text-sm rounded hover:bg-[#9FE070] transition-colors disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
            )}
          </div>

          {/* Right Section - Navigation */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/profile" 
                className="px-4 py-1.0 text-sm rounded bg-[#1D211A] text-lime-400 hover:bg-[#2A462C] hover:text-gray-200 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/projects" 
                className="px-4 py-1.0 text-sm rounded bg-[#1D211A] text-lime-400 hover:bg-[#2A462C] hover:text-gray-200 transition-colors"
              >
                Purchase
              </Link>
              <Link 
                to="/create-profile" 
                className="px-4 py-1.0 text-sm rounded bg-[#1D211A] text-lime-400 hover:bg-[#2A462C] hover:text-gray-200 transition-colors"
              >
                Tokenize
              </Link>
              {hasPurchasedProducts && (
                <Link 
                  to="/stake" 
                  className="px-4 py-1.0 text-sm rounded bg-[#1D211A] text-lime-400 hover:bg-[#2A462C] hover:text-gray-200 transition-colors"
                >
                  Stake
                </Link>
              )}
              {rebazBalance > 100 && (
                <Link 
                  to="/vote" 
                  className="px-4 py-1.0 text-sm rounded bg-[#1D211A] text-gray-400 hover:bg-[#2A462C] hover:text-gray-200 transition-colors"
                >
                  Vote
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            <Link 
              to="/profile" 
              className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
            >
              Dashboard
            </Link>
            <Link 
              to="/projects" 
              className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
            >
              Purchase
            </Link>
            <Link 
              to="/create-profile" 
              className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
            >
              Tokenize
            </Link>
            {hasPurchasedProducts && (
              <Link
                to="/stake"
                className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
              >
                Stake
              </Link>
            )}
            {rebazBalance > 100 && (
              <Link 
                to="/vote" 
                className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
              >
                Vote
              </Link>
            )}
            <div className="border-t border-gray-800 my-2"></div>
            <Link 
              to="/about" 
              className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
            >
              About Us
            </Link>
            <Link 
              to="/leaderboard" 
              className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded"
            >
              Leaderboard
            </Link>
          </div>
        )}
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={handleConnectWallet}
      />
    </nav>
  );
};

export default Navbar;