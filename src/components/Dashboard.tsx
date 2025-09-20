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
  Fuel
} from 'lucide-react';
import MetricCard from './MetricCard';
import EnergyFlowDiagram from './EnergyFlowDiagram';
import LoadManagement from './LoadManagement';
import SystemHealthGauge from './SystemHealthGauge';
import BatteryGauge from './BatteryGauge';
import ControlButtons from './ControlButtons';
import AlertPanel from './AlertPanel';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  category: 'system' | 'weather' | 'energy' | 'maintenance';
  message: string;
  time: Date;
  status: 'active' | 'acknowledged' | 'resolved';
}

interface DashboardProps {
  liveData: {
    solarGeneration: number;
    energyConsumed: number;
    batteryCharge: number;
    solarAzimuth: number;
    solarTilt: number;
    carbonSavings: number;
    financialSavings: number;
    systemHealth: number;
    dieselStatus: string;
    dieselRuntime: number;
    dieselFuel: number;
    gridConnection: string;
    powerQuality: number;
    efficiency: number;
  };
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
          color="text-orange-500"
          bgColor="bg-orange-50"
        />
        <MetricCard
          title="Energy Consumed"
          value={`${liveData.energyConsumed.toFixed(2)} kW`}
          icon={<Zap className="w-6 h-6" />}
          color="text-blue-500"
          bgColor="bg-blue-50"
        />
        <MetricCard
          title="Solar Panel Angle"
          value={`Az: ${liveData.solarAzimuth}° | Tilt: ${liveData.solarTilt}°`}
          icon={<Compass className="w-6 h-6" />}
          color="text-purple-500"
          bgColor="bg-purple-50"
        />
        <MetricCard
          title="Carbon Savings"
          value={`${liveData.carbonSavings.toFixed(0)} kg CO₂`}
          icon={<Leaf className="w-6 h-6" />}
          color="text-green-500"
          bgColor="bg-green-50"
        />
      </div>

      {/* Second Metrics Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Today's Financial Savings"
          value={`₹${liveData.financialSavings.toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Battery State</h3>
            <Battery className="w-6 h-6 text-green-500" />
          </div>
          <BatteryGauge percentage={liveData.batteryCharge} />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">System Health</h3>
            <Activity className="w-6 h-6 text-green-500" />
          </div>
          <SystemHealthGauge score={liveData.systemHealth} />
        </div>
        <MetricCard
          title="Power Quality"
          value={`${liveData.powerQuality.toFixed(1)}%`}
          icon={<Zap className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Energy Flow Diagram */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Flow Diagram</h3>
          <EnergyFlowDiagram 
            solarGeneration={liveData.solarGeneration}
            batteryCharge={liveData.batteryCharge}
            communityLoad={liveData.energyConsumed}
          />
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <AlertPanel alerts={recentAlerts} compact={true} />
        </div>
      </div>

      {/* Load Management and Diesel Generator */}
      <div className="grid grid-cols-2 gap-6">
        <LoadManagement />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Diesel Generator</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${
                liveData.dieselStatus === 'Online' ? 'text-green-600' : 'text-gray-400'
              }`}>
                {liveData.dieselStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Runtime Today:</span>
              <span className="font-medium">{liveData.dieselRuntime} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Level:</span>
              <span className="font-medium">{liveData.dieselFuel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  liveData.dieselFuel > 50 ? 'bg-green-500' :
                  liveData.dieselFuel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${liveData.dieselFuel}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Grid Connection:</span>
              <span className={`font-medium ${
                liveData.gridConnection === 'Connected' ? 'text-green-600' : 'text-red-600'
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