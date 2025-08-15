import React from 'react';
import CloseIcon from './icons/CloseIcon';
import ApiIcon from './icons/ApiIcon';

interface MissingApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MissingApiKeyModal: React.FC<MissingApiKeyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-modal-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[rgb(var(--color-bg-alt))] rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 animate-modal-content-in text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
            <ApiIcon className="w-9 h-9" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">API Key Required</h2>
        <p className="mt-4 text-[rgb(var(--color-text-secondary))]">
          To use Google Gemini models, you need to provide an API key.
        </p>

        <div className="text-left bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-lg p-4 mt-6">
            <p className="text-sm text-[rgb(var(--color-text-primary))]">
                This application is designed to securely load the Google Gemini API key from an environment variable named <code className="font-mono bg-[rgb(var(--color-card-bg-hover))] px-1 py-0.5 rounded text-[rgb(var(--color-text-accent))]">API_KEY</code>.
            </p>
            <p className="text-sm text-[rgb(var(--color-text-primary))] mt-3">
                When running the application locally, you need to set this environment variable before starting your development server.
            </p>
        </div>

        <div className="mt-8">
            <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] font-bold text-lg rounded-xl hover:bg-[rgb(var(--color-primary-hover))] transition-all duration-300"
            >
                I Understand
            </button>
        </div>
      </div>
    </div>
  );
};

export default MissingApiKeyModal;
