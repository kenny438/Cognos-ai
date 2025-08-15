
import React from 'react';
import { levelsData, intro } from './levelsData';
import CloseIcon from './icons/CloseIcon';

interface LevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LevelsModal: React.FC<LevelsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-modal-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[rgb(var(--color-bg))] rounded-2xl shadow-2xl w-full max-w-4xl m-4 flex flex-col h-[90vh] animate-modal-content-in border border-[rgb(var(--color-border))]/50"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 md:p-6 border-b border-[rgb(var(--color-border))] shrink-0">
          <h2 className="text-lg md:text-xl font-bold text-[rgb(var(--color-text-primary))]">AI Agent Capabilities</h2>
          <button onClick={onClose} className="p-1 rounded-full text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))] transition-colors" aria-label="Close">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="text-center border-b border-dashed border-gray-400/50 pb-8">
            <h3 className="text-2xl md:text-3xl font-black text-[rgb(var(--color-text-primary))] tracking-tighter mb-2">{intro.title}</h3>
            <p className="text-lg font-semibold text-[rgb(var(--color-text-accent))] mb-3">{intro.subtitle}</p>
            <p className="text-sm text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto whitespace-pre-wrap">{intro.description}</p>
          </div>

          {levelsData.map((level, index) => (
            <div key={index} className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${level.isDarkZone ? 'bg-red-900/20 border-2 border-red-500/50' : 'bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))]'}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className={`text-4xl md:text-5xl`}>{level.emoji}</div>
                <div>
                  <span className={`inline-block px-3 py-1 text-xs font-bold text-[rgb(var(--color-primary-text))] rounded-full mb-2 shadow-md ${level.isDarkZone ? 'bg-gradient-to-br from-red-600 to-orange-500' : 'bg-[rgb(var(--color-primary))]'}`}>
                    {level.level}
                  </span>
                  <h4 className="text-xl md:text-2xl font-extrabold tracking-tight text-[rgb(var(--color-text-primary))]">{level.title}</h4>
                </div>
              </div>

              {level.quote && <p className="font-serif italic text-[rgb(var(--color-text-primary))] border-l-4 pl-4 mb-5 ${level.isDarkZone ? 'border-red-500' : 'border-[rgb(var(--color-text-secondary))]'}">{level.quote}</p>}
              {level.description && <p className="text-sm text-[rgb(var(--color-text-primary))] whitespace-pre-wrap mb-4 bg-[rgb(var(--color-bg)/0.5)] p-3 rounded-md border border-[rgb(var(--color-border))]">{level.description}</p>}
              
              <ul className="space-y-2 list-inside">
                {level.items?.map((item, i) => (
                  <li key={i} className="flex items-start text-[rgb(var(--color-text-primary))]">
                    <span className={`mr-3 mt-1 shrink-0 font-black ${level.isDarkZone ? 'text-red-500' : 'text-[rgb(var(--color-text-accent))]'}`}>
                      {level.isDarkZone ? '›' : '◆'}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
              
              {level.think && <p className="mt-4 text-sm font-medium text-cyan-800 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">{level.think}</p>}
              {level.tools && <p className="mt-4 text-sm font-medium text-[rgb(var(--color-text-secondary))] bg-[rgb(var(--color-card-bg-hover))] border border-[rgb(var(--color-border))] rounded-lg p-3">{level.tools}</p>}
              {level.bonus && <p className="mt-4 text-sm font-medium text-purple-800 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 whitespace-pre-wrap">{level.bonus}</p>}
              {level.warning && <p className="mt-4 text-sm font-medium text-yellow-800 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">{level.warning}</p>}

              {level.examples && (
                <div className="mt-4">
                  <p className="font-bold text-sm text-red-600 dark:text-red-400 mb-2">🔥 Examples:</p>
                  <ul className="space-y-1 list-inside list-disc pl-2">
                    {level.examples.map((ex, i) => (
                      <li key={i} className="text-sm text-red-700 dark:text-red-400">{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelsModal;
