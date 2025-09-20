import React from 'react';

interface BatteryGaugeProps {
  percentage: number;
}

const BatteryGauge: React.FC<BatteryGaugeProps> = ({ percentage }) => {
  const getColor = (percentage: number) => {
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</span>
        <span className="text-sm text-gray-600">SOC</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BatteryGauge;