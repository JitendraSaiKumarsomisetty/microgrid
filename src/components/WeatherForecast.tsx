import React from 'react';
import { Sun, CloudRain, Cloud, Thermometer } from 'lucide-react';

const WeatherForecast: React.FC = () => {
  const forecast = [
    { 
      day: 'Today', 
      icon: <Sun className="w-8 h-8 text-yellow-500" />, 
      condition: 'Sunny',
      temp: '32°C',
      solar: 'Excellent' 
    },
    { 
      day: 'Tomorrow', 
      icon: <Cloud className="w-8 h-8 text-gray-400" />, 
      condition: 'Partly Cloudy',
      temp: '29°C',
      solar: 'Good' 
    },
    { 
      day: 'Day 3', 
      icon: <CloudRain className="w-8 h-8 text-blue-500" />, 
      condition: 'Light Rain',
      temp: '26°C',
      solar: 'Limited' 
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Forecast - Odisha</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {day.icon}
              <div>
                <p className="font-medium text-gray-900">{day.day}</p>
                <p className="text-sm text-gray-600">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{day.temp}</p>
              <p className={`text-sm ${
                day.solar === 'Excellent' ? 'text-green-600' :
                day.solar === 'Good' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {day.solar}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;