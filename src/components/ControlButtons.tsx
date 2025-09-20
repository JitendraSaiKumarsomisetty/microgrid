import React from 'react';
import { Power, Zap } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import GlassCard from './GlassCard';

interface ControlButtonsProps {
  onControlAction: (action: string) => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onControlAction }) => {
  const { currentLanguage } = useLanguage();

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{getTranslation('systemControls', currentLanguage)}</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onControlAction('Diesel Generator Connection')}
          className="flex items-center justify-center space-x-2 bg-[#e74c3c] hover:bg-[#c0392b] text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          <Power className="w-5 h-5" />
          <span>Connect Diesel Generator</span>
        </button>
        <button
          onClick={() => onControlAction('Main Grid Reconnection')}
          className="flex items-center justify-center space-x-2 bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          <Zap className="w-5 h-5" />
          <span>Reconnect to Main Grid</span>
        </button>
      </div>
      <div className="mt-4 p-3 bg-[#f39c12]/10 border border-[#f39c12]/30 rounded-lg">
        <p className="text-sm text-white/90">
          ⚠️ Control actions are simulated and will generate corresponding alerts.
        </p>
      </div>
    </GlassCard>
  );
};

export default ControlButtons;