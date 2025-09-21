import React, { useState, useEffect } from 'react';
import { Terminal, AlertTriangle, Info, CheckCircle, Search, Filter, Download } from 'lucide-react';
import { DiagnosticLog } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

const AdvancedDiagnostics: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [logs, setLogs] = useState<DiagnosticLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<DiagnosticLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [componentFilter, setComponentFilter] = useState<string>('all');

  // Generate mock diagnostic logs
  useEffect(() => {
    const generateLogs = () => {
      const components = ['Solar Panels', 'Battery Bank', 'Inverter', 'Grid Connection', 'Load Controller', 'Monitoring System'];
      const diagnoses = [
        {
          severity: 'warning' as const,
          component: 'Solar Panels',
          diagnosis: 'Likely shading detected on Panel Group B - 15% reduction in expected output',
          recommendation: 'Check for obstructions or debris on panels in Group B'
        },
        {
          severity: 'error' as const,
          component: 'Battery Bank',
          diagnosis: 'Battery cell imbalance detected - Cell 3 voltage 0.2V below average',
          recommendation: 'Schedule battery maintenance and cell balancing procedure'
        },
        {
          severity: 'info' as const,
          component: 'Inverter',
          diagnosis: 'Inverter operating at 94% efficiency - within normal parameters',
          recommendation: 'Continue monitoring, no action required'
        },
        {
          severity: 'warning' as const,
          component: 'Grid Connection',
          diagnosis: 'Grid voltage fluctuation detected - 5% variance from nominal',
          recommendation: 'Monitor grid stability, consider voltage regulation'
        },
        {
          severity: 'error' as const,
          component: 'Load Controller',
          diagnosis: 'Load shedding relay stuck in open position for Zone 3',
          recommendation: 'Replace faulty relay in Load Controller Zone 3'
        },
        {
          severity: 'info' as const,
          component: 'Monitoring System',
          diagnosis: 'Communication latency increased by 200ms - still within acceptable range',
          recommendation: 'Monitor network performance, consider optimization'
        },
        {
          severity: 'warning' as const,
          component: 'Solar Panels',
          diagnosis: 'Dust accumulation detected - 8% reduction in panel efficiency',
          recommendation: 'Schedule panel cleaning within next 48 hours'
        },
        {
          severity: 'info' as const,
          component: 'Battery Bank',
          diagnosis: 'Battery temperature optimal at 25°C - charging efficiency at peak',
          recommendation: 'Continue current thermal management strategy'
        }
      ];

      return diagnoses.map((diag, index) => ({
        id: `log-${index}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Random time in last 7 days
        severity: diag.severity,
        component: diag.component,
        diagnosis: diag.diagnosis,
        recommendation: diag.recommendation
      })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    setLogs(generateLogs());
  }, []);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.component.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(log => log.severity === severityFilter);
    }

    if (componentFilter !== 'all') {
      filtered = filtered.filter(log => log.component === componentFilter);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, severityFilter, componentFilter]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-[#e74c3c]" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#f39c12]" />;
      case 'info':
        return <Info className="w-5 h-5 text-[#3498db]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#2ecc71]" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'border-l-[#e74c3c] bg-red-500/10';
      case 'warning':
        return 'border-l-[#f39c12] bg-yellow-500/10';
      case 'info':
        return 'border-l-[#3498db] bg-blue-500/10';
      default:
        return 'border-l-[#2ecc71] bg-green-500/10';
    }
  };

  const components = [...new Set(logs.map(log => log.component))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#0f3057] mb-2">
              {getTranslation('diagnostics', currentLanguage)}
            </h2>
            <p className="text-[#333333]">
              Intelligent system diagnostics with AI-powered fault analysis
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#0f3057] hover:bg-[#0d2847] border border-[#0f3057] rounded-lg text-white transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Export Logs</span>
            </button>
            <div className="flex items-center space-x-2 text-[#333333]">
              <Terminal className="w-5 h-5" />
              <span>{filteredLogs.length} entries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search diagnostics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[#333333] placeholder-gray-500 focus:bg-white focus:border-[#0f3057] transition-all duration-300"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#666666]" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[#333333] focus:bg-white focus:border-[#0f3057] transition-all duration-300"
            >
              <option value="all">All Severities</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[#666666] text-sm">Component:</span>
            <select
              value={componentFilter}
              onChange={(e) => setComponentFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[#333333] focus:bg-white focus:border-[#0f3057] transition-all duration-300"
            >
              <option value="all">All Components</option>
              {components.map(component => (
                <option key={component} value={component}>{component}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#e74c3c] mb-1">
            {logs.filter(log => log.severity === 'error').length}
          </div>
          <div className="text-[#666666] text-sm">Critical Issues</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#f39c12] mb-1">
            {logs.filter(log => log.severity === 'warning').length}
          </div>
          <div className="text-[#666666] text-sm">Warnings</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#3498db] mb-1">
            {logs.filter(log => log.severity === 'info').length}
          </div>
          <div className="text-[#666666] text-sm">Info Messages</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#0f3057] mb-1">
            {components.length}
          </div>
          <div className="text-[#666666] text-sm">Components</div>
        </div>
      </div>

      {/* Diagnostic Logs */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-bold text-[#0f3057] mb-4">Diagnostic Console</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-[#666666]">
              No diagnostic entries match the current filters
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border-l-4 ${getSeverityColor(log.severity)} transition-all duration-300 hover:bg-gray-50`}
              >
                <div className="flex items-start space-x-3">
                  {getSeverityIcon(log.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#0f3057] font-medium">{log.component}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-[#666666]">
                          {log.severity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[#666666] text-sm">
                        {log.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[#333333] mb-2">{log.diagnosis}</p>
                    {log.recommendation && (
                      <div className="flex items-start space-x-2 mt-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 text-[#2ecc71] flex-shrink-0 mt-0.5" />
                        <p className="text-[#333333] text-sm">{log.recommendation}</p>
                      </div>
                    )}
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

export default AdvancedDiagnostics;