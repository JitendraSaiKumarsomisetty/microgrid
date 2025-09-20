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
        <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
          <Sun className="w-10 h-10 text-orange-500" />
        </div>
        <h4 className="font-medium text-gray-900">Solar Array</h4>
        <p className="text-sm text-orange-600 font-semibold">{solarGeneration.toFixed(2)} kW</p>
      </div>

      {/* Arrow 1 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
        <span className="text-xs text-gray-500 mt-1">DC Power</span>
      </div>

      {/* Smart Inverter */}
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
          <Zap className="w-10 h-10 text-blue-500" />
        </div>
        <h4 className="font-medium text-gray-900">Smart Inverter</h4>
        <p className="text-sm text-blue-600 font-semibold">{(solarGeneration * 0.95).toFixed(2)} kW</p>
      </div>

      {/* Arrow 2 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
        <span className="text-xs text-gray-500 mt-1">AC Power</span>
      </div>

      {/* Battery Storage */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mb-3">
          <Battery className="w-10 h-10 text-green-500" />
        </div>
        <h4 className="font-medium text-gray-900">Battery Storage</h4>
        <p className="text-sm text-green-600 font-semibold">{batteryCharge}% SOC</p>
      </div>

      {/* Arrow 3 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
        <span className="text-xs text-gray-500 mt-1">Distribution</span>
      </div>

      {/* Community Load */}
      <div className="text-center">
        <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
          <Home className="w-10 h-10 text-purple-500" />
        </div>
        <h4 className="font-medium text-gray-900">Community Load</h4>
        <p className="text-sm text-purple-600 font-semibold">{communityLoad.toFixed(2)} kW</p>
      </div>

      {/* Diesel Generator (Optional) */}
      <div className="text-center opacity-50">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
          <Fuel className="w-10 h-10 text-gray-400" />
        </div>
        <h4 className="font-medium text-gray-500">Diesel Gen</h4>
        <p className="text-sm text-gray-400 font-semibold">Offline</p>
      </div>
    </div>
  );
};

export default EnergyFlowDiagram;