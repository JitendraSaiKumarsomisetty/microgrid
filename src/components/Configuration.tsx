import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Zap, 
  Battery,
  Sun,
  Thermometer,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ConfigurationProps {
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
}

const Configuration: React.FC<ConfigurationProps> = ({ liveData }) => {
  const [activeSection, setActiveSection] = useState('system');
  const [hasChanges, setHasChanges] = useState(false);
  
  // Configuration state
  const [config, setConfig] = useState({
    system: {
      maxSolarCapacity: 50,
      batteryCapacity: 100,
      maxLoadCapacity: 40,
      systemVoltage: 48,
      autoSwitchThreshold: 25,
      maintenanceMode: false
    },
    alerts: {
      lowBatteryThreshold: 25,
      highLoadThreshold: 35,
      temperatureThreshold: 45,
      enableEmailAlerts: true,
      enableSMSAlerts: false,
      alertFrequency: 'immediate'
    },
    energy: {
      solarTrackingEnabled: true,
      autoLoadShedding: true,
      dieselAutoStart: true,
      dieselStartThreshold: 20,
      gridReconnectThreshold: 80,
      peakShavingEnabled: false
    },
    display: {
      refreshInterval: 60,
      theme: 'light',
      language: 'english',
      timezone: 'Asia/Kolkata',
      showPredictions: true,
      compactView: false
    }
  });

  const handleConfigChange = (section: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving configuration
    console.log('Saving configuration:', config);
    setHasChanges(false);
    // In a real app, this would make an API call
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false);
    // In a real app, this would reload from server
  };

  const sections = [
    { id: 'system', label: 'System Parameters', icon: <Settings className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alert Settings', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'energy', label: 'Energy Management', icon: <Zap className="w-5 h-5" /> },
    { id: 'display', label: 'Display Settings', icon: <Info className="w-5 h-5" /> }
  ];

  const renderSystemConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Solar Capacity (kW)
          </label>
          <input
            type="number"
            value={config.system.maxSolarCapacity}
            onChange={(e) => handleConfigChange('system', 'maxSolarCapacity', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Battery Capacity (kWh)
          </label>
          <input
            type="number"
            value={config.system.batteryCapacity}
            onChange={(e) => handleConfigChange('system', 'batteryCapacity', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Load Capacity (kW)
          </label>
          <input
            type="number"
            value={config.system.maxLoadCapacity}
            onChange={(e) => handleConfigChange('system', 'maxLoadCapacity', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Voltage (V)
          </label>
          <select
            value={config.system.systemVoltage}
            onChange={(e) => handleConfigChange('system', 'systemVoltage', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          >
            <option value={12}>12V</option>
            <option value={24}>24V</option>
            <option value={48}>48V</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auto Switch Threshold (%)
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={config.system.autoSwitchThreshold}
            onChange={(e) => handleConfigChange('system', 'autoSwitchThreshold', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">{config.system.autoSwitchThreshold}%</div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={config.system.maintenanceMode}
            onChange={(e) => handleConfigChange('system', 'maintenanceMode', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
            Maintenance Mode
          </label>
        </div>
      </div>
    </div>
  );

  const renderAlertsConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Low Battery Threshold (%)
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={config.alerts.lowBatteryThreshold}
            onChange={(e) => handleConfigChange('alerts', 'lowBatteryThreshold', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">{config.alerts.lowBatteryThreshold}%</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            High Load Threshold (kW)
          </label>
          <input
            type="number"
            value={config.alerts.highLoadThreshold}
            onChange={(e) => handleConfigChange('alerts', 'highLoadThreshold', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature Threshold (°C)
          </label>
          <input
            type="number"
            value={config.alerts.temperatureThreshold}
            onChange={(e) => handleConfigChange('alerts', 'temperatureThreshold', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alert Frequency
          </label>
          <select
            value={config.alerts.alertFrequency}
            onChange={(e) => handleConfigChange('alerts', 'alertFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          >
            <option value="immediate">Immediate</option>
            <option value="5min">Every 5 minutes</option>
            <option value="15min">Every 15 minutes</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailAlerts"
            checked={config.alerts.enableEmailAlerts}
            onChange={(e) => handleConfigChange('alerts', 'enableEmailAlerts', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="emailAlerts" className="text-sm font-medium text-gray-700">
            Enable Email Alerts
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsAlerts"
            checked={config.alerts.enableSMSAlerts}
            onChange={(e) => handleConfigChange('alerts', 'enableSMSAlerts', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="smsAlerts" className="text-sm font-medium text-gray-700">
            Enable SMS Alerts
          </label>
        </div>
      </div>
    </div>
  );

  const renderEnergyConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diesel Auto Start Threshold (%)
          </label>
          <input
            type="range"
            min="10"
            max="40"
            value={config.energy.dieselStartThreshold}
            onChange={(e) => handleConfigChange('energy', 'dieselStartThreshold', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">{config.energy.dieselStartThreshold}%</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grid Reconnect Threshold (%)
          </label>
          <input
            type="range"
            min="60"
            max="95"
            value={config.energy.gridReconnectThreshold}
            onChange={(e) => handleConfigChange('energy', 'gridReconnectThreshold', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">{config.energy.gridReconnectThreshold}%</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="solarTracking"
            checked={config.energy.solarTrackingEnabled}
            onChange={(e) => handleConfigChange('energy', 'solarTrackingEnabled', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="solarTracking" className="text-sm font-medium text-gray-700">
            Enable Solar Tracking
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoLoadShedding"
            checked={config.energy.autoLoadShedding}
            onChange={(e) => handleConfigChange('energy', 'autoLoadShedding', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="autoLoadShedding" className="text-sm font-medium text-gray-700">
            Auto Load Shedding
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="dieselAutoStart"
            checked={config.energy.dieselAutoStart}
            onChange={(e) => handleConfigChange('energy', 'dieselAutoStart', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="dieselAutoStart" className="text-sm font-medium text-gray-700">
            Diesel Auto Start
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="peakShaving"
            checked={config.energy.peakShavingEnabled}
            onChange={(e) => handleConfigChange('energy', 'peakShavingEnabled', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="peakShaving" className="text-sm font-medium text-gray-700">
            Peak Shaving
          </label>
        </div>
      </div>
    </div>
  );

  const renderDisplayConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Refresh Interval (seconds)
          </label>
          <select
            value={config.display.refreshInterval}
            onChange={(e) => handleConfigChange('display', 'refreshInterval', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          >
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
            <option value={600}>10 minutes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={config.display.theme}
            onChange={(e) => handleConfigChange('display', 'theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={config.display.language}
            onChange={(e) => handleConfigChange('display', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="odia">Odia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={config.display.timezone}
            onChange={(e) => handleConfigChange('display', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPredictions"
            checked={config.display.showPredictions}
            onChange={(e) => handleConfigChange('display', 'showPredictions', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="showPredictions" className="text-sm font-medium text-gray-700">
            Show Predictions
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="compactView"
            checked={config.display.compactView}
            onChange={(e) => handleConfigChange('display', 'compactView', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="compactView" className="text-sm font-medium text-gray-700">
            Compact View
          </label>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'system':
        return renderSystemConfig();
      case 'alerts':
        return renderAlertsConfig();
      case 'energy':
        return renderEnergyConfig();
      case 'display':
        return renderDisplayConfig();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#0f3057] mb-2">System Configuration</h2>
            <p className="text-gray-600">Manage system parameters and settings</p>
          </div>
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
            )}
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                hasChanges
                  ? 'bg-[#0f3057] hover:bg-[#0d2847] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#0f3057] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.icon}
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Configuration Content */}
        <div className="col-span-3 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {sections.find(s => s.id === activeSection)?.label}
          </h3>
          {renderSectionContent()}
        </div>
      </div>

      {/* Current System Status */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current System Status</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Sun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Solar Generation</p>
            <p className="text-xl font-bold text-orange-600">{liveData.solarGeneration.toFixed(2)} kW</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Battery className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Battery Charge</p>
            <p className="text-xl font-bold text-green-600">{liveData.batteryCharge}%</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Power Quality</p>
            <p className="text-xl font-bold text-blue-600">{liveData.powerQuality.toFixed(1)}%</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">System Health</p>
            <p className="text-xl font-bold text-purple-600">{liveData.systemHealth}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;