import React from 'react';
import { Sun, Battery, Zap, Home, Fuel, ArrowRight } from 'lucide-react';

interface EnergyFlowDiagramProps {
  solarGeneration: number;
  batteryCharge: number;
  communityLoad: number;
}

const EnergyFlowDiagram: React.FC<EnergyFlowDiagramProps> = ({
  solarGeneration,
  batteryCharge,
  communityLoad
}) => {
  return (
    <div className="flex items-center justify-between p-8">
      {/* Solar Panel */}
      <div className="text-center">
        <div className="w-20 h-20 bg-[#f39c12]/20 rounded-lg flex items-center justify-center mb-3">
          <Sun className="w-10 h-10 text-[#f39c12]" />
        </div>
        <h4 className="font-medium text-white">Solar Array</h4>
        <p className="text-sm text-[#f39c12] font-semibold">{solarGeneration.toFixed(2)} kW</p>
      </div>

      {/* Arrow 1 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-[#2ecc71] animate-pulse" />
        <span className="text-xs text-white/60 mt-1">DC Power</span>
      </div>

      {/* Smart Inverter */}
      <div className="text-center">
        <div className="w-20 h-20 bg-[#3498db]/20 rounded-lg flex items-center justify-center mb-3">
          <Zap className="w-10 h-10 text-[#3498db]" />
        </div>
        <h4 className="font-medium text-white">Smart Inverter</h4>
        <p className="text-sm text-[#3498db] font-semibold">{(solarGeneration * 0.95).toFixed(2)} kW</p>
      </div>

      {/* Arrow 2 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-[#2ecc71] animate-pulse" />
        <span className="text-xs text-white/60 mt-1">AC Power</span>
      </div>

      {/* Battery Storage */}
      <div className="text-center">
        <div className="w-20 h-20 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-3">
          <Battery className="w-10 h-10 text-[#2ecc71]" />
        </div>
        <h4 className="font-medium text-white">Battery Storage</h4>
        <p className="text-sm text-[#2ecc71] font-semibold">{batteryCharge}% SOC</p>
      </div>

      {/* Arrow 3 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-[#2ecc71] animate-pulse" />
        <span className="text-xs text-white/60 mt-1">Distribution</span>
      </div>

      {/* Community Load */}
      <div className="text-center">
        <div className="w-20 h-20 bg-[#9b59b6]/20 rounded-lg flex items-center justify-center mb-3">
          <Home className="w-10 h-10 text-[#9b59b6]" />
        </div>
        <h4 className="font-medium text-white">Community Load</h4>
        <p className="text-sm text-[#9b59b6] font-semibold">{communityLoad.toFixed(2)} kW</p>
      </div>

      {/* Diesel Generator (Optional) */}
      <div className="text-center opacity-50">
        <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center mb-3">
          <Fuel className="w-10 h-10 text-white/40" />
        </div>
        <h4 className="font-medium text-white/50">Diesel Gen</h4>
        <p className="text-sm text-white/40 font-semibold">Offline</p>
      </div>
    </div>
  );
};

export default EnergyFlowDiagram;