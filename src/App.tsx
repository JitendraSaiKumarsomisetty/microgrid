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
  RefreshCw,
  Home,
  IndianRupee,
  Gauge
} from 'lucide-react';
import { Alert, LiveData } from './types';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [gridSellRate, setGridSellRate] = useState(4.5); // ₹/kWh
  const [alerts, setAlerts] = useState<Alert[]>([
    { 
      id: 1, 
      type: 'info', 
      category: 'system',
      message: 'System running optimally across all sites', 
      time: new Date(), 
      status: 'active',
      location: 'Bhubaneswar'
    },
    { 
      id: 2, 
      type: 'success', 
      category: 'energy',
      message: 'Peak solar generation achieved at Rourkela site', 
      time: new Date(Date.now() - 300000), 
      status: 'active',
      location: 'Rourkela'
    },
    { 
      id: 3, 
      type: 'warning', 
      category: 'maintenance',
      message: 'Battery maintenance scheduled for Puri site', 
      time: new Date(Date.now() - 600000), 
      status: 'active',
      location: 'Puri'
    }
  ]);

  // Enhanced live data with financial metrics
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
    gridConnection: 'Connected',
    powerQuality: 98.5,
    efficiency: 94.2,
    energySoldToGrid: 1.15,
    totalRevenue: 5.18,
    dailyRevenue: 125.50,
    monthlyRevenue: 3765.00
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentTime(new Date());
    setLiveData(prev => ({
      ...prev,
      solarGeneration: Math.max(0, 4.25 + (Math.random() - 0.5) * 2),
      energyConsumed: Math.max(0, 3.10 + (Math.random() - 0.5) * 1),
      batteryCharge: Math.max(15, Math.min(95, prev.batteryCharge + (Math.random() - 0.5) * 5)),
      systemHealth: Math.max(85, Math.min(98, prev.systemHealth + (Math.random() - 0.5) * 3)),
      powerQuality: Math.max(95, Math.min(100, prev.powerQuality + (Math.random() - 0.5) * 2)),
      efficiency: Math.max(90, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
      energySoldToGrid: Math.max(0, prev.energySoldToGrid + (Math.random() - 0.5) * 0.3),
      totalRevenue: prev.totalRevenue + Math.random() * 0.5,
      dailyRevenue: prev.dailyRevenue + Math.random() * 10,
      monthlyRevenue: prev.monthlyRevenue + Math.random() * 50
    }));
    
    setIsRefreshing(false);
  };

  // Auto-refresh data every 60 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      setLiveData(prev => ({
        ...prev,
        solarGeneration: Math.max(0, 4.25 + (Math.random() - 0.5) * 1.5),
        energyConsumed: Math.max(0, 3.10 + (Math.random() - 0.5) * 0.8),
        batteryCharge: Math.max(15, Math.min(95, prev.batteryCharge + (Math.random() - 0.5) * 3)),
        carbonSavings: prev.carbonSavings + Math.random() * 2,
        financialSavings: prev.financialSavings + Math.random() * 10,
        systemHealth: Math.max(85, Math.min(98, prev.systemHealth + (Math.random() - 0.5) * 2)),
        powerQuality: Math.max(95, Math.min(100, prev.powerQuality + (Math.random() - 0.5) * 1)),
        efficiency: Math.max(90, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 1)),
        energySoldToGrid: Math.max(0, prev.energySoldToGrid + (Math.random() - 0.5) * 0.2),
        totalRevenue: prev.totalRevenue + Math.random() * 0.3,
        dailyRevenue: prev.dailyRevenue + Math.random() * 5,
        monthlyRevenue: prev.monthlyRevenue + Math.random() * 25
      }));

      // Generate random alerts with locations
      if (Math.random() < 0.15) {
        const locations = ['Bhubaneswar', 'Rourkela', 'Puri', 'Hyderabad', 'Bangalore'];
        const alertTypes = [
          { type: 'info', category: 'system', message: 'Battery charge level optimal' },
          { type: 'success', category: 'energy', message: 'Peak solar generation detected' },
          { type: 'info', category: 'system', message: 'Grid synchronization successful' },
          { type: 'warning', category: 'weather', message: 'Cloud cover increasing, generation may decrease' },
          { type: 'info', category: 'energy', message: 'Energy storage at recommended level' },
          { type: 'success', category: 'financial', message: 'Daily revenue target achieved' }
        ];
        
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const newAlert: Alert = {
          id: Date.now(),
          type: randomAlert.type as any,
          category: randomAlert.category as any,
          message: randomAlert.message,
          time: new Date(),
          status: 'active',
          location: randomLocation
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
      status: 'active',
      location: 'Control Center'
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
    { id: 'indiaMap', label: 'India Map', icon: <Map className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'forecasting', label: 'Forecasting', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
    { id: 'scenarios', label: 'Scenarios', icon: <Play className="w-5 h-5" /> },
    { id: 'diagnostics', label: 'Diagnostics', icon: <Terminal className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" /> },
    { id: 'config', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
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
            gridSellRate={gridSellRate}
          />
        );
      case 'forecasting':
        return <Forecasting />;
      case 'analytics':
        return <HistoricalAnalytics gridSellRate={gridSellRate} />;
      case 'alerts':
        return (
          <AlertsCenter 
            alerts={alerts} 
            onUpdateStatus={updateAlertStatus}
          />
        );
      case 'config':
        return (
          <Configuration 
            liveData={liveData} 
            gridSellRate={gridSellRate}
            onGridSellRateChange={setGridSellRate}
          />
        );
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
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6f9] to-[#e8f4f8]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#0f3057] via-[#2ecc71] to-[#f39c12] rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0f3057] to-[#2ecc71] bg-clip-text text-transparent">
                  GridVision India
                </h1>
                <p className="text-gray-600 text-sm font-medium">
                  Advanced Microgrid Monitoring & Financial Analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 rounded-xl text-gray-700 transition-all duration-300 hover:scale-105 shadow-lg ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'loading-spinner' : ''}`} />
                <span className="font-medium">Refresh</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm bg-gradient-to-r from-[#f39c12]/20 to-[#f39c12]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#f39c12]/20">
                  <Sun className="w-5 h-5 text-[#f39c12]" />
                  <span className="text-gray-700 font-semibold">{liveData.solarGeneration.toFixed(2)} kW</span>
                </div>
                <div className="flex items-center space-x-2 text-sm bg-gradient-to-r from-[#2ecc71]/20 to-[#2ecc71]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#2ecc71]/20">
                  <Battery className="w-5 h-5 text-[#2ecc71]" />
                  <span className="text-gray-700 font-semibold">{liveData.batteryCharge}%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm bg-gradient-to-r from-[#0f3057]/20 to-[#0f3057]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#0f3057]/20">
                  <Activity className="w-5 h-5 text-[#0f3057]" />
                  <span className="text-gray-700 font-semibold">{liveData.systemHealth}%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm bg-gradient-to-r from-purple-500/20 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-500/20">
                  <IndianRupee className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700 font-semibold">₹{liveData.dailyRevenue.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-3 font-semibold text-sm transition-all duration-300 whitespace-nowrap hover:scale-105 ${
                  activeTab === tab.id
                    ? 'border-[#0f3057] text-[#0f3057] bg-gradient-to-t from-[#0f3057]/10 to-transparent'
                    : 'border-transparent text-gray-600 hover:text-[#0f3057] hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'alerts' && activeAlerts > 0 && (
                  <span className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white text-xs rounded-full px-2 py-0.5 ml-2 animate-pulse shadow-lg">
                    {activeAlerts}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;