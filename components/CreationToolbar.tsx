import React from 'react';
import ImageIcon from './icons/ImageIcon';
import SlidesIcon from './icons/SlidesIcon';
import LayoutIcon from './icons/LayoutIcon';
import VisualizationIcon from './icons/VisualizationIcon';
import PlaybookIcon from './icons/PlaybookIcon';
import VideoIcon from './icons/VideoIcon';
import AudioIcon from './icons/AudioIcon';
import CalculatorIcon from './icons/CalculatorIcon';

interface CreationToolbarProps {
  onTypeSelect: (type: string) => void;
}

const creationTypes = [
  { name: 'Image', icon: <ImageIcon className="w-5 h-5" /> },
  { name: 'Slides', icon: <SlidesIcon className="w-5 h-5" /> },
  { name: 'Webpage', icon: <LayoutIcon className="w-5 h-5" /> },
  { name: 'Visualization', icon: <VisualizationIcon className="w-5 h-5" /> },
  { name: 'Playbook', icon: <PlaybookIcon className="w-5 h-5" /> },
  { name: 'Math', icon: <CalculatorIcon className="w-5 h-5" /> },
  { name: 'Video', icon: <VideoIcon className="w-5 h-5" /> },
  { name: 'Audio', icon: <AudioIcon className="w-5 h-5" /> },
];

const CreationToolbar: React.FC<CreationToolbarProps> = ({ onTypeSelect }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-3 animate-fade-in">
      {creationTypes.map(type => (
        <button 
          key={type.name} 
          onClick={() => onTypeSelect(type.name)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-full text-sm text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))] transition-all duration-200 shadow-sm hover:shadow-md"
          title={`Create a ${type.name}`}
        >
          {type.icon}
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CreationToolbar;