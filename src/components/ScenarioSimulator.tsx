import React, { useState } from 'react';
import { Play, RotateCcw, TrendingDown, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { ScenarioResult } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

const ScenarioSimulator: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [simulationResult, setSimulationResult] = useState<ScenarioResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios = [
    {
      id: 'cloudy_3days',
      title: '3 Days of Clouds',
      description: 'Simulate 3 consecutive days of heavy cloud cover reducing solar generation by 70%',
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'add_50_homes',
      title: 'Add 50 Homes',
      description: 'Simulate adding 50 new residential connections to the microgrid',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'panel_failure',
      title: 'Solar Panel Failure',
      description: 'Simulate 30% of solar panels going offline due to technical issues',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'peak_summer',
      title: 'Peak Summer Load',
      description: 'Simulate increased cooling demand during peak summer months',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'monsoon_season',
      title: 'Monsoon Season',
      description: 'Simulate 2 weeks of monsoon with reduced solar and increased humidity',
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      id: 'efficiency_upgrade',
      title: 'Efficiency Upgrade',
      description: 'Simulate installing new high-efficiency solar panels and batteries',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-green-500 to-green-700'
    }
  ];

  const runSimulation = async (scenarioId: string) => {
    setIsSimulating(true);
    setSelectedScenario(scenarioId);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock results based on scenario
    let result: ScenarioResult;
    
    switch (scenarioId) {
      case 'cloudy_3days':
        result = {
          scenario: '3 Days of Clouds',
          energyImpact: -65,
          batteryImpact: -45,
          dieselHours: 18,
          recommendation: 'Activate diesel backup and implement load shedding for non-critical loads'
        };
        break;
      case 'add_50_homes':
        result = {
          scenario: 'Add 50 Homes',
          energyImpact: +35,
          batteryImpact: -25,
          dieselHours: 8,
          recommendation: 'Consider adding 2 additional battery banks and 15kW solar capacity'
        };
        break;
      case 'panel_failure':
        result = {
          scenario: 'Solar Panel Failure',
          energyImpact: -30,
          batteryImpact: -35,
          dieselHours: 12,
          recommendation: 'Immediate maintenance required. Activate backup systems and reduce non-essential loads'
        };
        break;
      case 'peak_summer':
        result = {
          scenario: 'Peak Summer Load',
          energyImpact: +15,
          batteryImpact: -40,
          dieselHours: 6,
          recommendation: 'Optimize cooling schedules and consider temporary load management'
        };
        break;
      case 'monsoon_season':
        result = {
          scenario: 'Monsoon Season',
          energyImpact: -50,
          batteryImpact: -30,
          dieselHours: 24,
          recommendation: 'Ensure diesel fuel reserves and implement weather-based load scheduling'
        };
        break;
      case 'efficiency_upgrade':
        result = {
          scenario: 'Efficiency Upgrade',
          energyImpact: +45,
          batteryImpact: +60,
          dieselHours: -15,
          recommendation: 'Excellent ROI expected. Reduced diesel dependency and improved reliability'
        };
        break;
      default:
        result = {
          scenario: 'Unknown',
          energyImpact: 0,
          batteryImpact: 0,
          dieselHours: 0,
          recommendation: 'No data available'
        };
    }
    
    setSimulationResult(result);
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setSelectedScenario('');
    setSimulationResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#0f3057] mb-2">
              {getTranslation('scenarios', currentLanguage)}
            </h2>
            <p className="text-[#333333]">
              Simulate various scenarios to predict their impact on the microgrid system
            </p>
          </div>
          <button
            onClick={resetSimulation}
            className="flex items-center space-x-2 px-4 py-2 bg-[#0f3057] hover:bg-[#0d2847] border border-[#0f3057] rounded-lg text-white transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Scenario Selection */}
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-[#0f3057] mb-4">Select Scenario</h3>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedScenario === scenario.id
                      ? 'bg-blue-50 border border-blue-200 scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                  onClick={() => !isSimulating && runSimulation(scenario.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${scenario.color}`}>
                      {scenario.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#0f3057] font-medium mb-1">{scenario.title}</h4>
                      <p className="text-[#333333] text-sm">{scenario.description}</p>
                    </div>
                    {selectedScenario === scenario.id && isSimulating && (
                      <div className="animate-spin">
                        <Play className="w-5 h-5 text-[#0f3057]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {simulationResult ? (
            <>
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-[#0f3057] mb-4">Simulation Results</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-[#0f3057] mb-2">{simulationResult.scenario}</h4>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${
                        simulationResult.energyImpact >= 0 ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
                      }`}>
                        {simulationResult.energyImpact >= 0 ? '+' : ''}{simulationResult.energyImpact}%
                      </div>
                      <div className="text-[#666666] text-sm">Energy Impact</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${
                        simulationResult.batteryImpact >= 0 ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
                      }`}>
                        {simulationResult.batteryImpact >= 0 ? '+' : ''}{simulationResult.batteryImpact}%
                      </div>
                      <div className="text-[#666666] text-sm">Battery Impact</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${
                        simulationResult.dieselHours <= 0 ? 'text-[#2ecc71]' : 'text-[#f39c12]'
                      }`}>
                        {simulationResult.dieselHours >= 0 ? '+' : ''}{simulationResult.dieselHours}h
                      </div>
                      <div className="text-[#666666] text-sm">Diesel Hours</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <h4 className="text-lg font-bold text-[#0f3057] mb-3">Recommendation</h4>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-[#f39c12] flex-shrink-0 mt-1" />
                  <p className="text-[#333333]">{simulationResult.recommendation}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 h-64 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <p className="text-[#666666]">Select a scenario to run simulation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;