import React, { useState } from 'react';
import { Calendar, BarChart3, TrendingUp } from 'lucide-react';

const HistoricalData: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const generateData = (period: string) => {
    const days = period === 'Today' ? 1 : period === 'Last Week' ? 7 : 30;
    return Array.from({ length: days }, (_, i) => ({
      day: period === 'Today' ? `${6 + i * 2}:00` : `Day ${i + 1}`,
      generated: 20 + Math.random() * 40,
      consumed: 15 + Math.random() * 25,
      batteryLevel: 30 + Math.random() * 60
    }));
  };

  const data = generateData(selectedPeriod);
  const maxValue = Math.max(...data.map(d => Math.max(d.generated, d.consumed)));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Historical Data</h3>
        <div className="flex space-x-2">
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

      <div className="grid grid-cols-2 gap-6">
        {/* Energy Generation vs Consumption */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Energy Generated vs Consumed
          </h4>
          <div className="relative h-32">
            <div className="absolute inset-0 flex items-end justify-between space-x-1">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1 space-y-1">
                  <div
                    className="bg-green-400 w-full rounded-t"
                    style={{ height: `${(item.generated / maxValue) * 80}%` }}
                    title={`Generated: ${item.generated.toFixed(1)} kWh`}
                  ></div>
                  <div
                    className="bg-blue-400 w-full rounded-t"
                    style={{ height: `${(item.consumed / maxValue) * 80}%` }}
                    title={`Consumed: ${item.consumed.toFixed(1)} kWh`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2 space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
              <span>Generated</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
              <span>Consumed</span>
            </div>
          </div>
        </div>

        {/* Battery Charge Level */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Battery Charge Level
          </h4>
          <div className="relative h-32">
            <svg className="w-full h-full" viewBox="0 0 300 120">
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                points={data.map((item, index) => 
                  `${(index / (data.length - 1)) * 280 + 10},${120 - (item.batteryLevel / 100) * 100}`
                ).join(' ')}
              />
              {data.map((item, index) => (
                <circle
                  key={index}
                  cx={(index / (data.length - 1)) * 280 + 10}
                  cy={120 - (item.batteryLevel / 100) * 100}
                  r="3"
                  fill="#10B981"
                />
              ))}
            </svg>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            Battery State of Charge (%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;