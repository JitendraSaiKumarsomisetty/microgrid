import React, { useState } from 'react';
import { Users, Lightbulb, Trophy, TrendingUp, Leaf, DollarSign, Home, Award } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

const CommunityPortal: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [selectedTip, setSelectedTip] = useState<number>(0);

  const energyTips = [
    {
      title: 'Use LED Lighting',
      description: 'Replace traditional bulbs with LED lights to reduce energy consumption by up to 80%',
      savings: '₹200/month',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: 'Optimize AC Usage',
      description: 'Set AC temperature to 24°C and use fans to feel cooler while saving energy',
      savings: '₹500/month',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Solar Water Heating',
      description: 'Use solar water heaters during peak sun hours to reduce electricity usage',
      savings: '₹300/month',
      icon: <Leaf className="w-6 h-6" />
    },
    {
      title: 'Unplug Devices',
      description: 'Unplug electronics when not in use to eliminate phantom power consumption',
      savings: '₹150/month',
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sector A Residential', efficiency: 95, savings: 2500, icon: <Trophy className="w-5 h-5 text-[#f39c12]" /> },
    { rank: 2, name: 'Green Valley Colony', efficiency: 92, savings: 2200, icon: <Award className="w-5 h-5 text-[#95a5a6]" /> },
    { rank: 3, name: 'Sunrise Apartments', efficiency: 89, savings: 2000, icon: <Award className="w-5 h-5 text-[#cd7f32]" /> },
    { rank: 4, name: 'Community Center', efficiency: 87, savings: 1800, icon: <Home className="w-5 h-5 text-white/60" /> },
    { rank: 5, name: 'Market Complex', efficiency: 84, savings: 1600, icon: <Home className="w-5 h-5 text-white/60" /> },
    { rank: 6, name: 'School District', efficiency: 82, savings: 1500, icon: <Home className="w-5 h-5 text-white/60" /> }
  ];

  const communityStats = {
    totalHouseholds: 1250,
    activeParticipants: 987,
    totalSavings: 125000,
    carbonReduced: 2500,
    energyEfficiency: 88
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0f3057] mb-2">
              {getTranslation('community', currentLanguage)}
            </h2>
            <p className="text-[#333333]">
              Community energy dashboard and efficiency programs
            </p>
          </div>
          <Users className="w-8 h-8 text-[#666666]" />
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#2ecc71] mb-1">
            {communityStats.totalHouseholds.toLocaleString()}
          </div>
          <div className="text-[#666666] text-sm">Total Households</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#3498db] mb-1">
            {communityStats.activeParticipants.toLocaleString()}
          </div>
          <div className="text-[#666666] text-sm">Active Participants</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#f39c12] mb-1">
            ₹{(communityStats.totalSavings / 1000).toFixed(0)}K
          </div>
          <div className="text-[#666666] text-sm">Total Savings</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#2ecc71] mb-1">
            {communityStats.carbonReduced} kg
          </div>
          <div className="text-[#666666] text-sm">CO₂ Reduced</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#0f3057] mb-1">
            {communityStats.energyEfficiency}%
          </div>
          <div className="text-[#666666] text-sm">Avg Efficiency</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Energy Saving Tips */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-bold text-[#0f3057] mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-[#f39c12]" />
            Energy Saving Tips
          </h3>
          <div className="space-y-3">
            {energyTips.map((tip, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedTip === index
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTip(index)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-[#f39c12]/20 rounded-lg text-[#f39c12]">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#0f3057] font-medium mb-1">{tip.title}</h4>
                    <p className="text-[#333333] text-sm mb-2">{tip.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#2ecc71] font-medium text-sm">
                        Potential Savings: {tip.savings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Leaderboard */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-bold text-[#0f3057] mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-[#f39c12]" />
            Efficiency Leaderboard
          </h3>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                    <span className="text-[#0f3057] font-bold text-sm">#{entry.rank}</span>
                  </div>
                  {entry.icon}
                  <div>
                    <div className="text-[#0f3057] font-medium text-sm">{entry.name}</div>
                    <div className="text-[#666666] text-xs">
                      {entry.efficiency}% efficiency • ₹{entry.savings} saved
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#2ecc71] font-bold">{entry.efficiency}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current System Status - Simplified */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-bold text-[#0f3057] mb-4">Current System Status</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#f39c12]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-8 h-8 text-[#f39c12]" />
            </div>
            <div className="text-2xl font-bold text-[#0f3057] mb-1">4.2 kW</div>
            <div className="text-[#666666] text-sm">Solar Generation</div>
            <div className="text-[#2ecc71] text-xs mt-1">Excellent</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2ecc71]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-[#2ecc71]" />
            </div>
            <div className="text-2xl font-bold text-[#0f3057] mb-1">78%</div>
            <div className="text-[#666666] text-sm">Battery Level</div>
            <div className="text-[#2ecc71] text-xs mt-1">Good</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#3498db]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-[#3498db]" />
            </div>
            <div className="text-2xl font-bold text-[#0f3057] mb-1">3.1 kW</div>
            <div className="text-[#666666] text-sm">Community Load</div>
            <div className="text-[#f39c12] text-xs mt-1">Moderate</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2ecc71]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-8 h-8 text-[#2ecc71]" />
            </div>
            <div className="text-2xl font-bold text-[#0f3057] mb-1">245 kg</div>
            <div className="text-[#666666] text-sm">CO₂ Saved Today</div>
            <div className="text-[#2ecc71] text-xs mt-1">Excellent</div>
          </div>
        </div>
      </div>

      {/* Community Announcements */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-bold text-[#0f3057] mb-4">Community Announcements</h3>
        <div className="space-y-3">
          <div className="p-4 bg-[#3498db]/10 border border-[#3498db]/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-[#3498db]/20 rounded-lg">
                <Users className="w-5 h-5 text-[#3498db]" />
              </div>
              <div>
                <h4 className="text-[#0f3057] font-medium mb-1">Energy Efficiency Workshop</h4>
                <p className="text-[#333333] text-sm mb-2">
                  Join us this Saturday at 10 AM for a workshop on home energy efficiency tips and solar panel maintenance.
                </p>
                <span className="text-[#3498db] text-xs">Posted 2 hours ago</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-[#2ecc71]/20 rounded-lg">
                <Trophy className="w-5 h-5 text-[#2ecc71]" />
              </div>
              <div>
                <h4 className="text-[#0f3057] font-medium mb-1">Monthly Efficiency Challenge</h4>
                <p className="text-[#333333] text-sm mb-2">
                  Congratulations to Sector A Residential for achieving 95% efficiency this month! Keep up the great work.
                </p>
                <span className="text-[#2ecc71] text-xs">Posted 1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPortal;