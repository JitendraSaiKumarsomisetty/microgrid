import React from 'react';
import { 
  Sun, 
  Zap, 
  Battery, 
  Compass, 
  Leaf, 
  DollarSign, 
  Activity,
  Power,
  Fuel,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Alert, LiveData } from '../types';
import MetricCard from './MetricCard';
import EnergyFlowDiagram from './EnergyFlowDiagram';
import LoadManagement from './LoadManagement';
import SystemHealthGauge from './SystemHealthGauge';
import BatteryGauge from './BatteryGauge';
import ControlButtons from './ControlButtons';
import AlertPanel from './AlertPanel';

interface DashboardProps {
  liveData: LiveData;
  currentTime: Date;
  onControlAction: (action: string) => void;
  recentAlerts: Alert[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  liveData, 
  currentTime, 
  onControlAction, 
  recentAlerts 
}) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Live Solar Generation"
          value={`${liveData.solarGeneration.toFixed(2)} kW`}
          icon={<Sun className="w-6 h-6" />}
          color="text-[#f39c12]"
          bgColor="bg-gradient-to-r from-orange-400 to-yellow-400"
          trend={liveData.solarGeneration > 4 ? 'up' : 'down'}
        />
        <MetricCard
          title="Energy Consumed"
          value={`${liveData.energyConsumed.toFixed(2)} kW`}
          icon={<Zap className="w-6 h-6" />}
          color="text-[#3498db]"
          bgColor="bg-gradient-to-r from-blue-400 to-cyan-400"
          trend={liveData.energyConsumed < 3.5 ? 'down' : 'up'}
        />
        <MetricCard
          title="Solar Panel Angle"
          value={`Az: ${liveData.solarAzimuth}° | Tilt: ${liveData.solarTilt}°`}
          icon={<Compass className="w-6 h-6" />}
          color="text-[#9b59b6]"
          bgColor="bg-gradient-to-r from-purple-400 to-pink-400"
        />
        <MetricCard
          title="Carbon Savings"
          value={`${liveData.carbonSavings.toFixed(0)} kg CO₂`}
          icon={<Leaf className="w-6 h-6" />}
          color="text-[#2ecc71]"
          bgColor="bg-gradient-to-r from-green-400 to-emerald-400"
          trend="up"
        />
      </div>

      {/* Second Metrics Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Financial Savings"
          value={`₹${liveData.financialSavings.toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="text-[#27ae60]"
          bgColor="bg-gradient-to-r from-green-500 to-teal-400"
          trend="up"
        />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Battery State</h3>
            <Battery className="w-6 h-6 text-[#2ecc71]" />
          </div>
          <BatteryGauge percentage={liveData.batteryCharge} />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">System Health</h3>
            <Activity className="w-6 h-6 text-[#2ecc71]" />
          </div>
          <SystemHealthGauge score={liveData.systemHealth} />
        </div>
        
        <MetricCard
          title="Power Quality"
          value={`${liveData.powerQuality.toFixed(1)}%`}
          icon={<Zap className="w-6 h-6" />}
          color="text-[#3498db]"
          bgColor="bg-gradient-to-r from-blue-400 to-indigo-400"
          trend={liveData.powerQuality > 98 ? 'up' : 'stable'}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Energy Flow Diagram */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Flow Diagram</h3>
            <EnergyFlowDiagram 
              solarGeneration={liveData.solarGeneration}
              batteryCharge={liveData.batteryCharge}
              communityLoad={liveData.energyConsumed}
            />
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <AlertPanel alerts={recentAlerts} compact={true} />
        </div>
      </div>

      {/* Load Management and Diesel Generator */}
      <div className="grid grid-cols-2 gap-6">
        <LoadManagement />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Diesel Generator</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                liveData.dieselStatus === 'Online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {liveData.dieselStatus}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Runtime Today:</span>
              <span className="font-medium text-gray-900">{liveData.dieselRuntime} hours</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Level:</span>
                <span className="font-medium text-gray-900">{liveData.dieselFuel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    liveData.dieselFuel > 50 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    liveData.dieselFuel > 25 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${liveData.dieselFuel}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Grid Connection:</span>
              <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                liveData.gridConnection === 'Connected' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {liveData.gridConnection}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Section */}
      <ControlButtons onControlAction={onControlAction} />
    </div>
  );
};

export default Dashboard;