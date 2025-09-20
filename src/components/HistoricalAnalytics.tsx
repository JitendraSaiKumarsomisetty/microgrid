import React, { useState } from 'react';
import { 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const HistoricalAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last Week');
  const [selectedMetric, setSelectedMetric] = useState('energy');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const generateHistoricalData = (period: string) => {
    const days = period === 'Today' ? 24 : period === 'Last Week' ? 7 : 30;
    const isHourly = period === 'Today';
    
    return Array.from({ length: days }, (_, i) => {
      const baseGenerated = isHourly ? 
        (i >= 6 && i <= 18 ? 20 + 40 * Math.sin((i - 6) * Math.PI / 12) : 0) :
        30 + Math.random() * 40;
      
      const baseConsumed = isHourly ?
        15 + 10 * Math.sin((i - 8) * Math.PI / 16) + Math.random() * 5 :
        20 + Math.random() * 20;

      return {
        label: isHourly ? `${i.toString().padStart(2, '0')}:00` : `Day ${i + 1}`,
        date: isHourly ? 
          new Date(2024, 0, 1, i).toISOString() :
          new Date(2024, 0, i + 1).toISOString(),
        generated: Math.max(0, baseGenerated + (Math.random() - 0.5) * 10),
        consumed: Math.max(0, baseConsumed + (Math.random() - 0.5) * 8),
        batteryLevel: 30 + Math.random() * 60,
        efficiency: 85 + Math.random() * 12,
        carbonSaved: baseGenerated * 0.5 + Math.random() * 5,
        financialSavings: baseGenerated * 12 + Math.random() * 50
      };
    });
  };

  const data = generateHistoricalData(selectedPeriod);
  const maxValue = Math.max(...data.map(d => Math.max(d.generated, d.consumed)));

  const getMetricData = (metric: string) => {
    switch (metric) {
      case 'energy':
        return { 
          data: data.map(d => ({ label: d.label, value1: d.generated, value2: d.consumed })),
          label1: 'Generated (kWh)',
          label2: 'Consumed (kWh)',
          color1: 'bg-green-500',
          color2: 'bg-blue-500'
        };
      case 'battery':
        return {
          data: data.map(d => ({ label: d.label, value1: d.batteryLevel, value2: null })),
          label1: 'Battery Level (%)',
          label2: null,
          color1: 'bg-yellow-500',
          color2: null
        };
      case 'efficiency':
        return {
          data: data.map(d => ({ label: d.label, value1: d.efficiency, value2: null })),
          label1: 'System Efficiency (%)',
          label2: null,
          color1: 'bg-purple-500',
          color2: null
        };
      case 'environmental':
        return {
          data: data.map(d => ({ label: d.label, value1: d.carbonSaved, value2: d.financialSavings })),
          label1: 'Carbon Saved (kg)',
          label2: 'Financial Savings (₹)',
          color1: 'bg-green-600',
          color2: 'bg-blue-600'
        };
      default:
        return {
          data: [],
          label1: '',
          label2: null,
          color1: '',
          color2: null
        };
    }
  };

  const metricData = getMetricData(selectedMetric);
  const maxMetricValue = Math.max(...metricData.data.map(d => Math.max(d.value1, d.value2 || 0)));

  // Calculate summary statistics
  const totalGenerated = data.reduce((sum, d) => sum + d.generated, 0);
  const totalConsumed = data.reduce((sum, d) => sum + d.consumed, 0);
  const avgBattery = data.reduce((sum, d) => sum + d.batteryLevel, 0) / data.length;
  const avgEfficiency = data.reduce((sum, d) => sum + d.efficiency, 0) / data.length;
  const totalCarbonSaved = data.reduce((sum, d) => sum + d.carbonSaved, 0);
  const totalSavings = data.reduce((sum, d) => sum + d.financialSavings, 0);

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0f3057] mb-2">Historical Analytics</h2>
            <p className="text-gray-600">Deep dive into historical performance data</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export Data</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#0f3057] hover:bg-[#0d2847] text-white rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Time Period Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Period:</span>
            <div className="flex space-x-1">
              {['Today', 'Last Week', 'Last Month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-[#0f3057] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Metric:</span>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            >
              <option value="energy">Energy Generation & Consumption</option>
              <option value="battery">Battery Performance</option>
              <option value="efficiency">System Efficiency</option>
              <option value="environmental">Environmental Impact</option>
            </select>
          </div>

          {/* Chart Type */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="flex space-x-1">
              {[
                { type: 'bar', icon: <BarChart3 className="w-4 h-4" /> },
                { type: 'line', icon: <TrendingUp className="w-4 h-4" /> }
              ].map((chart) => (
                <button
                  key={chart.type}
                  onClick={() => setChartType(chart.type as 'bar' | 'line')}
                  className={`p-2 rounded transition-colors ${
                    chartType === chart.type
                      ? 'bg-[#0f3057] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {chart.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Generated</p>
          <p className="text-xl font-bold text-green-600">{totalGenerated.toFixed(1)} kWh</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Consumed</p>
          <p className="text-xl font-bold text-blue-600">{totalConsumed.toFixed(1)} kWh</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Battery</p>
          <p className="text-xl font-bold text-yellow-600">{avgBattery.toFixed(0)}%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Efficiency</p>
          <p className="text-xl font-bold text-purple-600">{avgEfficiency.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">Carbon Saved</p>
          <p className="text-xl font-bold text-green-700">{totalCarbonSaved.toFixed(0)} kg</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Savings</p>
          <p className="text-xl font-bold text-blue-700">₹{totalSavings.toFixed(0)}</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{metricData.label1} Analysis</h3>
        
        {chartType === 'bar' ? (
          <div className="relative h-80">
            <div className="absolute inset-0 flex items-end justify-between space-x-1">
              {metricData.data.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1 space-y-1">
                  <div className="w-full flex flex-col items-center space-y-1">
                    <div
                      className={`${metricData.color1} w-full rounded-t opacity-80 hover:opacity-100 transition-opacity`}
                      style={{ height: `${(item.value1 / maxMetricValue) * 70}%` }}
                      title={`${metricData.label1}: ${item.value1.toFixed(1)}`}
                    ></div>
                    {item.value2 !== null && (
                      <div
                        className={`${metricData.color2} w-full rounded-t opacity-80 hover:opacity-100 transition-opacity`}
                        style={{ height: `${(item.value2 / maxMetricValue) * 70}%` }}
                        title={`${metricData.label2}: ${item.value2.toFixed(1)}`}
                      ></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 transform -rotate-45 origin-left">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-80">
            <svg className="w-full h-full" viewBox="0 0 800 300">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <line
                  key={percent}
                  x1="40"
                  y1={280 - (percent / 100) * 240}
                  x2="760"
                  y2={280 - (percent / 100) * 240}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              {/* Line chart for value1 */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                points={metricData.data.map((item, index) => 
                  `${40 + (index / (metricData.data.length - 1)) * 720},${280 - (item.value1 / maxMetricValue) * 240}`
                ).join(' ')}
              />
              
              {/* Data points for value1 */}
              {metricData.data.map((item, index) => (
                <circle
                  key={`point1-${index}`}
                  cx={40 + (index / (metricData.data.length - 1)) * 720}
                  cy={280 - (item.value1 / maxMetricValue) * 240}
                  r="4"
                  fill="#10B981"
                  className="hover:r-6 transition-all"
                />
              ))}
              
              {/* Line chart for value2 if exists */}
              {metricData.data[0].value2 !== null && (
                <>
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    points={metricData.data.map((item, index) => 
                      `${40 + (index / (metricData.data.length - 1)) * 720},${280 - ((item.value2 || 0) / maxMetricValue) * 240}`
                    ).join(' ')}
                  />
                  {metricData.data.map((item, index) => (
                    <circle
                      key={`point2-${index}`}
                      cx={40 + (index / (metricData.data.length - 1)) * 720}
                      cy={280 - ((item.value2 || 0) / maxMetricValue) * 240}
                      r="4"
                      fill="#3B82F6"
                      className="hover:r-6 transition-all"
                    />
                  ))}
                </>
              )}
            </svg>
          </div>
        )}
        
        {/* Legend */}
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 ${metricData.color1} rounded`}></div>
            <span className="text-sm text-gray-700">{metricData.label1}</span>
          </div>
          {metricData.label2 && (
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 ${metricData.color2} rounded`}></div>
              <span className="text-sm text-gray-700">{metricData.label2}</span>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Data Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-700">Period</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Generated (kWh)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Consumed (kWh)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Battery (%)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Efficiency (%)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Carbon Saved (kg)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Savings (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium">{row.label}</td>
                  <td className="py-2 px-3 text-right">{row.generated.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{row.consumed.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{row.batteryLevel.toFixed(0)}</td>
                  <td className="py-2 px-3 text-right">{row.efficiency.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{row.carbonSaved.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{row.financialSavings.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalytics;