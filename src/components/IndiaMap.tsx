import React, { useState } from 'react';
import { MapPin, Zap, Battery, Activity, X } from 'lucide-react';
import { MicrogridSite } from '../types';

const IndiaMap: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<MicrogridSite | null>(null);

  // Mock data for microgrid sites across India
  const microgridSites: MicrogridSite[] = [
    {
      id: 'bhubaneswar',
      name: 'Bhubaneswar Central',
      coordinates: [85.8245, 20.2961],
      status: 'good',
      energyGenerated: 45.2,
      batteryLevel: 87,
      lastUpdate: new Date()
    },
    {
      id: 'cuttack',
      name: 'Cuttack Industrial',
      coordinates: [85.8830, 20.4625],
      status: 'warning',
      energyGenerated: 32.8,
      batteryLevel: 65,
      lastUpdate: new Date()
    },
    {
      id: 'puri',
      name: 'Puri Coastal',
      coordinates: [85.8315, 19.8135],
      status: 'good',
      energyGenerated: 38.5,
      batteryLevel: 92,
      lastUpdate: new Date()
    },
    {
      id: 'berhampur',
      name: 'Berhampur South',
      coordinates: [84.7941, 19.3149],
      status: 'critical',
      energyGenerated: 18.3,
      batteryLevel: 23,
      lastUpdate: new Date()
    },
    {
      id: 'rourkela',
      name: 'Rourkela Steel City',
      coordinates: [84.8536, 22.2604],
      status: 'good',
      energyGenerated: 52.1,
      batteryLevel: 78,
      lastUpdate: new Date()
    },
    {
      id: 'sambalpur',
      name: 'Sambalpur Western',
      coordinates: [83.9712, 21.4669],
      status: 'warning',
      energyGenerated: 28.7,
      batteryLevel: 54,
      lastUpdate: new Date()
    },
    {
      id: 'delhi',
      name: 'Delhi Metro Grid',
      coordinates: [77.2090, 28.6139],
      status: 'good',
      energyGenerated: 65.4,
      batteryLevel: 89,
      lastUpdate: new Date()
    },
    {
      id: 'mumbai',
      name: 'Mumbai Port',
      coordinates: [72.8777, 19.0760],
      status: 'warning',
      energyGenerated: 41.2,
      batteryLevel: 67,
      lastUpdate: new Date()
    },
    {
      id: 'bangalore',
      name: 'Bangalore Tech Hub',
      coordinates: [77.5946, 12.9716],
      status: 'good',
      energyGenerated: 58.9,
      batteryLevel: 94,
      lastUpdate: new Date()
    },
    {
      id: 'chennai',
      name: 'Chennai Industrial',
      coordinates: [80.2707, 13.0827],
      status: 'good',
      energyGenerated: 47.3,
      batteryLevel: 81,
      lastUpdate: new Date()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#2ecc71';
      case 'warning': return '#f39c12';
      case 'critical': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Optimal';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0f3057] mb-2">
              Interactive India Map
            </h2>
            <p className="text-gray-600">
              Real-time monitoring of microgrid installations across India
            </p>
          </div>
          <MapPin className="w-8 h-8 text-[#0f3057]" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Map Section */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
            <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
              {/* Interactive India Map SVG */}
              <svg
                viewBox="0 0 1000 700"
                className="w-full h-full cursor-pointer"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
              >
                {/* India outline (detailed) */}
                <path
                  d="M300 150 L700 150 L750 200 L780 250 L800 350 L780 450 L750 500 L700 550 L500 570 L400 550 L350 500 L300 450 L280 350 L300 250 Z"
                  fill="rgba(15, 48, 87, 0.1)"
                  stroke="#0f3057"
                  strokeWidth="2"
                  className="hover:fill-blue-100 transition-colors duration-300"
                />
                
                {/* State boundaries (simplified) */}
                <g stroke="#0f3057" strokeWidth="1" fill="none" opacity="0.3">
                  <path d="M350 200 L450 200 L450 300 L350 300 Z" /> {/* Rajasthan */}
                  <path d="M450 200 L550 200 L550 300 L450 300 Z" /> {/* UP */}
                  <path d="M550 200 L650 200 L650 300 L550 300 Z" /> {/* Bihar */}
                  <path d="M350 300 L450 300 L450 400 L350 400 Z" /> {/* Gujarat */}
                  <path d="M450 300 L550 300 L550 400 L450 400 Z" /> {/* MP */}
                  <path d="M550 300 L650 300 L650 400 L550 400 Z" /> {/* Odisha */}
                  <path d="M350 400 L450 400 L450 500 L350 500 Z" /> {/* Maharashtra */}
                  <path d="M450 400 L550 400 L550 500 L450 500 Z" /> {/* Karnataka */}
                  <path d="M550 400 L650 400 L650 500 L550 500 Z" /> {/* Tamil Nadu */}
                </g>
                
                {/* Microgrid site pins */}
                {microgridSites.map((site) => {
                  // Convert coordinates to SVG positions
                  const x = 300 + ((site.coordinates[0] - 68) / (97 - 68)) * 400;
                  const y = 150 + ((35 - site.coordinates[1]) / (35 - 8)) * 400;
                  
                  return (
                    <g key={site.id} className="cursor-pointer">
                      {/* Pulse animation for active sites */}
                      <circle
                        cx={x}
                        cy={y}
                        r="15"
                        fill={getStatusColor(site.status)}
                        opacity="0.3"
                        className="animate-ping"
                      />
                      {/* Main pin */}
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={getStatusColor(site.status)}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:r-12 transition-all duration-300 drop-shadow-lg"
                        onClick={() => setSelectedSite(site)}
                      />
                      {/* Site label */}
                      <text
                        x={x}
                        y={y + 25}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-700 pointer-events-none"
                      >
                        {site.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
              
              {/* Site popup */}
              {selectedSite && (
                <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-6 z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0f3057]">{selectedSite.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getStatusColor(selectedSite.status) }}
                        />
                        <span className="text-sm text-gray-600">{getStatusText(selectedSite.status)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSite(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-[#f39c12]" />
                        <span className="text-sm font-medium text-gray-700">Energy Generated</span>
                      </div>
                      <span className="text-sm font-bold text-[#f39c12]">
                        {selectedSite.energyGenerated} kW
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Battery className="w-4 h-4 text-[#2ecc71]" />
                        <span className="text-sm font-medium text-gray-700">Battery Level</span>
                      </div>
                      <span className="text-sm font-bold text-[#2ecc71]">
                        {selectedSite.batteryLevel}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-[#0f3057]" />
                        <span className="text-sm font-medium text-gray-700">Last Update</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {selectedSite.lastUpdate.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sites List */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
            <h3 className="text-lg font-bold text-[#0f3057] mb-4">Microgrid Sites</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {microgridSites.map((site) => (
                <div
                  key={site.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                    selectedSite?.id === site.id
                      ? 'bg-blue-50 border-blue-200 shadow-md'
                      : `${getStatusBg(site.status)} hover:shadow-md`
                  }`}
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">{site.name}</span>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(site.status) }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Energy:</span>
                      <span className="font-medium">{site.energyGenerated} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery:</span>
                      <span className="font-medium">{site.batteryLevel}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
            <h4 className="font-bold text-[#0f3057] mb-3">Status Legend</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-[#2ecc71]" />
                <span className="text-gray-700 text-sm">Optimal Performance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-[#f39c12]" />
                <span className="text-gray-700 text-sm">Warning Status</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-[#e74c3c]" />
                <span className="text-gray-700 text-sm">Critical Issues</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
            <h4 className="font-bold text-[#0f3057] mb-3">Network Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Sites:</span>
                <span className="font-bold text-[#0f3057]">{microgridSites.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Optimal:</span>
                <span className="font-bold text-[#2ecc71]">
                  {microgridSites.filter(s => s.status === 'good').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Warnings:</span>
                <span className="font-bold text-[#f39c12]">
                  {microgridSites.filter(s => s.status === 'warning').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Critical:</span>
                <span className="font-bold text-[#e74c3c]">
                  {microgridSites.filter(s => s.status === 'critical').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;