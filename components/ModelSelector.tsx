import React, { useState, useRef, useEffect } from 'react';
import { type Model, type PersonalizationData } from '../types';
import LogoIcon from './icons/LogoIcon';
import OpenAIIcon from './icons/OpenAIIcon';
import AnthropicIcon from './icons/AnthropicIcon';
import LockIcon from './icons/LockIcon';
import CheckIcon from './icons/CheckIcon';
import CrownIcon from './icons/CrownIcon';

interface ModelSelectorProps {
  models: Model[];
  currentModel: Model;
  onModelChange: (modelId: string) => void;
  apiKeys: PersonalizationData['apiKeys'];
  onOpenPersonalization: () => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, currentModel, onModelChange, apiKeys, onOpenPersonalization }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const providers = models.reduce((acc, model) => {
    if (!acc.find(p => p.provider === model.provider)) {
      acc.push({ provider: model.provider, name: model.provider.charAt(0).toUpperCase() + model.provider.slice(1) });
    }
    return acc;
  }, [] as { provider: string; name: string }[]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const getProviderIcon = (provider: string) => {
    switch(provider) {
        case 'openai': return <OpenAIIcon className="w-4 h-4" />;
        case 'anthropic': return <AnthropicIcon className="w-4 h-4" />;
        default: return <LogoIcon className="w-4 h-4" />;
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-lg font-semibold text-gray-800"
      >
        <span>Cognos AI</span>
         <svg className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-72 -ml-2 origin-top-left bg-white border border-gray-200 rounded-lg shadow-2xl z-20 animate-fade-in p-2">
            {providers.map(({ provider, name }) => (
                <div key={provider}>
                    <h3 className="px-2 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider capitalize flex items-center gap-2">
                        {name}
                    </h3>
                    {models.filter(m => m.provider === provider).map(model => {
                        const isAvailable = model.provider === 'google' || (model.provider === 'openai' && apiKeys?.openai) || (model.provider === 'anthropic' && apiKeys?.anthropic);
                        const isCurrent = model.id === currentModel.id;

                        const handleClick = () => {
                            if (isAvailable) {
                                onModelChange(model.id);
                                setIsOpen(false);
                            } else {
                                onOpenPersonalization();
                                setIsOpen(false);
                            }
                        };
                        
                        return (
                            <button
                                key={model.id}
                                onClick={handleClick}
                                className={`w-full text-left flex items-center justify-between p-2 rounded-md text-sm transition-colors group ${
                                    isCurrent ? 'bg-gray-100 text-gray-800' : 
                                    isAvailable ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-pointer'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                  {getProviderIcon(model.provider)}
                                  <span className="font-medium">{model.name}</span>
                                  {model.isPro && <CrownIcon className="w-4 h-4 text-yellow-500" />}
                                </div>
                                {!isAvailable ? <LockIcon className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" /> : isCurrent ? <CheckIcon className="w-4 h-4 text-indigo-500" /> : null}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;