import React from 'react';

interface BatteryGaugeProps {
  percentage: number;
}

const BatteryGauge: React.FC<BatteryGaugeProps> = ({ percentage }) => {
  const getColor = (percentage: number) => {
    if (percentage > 50) return 'bg-[#2ecc71]';
    if (percentage > 25) return 'bg-[#f39c12]';
    return 'bg-[#e74c3c]';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</span>
        <span className="text-sm text-white/70">SOC</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BatteryGauge;