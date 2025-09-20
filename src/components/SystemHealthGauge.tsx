import React from 'react';

interface SystemHealthGaugeProps {
  score: number;
}

const SystemHealthGauge: React.FC<SystemHealthGaugeProps> = ({ score }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 90) return '#2ecc71'; // green
    if (score >= 70) return '#f39c12'; // yellow
    return '#e74c3c'; // red
  };

  const getGradient = (score: number) => {
    if (score >= 90) return 'from-green-400 to-green-500';
    if (score >= 70) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={getColor(score)}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{score.toFixed(0)}%</div>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1">Health</div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthGauge;