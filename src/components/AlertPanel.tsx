import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success';
  message: string;
  time: Date;
}

interface AlertPanelProps {
  alerts: Alert[];
  compact?: boolean;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, compact = false }) => {
  const { currentLanguage } = useLanguage();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#f39c12]" />;
      case 'info':
        return <Info className="w-4 h-4 text-[#3498db]" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-[#2ecc71]" />;
      default:
        return <Info className="w-4 h-4 text-white/50" />;
    }
  };

  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-[#f39c12] bg-[#f39c12]/10';
      case 'info':
        return 'border-l-[#3498db] bg-[#3498db]/10';
      case 'success':
        return 'border-l-[#2ecc71] bg-[#2ecc71]/10';
      default:
        return 'border-l-white/50 bg-white/5';
    }
  };

  return (
    <GlassCard className={compact ? '' : 'h-full'}>
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">{getTranslation('liveAlerts', currentLanguage)}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className={`space-y-4 overflow-y-auto ${compact ? 'max-h-64' : 'max-h-96'}`}>
          {alerts.length === 0 ? (
            <p className="text-white/50 text-center py-8">No recent alerts</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${getAlertBorder(alert.type)} transition-all duration-300`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {alert.message}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-white/60">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{alert.time.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default AlertPanel;