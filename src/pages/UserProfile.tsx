import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getProvider } from '../lib/web3';
import { projectService } from '../lib/projectService';
import { useWallet } from '../context/WalletContext';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  funding_goal: number;
  current_funding: number;
  impact_value: number;
  organization: {
    name: string;
    logo_url: string;
  };
}

const UserProfile = () => {
  const { walletAddress } = useWallet();
  const [loading, setLoading] = useState(true);
  const [createdProjects, setCreatedProjects] = useState<Project[]>([]);
  const [purchasedProjects, setPurchasedProjects] = useState<Project[]>([]);
  const [stakedProjects, setStakedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (walletAddress) {
      fetchUserData(walletAddress);
    } else {
      setLoading(false);
    }
  }, [walletAddress]);

  const fetchUserData = async (address: string) => {
    try {
      // Fetch all purchases with staking status
      const purchases = await projectService.getUserPurchasesWithStakingStatus(address);
      setPurchasedProjects(purchases.map(p => p.project).filter(Boolean));

      // Fetch created projects
      const { data: created, error: createdError } = await supabase
        .from('projects')
        .select(`
          *,
          organization:organizations(name, logo_url)
        `)
        .eq('wallet_address', address);

      if (createdError) throw createdError;
      setCreatedProjects(created || []);

      // Fetch staked projects
      const stakes = await projectService.getStakedProjects(address);
      setStakedProjects(stakes.map(stake => stake.purchase.project).filter(Boolean));
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async (projectId: string) => {
    try {
      const result = await projectService.stakeProject(projectId);
      if (result.success) {
        toast.success('Project staked successfully');
        if (walletAddress) {
          fetchUserData(walletAddress);
        }
      } else {
        throw new Error(result.error || 'Failed to stake project');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const renderProjectGrid = (projects: Project[], type: 'created' | 'purchased' | 'staked') => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.isArray(projects) && projects.map((project) => {
        // Create a unique key combining type, project id, and a random string
        const uniqueKey = `${type}-${project.id}-${Math.random().toString(36).substr(2, 9)}`;
        
        return (
          <div key={uniqueKey} className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="aspect-square relative">
              {project.organization?.logo_url ? (
                <img
                  src={project.organization.logo_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                {type === 'purchased' && (
                  <>
                    <button 
                      onClick={() => handleStake(project.id)}
                      className="px-4 py-2 bg-[#B4F481] text-black rounded hover:bg-[#9FE070] transition-colors"
                    >
                      Stake
                    </button>
                    <button className="px-4 py-2 bg-[#B4F481] text-black rounded hover:bg-[#9FE070] transition-colors">
                      Resell
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium mb-2">{project.title}</h3>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">price</p>
                  <p className="text-[#B4F481]">Eth {project.funding_goal}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">impact value</p>
                  <p className="text-[#B4F481]">{project.impact_value || 0.1}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {type === 'created' && (
        <div className="bg-gray-900/50 rounded-lg aspect-square flex items-center justify-center">
          <Plus className="h-12 w-12 text-[#B4F481] opacity-50" />
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#B4F481] animate-spin" />
      </div>
    );
  }

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">Please connect your wallet to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#B4F481] mb-12">MY PROFILE</h1>

        {/* Only show Created Projects section if there are projects */}
        {createdProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Created Projects</h2>
            {renderProjectGrid(createdProjects, 'created')}
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Purchased Projects</h2>
          {purchasedProjects.length > 0 ? (
            renderProjectGrid(purchasedProjects, 'purchased')
          ) : (
            <div className="text-center py-12 bg-gray-900/50 rounded-lg">
              <p className="text-gray-500">No purchased projects yet</p>
            </div>
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Staked Projects</h2>
          {stakedProjects.length > 0 ? (
            renderProjectGrid(stakedProjects, 'staked')
          ) : (
            <div className="text-center py-12 bg-gray-900/50 rounded-lg">
              <p className="text-gray-500">No staked projects yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;