import React, { useState, useEffect } from 'react';
import { X, Wallet, AlertCircle } from 'lucide-react';
import { getAvailableWallets } from '../lib/web3';
import { FEATURES } from '../lib/config';
import toast from 'react-hot-toast';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (wallet: string, manualAddress?: string) => void;
}

const DEFAULT_WALLET = '0x1F9fECf4100f18a227fab7E3868cA89Ef6b9e9F7';

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSelectWallet }) => {
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualAddress, setManualAddress] = useState(DEFAULT_WALLET);
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<Array<{id: string; name: string; icon: string}>>([]);

  useEffect(() => {
    if (isOpen) {
      setAvailableWallets(getAvailableWallets());
      setError('');
      setConnecting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWalletSelect = async (walletId: string) => {
    if (connecting) return;
    
    setConnecting(true);
    setError('');
    
    try {
      await onSelectWallet(walletId);
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      if (err.message.includes('Please install')) {
        setError(`${err.message}. Click to install.`);
      } else {
        setError(err.message || 'Failed to connect wallet');
      }
    } finally {
      setConnecting(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAddress || !/^0x[a-fA-F0-9]{40}$/.test(manualAddress)) {
      setError('Please enter a valid Ethereum address');
      return;
    }
    onSelectWallet('manual', manualAddress);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-sm mx-4 bg-gray-900 rounded-xl shadow-2xl"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Wallet className="mr-2 h-4 w-4 text-[#B4F481]" />
              Connect Wallet
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs flex items-center">
                <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                {error}
              </p>
            </div>
          )}
          
          {!showManualInput ? (
            <>
              <div className="space-y-2 mb-4">
                {Object.values(getAvailableWallets()).map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleWalletSelect(wallet.id)}
                    disabled={connecting}
                    className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-left transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-[#B4F481]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{wallet.icon}</span>
                      <span className="text-white text-sm">{wallet.name}</span>
                      {connecting && (
                        <div className="ml-auto">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#B4F481] border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {FEATURES.MANUAL_WALLET_ENTRY && (
                <>
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-gray-900 text-gray-400">or</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowManualInput(true)}
                    disabled={connecting}
                    className="w-full text-[#B4F481] hover:text-[#9FE070] text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enter wallet address manually
                  </button>
                </>
              )}
            </>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label htmlFor="walletAddress" className="block text-xs font-medium text-gray-300 mb-1">
                  Wallet Address
                </label>
                <input
                  type="text"
                  id="walletAddress"
                  value={manualAddress}
                  onChange={(e) => {
                    setManualAddress(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#B4F481]"
                  placeholder="0x..."
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowManualInput(false)}
                  className="flex-1 px-3 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 bg-[#B4F481] text-black text-sm rounded-lg hover:bg-[#9FE070]"
                >
                  Connect
                </button>
              </div>
            </form>
          )}

          <p className="mt-4 text-center text-xs text-gray-500">
            By connecting a wallet, you agree to Regen Bazaar's Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;