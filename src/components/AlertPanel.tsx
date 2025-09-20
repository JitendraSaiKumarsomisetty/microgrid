import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

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
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-orange-400 bg-orange-50';
      case 'info':
        return 'border-l-blue-400 bg-blue-50';
      case 'success':
        return 'border-l-green-400 bg-green-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${compact ? '' : 'h-full'}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-[#0f3057]" />
          <h3 className="text-lg font-semibold text-gray-900">Live Alerts</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className={`space-y-4 overflow-y-auto ${compact ? 'max-h-64' : 'max-h-96'}`}>
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent alerts</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${getAlertBorder(alert.type)} transition-all duration-300`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.message}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
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
    </div>
  );
};

export default AlertPanel;