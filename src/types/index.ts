export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface MicrogridSite {
  id: string;
  name: string;
  coordinates: [number, number];
  status: 'good' | 'warning' | 'critical';
  energyGenerated: number;
  batteryLevel: number;
  lastUpdate: Date;
}

export interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  category: 'system' | 'weather' | 'energy' | 'maintenance';
  message: string;
  time: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  location?: string;
}

export interface LiveData {
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
}

export interface ScenarioResult {
  scenario: string;
  energyImpact: number;
  batteryImpact: number;
  dieselHours: number;
  recommendation: string;
}

export interface DiagnosticLog {
  id: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error';
  component: string;
  diagnosis: string;
  recommendation?: string;
}