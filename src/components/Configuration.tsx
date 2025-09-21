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
  Info,
  User,
  Mail,
  Phone,
  DollarSign
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
    energySoldToGrid: number;
    totalRevenue: number;
    dailyRevenue: number;
    monthlyRevenue: number;
  };
  gridSellRate: number;
  onGridSellRateChange: (rate: number) => void;
}

const Configuration: React.FC<ConfigurationProps> = ({ 
  liveData, 
  gridSellRate, 
  onGridSellRateChange 
}) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [hasChanges, setHasChanges] = useState(false);
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'Admin User',
    email: 'admin@gridvision.in',
    phone: '+91 9876543210'
  });

  // Alert preferences state
  const [alertPreferences, setAlertPreferences] = useState({
    emailAlerts: true,
    smsAlerts: false,
    criticalAlertsOnly: false
  });

  const handleProfileChange = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleAlertChange = (field: string, value: boolean) => {
    setAlertPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleGridSellRateChange = (value: number) => {
    onGridSellRateChange(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving configuration
    console.log('Saving configuration:', { userProfile, alertPreferences, gridSellRate });
    setHasChanges(false);
    // In a real app, this would make an API call
  };

  const handleReset = () => {
    // Reset to default values
    setUserProfile({
      name: 'Admin User',
      email: 'admin@gridvision.in',
      phone: '+91 9876543210'
    });
    setAlertPreferences({
      emailAlerts: true,
      smsAlerts: false,
      criticalAlertsOnly: false
    });
    setHasChanges(false);
  };

  const sections = [
    { id: 'profile', label: 'User Profile', icon: <User className="w-5 h-5" /> },
    { id: 'financial', label: 'Financial Configuration', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alert Preferences', icon: <AlertTriangle className="w-5 h-5" /> }
  ];

  const renderProfileConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#0f3057] mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-[#333333] focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#0f3057] mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-[#333333] focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#0f3057] mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-[#333333] focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSave}
        disabled={!hasChanges}
        className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
          hasChanges
            ? 'bg-[#0f3057] hover:bg-[#0d2847] text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <Save className="w-5 h-5" />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const renderFinancialConfig = () => (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-[#0f3057] mb-3">Grid Sell Rate Configuration</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0f3057] mb-2">
              Grid Sell Rate (₹/kWh)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={gridSellRate}
              onChange={(e) => handleGridSellRateChange(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-[#333333] focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            />
            <p className="text-xs text-[#666666] mt-1">Rate at which energy is sold to the grid</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0f3057] mb-2">
              Current Revenue Rate
            </label>
            <div className="px-3 py-2 bg-gray-100 rounded-lg">
              <span className="text-lg font-bold text-green-600">
                ₹{(liveData.energySoldToGrid * gridSellRate).toFixed(2)}/hour
              </span>
            </div>
            <p className="text-xs text-[#666666] mt-1">Based on current grid sales</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-[#0f3057] font-medium mb-1">Daily Revenue</p>
          <p className="text-2xl font-bold text-green-600">₹{liveData.dailyRevenue.toFixed(0)}</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-[#0f3057] font-medium mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-blue-600">₹{liveData.monthlyRevenue.toFixed(0)}</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-[#0f3057] font-medium mb-1">Energy Sold</p>
          <p className="text-2xl font-bold text-purple-600">{liveData.energySoldToGrid.toFixed(1)} kWh</p>
        </div>
      </div>
    </div>
  );

  const renderAlertsConfig = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-[#0f3057]">Email Alerts</h4>
            <p className="text-sm text-[#666666]">Receive alerts via email notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alertPreferences.emailAlerts}
              onChange={(e) => handleAlertChange('emailAlerts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f3057]"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-[#0f3057]">SMS Alerts</h4>
            <p className="text-sm text-[#666666]">Receive alerts via SMS messages</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alertPreferences.smsAlerts}
              onChange={(e) => handleAlertChange('smsAlerts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f3057]"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-[#0f3057]">Critical Alerts Only</h4>
            <p className="text-sm text-[#666666]">Only receive high-priority system alerts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alertPreferences.criticalAlertsOnly}
              onChange={(e) => handleAlertChange('criticalAlertsOnly', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f3057]"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileConfig();
      case 'financial':
        return renderFinancialConfig();
      case 'alerts':
        return renderAlertsConfig();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#0f3057] mb-2">
              System Settings
            </h2>
            <p className="text-[#333333]">Manage your profile, financial settings, and alert preferences</p>
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#0f3057] text-white'
                    : 'text-[#333333] hover:bg-gray-100'
                }`}
              >
                {section.icon}
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Configuration Content */}
        <div className="col-span-3 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-[#0f3057] mb-6">
            {sections.find(s => s.id === activeSection)?.label}
          </h3>
          
          {renderSectionContent()}
        </div>
      </div>

      {/* Current System Status */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-[#0f3057] mb-4">Current System Status</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Sun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-[#666666]">Solar Generation</p>
            <p className="text-xl font-bold text-orange-600">{liveData.solarGeneration.toFixed(2)} kW</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Battery className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-[#666666]">Battery Charge</p>
            <p className="text-xl font-bold text-green-600">{liveData.batteryCharge}%</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-[#666666]">Power Quality</p>
            <p className="text-xl font-bold text-blue-600">{liveData.powerQuality.toFixed(1)}%</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-[#666666]">System Health</p>
            <p className="text-xl font-bold text-purple-600">{liveData.systemHealth}%</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-sm text-[#666666]">Daily Revenue</p>
            <p className="text-xl font-bold text-indigo-600">₹{liveData.dailyRevenue.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;