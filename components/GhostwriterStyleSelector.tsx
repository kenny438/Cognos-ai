import React, { useState, useRef, useEffect } from 'react';
import { ghostwriterData, allGhostwriterArtists } from '../services/personaService';
import CheckIcon from './icons/CheckIcon';
import MusicIcon from './icons/MusicIcon';

interface GhostwriterStyleSelectorProps {
  currentStyle: string;
  onStyleChange: (styleId: string) => void;
}

const GhostwriterStyleSelector: React.FC<GhostwriterStyleSelectorProps> = ({ currentStyle, onStyleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedArtist = allGhostwriterArtists.find(r => r.id === currentStyle) || allGhostwriterArtists[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-card-bg-hover))] text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] transition-colors animate-fade-in"
        title="Change Artist Style"
      >
        <MusicIcon className="w-4 h-4" />
        <span className="text-sm font-medium text-[rgb(var(--color-text-primary))] hidden sm:inline">{selectedArtist.name}</span>
         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-64 origin-top-right bg-[rgb(var(--color-bg-alt))] border border-[rgb(var(--color-border))] rounded-lg shadow-2xl z-20 animate-fade-in p-2 max-h-96 overflow-y-auto scrollbar-thin">
            {ghostwriterData.map(genre => (
                <div key={genre.name}>
                    <h3 className="px-3 py-2 text-xs font-semibold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">{genre.name}</h3>
                    {genre.artists.map(artist => {
                        const isCurrent = artist.id === currentStyle;

                        const handleClick = () => {
                            onStyleChange(artist.id);
                            setIsOpen(false);
                        };
                        
                        return (
                            <button
                                key={artist.id}
                                onClick={handleClick}
                                className={`w-full text-left flex items-center justify-between p-3 rounded-md text-sm transition-colors ${
                                    isCurrent 
                                    ? 'bg-[rgb(var(--color-card-bg-hover))] text-[rgb(var(--color-text-primary))]' 
                                    : 'hover:bg-[rgb(var(--color-card-bg-hover))] text-[rgb(var(--color-text-primary))]'
                                }`}
                            >
                                <span className="font-medium">{artist.name}</span>
                                {isCurrent && <CheckIcon className="w-4 h-4 text-green-500" />}
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

export default GhostwriterStyleSelector;
