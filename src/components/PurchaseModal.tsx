import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { projectService } from '../lib/projectService';
import { depositVault } from '../lib/contracts/depositVault';
import toast from 'react-hot-toast';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    funding_goal: number;
    current_funding: number;
  };
  walletAddress: string | null;
  onPurchaseComplete: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  project,
  walletAddress,
  onPurchaseComplete
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'confirmation' | 'processing' | 'complete'>('confirmation');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    setStep('processing');
    setIsProcessing(true);

    try {
      // First make the deposit using the smart contract
      console.log("Attempting deposit with amount:", project.funding_goal);
      const tx = await depositVault.deposit(project.funding_goal.toString());
      console.log("Transaction sent:", tx.hash);
      
      // Wait for transaction confirmation with user feedback
      const receipt = await toast.promise(
        tx.wait(),
        {
          loading: 'Confirming transaction...',
          success: 'Transaction confirmed!',
          error: 'Transaction failed'
        }
      );

      // Then create the purchase record in the database with the transaction hash
      const result = await projectService.purchaseProject(
        project.id,
        walletAddress,
        project.funding_goal,
        receipt.hash
      );

      if (result.success) {
        setStep('complete');
        onPurchaseComplete();
        toast.success('Purchase successful!');
      } else {
        throw new Error(result.error || 'Purchase failed');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      if (error.code === 'ACTION_REJECTED') {
        toast.error('Transaction rejected by user');
      } else if (error.message.includes('insufficient funds')) {
        toast.error('Insufficient funds in wallet');
      } else {
        toast.error(error.message || 'Failed to complete purchase');
      }
      setStep('confirmation');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'confirmation':
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Purchase</h3>
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white">{project.funding_goal} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Project:</span>
                <span className="text-white">{project.title}</span>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="px-4 py-2 bg-[#B4F481] text-black rounded hover:bg-[#9FE070] disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></span>
                    Processing...
                  </span>
                ) : (
                  'Confirm Purchase'
                )}
              </button>
            </div>
          </>
        );

      case 'processing':
        return (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B4F481] mx-auto mb-4"></div>
            <p className="text-white">Processing your purchase...</p>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 text-[#B4F481] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Purchase Complete!</h3>
            <p className="text-gray-400 mb-6">Your impact product has been purchased successfully.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#B4F481] text-black rounded hover:bg-[#9FE070]"
            >
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;