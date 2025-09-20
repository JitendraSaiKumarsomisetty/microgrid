import React, { useState } from 'react';
import { MapPin, Zap, Battery, Activity } from 'lucide-react';
import { MicrogridSite } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

const IndiaMap: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [selectedSite, setSelectedSite] = useState<MicrogridSite | null>(null);

  // Mock data for Odisha microgrid sites
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {getTranslation('indiaMap', currentLanguage)}
        </h2>
        <p className="text-white/80">
          Interactive map showing microgrid installations across Odisha
        </p>
      </GlassCard>

      <div className="grid grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="col-span-2">
          <GlassCard className="p-6 h-[600px]">
            <div className="relative w-full h-full">
              {/* Simplified India Map SVG */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
              >
                {/* India outline (simplified) */}
                <path
                  d="M200 100 L600 100 L650 150 L680 200 L700 300 L680 400 L650 450 L600 500 L400 520 L300 500 L250 450 L200 400 L180 300 L200 200 Z"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                
                {/* Odisha state highlight */}
                <path
                  d="M480 280 L520 280 L540 320 L530 360 L500 380 L470 370 L460 340 L470 300 Z"
                  fill="rgba(46, 204, 113, 0.2)"
                  stroke="#2ecc71"
                  strokeWidth="2"
                />
                
                {/* Microgrid site pins */}
                {microgridSites.map((site) => {
                  const x = 460 + (site.coordinates[0] - 84) * 15;
                  const y = 380 - (site.coordinates[1] - 19) * 15;
                  
                  return (
                    <g key={site.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={getStatusColor(site.status)}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-10 transition-all duration-300"
                        onClick={() => setSelectedSite(site)}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="transparent"
                        className="cursor-pointer"
                        onClick={() => setSelectedSite(site)}
                      />
                    </g>
                  );
                })}
              </svg>
              
              {/* Site popup */}
              {selectedSite && (
                <div className="absolute top-4 right-4 w-80">
                  <GlassCard className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white">{selectedSite.name}</h3>
                      <button
                        onClick={() => setSelectedSite(null)}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Status:</span>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: getStatusColor(selectedSite.status),
                            color: 'white'
                          }}
                        >
                          {getStatusText(selectedSite.status)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-[#f39c12]" />
                          <span className="text-white/80">Energy Generated:</span>
                        </div>
                        <span className="text-white font-medium">
                          {selectedSite.energyGenerated} kW
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Battery className="w-4 h-4 text-[#2ecc71]" />
                          <span className="text-white/80">Battery Level:</span>
                        </div>
                        <span className="text-white font-medium">
                          {selectedSite.batteryLevel}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-white/60" />
                          <span className="text-white/80">Last Update:</span>
                        </div>
                        <span className="text-white/60 text-sm">
                          {selectedSite.lastUpdate.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Sites List */}
        <div className="space-y-4">
          <GlassCard className="p-4">
            <h3 className="text-lg font-bold text-white mb-4">Microgrid Sites</h3>
            <div className="space-y-3">
              {microgridSites.map((site) => (
                <div
                  key={site.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedSite?.id === site.id
                      ? 'bg-white/20 border border-white/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{site.name}</span>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(site.status) }}
                    />
                  </div>
                  <div className="text-xs text-white/60 space-y-1">
                    <div>Energy: {site.energyGenerated} kW</div>
                    <div>Battery: {site.batteryLevel}%</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Legend */}
          <GlassCard className="p-4">
            <h4 className="text-white font-medium mb-3">Status Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#2ecc71]" />
                <span className="text-white/80 text-sm">Optimal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#f39c12]" />
                <span className="text-white/80 text-sm">Warning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#e74c3c]" />
                <span className="text-white/80 text-sm">Critical</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;