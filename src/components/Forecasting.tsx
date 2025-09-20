import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Thermometer, 
  Wind, 
  Droplets,
  TrendingUp,
  AlertTriangle,
  Info,
  Calendar
} from 'lucide-react';

const Forecasting: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<'48hour' | '15day'>('48hour');

  // Generate 48-hour energy production forecast
  const generate48HourForecast = () => {
    const hours = Array.from({ length: 48 }, (_, i) => {
      const hour = i % 24;
      const day = Math.floor(i / 24);
      const baseProduction = hour >= 6 && hour <= 18 
        ? 20 + 60 * Math.sin((hour - 6) * Math.PI / 12)
        : 0;
      
      // Weather impact simulation
      let weatherMultiplier = 1;
      if (day === 0 && hour >= 14 && hour <= 18) weatherMultiplier = 0.7; // Afternoon clouds
      if (day === 1 && hour >= 10 && hour <= 16) weatherMultiplier = 0.4; // Rainy period
      
      return {
        time: `${day === 0 ? 'Today' : 'Tomorrow'} ${hour.toString().padStart(2, '0')}:00`,
        hour: i,
        production: Math.max(0, baseProduction * weatherMultiplier + (Math.random() - 0.5) * 5),
        weather: hour >= 6 && hour <= 18 ? 
          (weatherMultiplier > 0.8 ? 'sunny' : weatherMultiplier > 0.5 ? 'cloudy' : 'rainy') : 'night'
      };
    });
    return hours;
  };

  // Generate 15-day weather forecast
  const generate15DayForecast = () => {
    const weatherTypes = [
      { condition: 'Sunny', icon: <Sun className="w-6 h-6 text-yellow-500" />, temp: [28, 35], solar: 'Excellent' },
      { condition: 'Partly Cloudy', icon: <Cloud className="w-6 h-6 text-gray-400" />, temp: [25, 32], solar: 'Good' },
      { condition: 'Cloudy', icon: <Cloud className="w-6 h-6 text-gray-500" />, temp: [22, 29], solar: 'Fair' },
      { condition: 'Light Rain', icon: <CloudRain className="w-6 h-6 text-blue-500" />, temp: [20, 27], solar: 'Limited' },
      { condition: 'Heavy Rain', icon: <CloudRain className="w-6 h-6 text-blue-700" />, temp: [18, 25], solar: 'Poor' }
    ];

    return Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      const tempRange = weather.temp;
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date,
        ...weather,
        minTemp: tempRange[0] + Math.floor(Math.random() * 3),
        maxTemp: tempRange[1] + Math.floor(Math.random() * 3),
        humidity: 40 + Math.floor(Math.random() * 40),
        windSpeed: 5 + Math.floor(Math.random() * 15)
      };
    });
  };

  const forecastData = generate48HourForecast();
  const weatherForecast = generate15DayForecast();
  const maxProduction = Math.max(...forecastData.map(h => h.production));

  // Generate predictive alerts
  const predictiveAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Energy Shortfall Predicted',
      message: 'Tomorrow 2-6 PM: Expected 40% reduction in solar generation due to heavy cloud cover. Consider diesel backup.',
      time: '2 hours ahead',
      severity: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Generation Window',
      message: 'Today 10 AM - 2 PM: Peak solar conditions expected. Ideal time for high-energy community activities.',
      time: '4 hours ahead',
      severity: 'low'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Weather Alert',
      message: 'Day 3-5: Monsoon activity predicted. Battery charging recommended during clear periods.',
      time: '3 days ahead',
      severity: 'medium'
    },
    {
      id: 4,
      type: 'info',
      title: 'Maintenance Window',
      message: 'Day 7: Clear skies predicted. Optimal conditions for solar panel cleaning and maintenance.',
      time: '1 week ahead',
      severity: 'low'
    }
  ];

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-400 bg-blue-50 text-blue-800';
      default: return 'border-gray-400 bg-gray-50 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    return type === 'warning' ? 
      <AlertTriangle className="w-5 h-5 text-orange-500" /> : 
      <Info className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-[#0f3057] mb-2">Energy & Weather Forecasting</h2>
        <p className="text-gray-600">
          Predictive analytics for optimal microgrid management and planning
        </p>
      </div>

      {/* Energy Production Forecast */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">48-Hour Energy Production Forecast</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Based on weather models</span>
          </div>
        </div>
        
        <div className="relative h-64 mb-6">
          <div className="absolute inset-0 flex items-end justify-between">
            {forecastData.map((hour, index) => (
              <div
                key={index}
                className="relative group"
                style={{ width: `${100 / forecastData.length}%` }}
              >
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    hour.weather === 'sunny' ? 'bg-gradient-to-t from-yellow-400 to-yellow-300' :
                    hour.weather === 'cloudy' ? 'bg-gradient-to-t from-gray-400 to-gray-300' :
                    hour.weather === 'rainy' ? 'bg-gradient-to-t from-blue-400 to-blue-300' :
                    'bg-gradient-to-t from-gray-600 to-gray-500'
                  }`}
                  style={{ height: `${(hour.production / maxProduction) * 100}%` }}
                ></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 mt-2 whitespace-nowrap z-10">
                  {hour.time}<br />
                  {hour.production.toFixed(1)} kWh
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Now</span>
          <span>+24h</span>
          <span>+48h</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-yellow-700 font-semibold">Today's Forecast</p>
            <p className="text-xl font-bold text-yellow-800">
              {forecastData.slice(0, 24).reduce((sum, h) => sum + h.production, 0).toFixed(0)} kWh
            </p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-700 font-semibold">Tomorrow's Forecast</p>
            <p className="text-xl font-bold text-blue-800">
              {forecastData.slice(24).reduce((sum, h) => sum + h.production, 0).toFixed(0)} kWh
            </p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-green-700 font-semibold">Peak Generation</p>
            <p className="text-xl font-bold text-green-800">
              {Math.max(...forecastData.map(h => h.production)).toFixed(1)} kWh
            </p>
          </div>
        </div>
      </div>

      {/* 15-Day Weather Forecast */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">15-Day Weather Trend</h3>
          <Calendar className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {weatherForecast.map((day, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 mb-2">{day.date}</p>
                <div className="flex justify-center mb-2">
                  {day.icon}
                </div>
                <p className="text-xs text-gray-600 mb-2">{day.condition}</p>
                <div className="text-sm">
                  <span className="font-bold text-gray-900">{day.maxTemp}°</span>
                  <span className="text-gray-500">/{day.minTemp}°</span>
                </div>
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <div className="flex items-center justify-center space-x-1">
                    <Droplets className="w-3 h-3" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Wind className="w-3 h-3" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                </div>
                <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${
                  day.solar === 'Excellent' ? 'bg-green-100 text-green-800' :
                  day.solar === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                  day.solar === 'Fair' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {day.solar}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Alerts */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Predictive Alerts</h3>
        <div className="space-y-4">
          {predictiveAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{alert.title}</h4>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">{alert.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecasting;