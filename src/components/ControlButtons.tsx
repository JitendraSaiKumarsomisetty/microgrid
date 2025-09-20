import React from 'react';
import { Power, Zap, AlertTriangle } from 'lucide-react';

interface ControlButtonsProps {
  onControlAction: (action: string) => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onControlAction }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Controls</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onControlAction('Diesel Generator Connection')}
          className="flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Power className="w-5 h-5" />
          <span>Connect Diesel Generator</span>
        </button>
        <button
          onClick={() => onControlAction('Main Grid Reconnection')}
          className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Zap className="w-5 h-5" />
          <span>Reconnect to Main Grid</span>
        </button>
      </div>
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Control actions are simulated and will generate corresponding alerts for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;