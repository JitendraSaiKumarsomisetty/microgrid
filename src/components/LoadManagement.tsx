import React from 'react';
import { Heart, GraduationCap, Building, Home, Factory, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

const LoadManagement: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const assets = [
    { name: 'Hospital', icon: <Heart className="w-5 h-5" />, status: 'Powered', priority: 'Critical', power: '1.2' },
    { name: 'School', icon: <GraduationCap className="w-5 h-5" />, status: 'Powered', priority: 'High', power: '0.8' },
    { name: 'Community Center', icon: <Building className="w-5 h-5" />, status: 'Powered', priority: 'Medium', power: '0.6' },
    { name: 'Residential', icon: <Home className="w-5 h-5" />, status: 'Reduced', priority: 'Low', power: '0.4' },
    { name: 'Small Industry', icon: <Factory className="w-5 h-5" />, status: 'Shed', priority: 'Lowest', power: '0.0' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Powered':
        return <CheckCircle className="w-4 h-4 text-[#2ecc71]" />;
      case 'Reduced':
        return <AlertCircle className="w-4 h-4 text-[#f39c12]" />;
      case 'Shed':
        return <XCircle className="w-4 h-4 text-[#e74c3c]" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Powered':
        return 'bg-[#2ecc71]/10 border-[#2ecc71]/30 text-white';
      case 'Reduced':
        return 'bg-[#f39c12]/10 border-[#f39c12]/30 text-white';
      case 'Shed':
        return 'bg-[#e74c3c]/10 border-[#e74c3c]/30 text-white';
      default:
        return 'bg-white/5 border-white/20 text-white';
    }
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{getTranslation('loadManagement', currentLanguage)}</h3>
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getStatusColor(asset.status)} transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-white/70">
                  {asset.icon}
                </div>
                <div>
                  <h4 className="font-medium">{asset.name}</h4>
                  <p className="text-sm opacity-75">{asset.priority} Priority</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">{asset.power} {getTranslation('kw', currentLanguage)}</span>
                {getStatusIcon(asset.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default LoadManagement;