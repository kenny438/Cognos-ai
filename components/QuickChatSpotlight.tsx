import React, { useState, useRef, useEffect } from 'react';
import { type AgentResponse, type PersonalizationData, MessageRole, type Model } from '../types';
import { postToAgent } from '../services/agentService';
import SendIcon from './icons/SendIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import SourceIcon from './icons/SourceIcon';
import LogoIcon from './icons/LogoIcon';

interface QuickChatSpotlightProps {
    onClose: () => void;
    personalizationData: PersonalizationData | null;
    currentModel: Model;
    ghostwriterStyle: string;
}

const QuickChatSpotlight: React.FC<QuickChatSpotlightProps> = ({ onClose, personalizationData, currentModel, ghostwriterStyle }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AgentResponse | null>(null);
    const [question, setQuestion] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setResult(null);
        setQuestion(input);
        setInput('');

        try {
            const response = await postToAgent(
                [{ id: 'q1', role: MessageRole.USER, text: input }],
                'off',
                personalizationData,
                currentModel,
                ghostwriterStyle
            );
            setResult(response);
        } catch (err: any) {
            setResult({ text: '', error: err.message || 'An unexpected error occurred.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-start justify-center z-50 p-4 animate-modal-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-[rgb(var(--color-bg-alt))] rounded-xl shadow-2xl w-full max-w-2xl mt-[10vh] animate-modal-content-in flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit} className="relative p-2 border-b border-[rgb(var(--color-border))]">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a quick question..."
                        disabled={isLoading}
                        className="w-full pl-4 pr-12 py-3 bg-transparent text-lg text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-secondary))] focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] hover:bg-[rgb(var(--color-primary-hover))] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {!result && !isLoading && !question && (
                        <div className="text-center text-[rgb(var(--color-text-secondary))] py-10">
                            <p>Ask anything. Get a quick answer without leaving the page.</p>
                        </div>
                    )}

                    {question && (
                        <div className="flex items-start justify-end gap-3 mb-4 animate-fade-in">
                             <div className="p-3 rounded-lg bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] max-w-[85%]">
                                <p>{question}</p>
                             </div>
                        </div>
                    )}
                    
                    {isLoading && (
                        <div className="flex items-center gap-3 text-[rgb(var(--color-text-secondary))] animate-fade-in">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[rgb(var(--color-card-bg-hover))]">
                                <LogoIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
                            </div>
                            <div className="p-3 rounded-lg bg-[rgb(var(--color-card-bg-hover))] text-[rgb(var(--color-text-primary))] flex items-center gap-2">
                                <SpinnerIcon className="w-5 h-5 text-[rgb(var(--color-primary))] animate-spin" />
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}

                    {result && (
                         <div className="flex items-start gap-3 animate-fade-in">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[rgb(var(--color-card-bg-hover))]">
                                <LogoIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
                            </div>
                            <div className="p-4 rounded-lg bg-[rgb(var(--color-card-bg-hover))] w-full max-w-[85%]">
                                {result.error ? (
                                    <p className="text-red-600">{result.error}</p>
                                ) : (
                                    <>
                                        <div className="prose prose-sm max-w-none text-[rgb(var(--color-text-primary))] prose-p:text-[rgb(var(--color-text-primary))] prose-a:text-[rgb(var(--color-text-accent))]" dangerouslySetInnerHTML={{ __html: result.text.replace(/\n/g, '<br />') }} />
                                        {result.sources && result.sources.length > 0 && (
                                            <div className="mt-4 pt-3 border-t border-[rgb(var(--color-border))]">
                                                <h4 className="text-xs font-semibold text-[rgb(var(--color-text-secondary))] mb-2 flex items-center gap-2"><SourceIcon className="w-4 h-4" /> Sources</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {result.sources.map((source, index) => (
                                                        <a key={index} href={source.uri} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-[rgb(var(--color-border))] text-[rgb(var(--color-text-accent))] text-xs rounded-md hover:bg-[rgb(var(--color-card-bg))]" title={source.title}>
                                                            {index + 1}. {source.title}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickChatSpotlight;