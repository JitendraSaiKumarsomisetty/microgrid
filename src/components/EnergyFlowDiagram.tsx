import React from 'react';
import { Sun, Battery, Zap, Home, Fuel, ArrowRight } from 'lucide-react';

interface EnergyFlowDiagramProps {
  solarGeneration: number;
  batteryCharge: number;
  communityLoad: number;
  gridSales?: number;
}

const EnergyFlowDiagram: React.FC<EnergyFlowDiagramProps> = ({
  solarGeneration,
  batteryCharge,
  communityLoad,
  gridSales = 0
}) => {
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-xl">
      {/* Solar Panel */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#f39c12] to-[#e67e22] rounded-xl flex items-center justify-center mb-2 shadow-lg">
          <Sun className="w-8 h-8 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900 text-sm">Solar Array</h4>
        <p className="text-sm text-[#f39c12] font-bold">{solarGeneration.toFixed(2)} kW</p>
      </div>

      {/* Arrow 1 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-5 h-5 text-[#2ecc71] animate-pulse" />
      </div>

      {/* Smart Inverter */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#0f3057] to-[#1e5f8b] rounded-xl flex items-center justify-center mb-2 shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900 text-sm">Inverter</h4>
        <p className="text-sm text-[#0f3057] font-bold">{(solarGeneration * 0.95).toFixed(2)} kW</p>
      </div>

      {/* Arrow 2 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-5 h-5 text-[#2ecc71] animate-pulse" />
      </div>

      {/* Battery Storage */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-xl flex items-center justify-center mb-2 shadow-lg">
          <Battery className="w-8 h-8 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900 text-sm">Battery</h4>
        <p className="text-sm text-[#2ecc71] font-bold">{batteryCharge}%</p>
      </div>

      {/* Arrow 3 */}
      <div className="flex flex-col items-center">
        <ArrowRight className="w-5 h-5 text-[#2ecc71] animate-pulse" />
      </div>

      {/* Community Load */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900 text-sm">Community</h4>
        <p className="text-sm text-purple-600 font-bold">{communityLoad.toFixed(2)} kW</p>
      </div>

      {/* Grid Sales */}
      {gridSales > 0 && (
        <>
          <div className="flex flex-col items-center">
            <ArrowRight className="w-5 h-5 text-blue-500 animate-pulse" />
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">Grid Sales</h4>
            <p className="text-sm text-blue-600 font-bold">{gridSales.toFixed(2)} kW</p>
          </div>
        </>
      )}

      {/* Diesel Generator (Backup) */}
      <div className="text-center opacity-40">
        <div className="w-16 h-16 bg-gray-400 rounded-xl flex items-center justify-center mb-2">
          <Fuel className="w-8 h-8 text-gray-600" />
        </div>
        <h4 className="font-medium text-gray-500 text-sm">Backup</h4>
        <p className="text-sm text-gray-400 font-medium">Offline</p>
      </div>
    </div>
  );
};

export default EnergyFlowDiagram;