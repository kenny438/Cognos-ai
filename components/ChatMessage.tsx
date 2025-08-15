
import React, { useState, useEffect } from 'react';
import { type Message, MessageRole, type ResearchMode, type CreativeOutput } from '../types';
import LogoIcon from './icons/LogoIcon';
import SourceIcon from './icons/SourceIcon';
import ThinkingIndicator from './ThinkingIndicator';
import ToolResultCard from './ToolResultCard';
import RetryIcon from './icons/RetryIcon';
import CreativeContentRenderer from './CreativeContentRenderer';
import LegendaryResearchIndicator from './LegendaryResearchIndicator';
import * as voiceService from '../services/voiceService';
import SpeakerIcon from './icons/SpeakerIcon';
import StopCircleIcon from './icons/StopCircleIcon';
import TerminalIcon from './icons/TerminalIcon';
import FileIcon from './icons/FileIcon';

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
  onRetry: (messageId: string) => void;
  loadingMode?: ResearchMode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading, onRetry, loadingMode }) => {
  const isModel = message.role === MessageRole.MODEL;
  const [isPlaying, setIsPlaying] = useState(false);

  // --- Start of JSON parsing logic ---
  // Create a mutable copy of the message to process
  const processedMessage = { ...message };

  if (isModel && processedMessage.text) {
    const jsonMatch = processedMessage.text.match(/```json\n([\s\S]*?)\n```/s);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsedJson = JSON.parse(jsonMatch[1]);

        // Case 1: It's a full research report that wasn't parsed in the service.
        if (parsedJson.report && parsedJson.researchLog) {
          processedMessage.text = parsedJson.report;
          processedMessage.actionLog = parsedJson.researchLog;
          if (parsedJson.creativeOutput) {
            processedMessage.creativeOutput = parsedJson.creativeOutput as CreativeOutput;
          }
        } 
        // Case 2: It's just a research log.
        else if (parsedJson.researchLog) {
          processedMessage.actionLog = parsedJson.researchLog;
          processedMessage.text = processedMessage.text.replace(jsonMatch[0], '').trim();
        } 
        // Case 3: It's a creative output that wasn't parsed.
        else if (parsedJson.type && parsedJson.title && parsedJson.data) {
          processedMessage.creativeOutput = parsedJson as CreativeOutput;
          processedMessage.text = processedMessage.text.replace(jsonMatch[0], '').trim();
        }
      } catch (e) {
        console.warn("ChatMessage: Could not parse JSON from message text. Displaying raw.", e);
      }
    }
  }
  // --- End of JSON parsing logic ---


  const handlePlayPause = () => {
    if (isPlaying) {
      voiceService.stop();
      setIsPlaying(false);
    } else {
      // Use the processed text for speech synthesis
      if (processedMessage.text) {
        voiceService.speak(processedMessage.text, processedMessage.persona || 'default', () => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };
  
  useEffect(() => {
    return () => {
      voiceService.stop();
    };
  }, []);

  if (!isModel) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[85%] space-y-2">
           {message.file && (
              <div className="flex justify-end">
                {message.file.data && message.file.mimeType.startsWith('image/') ? (
                  <img src={message.file.data} alt={message.file.name} className="rounded-lg max-w-xs max-h-64 object-contain border border-[rgb(var(--color-border))]" />
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-[rgb(var(--color-card-bg))] text-[rgb(var(--color-text-primary))] rounded-xl border border-[rgb(var(--color-border))] max-w-full">
                    <FileIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))] shrink-0" />
                    <span className="text-sm font-medium truncate">{message.file.name}</span>
                  </div>
                )}
              </div>
            )}
          {message.text && (
            <div className="bg-[rgb(var(--color-card-bg-hover))] text-[rgb(var(--color-text-primary))] rounded-2xl px-4 py-3">
              <div className="prose prose-sm max-w-none whitespace-pre-wrap">{message.text}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 animate-fade-in justify-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
        <LogoIcon className="w-5 h-5 text-indigo-500" />
      </div>
      <div className="w-full max-w-[calc(100%_-_48px)]">
        <div className="font-bold text-[rgb(var(--color-text-primary))] mb-2">Cognos AI</div>
        <div className="space-y-4">
            <>
              {isLoading && (loadingMode === 'legendary' ? <LegendaryResearchIndicator /> : <ThinkingIndicator />)}
              
              {processedMessage.error && (
                 <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-red-700">Error</p>
                    <p className="text-red-600 mt-1">{processedMessage.error}</p>
                    <button 
                      onClick={() => onRetry(processedMessage.id)}
                      className="mt-3 px-3 py-1 bg-white border border-red-300 text-red-700 text-xs font-semibold rounded-md hover:bg-red-500/20 flex items-center gap-2 transition-colors"
                    >
                      <RetryIcon className="w-3.5 h-3.5" />
                      Retry
                    </button>
                 </div>
              )}
              
              {processedMessage.actionLog && processedMessage.actionLog.length > 0 && (
                <div className="border border-[rgb(var(--color-border))] rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 p-3 border-b border-[rgb(var(--color-border))]">
                    <TerminalIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
                    <h4 className="text-sm font-semibold text-[rgb(var(--color-text-primary))]">Research Log</h4>
                  </div>
                  <div className="p-3 text-xs text-gray-600 font-mono space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
                    {processedMessage.actionLog.map((log, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-2 text-[rgb(var(--color-text-accent))]">»</span>
                        <p className="flex-1">{log}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {processedMessage.toolResult && (
                <ToolResultCard result={processedMessage.toolResult} />
              )}

              {processedMessage.creativeOutput && (
                  <CreativeContentRenderer output={processedMessage.creativeOutput} />
              )}

              {processedMessage.text && (
                <div className={`prose prose-sm max-w-none text-[rgb(var(--color-text-primary))] prose-p:text-[rgb(var(--color-text-primary))] prose-strong:text-[rgb(var(--color-text-primary))] prose-a:text-[rgb(var(--color-text-accent))] prose-headings:text-[rgb(var(--color-text-primary))]`}>
                  <div dangerouslySetInnerHTML={{ __html: processedMessage.text.replace(/\n/g, '<br />') }} />
                </div>
              )}
              
              {!isLoading && !processedMessage.error && (processedMessage.sources || processedMessage.text) && (
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-end">
                  {processedMessage.sources && processedMessage.sources.length > 0 ? (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                        <SourceIcon className="w-4 h-4" />
                        Sources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {processedMessage.sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-gray-100 text-[rgb(var(--color-text-accent))] text-xs rounded-md hover:bg-gray-200 transition-colors truncate max-w-[200px]"
                            title={source.title}
                          >
                            {index + 1}. {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : <div />}

                  {processedMessage.text && (
                    <button 
                      onClick={handlePlayPause}
                      className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-500 transition-colors"
                      aria-label={isPlaying ? 'Stop playback' : 'Play message'}
                      title={isPlaying ? 'Stop' : 'Read aloud'}
                    >
                      {isPlaying ? <StopCircleIcon className="w-5 h-5" /> : <SpeakerIcon className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              )}
            </>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
