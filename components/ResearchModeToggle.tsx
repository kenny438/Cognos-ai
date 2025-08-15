
import React from 'react';
import { type ResearchMode } from '../types';
import CrownIcon from './icons/CrownIcon';

interface ResearchModeToggleProps {
  mode: ResearchMode;
  onChange: (mode: ResearchMode) => void;
  isPro: boolean;
}

const modes: { id: ResearchMode; label: string; description: string }[] = [
  { id: 'off', label: 'Standard', description: 'Quick and conversational answers.' },
  { id: 'create', label: 'Create', description: 'Generate content like images or slides.' },
  { id: 'deep', label: 'Deep', description: 'In-depth research and analysis.' },
  { id: 'legendary', label: 'Legendary', description: 'Comprehensive, dissertation-level reports.' },
  { id: 'screenshare', label: 'Co-pilot', description: 'Let the AI see your screen and guide you step-by-step.' },
];

const ResearchModeToggle: React.FC<ResearchModeToggleProps> = ({ mode, onChange, isPro }) => {

  return (
    <div className="w-full bg-[rgb(var(--color-bg))] rounded-xl border border-[rgb(var(--color-border))] shadow-2xl">
        <div className="p-4 border-b border-[rgb(var(--color-border))]">
             <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">AI Modes</h3>
             <p className="text-sm text-[rgb(var(--color-text-secondary))]">Choose how the AI should respond.</p>
        </div>
        <div className="p-2">
          {modes.map((item) => {
            const isProFeature = item.id === 'legendary' || item.id === 'screenshare';
            const isLocked = isProFeature && !isPro;
            const isActive = mode === item.id;

            return (
              <button
                key={item.id}
                onClick={() => !isLocked && onChange(item.id)}
                className={`w-full text-left p-3 flex items-center gap-4 transition-colors rounded-lg ${
                    isActive 
                        ? 'bg-[rgb(var(--color-primary)/0.1)]' 
                        : isLocked 
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-[rgb(var(--color-card-bg-hover))]'
                }`}
                aria-pressed={isActive}
                disabled={isLocked}
              >
                <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isActive ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-text-primary))]'}`}>{item.label}</span>
                         {isLocked && <CrownIcon className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">{item.description}</p>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-primary))]" />}
              </button>
            );
          })}
        </div>
    </div>
  );
};

export default ResearchModeToggle;