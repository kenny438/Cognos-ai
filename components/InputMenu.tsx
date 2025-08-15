
import React from 'react';
import PaperclipIcon from './icons/PaperclipIcon';
import GoogleDriveIcon from './icons/GoogleDriveIcon';
import ResearchModeToggle from './ResearchModeToggle';
import { type ResearchMode } from '../types';

interface InputMenuProps {
  onFileAttach: () => void;
  onGoogleDriveAttach: () => void;
  onSelectMode: (mode: ResearchMode) => void;
  currentMode: ResearchMode;
  isPro: boolean;
}

const MenuItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}> = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-card-bg-hover))] rounded-lg transition-colors"
  >
    <div className="text-[rgb(var(--color-text-secondary))]">{icon}</div>
    <span className="font-medium">{text}</span>
  </button>
);


const InputMenu: React.FC<InputMenuProps> = ({
  onFileAttach,
  onGoogleDriveAttach,
  onSelectMode,
  currentMode,
  isPro
}) => {
  return (
    <div className="absolute bottom-full mb-2 w-72 bg-[rgb(var(--color-bg))] rounded-xl shadow-2xl border border-[rgb(var(--color-border))] z-10 animate-fade-in p-2">
      <div className="p-1">
        <MenuItem icon={<PaperclipIcon className="w-5 h-5" />} text="Add photos & files" onClick={onFileAttach} />
        <MenuItem icon={<GoogleDriveIcon className="w-5 h-5" />} text="Add from Google Drive" onClick={onGoogleDriveAttach} />
      </div>
      <div className="my-1 h-px bg-[rgb(var(--color-border))]" />
      <ResearchModeToggle mode={currentMode} onChange={onSelectMode} isPro={isPro} />
    </div>
  );
};

export default InputMenu;
