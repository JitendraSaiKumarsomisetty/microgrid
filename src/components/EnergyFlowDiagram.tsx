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
    <div className="flex items-center justify-between p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
      {/* Solar Panel */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
          <Sun className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Solar Array</h4>
        <p className="text-sm text-orange-600 font-bold">{solarGeneration.toFixed(2)} kW</p>
        <p className="text-xs text-gray-500 mt-1">Generation</p>
      </div>

      {/* Arrow 1 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
        <span className="text-xs text-gray-500 mt-1">DC Power</span>
      </div>

      {/* Smart Inverter */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Smart Inverter</h4>
        <p className="text-sm text-blue-600 font-bold">{(solarGeneration * 0.95).toFixed(2)} kW</p>
        <p className="text-xs text-gray-500 mt-1">AC Conversion</p>
      </div>

      {/* Arrow 2 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
        <span className="text-xs text-gray-500 mt-1">AC Power</span>
      </div>

      {/* Battery Storage */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
          <Battery className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Battery Storage</h4>
        <p className="text-sm text-green-600 font-bold">{batteryCharge}% SOC</p>
        <p className="text-xs text-gray-500 mt-1">Energy Storage</p>
      </div>

      {/* Arrow 3 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
        <span className="text-xs text-gray-500 mt-1">Distribution</span>
      </div>

      {/* Community Load */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Community Load</h4>
        <p className="text-sm text-purple-600 font-bold">{communityLoad.toFixed(2)} kW</p>
        <p className="text-xs text-gray-500 mt-1">Consumption</p>
      </div>

      {/* Diesel Generator (Optional) */}
      <div className="text-center opacity-50">
        <div className="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center mb-3">
          <Fuel className="w-10 h-10 text-gray-500" />
        </div>
        <h4 className="font-medium text-gray-500">Diesel Gen</h4>
        <p className="text-sm text-gray-400 font-medium">Offline</p>
        <p className="text-xs text-gray-400 mt-1">Backup</p>
      </div>
    </div>
  );
};

export default EnergyFlowDiagram;