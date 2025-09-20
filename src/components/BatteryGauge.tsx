import React from 'react';

interface BatteryGaugeProps {
  percentage: number;
}

const BatteryGauge: React.FC<BatteryGaugeProps> = ({ percentage }) => {
  const getColor = (percentage: number) => {
    if (percentage > 50) return 'from-green-400 to-green-500';
    if (percentage > 25) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-red-500';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</span>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">SOC</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default BatteryGauge;