import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  Clock,
  Filter,
  Search,
  Eye,
  Check,
  X
} from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  category: 'system' | 'weather' | 'energy' | 'maintenance';
  message: string;
  time: Date;
  status: 'active' | 'acknowledged' | 'resolved';
}

interface AlertsCenterProps {
  alerts: Alert[];
  onUpdateStatus: (alertId: number, status: 'acknowledged' | 'resolved') => void;
}

const AlertsCenter: React.FC<AlertsCenterProps> = ({ alerts, onUpdateStatus }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
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
      case 'error':
        return 'border-l-red-400 bg-red-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Active</span>;
      case 'acknowledged':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Acknowledged</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Resolved</span>;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system':
        return 'bg-blue-100 text-blue-800';
      case 'weather':
        return 'bg-purple-100 text-purple-800';
      case 'energy':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || alert.category === filterCategory;
    const matchesSearch = searchTerm === '' || 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesCategory && matchesSearch;
  });

  // Statistics
  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    critical: alerts.filter(a => a.type === 'error').length,
    warnings: alerts.filter(a => a.type === 'warning').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f3057] to-[#f39c12] bg-clip-text text-transparent mb-2">
              Alert Management
            </h2>
            <p className="text-gray-600">Complete log of all alerts, filterable by date, severity, and location</p>
          </div>
          <Bell className="w-8 h-8 text-[#0f3057]" />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-6 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Alerts</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{stats.acknowledged}</p>
            <p className="text-sm text-gray-600">Acknowledged</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <div className="text-center p-3 bg-red-100 rounded-lg">
            <p className="text-2xl font-bold text-red-700">{stats.critical}</p>
            <p className="text-sm text-gray-600">Critical</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{stats.warnings}</p>
            <p className="text-sm text-gray-600">Warnings</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="error">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="system">System</option>
              <option value="weather">Weather</option>
              <option value="energy">Energy</option>
              <option value="maintenance">Maintenance</option>
              <option value="financial">Financial</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Location:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Rourkela">Rourkela</option>
              <option value="Puri">Puri</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Alert Log ({filteredAlerts.length} alerts)
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No alerts match the current filters
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  selectedAlert?.id === alert.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(alert.category)}`}>
                          {alert.category.toUpperCase()}
                        </span>
                        {alert.location && (
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                            {alert.location}
                          </span>
                        )}
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {alert.message}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{alert.time.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {alert.status === 'active' && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(alert.id, 'acknowledged')}
                          className="p-1 text-yellow-500 hover:text-yellow-600 transition-colors"
                          title="Acknowledge"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onUpdateStatus(alert.id, 'resolved')}
                          className="p-1 text-green-500 hover:text-green-600 transition-colors"
                          title="Resolve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    {alert.status === 'acknowledged' && (
                      <button
                        onClick={() => onUpdateStatus(alert.id, 'resolved')}
                        className="p-1 text-green-500 hover:text-green-600 transition-colors"
                        title="Resolve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {selectedAlert?.id === alert.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Alert Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Alert ID:</span>
                        <span className="ml-2 font-mono">{alert.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 capitalize">{alert.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 capitalize">{alert.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 capitalize">{alert.status}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Timestamp:</span>
                        <span className="ml-2">{alert.time.toISOString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsCenter;