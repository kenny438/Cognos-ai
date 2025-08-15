
import React from 'react';
import SpinnerIcon from './icons/SpinnerIcon';

const ThinkingIndicator: React.FC = () => {
  return (
    <div className="bg-[rgb(var(--color-card-bg)/0.6)] backdrop-blur-xl border border-[rgb(var(--color-border)/0.5)] rounded-lg p-4 w-full mb-2 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-6 h-6">
            <SpinnerIcon className="w-5 h-5 text-[rgb(var(--color-primary))] animate-spin" />
        </div>
        <div className="flex flex-col">
            <h3 className="text-base font-semibold text-[rgb(var(--color-text-primary))]">Processing Directive...</h3>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Accessing datastreams and executing tasks.</p>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;