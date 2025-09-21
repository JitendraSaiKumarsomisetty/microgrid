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
  TrendingDown,
  Home,
  IndianRupee,
  Gauge,
  Bell
} from 'lucide-react';
import { Alert, LiveData } from '../types';
import MetricCard from './MetricCard';
import EnergyFlowDiagram from './EnergyFlowDiagram';
import LoadManagement from './LoadManagement';
import SystemHealthGauge from './SystemHealthGauge';
import BatteryGauge from './BatteryGauge';
import ControlButtons from './ControlButtons';
import AlertPanel from './AlertPanel';
import LiveAlertFeed from './LiveAlertFeed';

interface DashboardProps {
  liveData: LiveData;
  currentTime: Date;
  onControlAction: (action: string) => void;
  recentAlerts: Alert[];
  gridSellRate: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  liveData, 
  currentTime, 
  onControlAction, 
  recentAlerts,
  gridSellRate
}) => {
  const currentRevenue = liveData.energySoldToGrid * gridSellRate;

  return (
    <div className="space-y-6">
      {/* GridVision India Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0f3057] to-[#2ecc71] bg-clip-text text-transparent mb-2">
          GridVision India Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Real-time monitoring of India's microgrid network</p>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-5 gap-6">
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
          icon={<Home className="w-6 h-6" />}
          color="text-[#0f3057]"
          bgColor="bg-gradient-to-r from-[#0f3057] to-[#1e5f8b]"
          trend={liveData.energyConsumed < 3.5 ? 'down' : 'up'}
        />
        <MetricCard
          title="Revenue from Grid"
          value={`₹${currentRevenue.toFixed(2)}`}
          icon={<IndianRupee className="w-6 h-6" />}
          color="text-purple-600"
          bgColor="bg-gradient-to-r from-purple-500 to-purple-700"
          trend="up"
        />
        <MetricCard
          title="National System Health"
          value={`${liveData.systemHealth}%`}
          icon={<Gauge className="w-6 h-6" />}
          color="text-[#2ecc71]"
          bgColor="bg-gradient-to-r from-[#2ecc71] to-[#27ae60]"
          trend={liveData.systemHealth > 90 ? 'up' : 'stable'}
        />
        <MetricCard
          title="Active Alerts"
          value={`${recentAlerts.filter(a => a.status === 'active').length}`}
          icon={<Bell className="w-6 h-6" />}
          color="text-[#f39c12]"
          bgColor="bg-gradient-to-r from-[#f39c12] to-[#e67e22]"
          trend={recentAlerts.filter(a => a.status === 'active').length > 2 ? 'up' : 'stable'}
        />
      </div>

      {/* Financial Metrics Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Daily Revenue"
          value={`₹${liveData.dailyRevenue.toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-gradient-to-r from-green-500 to-emerald-500"
          trend="up"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`₹${liveData.monthlyRevenue.toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-gradient-to-r from-blue-500 to-cyan-500"
          trend="up"
        />
        <MetricCard
          title="Energy Sold to Grid"
          value={`${liveData.energySoldToGrid.toFixed(2)} kWh`}
          icon={<Zap className="w-6 h-6" />}
          color="text-indigo-600"
          bgColor="bg-gradient-to-r from-indigo-500 to-purple-500"
          trend="up"
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

      {/* System Status Row */}
      <div className="grid grid-cols-4 gap-6">
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Battery State</h3>
            <Battery className="w-6 h-6 text-[#2ecc71]" />
          </div>
          <BatteryGauge percentage={liveData.batteryCharge} />
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
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
        
        <MetricCard
          title="Grid Sell Rate"
          value={`₹${gridSellRate}/kWh`}
          icon={<IndianRupee className="w-6 h-6" />}
          color="text-purple-600"
          bgColor="bg-gradient-to-r from-purple-400 to-pink-400"
          trend="stable"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Energy Flow Diagram */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Flow Diagram</h3>
            <EnergyFlowDiagram 
              solarGeneration={liveData.solarGeneration}
              batteryCharge={liveData.batteryCharge}
              communityLoad={liveData.energyConsumed}
              gridSales={liveData.energySoldToGrid}
            />
          </div>
          
          {/* Load Management */}
          <LoadManagement />
        </div>

        {/* Recent Alerts */}
        <div>
          <AlertPanel alerts={recentAlerts} compact={true} />
        </div>
        
        {/* Live Alert Feed */}
        <div>
          <LiveAlertFeed alerts={recentAlerts} />
        </div>
      </div>

      {/* Diesel Generator Status */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
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
        
        {/* Financial Summary */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-600">Today's Revenue:</span>
              <span className="font-bold text-green-600">₹{liveData.dailyRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-600">Monthly Revenue:</span>
              <span className="font-bold text-blue-600">₹{liveData.monthlyRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-600">Grid Sell Rate:</span>
              <span className="font-medium text-gray-900">₹{gridSellRate}/kWh</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-600">Energy Sold:</span>
              <span className="font-medium text-gray-900">{liveData.energySoldToGrid.toFixed(2)} kWh</span>
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