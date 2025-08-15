
import React from 'react';
import CloseIcon from './icons/CloseIcon';
import CrownIcon from './icons/CrownIcon';
import CheckIcon from './icons/CheckIcon';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const features = [
    'Unlock Legendary Research Mode',
    'Produce dissertation-level reports',
    'Explore topics with unparalleled depth',
    'Priority access to new features',
];

const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

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
        <div className="flex justify-end">
            <button onClick={onClose} className="p-1 -mr-4 -mt-4 rounded-full text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))] transition-colors" aria-label="Close">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        
        <div className="flex justify-center -mt-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <CrownIcon className="w-9 h-9" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">Go Pro</h2>
        <p className="mt-2 text-[rgb(var(--color-text-secondary))]">Upgrade to unlock the most powerful features of Cognos AI.</p>

        <ul className="text-left space-y-3 mt-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 shrink-0">
                <CheckIcon className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-[rgb(var(--color-text-primary))]">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
            <button
                onClick={onSubscribe}
                className="w-full px-6 py-4 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] font-bold text-lg rounded-xl hover:shadow-lg hover:bg-[rgb(var(--color-primary-hover))] transition-all duration-300 transform hover:scale-105"
            >
                Subscribe Now
                <span className="block text-sm font-normal opacity-90">$12 / month</span>
            </button>
        </div>

        <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-4">You can cancel anytime. For this demo, clicking subscribe will instantly unlock Pro features.</p>
      </div>
    </div>
  );
};

export default ProModal;