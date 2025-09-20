import React from 'react';
import { Power, Zap } from 'lucide-react';

interface ControlButtonsProps {
  onControlAction: (action: string) => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onControlAction }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Controls</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onControlAction('Diesel Generator Connection')}
          className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-medium transition-colors"
        >
          <Power className="w-5 h-5" />
          <span>Connect Diesel Generator</span>
        </button>
        <button
          onClick={() => onControlAction('Main Grid Reconnection')}
          className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-colors"
        >
          <Zap className="w-5 h-5" />
          <span>Reconnect to Main Grid</span>
        </button>
      </div>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          ⚠️ Control actions are simulated and will generate corresponding alerts.
        </p>
      </div>
    </div>
  );
};

export default ControlButtons;