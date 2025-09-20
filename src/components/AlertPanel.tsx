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
        return <AlertTriangle className="w-4 h-4 text-[#f39c12]" />;
      case 'info':
        return <Info className="w-4 h-4 text-[#3498db]" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-[#2ecc71]" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 hover-lift ${compact ? '' : 'h-full'}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-[#0f3057]" />
          <h3 className="text-lg font-semibold text-gray-900">Live Alerts</h3>
          {alerts.length > 0 && (
            <span className="bg-[#f39c12] text-white text-xs rounded-full px-2 py-1">
              {alerts.length}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className={`space-y-4 overflow-y-auto ${compact ? 'max-h-64' : 'max-h-96'}`}>
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-gray-500">No recent alerts</p>
              <p className="text-sm text-gray-400">System running smoothly</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${getAlertBg(alert.type)}`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {alert.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
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