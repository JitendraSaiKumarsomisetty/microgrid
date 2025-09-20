import React, { useEffect, useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { Alert } from '../types';

interface LiveAlertFeedProps {
  alerts: Alert[];
}

const LiveAlertFeed: React.FC<LiveAlertFeedProps> = ({ alerts }) => {
  const [displayAlerts, setDisplayAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Show only the most recent 5 active alerts
    const recentAlerts = alerts
      .filter(alert => alert.status === 'active')
      .slice(0, 5);
    setDisplayAlerts(recentAlerts);
  }, [alerts]);

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

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-2 mb-4">
        <Bell className="w-5 h-5 text-[#0f3057]" />
        <h3 className="text-lg font-semibold text-gray-900">Live Alert Feed</h3>
        {displayAlerts.length > 0 && (
          <span className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white text-xs rounded-full px-2 py-1 animate-pulse">
            {displayAlerts.length}
          </span>
        )}
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {displayAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">All Systems Normal</p>
            <p className="text-sm text-gray-400">No active alerts</p>
          </div>
        ) : (
          displayAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-3 rounded-lg border border-gray-100 bg-gradient-to-r from-white/50 to-gray-50/50 hover:shadow-md transition-all duration-300 animate-fadeIn"
            >
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {alert.location || 'System'}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{alert.time.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {displayAlerts.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Showing {displayAlerts.length} most recent alerts
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveAlertFeed;