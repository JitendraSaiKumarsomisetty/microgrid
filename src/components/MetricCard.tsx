import React from 'react';
import GlassCard from './GlassCard';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, bgColor }) => {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <div className={color}>{icon}</div>
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricCard;