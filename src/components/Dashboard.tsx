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
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import { Alert, LiveData } from '../types';
import GlassCard from './GlassCard';
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
  const { currentLanguage } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title={getTranslation('liveSolarGeneration', currentLanguage)}
          value={`${liveData.solarGeneration.toFixed(2)} ${getTranslation('kw', currentLanguage)}`}
          icon={<Sun className="w-6 h-6" />}
          color="text-[#f39c12]"
          bgColor="bg-[#f39c12]/20"
        />
        <MetricCard
          title={getTranslation('energyConsumed', currentLanguage)}
          value={`${liveData.energyConsumed.toFixed(2)} ${getTranslation('kw', currentLanguage)}`}
          icon={<Zap className="w-6 h-6" />}
          color="text-[#3498db]"
          bgColor="bg-[#3498db]/20"
        />
        <MetricCard
          title={getTranslation('solarPanelAngle', currentLanguage)}
          value={`Az: ${liveData.solarAzimuth}${getTranslation('degrees', currentLanguage)} | Tilt: ${liveData.solarTilt}${getTranslation('degrees', currentLanguage)}`}
          icon={<Compass className="w-6 h-6" />}
          color="text-[#9b59b6]"
          bgColor="bg-[#9b59b6]/20"
        />
        <MetricCard
          title={getTranslation('carbonSavings', currentLanguage)}
          value={`${liveData.carbonSavings.toFixed(0)} ${getTranslation('kg', currentLanguage)} CO₂`}
          icon={<Leaf className="w-6 h-6" />}
          color="text-[#2ecc71]"
          bgColor="bg-[#2ecc71]/20"
        />
      </div>

      {/* Second Metrics Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title={getTranslation('financialSavings', currentLanguage)}
          value={`${getTranslation('rupees', currentLanguage)}${liveData.financialSavings.toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="text-[#27ae60]"
          bgColor="bg-[#27ae60]/20"
        />
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">{getTranslation('batteryState', currentLanguage)}</h3>
            <Battery className="w-6 h-6 text-[#2ecc71]" />
          </div>
          <BatteryGauge percentage={liveData.batteryCharge} />
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">{getTranslation('systemHealth', currentLanguage)}</h3>
            <Activity className="w-6 h-6 text-[#2ecc71]" />
          </div>
          <SystemHealthGauge score={liveData.systemHealth} />
        </GlassCard>
        <MetricCard
          title={getTranslation('powerQuality', currentLanguage)}
          value={`${liveData.powerQuality.toFixed(1)}${getTranslation('percent', currentLanguage)}`}
          icon={<Zap className="w-6 h-6" />}
          color="text-[#3498db]"
          bgColor="bg-[#3498db]/20"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Energy Flow Diagram */}
        <div className="col-span-2">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{getTranslation('energyFlow', currentLanguage)}</h3>
          <EnergyFlowDiagram 
            solarGeneration={liveData.solarGeneration}
            batteryCharge={liveData.batteryCharge}
            communityLoad={liveData.energyConsumed}
          />
          </GlassCard>
        </div>

        {/* Recent Alerts */}
        <div>
          <AlertPanel alerts={recentAlerts} compact={true} />
        </div>
      </div>

      {/* Load Management and Diesel Generator */}
      <div className="grid grid-cols-2 gap-6">
        <LoadManagement />
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{getTranslation('dieselGenerator', currentLanguage)}</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-white/70">{getTranslation('status', currentLanguage)}:</span>
              <span className={`font-medium ${
                liveData.dieselStatus === 'Online' ? 'text-[#2ecc71]' : 'text-white/50'
              }`}>
                {getTranslation(liveData.dieselStatus.toLowerCase(), currentLanguage)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Runtime Today:</span>
              <span className="text-white font-medium">{liveData.dieselRuntime} {getTranslation('hours', currentLanguage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Fuel Level:</span>
              <span className="text-white font-medium">{liveData.dieselFuel}{getTranslation('percent', currentLanguage)}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  liveData.dieselFuel > 50 ? 'bg-[#2ecc71]' :
                  liveData.dieselFuel > 25 ? 'bg-[#f39c12]' : 'bg-[#e74c3c]'
                }`}
                style={{ width: `${liveData.dieselFuel}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Grid Connection:</span>
              <span className={`font-medium ${
                liveData.gridConnection === 'Connected' ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
              }`}>
                {getTranslation(liveData.gridConnection.toLowerCase(), currentLanguage)}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Control Section */}
      <ControlButtons onControlAction={onControlAction} />
    </div>
  );
};

export default Dashboard;