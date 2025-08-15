
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { type ResearchMode, type Model } from '../types';
import SendIcon from './icons/SendIcon';
import CloseIcon from './icons/CloseIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import SoundBarsIcon from './icons/SoundBarsIcon';
import FileIcon from './icons/FileIcon';
import PaperclipIcon from './icons/PaperclipIcon';
import ResearchModeToggle from './ResearchModeToggle';
import ChevronDownIcon from './icons/ChevronDownIcon';

// Simple hook for speech recognition
const useSpeechRecognition = (onResult: (result: string) => void) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Speech recognition not supported");
            return;
        }
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [onResult]);
    
    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    return { isListening, toggleListening };
};


interface MainInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    attachedFile: { data: string; mimeType: string; name: string; } | null;
    setAttachedFile: (file: { data: string; mimeType: string; name: string; } | null) => void;
    researchMode: ResearchMode;
    setResearchMode: (mode: ResearchMode) => void;
    isPro: boolean;
    currentModel: Model;
    value: string;
    onChange: (value: string) => void;
}

const MainInput: React.FC<MainInputProps> = ({
    onSendMessage, isLoading, attachedFile, setAttachedFile, researchMode, setResearchMode, isPro, currentModel, value, onChange
}) => {
    const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modeMenuRef = useRef<HTMLDivElement>(null);

    const handleSpeechResult = useCallback((transcript: string) => {
        onChange(transcript);
        onSendMessage(transcript);
    }, [onChange, onSendMessage]);

    const { isListening, toggleListening } = useSpeechRecognition(handleSpeechResult);
    
    useEffect(() => {
        if(isListening) {
            onChange("Listening...");
        } else {
            if(value === "Listening...") onChange("");
        }
    }, [isListening, value, onChange]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (currentModel.provider !== 'google') {
                alert('File uploads are currently only supported with Google models.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedFile({
                    data: reader.result as string,
                    mimeType: file.type,
                    name: file.name,
                });
            };
            reader.readAsDataURL(file);
        }
         // Reset file input value to allow re-uploading the same file
        if(event.target) {
            event.target.value = '';
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (modeMenuRef.current && !modeMenuRef.current.contains(event.target as Node)) {
            setIsModeMenuOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
    const handleFileAttach = () => {
        fileInputRef.current?.click();
    };
    
    const handleModeSelect = (mode: ResearchMode) => {
        setResearchMode(mode);
        setIsModeMenuOpen(false);
    };

    const getModeLabel = (mode: ResearchMode) => {
        switch(mode) {
            case 'off': return 'Standard';
            case 'create': return 'Create';
            case 'deep': return 'Deep';
            case 'legendary': return 'Legendary';
            case 'screenshare': return 'Co-pilot';
            default: return 'Mode';
        }
    };

    return (
        <div className="bg-[rgb(var(--color-input-bg))] border border-[rgb(var(--color-border))] rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-[rgb(var(--color-primary))] transition-shadow duration-200 p-2 flex flex-col gap-2">
            {/* Attached file preview - now inside the component */}
            {attachedFile && (
                <div className="bg-[rgb(var(--color-card-bg-hover))] p-2 rounded-lg flex items-center gap-3 animate-fade-in border border-[rgb(var(--color-border))] max-w-full">
                    {attachedFile.mimeType.startsWith('image/') ? (
                        <img src={attachedFile.data} alt="Preview" className="w-10 h-10 rounded object-cover" />
                    ) : (
                         <div className="w-10 h-10 rounded bg-[rgb(var(--color-border))] flex items-center justify-center flex-shrink-0">
                            <FileIcon className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
                         </div>
                    )}
                    <div className="flex-grow overflow-hidden">
                        <p className="text-sm font-medium text-[rgb(var(--color-text-primary))] truncate">{attachedFile.name}</p>
                        <p className="text-xs text-[rgb(var(--color-text-secondary))]">{`${Math.round(atob(attachedFile.data.split(',')[1]).length / 1024)} KB`}</p>
                    </div>
                    <button onClick={() => setAttachedFile(null)} className="p-1 rounded-full hover:bg-black/10 flex-shrink-0" aria-label="Remove attached file">
                        <CloseIcon className="w-4 h-4 text-[rgb(var(--color-text-secondary))]" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    // Explicitly define acceptable file types for better UX
                    accept="image/*,video/mp4,video/quicktime,audio/mpeg,audio/wav,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/zip"
                />
                
                <button
                    type="button"
                    onClick={handleFileAttach}
                    className="p-3 rounded-full text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] transition-colors flex-shrink-0"
                    title="Attach file"
                    disabled={isLoading}
                >
                    <PaperclipIcon className="w-5 h-5" />
                </button>
                
                <div ref={modeMenuRef} className="relative flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
                        className={`h-11 px-3 flex items-center gap-1.5 rounded-lg transition-colors text-sm font-medium ${
                            researchMode !== 'off'
                             ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        disabled={isLoading}
                    >
                         <span>{getModeLabel(researchMode)}</span>
                         <ChevronDownIcon className={`w-4 h-4 transition-transform ${isModeMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isModeMenuOpen && (
                        <div className="absolute bottom-full mb-2 w-80 z-10 animate-fade-in left-0">
                            <ResearchModeToggle
                                mode={researchMode}
                                onChange={handleModeSelect}
                                isPro={isPro}
                            />
                        </div>
                    )}
                </div>
                
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={researchMode === 'screenshare' ? "Describe what you need help with on your screen..." : "Ask anything..."}
                    className="h-11 px-2 flex-1 bg-transparent text-[rgb(var(--color-text-primary))] focus:outline-none resize-none disabled:cursor-not-allowed"
                    disabled={isLoading || isListening}
                />

                <button 
                    type="button"
                    onClick={toggleListening}
                    className={`p-3 transition-colors flex-shrink-0 ${isListening ? 'text-red-500' : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]'}`}
                    disabled={isLoading}
                    title={isListening ? 'Stop listening' : 'Listen'}
                >
                    {isListening ? <SoundBarsIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
                </button>
                
                <button
                    type="submit"
                    className="p-3 bg-[rgb(var(--color-primary))] text-white rounded-full hover:bg-[rgb(var(--color-primary-hover))] disabled:bg-gray-400 transition-colors flex-shrink-0"
                    disabled={isLoading || (!value.trim() && !attachedFile)}
                    title="Send message"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default MainInput;