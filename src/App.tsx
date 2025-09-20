import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Bell, 
  Settings,
  Sun,
  Battery,
  Zap,
  Activity
} from 'lucide-react';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import HistoricalAnalytics from './components/HistoricalAnalytics';
import AlertsCenter from './components/AlertsCenter';
import Configuration from './components/Configuration';

type TabType = 'dashboard' | 'forecasting' | 'analytics' | 'alerts' | 'config';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  category: 'system' | 'weather' | 'energy' | 'maintenance';
  message: string;
  time: Date;
  status: 'active' | 'acknowledged' | 'resolved';
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState<Alert[]>([
    { 
      id: 1, 
      type: 'info', 
      category: 'system',
      message: 'System running optimally', 
      time: new Date(), 
      status: 'active' 
    },
    { 
      id: 2, 
      type: 'success', 
      category: 'energy',
      message: 'Solar panels adjusted to optimal angle', 
      time: new Date(Date.now() - 300000), 
      status: 'active' 
    }
  ]);

  // Simulated real-time data
  const [liveData, setLiveData] = useState({
    solarGeneration: 4.25,
    energyConsumed: 3.10,
    batteryCharge: 78,
    solarAzimuth: 145,
    solarTilt: 45,
    carbonSavings: 245,
    financialSavings: 1850,
    systemHealth: 92,
    dieselStatus: 'Offline',
    dieselRuntime: 2.1,
    dieselFuel: 65,
    gridConnection: 'Disconnected',
    powerQuality: 98.5,
    efficiency: 94.2
  });

  // Auto-refresh data every 60 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate data fluctuations
      setLiveData(prev => ({
        ...prev,
        solarGeneration: Math.max(0, 4.25 + (Math.random() - 0.5) * 1.5),
        energyConsumed: Math.max(0, 3.10 + (Math.random() - 0.5) * 0.8),
        batteryCharge: Math.max(15, Math.min(95, prev.batteryCharge + (Math.random() - 0.5) * 3)),
        carbonSavings: prev.carbonSavings + Math.random() * 2,
        financialSavings: prev.financialSavings + Math.random() * 10,
        systemHealth: Math.max(85, Math.min(98, prev.systemHealth + (Math.random() - 0.5) * 2)),
        powerQuality: Math.max(95, Math.min(100, prev.powerQuality + (Math.random() - 0.5) * 1)),
        efficiency: Math.max(90, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 1))
      }));

      // Generate random alerts
      if (Math.random() < 0.15) {
        const alertTypes = [
          { type: 'info', category: 'system', message: 'Battery charge level optimal' },
          { type: 'success', category: 'energy', message: 'Peak solar generation detected' },
          { type: 'info', category: 'system', message: 'Community load balanced successfully' },
          { type: 'warning', category: 'weather', message: 'Cloud cover increasing, generation may decrease' },
          { type: 'info', category: 'energy', message: 'Energy storage at recommended level' }
        ];
        
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const newAlert: Alert = {
          id: Date.now(),
          type: randomAlert.type as any,
          category: randomAlert.category as any,
          message: randomAlert.message,
          time: new Date(),
          status: 'active'
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleControlAction = (action: string) => {
    const newAlert: Alert = {
      id: Date.now(),
      type: 'warning',
      category: 'system',
      message: `${action} initiated by operator`,
      time: new Date(),
      status: 'active'
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
  };

  const updateAlertStatus = (alertId: number, status: 'acknowledged' | 'resolved') => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status } : alert
    ));
  };

  if (!isAuthenticated) {
    return <LoginModal onLogin={handleLogin} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'forecasting', label: 'Forecasting', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'analytics', label: 'Historical Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alerts Center', icon: <Bell className="w-5 h-5" /> },
    { id: 'config', label: 'Configuration', icon: <Settings className="w-5 h-5" /> }
  ];

  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            liveData={liveData} 
            currentTime={currentTime}
            onControlAction={handleControlAction}
            recentAlerts={alerts.slice(0, 5)}
          />
        );
      case 'forecasting':
        return <Forecasting />;
      case 'analytics':
        return <HistoricalAnalytics />;
      case 'alerts':
        return (
          <AlertsCenter 
            alerts={alerts} 
            onUpdateStatus={updateAlertStatus}
          />
        );
      case 'config':
        return <Configuration liveData={liveData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#0f3057]">
                Odisha Microgrid Intelligence Platform
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Last updated: {currentTime.toLocaleTimeString()} | System Status: Operational
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Sun className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">{liveData.solarGeneration.toFixed(2)} kW</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Battery className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">{liveData.batteryCharge}%</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{liveData.systemHealth}%</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Community Operator</div>
                <div className="font-semibold text-[#0f3057]">Admin Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#0f3057] text-[#0f3057]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'alerts' && activeAlerts > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                    {activeAlerts}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;