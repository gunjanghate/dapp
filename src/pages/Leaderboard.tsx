import React, { useState } from 'react';
import { Trophy, Award, Star } from 'lucide-react';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');

  const leaderboardData = {
    organizations: [
      {
        rank: 1,
        name: 'EcoThailand',
        impact: 2500,
        projects: 15,
        rebaz: 45000
      },
      {
        rank: 2,
        name: 'Clean Phangan',
        impact: 2100,
        projects: 12,
        rebaz: 38000
      },
      {
        rank: 3,
        name: 'Forest Guardian',
        impact: 1800,
        projects: 10,
        rebaz: 32000
      },
      {
        rank: 4,
        name: 'Ocean Care',
        impact: 1500,
        projects: 8,
        rebaz: 28000
      },
      {
        rank: 5,
        name: 'Green Future',
        impact: 1200,
        projects: 6,
        rebaz: 25000
      }
    ],
    individuals: [
      {
        rank: 1,
        name: 'Sarah L.',
        impact: 850,
        contributions: 25,
        rebaz: 15000
      },
      {
        rank: 2,
        name: 'Michael R.',
        impact: 720,
        contributions: 20,
        rebaz: 12000
      },
      {
        rank: 3,
        name: 'Emma T.',
        impact: 650,
        contributions: 18,
        rebaz: 10000
      },
      {
        rank: 4,
        name: 'James K.',
        impact: 580,
        contributions: 15,
        rebaz: 8500
      },
      {
        rank: 5,
        name: 'Lisa M.',
        impact: 520,
        contributions: 12,
        rebaz: 7000
      }
    ]
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Award className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Star className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-gray-400 font-mono text-lg">{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-6xl font-bold text-[#B4F481] mb-12">IMPACT LEADERBOARD</h1>

        {/* Timeframe Selection */}
        <div className="flex justify-center space-x-4 mb-12">
          {[
            { value: 'weekly', label: 'This Week' },
            { value: 'monthly', label: 'This Month' },
            { value: 'allTime', label: 'All Time' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTimeframe(value as typeof timeframe)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                timeframe === value
                  ? 'bg-[#B4F481] text-black'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Organizations Leaderboard */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Top Organizations</h2>
            <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
              <div className="grid grid-cols-5 text-sm text-gray-400 p-4 border-b border-gray-800">
                <div className="col-span-2">Organization</div>
                <div className="text-right">Impact</div>
                <div className="text-right">Projects</div>
                <div className="text-right">REBAZ</div>
              </div>
              {leaderboardData.organizations.map((org) => (
                <div
                  key={org.rank}
                  className="grid grid-cols-5 items-center p-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50"
                >
                  <div className="col-span-2 flex items-center space-x-3">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(org.rank)}
                    </div>
                    <span className="text-white">{org.name}</span>
                  </div>
                  <div className="text-right text-[#B4F481]">{org.impact}</div>
                  <div className="text-right text-gray-300">{org.projects}</div>
                  <div className="text-right text-[#B4F481]">{org.rebaz.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Contributors Leaderboard */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Top Contributors</h2>
            <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
              <div className="grid grid-cols-5 text-sm text-gray-400 p-4 border-b border-gray-800">
                <div className="col-span-2">Contributor</div>
                <div className="text-right">Impact</div>
                <div className="text-right">Actions</div>
                <div className="text-right">REBAZ</div>
              </div>
              {leaderboardData.individuals.map((individual) => (
                <div
                  key={individual.rank}
                  className="grid grid-cols-5 items-center p-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50"
                >
                  <div className="col-span-2 flex items-center space-x-3">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(individual.rank)}
                    </div>
                    <span className="text-white">{individual.name}</span>
                  </div>
                  <div className="text-right text-[#B4F481]">{individual.impact}</div>
                  <div className="text-right text-gray-300">{individual.contributions}</div>
                  <div className="text-right text-[#B4F481]">{individual.rebaz.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;