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
  Activity,
  Map,
  Play,
  Terminal,
  Users,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import { getTranslation } from './utils/translations';
import { Alert, LiveData } from './types';
import LanguageSwitcher from './components/LanguageSwitcher';
import GlassCard from './components/GlassCard';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import HistoricalAnalytics from './components/HistoricalAnalytics';
import AlertsCenter from './components/AlertsCenter';
import Configuration from './components/Configuration';
import IndiaMap from './components/IndiaMap';
import ScenarioSimulator from './components/ScenarioSimulator';
import AdvancedDiagnostics from './components/AdvancedDiagnostics';
import CommunityPortal from './components/CommunityPortal';

type TabType = 'dashboard' | 'forecasting' | 'analytics' | 'alerts' | 'config' | 'indiaMap' | 'scenarios' | 'diagnostics' | 'community';

function App() {
  const { currentLanguage } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
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
  const [liveData, setLiveData] = useState<LiveData>({
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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate data refresh with animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update all data with new values
    setCurrentTime(new Date());
    setLiveData(prev => ({
      ...prev,
      solarGeneration: Math.max(0, 4.25 + (Math.random() - 0.5) * 2),
      energyConsumed: Math.max(0, 3.10 + (Math.random() - 0.5) * 1),
      batteryCharge: Math.max(15, Math.min(95, prev.batteryCharge + (Math.random() - 0.5) * 5)),
      systemHealth: Math.max(85, Math.min(98, prev.systemHealth + (Math.random() - 0.5) * 3)),
      powerQuality: Math.max(95, Math.min(100, prev.powerQuality + (Math.random() - 0.5) * 2)),
      efficiency: Math.max(90, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2))
    }));
    
    setIsRefreshing(false);
  };

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
    { id: 'dashboard', label: getTranslation('dashboard', currentLanguage), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'forecasting', label: getTranslation('forecasting', currentLanguage), icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'analytics', label: getTranslation('analytics', currentLanguage), icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'alerts', label: getTranslation('alerts', currentLanguage), icon: <Bell className="w-5 h-5" /> },
    { id: 'indiaMap', label: getTranslation('indiaMap', currentLanguage), icon: <Map className="w-5 h-5" /> },
    { id: 'scenarios', label: getTranslation('scenarios', currentLanguage), icon: <Play className="w-5 h-5" /> },
    { id: 'diagnostics', label: getTranslation('diagnostics', currentLanguage), icon: <Terminal className="w-5 h-5" /> },
    { id: 'community', label: getTranslation('community', currentLanguage), icon: <Users className="w-5 h-5" /> },
    { id: 'config', label: getTranslation('config', currentLanguage), icon: <Settings className="w-5 h-5" /> }
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
      case 'indiaMap':
        return <IndiaMap />;
      case 'scenarios':
        return <ScenarioSimulator />;
      case 'diagnostics':
        return <AdvancedDiagnostics />;
      case 'community':
        return <CommunityPortal />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(135deg, #0f3057 0%, #0a5c36 50%, #1e5f99 100%),
          url('https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f3057]/90 via-[#0a5c36]/85 to-[#1e5f99]/90" />
      
      <div className="relative z-10">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {getTranslation('title', currentLanguage)}
              </h1>
              <p className="text-white/80">
                {getTranslation('subtitle', currentLanguage)}
              </p>
              <p className="text-sm text-white/60 mt-2">
                {getTranslation('lastUpdated', currentLanguage)}: {currentTime.toLocaleTimeString()} | 
                {getTranslation('systemStatus', currentLanguage)}: {getTranslation('operational', currentLanguage)}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300 ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{getTranslation('refresh', currentLanguage)}</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Sun className="w-4 h-4 text-[#f39c12]" />
                  <span className="text-white/80">{liveData.solarGeneration.toFixed(2)} {getTranslation('kw', currentLanguage)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Battery className="w-4 h-4 text-[#2ecc71]" />
                  <span className="text-white/80">{liveData.batteryCharge}{getTranslation('percent', currentLanguage)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Activity className="w-4 h-4 text-[#3498db]" />
                  <span className="text-white/80">{liveData.systemHealth}{getTranslation('percent', currentLanguage)}</span>
                </div>
              </div>
              
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-white text-white bg-white/10'
                    : 'border-transparent text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'alerts' && activeAlerts > 0 && (
                  <span className="bg-[#e74c3c] text-white text-xs rounded-full px-2 py-0.5 ml-2 animate-pulse">
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
    </div>
  );
}

export default App;