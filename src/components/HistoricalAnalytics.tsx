import React, { useState } from 'react';
import { 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

interface HistoricalAnalyticsProps {
  gridSellRate: number;
}

const HistoricalAnalytics: React.FC<HistoricalAnalyticsProps> = ({ gridSellRate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last Week');
  const [selectedMetric, setSelectedMetric] = useState('energy');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [reportDateRange, setReportDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

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
        financialSavings: baseGenerated * 12 + Math.random() * 50,
        energySoldToGrid: Math.max(0, baseGenerated - baseConsumed) * 0.7,
        revenue: 0
      };
      
      // Calculate revenue
      entry.revenue = entry.energySoldToGrid * gridSellRate;
      
      return entry;
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
  const totalEnergyToGrid = data.reduce((sum, d) => sum + (d.energySoldToGrid || 0), 0);
  const totalRevenue = data.reduce((sum, d) => sum + (d.revenue || 0), 0);

  const generateReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportData = {
      dateRange: `${reportDateRange.from} to ${reportDateRange.to}`,
      totalGenerated: totalGenerated.toFixed(1),
      totalConsumed: totalConsumed.toFixed(1),
      totalEnergyToGrid: totalEnergyToGrid.toFixed(1),
      totalRevenue: totalRevenue.toFixed(2),
      avgEfficiency: avgEfficiency.toFixed(1),
      carbonSaved: totalCarbonSaved.toFixed(1),
      gridSellRate: gridSellRate.toFixed(2)
    };
    
    // Create and download PDF report
    downloadPDFReport(reportData);
    setIsGeneratingReport(false);
  };

  const downloadPDFReport = (reportData: any) => {
    // Create a simple HTML report and convert to PDF-like format
    const reportHTML = `
      <html>
        <head>
          <title>GridVision India Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #0f3057; font-size: 24px; font-weight: bold; }
            .date-range { color: #666; margin: 10px 0; }
            .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
            .metric { padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .metric-title { font-weight: bold; color: #0f3057; }
            .metric-value { font-size: 18px; color: #2ecc71; margin-top: 5px; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">GridVision India</div>
            <h2>Energy & Financial Performance Report</h2>
            <div class="date-range">Period: ${reportData.dateRange}</div>
            <div class="date-range">Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          <div class="metrics">
            <div class="metric">
              <div class="metric-title">Total Energy Generated</div>
              <div class="metric-value">${reportData.totalGenerated} kWh</div>
            </div>
            <div class="metric">
              <div class="metric-title">Total Energy Consumed</div>
              <div class="metric-value">${reportData.totalConsumed} kWh</div>
            </div>
            <div class="metric">
              <div class="metric-title">Energy Sold to Grid</div>
              <div class="metric-value">${reportData.totalEnergyToGrid} kWh</div>
            </div>
            <div class="metric">
              <div class="metric-title">Total Revenue Earned</div>
              <div class="metric-value">₹${reportData.totalRevenue}</div>
            </div>
            <div class="metric">
              <div class="metric-title">Average System Efficiency</div>
              <div class="metric-value">${reportData.avgEfficiency}%</div>
            </div>
            <div class="metric">
              <div class="metric-title">Carbon Emissions Saved</div>
              <div class="metric-value">${reportData.carbonSaved} kg CO₂</div>
            </div>
            <div class="metric">
              <div class="metric-title">Grid Sell Rate</div>
              <div class="metric-value">₹${reportData.gridSellRate}/kWh</div>
            </div>
            <div class="metric">
              <div class="metric-title">Report Generation Date</div>
              <div class="metric-value">${new Date().toLocaleDateString()}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This report was automatically generated by GridVision India Dashboard</p>
            <p>© 2024 GridVision India - Advanced Microgrid Monitoring Platform</p>
          </div>
        </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GridVision_India_Report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f3057] to-[#2ecc71] bg-clip-text text-transparent mb-2">
              Performance & Financial Analytics
            </h2>
            <p className="text-gray-600">Comprehensive analysis of energy generation, consumption, and revenue</p>
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
      <div className="grid grid-cols-8 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Generated</p>
          <p className="text-xl font-bold text-green-600">{totalGenerated.toFixed(1)} kWh</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Consumed</p>
          <p className="text-xl font-bold text-blue-600">{totalConsumed.toFixed(1)} kWh</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Sold to Grid</p>
          <p className="text-xl font-bold text-purple-600">{totalEnergyToGrid.toFixed(1)} kWh</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-xl font-bold text-indigo-600">₹{totalRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Battery</p>
          <p className="text-xl font-bold text-yellow-600">{avgBattery.toFixed(0)}%</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Efficiency</p>
          <p className="text-xl font-bold text-purple-600">{avgEfficiency.toFixed(1)}%</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Carbon Saved</p>
          <p className="text-xl font-bold text-green-700">{totalCarbonSaved.toFixed(0)} kg</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Savings</p>
          <p className="text-xl font-bold text-blue-700">₹{totalSavings.toFixed(0)}</p>
        </div>
      </div>

      {/* Energy Distribution Chart */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Distribution</h3>
          <div className="relative h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* On-site usage */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#2ecc71"
                  strokeWidth="20"
                  strokeDasharray={`${(totalConsumed / (totalGenerated || 1)) * 251.2} 251.2`}
                />
                {/* Grid sales */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3498db"
                  strokeWidth="20"
                  strokeDasharray={`${(totalEnergyToGrid / (totalGenerated || 1)) * 251.2} 251.2`}
                  strokeDashoffset={`-${(totalConsumed / (totalGenerated || 1)) * 251.2}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalGenerated.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">kWh Total</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#2ecc71] rounded"></div>
              <span className="text-sm text-gray-700">On-site Use ({((totalConsumed / (totalGenerated || 1)) * 100).toFixed(0)}%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#3498db] rounded"></div>
              <span className="text-sm text-gray-700">Grid Sales ({((totalEnergyToGrid / (totalGenerated || 1)) * 100).toFixed(0)}%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <line
                  key={percent}
                  x1="40"
                  y1={180 - (percent / 100) * 140}
                  x2="360"
                  y2={180 - (percent / 100) * 140}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              {/* Revenue line */}
              <polyline
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                points={data.slice(0, 10).map((item, index) => 
                  `${40 + (index / 9) * 320},${180 - ((item.revenue || 0) / Math.max(...data.map(d => d.revenue || 0))) * 140}`
                ).join(' ')}
              />
              
              {/* Data points */}
              {data.slice(0, 10).map((item, index) => (
                <circle
                  key={index}
                  cx={40 + (index / 9) * 320}
                  cy={180 - ((item.revenue || 0) / Math.max(...data.map(d => d.revenue || 0))) * 140}
                  r="4"
                  fill="#8b5cf6"
                />
              ))}
            </svg>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Daily Revenue Trend</p>
            <p className="text-lg font-bold text-purple-600">₹{(totalRevenue / data.length).toFixed(2)} avg/day</p>
          </div>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-gradient-to-br from-[#0f3057]/10 to-[#2ecc71]/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Report Generator</h3>
        <div className="grid grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={reportDateRange.from}
              onChange={(e) => setReportDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={reportDateRange.to}
              onChange={(e) => setReportDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3057] focus:border-transparent"
            />
          </div>
          <div>
            <button
              onClick={generateReport}
              disabled={isGeneratingReport}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isGeneratingReport
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#0f3057] to-[#2ecc71] hover:from-[#0d2847] hover:to-[#27ae60] text-white hover:scale-105'
              }`}
            >
              {isGeneratingReport ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full loading-spinner"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Generate Energy & Finance Report</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Report will include:</strong> Total Energy Generated, Total Energy Consumed, 
            Energy Sold to Grid, Total Revenue Earned (₹), Average System Efficiency, 
            Carbon Emissions Saved, and detailed financial analysis for the selected period.
          </p>
        </div>
      </div>
      {/* Main Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-700">Period</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Generated (kWh)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Consumed (kWh)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Sold to Grid (kWh)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Revenue (₹)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Battery (%)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Efficiency (%)</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">Carbon Saved (kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium">{row.label}</td>
                  <td className="py-2 px-3 text-right">{row.generated.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{row.consumed.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{(row.energySoldToGrid || 0).toFixed(1)}</td>
                  <td className="py-2 px-3 text-right font-semibold text-green-600">₹{(row.revenue || 0).toFixed(2)}</td>
                  <td className="py-2 px-3 text-right">{row.batteryLevel.toFixed(0)}</td>
                  <td className="py-2 px-3 text-right">{row.efficiency.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">{row.carbonSaved.toFixed(1)}</td>
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