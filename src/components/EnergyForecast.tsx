import React from 'react';
import { TrendingUp } from 'lucide-react';

const EnergyForecast: React.FC = () => {
  const hours = Array.from({ length: 48 }, (_, i) => {
    const hour = i % 24;
    const day = i < 24 ? 'Today' : 'Tomorrow';
    const baseProduction = hour >= 6 && hour <= 18 
      ? 20 + 60 * Math.sin((hour - 6) * Math.PI / 12)
      : 0;
    
    // Add weather variation
    let weatherMultiplier = 1;
    if (i >= 24 && i < 36) weatherMultiplier = 0.7; // Tomorrow partly cloudy
    if (i >= 36) weatherMultiplier = 0.3; // Day 3 rainy
    
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      day,
      production: Math.max(0, baseProduction * weatherMultiplier + (Math.random() - 0.5) * 10)
    };
  });

  const maxProduction = Math.max(...hours.map(h => h.production));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">48-Hour Energy Production Forecast</h3>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      
      <div className="relative h-32 mb-4">
        <div className="absolute inset-0 flex items-end justify-between">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-blue-500 to-blue-300 w-1 rounded-t"
              style={{ height: `${(hour.production / maxProduction) * 100}%` }}
              title={`${hour.day} ${hour.time}: ${hour.production.toFixed(1)} kWh`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>Now</span>
        <span>+24h</span>
        <span>+48h</span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center p-2 bg-blue-50 rounded">
          <p className="text-blue-600 font-semibold">Today's Expected</p>
          <p className="text-lg font-bold text-blue-800">
            {hours.slice(0, 24).reduce((sum, h) => sum + h.production, 0).toFixed(0)} kWh
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-gray-600 font-semibold">Tomorrow's Expected</p>
          <p className="text-lg font-bold text-gray-800">
            {hours.slice(24).reduce((sum, h) => sum + h.production, 0).toFixed(0)} kWh
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnergyForecast;