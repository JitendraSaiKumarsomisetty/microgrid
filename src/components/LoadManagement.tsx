import React from 'react';
import { Heart, GraduationCap, Building, Home, Factory, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const LoadManagement: React.FC = () => {
  const assets = [
    { name: 'Hospital', icon: <Heart className="w-5 h-5" />, status: 'Powered', priority: 'Critical', power: '1.2 kW' },
    { name: 'School', icon: <GraduationCap className="w-5 h-5" />, status: 'Powered', priority: 'High', power: '0.8 kW' },
    { name: 'Community Center', icon: <Building className="w-5 h-5" />, status: 'Powered', priority: 'Medium', power: '0.6 kW' },
    { name: 'Residential', icon: <Home className="w-5 h-5" />, status: 'Reduced', priority: 'Low', power: '0.4 kW' },
    { name: 'Small Industry', icon: <Factory className="w-5 h-5" />, status: 'Shed', priority: 'Lowest', power: '0.0 kW' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Powered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Reduced':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Shed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Powered':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'Reduced':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'Shed':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Load Management</h3>
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getStatusColor(asset.status)} transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-gray-600">
                  {asset.icon}
                </div>
                <div>
                  <h4 className="font-medium">{asset.name}</h4>
                  <p className="text-sm opacity-75">{asset.priority} Priority</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{asset.power}</span>
                {getStatusIcon(asset.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadManagement;