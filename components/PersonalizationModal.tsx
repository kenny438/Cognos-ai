import React, { useState, useEffect, Fragment } from 'react';
import { type PersonalizationData, type Theme, type Persona } from '../types';
import CloseIcon from './icons/CloseIcon';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';
import { personas } from '../services/personaService';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PersonalizationData) => void;
  initialData: PersonalizationData | null;
}

const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'aura', name: 'Aura', color: '#6366f1' },
    { id: 'default', name: 'Default', color: '#06b6d4' },
    { id: 'perplexity', name: 'Perplexity', color: '#3b82f6' },
    { id: 'manus', name: 'Manus Dark', color: '#22d3ee' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#ff00bf' },
    { id: 'retro', name: 'Retro', color: '#006400' },
    { id: 'bugatti', name: 'La Voiture Noire', color: '#00bfff' },
];

const PersonalizationModal: React.FC<PersonalizationModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [about, setAbout] = useState('');
  const [theme, setTheme] = useState<Theme>('aura');
  const [persona, setPersona] = useState<Persona>('default');
  const [customFields, setCustomFields] = useState<{ key: string; value: string }[]>([]);
  const [apiKeys, setApiKeys] = useState<{ openai?: string; anthropic?: string }>({});
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setInterests(initialData?.interests || '');
      setAbout(initialData?.about || '');
      setTheme(initialData?.theme || 'aura');
      setPersona(initialData?.persona || 'default');
      setCustomFields(initialData?.customFields || []);
      setApiKeys(initialData?.apiKeys || {});
      setActiveTab('profile');
    }
  }, [isOpen, initialData]);

  if (!isOpen) {
    return null;
  }

  const handleCustomFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const newFields = [...customFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setCustomFields(newFields);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };
  
  const handleApiKeyChange = (provider: 'openai' | 'anthropic', value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  const handleSave = () => {
    const filteredCustomFields = customFields.filter(field => field.key.trim() !== '' && field.value.trim() !== '');
    onSave({ name, interests, about, theme, persona, customFields: filteredCustomFields, apiKeys });
    onClose();
  };
  
  const renderProfileTab = () => (
    <>
       <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              What should I call you?
            </label>
            <input
              type="text"
              id="user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Alex"
              className="w-full px-4 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="user-interests" className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              What are your hobbies or interests?
            </label>
            <input
              type="text"
              id="user-interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., hiking, sci-fi movies, building web apps"
              className="w-full px-4 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="user-about" className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              Tell me anything else you'd like me to know about you.
            </label>
            <textarea
              id="user-about"
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="e.g., I'm a frontend developer based in New York. I prefer concise and direct answers."
              className="w-full px-4 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition"
            />
             <p className="mt-2 text-xs text-[rgb(var(--color-text-secondary))]">
                This information helps me tailor my responses to you. It is stored only in your browser.
            </p>
          </div>
           <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              Structured Data (SSD)
            </label>
             <p className="mt-[-8px] mb-3 text-xs text-[rgb(var(--color-text-secondary))]">
                Add specific key-value details for the AI to remember.
            </p>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                {customFields.map((field, index) => (
                    <div key={index} className="flex items-center gap-2 animate-fade-in">
                        <input
                          type="text"
                          placeholder="Type (e.g., Profession)"
                          value={field.key}
                          onChange={(e) => handleCustomFieldChange(index, 'key', e.target.value)}
                          className="w-1/3 px-3 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-md shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition text-sm"
                        />
                         <input
                          type="text"
                          placeholder="Detail (e.g., Software Engineer)"
                          value={field.value}
                          onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                          className="flex-grow px-3 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-md shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition text-sm"
                        />
                        <button onClick={() => removeCustomField(index)} className="p-2 rounded-full text-[rgb(var(--color-text-secondary))] hover:bg-red-500/10 hover:text-red-600 transition-colors flex-shrink-0" aria-label="Remove field">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
             <button
                onClick={addCustomField}
                className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-[rgb(var(--color-card-bg))] border border-dashed border-[rgb(var(--color-border))] rounded-lg text-sm text-[rgb(var(--color-text-secondary))] hover:border-[rgb(var(--color-text-primary))] hover:text-[rgb(var(--color-text-primary))] transition-all duration-200 w-full justify-center"
              >
                <PlusIcon className="w-4 h-4" />
                Add Information
              </button>
          </div>

    </>
  );
  
  const renderModelsTab = () => (
      <>
         <div>
            <label htmlFor="openai-key" className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="openai-key"
              value={apiKeys.openai || ''}
              onChange={(e) => handleApiKeyChange('openai', e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition font-mono"
            />
            <p className="mt-2 text-xs text-[rgb(var(--color-text-secondary))]">Required for using models like GPT-4o.</p>
          </div>
           <div>
            <label htmlFor="anthropic-key" className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              Anthropic API Key
            </label>
            <input
              type="password"
              id="anthropic-key"
              value={apiKeys.anthropic || ''}
              onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
              placeholder="sk-ant-..."
              className="w-full px-4 py-2 bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:outline-none transition font-mono"
            />
             <p className="mt-2 text-xs text-[rgb(var(--color-text-secondary))]">Required for using models like Claude 3.5 Sonnet.</p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2">
              Google Gemini API Key
            </h3>
             <p className="text-sm text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-card-bg))] p-3 rounded-lg border border-[rgb(var(--color-border))]">
               The Gemini API key is configured in the application's environment. No key is needed here.
            </p>
          </div>
      </>
  )

  const renderAppearanceTab = () => (
    <>
      <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-3">
              AI Persona
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {personas.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => setPersona(p.id)} 
                      className={`group p-2 rounded-lg border-2 text-center transition-all focus:outline-none flex flex-col items-center justify-center aspect-square ${persona === p.id ? 'border-[rgb(var(--color-primary))] ring-2 ring-offset-2 ring-offset-[rgb(var(--color-bg-alt))] ring-[rgb(var(--color-primary))]' : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-text-secondary))]'}`}
                      title={p.description}
                    >
                        <p.icon className={`w-7 h-7 mb-2 transition-colors ${persona === p.id ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-text-secondary))] group-hover:text-[rgb(var(--color-text-primary))]'}`} />
                        <p className={`text-xs font-semibold transition-colors ${persona === p.id ? 'text-[rgb(var(--color-text-primary))]' : 'text-[rgb(var(--color-text-secondary))] group-hover:text-[rgb(var(--color-text-primary))]'}`}>{p.name}</p>
                    </button>
                ))}
            </div>
          </div>
          
           <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-3">
              Theme
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {themes.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} className={`p-2 rounded-lg border-2 text-center transition-all focus:outline-none ${theme === t.id ? 'border-[rgb(var(--color-primary))] ring-2 ring-offset-2 ring-offset-[rgb(var(--color-bg-alt))] ring-[rgb(var(--color-primary))]' : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-text-secondary))]'}`}>
                        <div className="w-full h-8 rounded" style={{ backgroundColor: t.color }}></div>
                        <p className="text-xs mt-2 font-semibold text-[rgb(var(--color-text-secondary))]">{t.name}</p>
                    </button>
                ))}
            </div>
          </div>
    </>
  );

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-modal-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[rgb(var(--color-bg-alt))] rounded-xl shadow-2xl w-full max-w-2xl m-4 flex flex-col animate-modal-content-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))]">Personalize Cognos AI</h2>
                <button onClick={onClose} className="p-1 rounded-full text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))] transition-colors" aria-label="Close personalization settings">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="border-b border-[rgb(var(--color-border))]">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('profile')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]' : 'border-transparent text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:border-gray-300'}`}>Profile</button>
                    <button onClick={() => setActiveTab('models')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'models' ? 'border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]' : 'border-transparent text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:border-gray-300'}`}>Models</button>
                    <button onClick={() => setActiveTab('appearance')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'appearance' ? 'border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]' : 'border-transparent text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:border-gray-300'}`}>Appearance</button>
                </nav>
            </div>
        </div>

        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'models' && renderModelsTab()}
            {activeTab === 'appearance' && renderAppearanceTab()}
        </div>

        <div className="mt-2 flex justify-end gap-3 border-t border-[rgb(var(--color-border))] p-6 bg-[rgb(var(--color-card-bg-hover))] rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-[rgb(var(--color-bg-alt))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg hover:bg-[rgb(var(--color-card-bg))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] font-semibold rounded-lg hover:bg-[rgb(var(--color-primary-hover))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary))] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationModal;