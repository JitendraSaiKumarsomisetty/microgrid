import React from 'react';
import { Heart, GraduationCap, Building, Home, Factory, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const LoadManagement: React.FC = () => {
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

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Powered':
        return 'bg-green-50 border-green-200';
      case 'Reduced':
        return 'bg-yellow-50 border-yellow-200';
      case 'Shed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      case 'Lowest':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Load Management</h3>
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${getStatusBg(asset.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-gray-600">
                  {asset.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{asset.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(asset.priority)}`}>
                      {asset.priority}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">{asset.power} kW</span>
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