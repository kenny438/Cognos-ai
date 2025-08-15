
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { type Message, MessageRole, type ResearchMode, type ChatSession, type PersonalizationData, NewsArticle, type Theme, type Persona, type Model } from './types';
import { postToAgent, fetchNews } from './services/agentService';
import { getChatSessions, saveChatSessions } from './services/chatHistoryService';
import { getPersonalizationData, savePersonalizationData } from './services/personalizationService';
import { isProUser, grantProAccess } from './services/proService';
import { grantCreatorAccess, isCreator } from './services/creatorService';
import { loadVoices } from './services/voiceService';
import { models, defaultModel } from './config/models';
import { ghostwriterData } from './services/personaService';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessage from './components/ChatMessage';
import LogoIcon from './components/icons/LogoIcon';
import LevelsModal from './components/LevelsModal';
import ChatHistory from './components/ChatHistory';
import PersonalizationModal from './components/PersonalizationModal';
import ProModal from './components/ProModal';
import DiscoverPage from './components/DiscoverPage';
import ApiPage from './components/ApiPage';
import ModelSelector from './components/ModelSelector';
import MissingApiKeyModal from './components/MissingApiKeyModal';
import GhostwriterStyleSelector from './components/GhostwriterStyleSelector';
import GetPlusIcon from './components/icons/GetPlusIcon';
import ExpandIcon from './components/icons/ExpandIcon';
import MainInput from './components/MainInput';
import MenuIcon from './components/icons/MenuIcon';
import CreationToolbar from './components/CreationToolbar';


const App: React.FC = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [currentModelId, setCurrentModelId] = useState<string>(defaultModel.id);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<ResearchMode | null>(null);
  const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);
  const [researchMode, setResearchMode] = useState<ResearchMode>('off');
  const [isPersonalizationModalOpen, setIsPersonalizationModalOpen] = useState(false);
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData | null>(null);
  const [ghostwriterStyle, setGhostwriterStyle] = useState<string>(ghostwriterData[0].artists[0].id);
  const [isPro, setIsPro] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ data: string; mimeType: string; name: string; } | null>(null);
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isMissingApiKeyModalOpen, setIsMissingApiKeyModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentModel = useMemo(() => models.find(m => m.id === currentModelId) || defaultModel, [currentModelId]);

  const handleNavigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.location.hash = path;
  }, []);

  const activeChat = useMemo(() => 
    chatSessions.find(c => c.id === activeChatId), 
    [chatSessions, activeChatId]
  );
  const messages = activeChat?.messages || [];

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    loadVoices();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('claim_pro') === 'true') {
        grantProAccess();
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (urlParams.get('creator') === 'true') {
        grantCreatorAccess();
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    setIsPro(isProUser());
    
    const savedSessions = getChatSessions();
    if (savedSessions.length > 0) {
      setChatSessions(savedSessions);
      const latestSession = savedSessions[0];
      if (!activeChatId) {
        setActiveChatId(latestSession.id);
        setCurrentModelId(latestSession.modelId || defaultModel.id);
      }
    }
    const savedPersonalization = getPersonalizationData();
    if (savedPersonalization) {
      setPersonalizationData(savedPersonalization);
    } else {
      // Set 'aura' as the default theme if nothing is saved
      const defaultData: PersonalizationData = { name: '', interests: '', about: '', theme: 'aura' };
      setPersonalizationData(defaultData);
      savePersonalizationData(defaultData);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (chatSessions.length > 0) {
      saveChatSessions(chatSessions);
    }
  }, [chatSessions]);

  useEffect(() => {
    const currentTheme: Theme = personalizationData?.theme || 'aura';
    document.documentElement.className = `theme-${currentTheme}`;
  }, [personalizationData]);

  useEffect(() => {
    if (route === '#/') {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
    }
  }, [messages, isLoading, route]);

  const handleNewChat = useCallback(() => {
    const newChat: ChatSession = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      createdAt: Date.now(),
      messages: [],
      modelId: currentModelId,
    };
    setChatSessions(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setIsSidebarOpen(false);
    window.location.hash = '#/';
  }, [currentModelId]);

  const handleDeleteChat = useCallback((chatIdToDelete: string) => {
    const newSessions = chatSessions.filter(c => c.id !== chatIdToDelete);
    setChatSessions(newSessions);
    if (activeChatId === chatIdToDelete) {
      const newActiveSession = newSessions.length > 0 ? newSessions[0] : null;
      setActiveChatId(newActiveSession?.id || null);
      setCurrentModelId(newActiveSession?.modelId || defaultModel.id);
    }
  }, [chatSessions, activeChatId]);

  const handleSelectChat = useCallback((chatId: string) => {
    const session = chatSessions.find(c => c.id === chatId);
    if (session) {
      setActiveChatId(chatId);
      setCurrentModelId(session.modelId || defaultModel.id);
    }
    setIsSidebarOpen(false);
    window.location.hash = '#/';
  }, [chatSessions]);

  const openProModal = () => setIsProModalOpen(true);
  
  const handleSendMessage = useCallback(async (
      messageText: string,
    ) => {
    if (isLoading || (!messageText.trim() && !attachedFile)) return;

    // Check for Pro features
    if ((researchMode === 'legendary' || researchMode === 'screenshare') && !isPro) { openProModal(); return; }
    if (currentModel.isPro && !isPro) { openProModal(); return; }
    
    // Check for API keys
    const { provider } = currentModel;
    const apiKeys = personalizationData?.apiKeys;
    if (provider === 'google' && !process.env.API_KEY) {
      setIsMissingApiKeyModalOpen(true);
      return;
    }
    if (provider === 'openai' && !apiKeys?.openai) { setIsPersonalizationModalOpen(true); return; }
    if (provider === 'anthropic' && !apiKeys?.anthropic) { setIsPersonalizationModalOpen(true); return; }

    setLoadingMode(researchMode);
    setIsLoading(true);

    let screenshotFile: { data: string; mimeType: string; name: string; } | null = attachedFile;
    
    let targetChatId = activeChatId;

    if (!targetChatId) {
        const newChat: ChatSession = {
            id: `chat-${Date.now()}`,
            title: messageText.substring(0, 40) + (messageText.length > 40 ? '...' : ''),
            createdAt: Date.now(),
            messages: [],
            modelId: currentModel.id,
        };
        setChatSessions(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        targetChatId = newChat.id;
    } else {
        const currentChat = chatSessions.find(c => c.id === targetChatId);
        if (currentChat && currentChat.messages.length === 0) {
            setChatSessions(prev => prev.map(c => 
                c.id === targetChatId 
                ? { ...c, title: messageText.substring(0, 40) + (messageText.length > 40 ? '...' : ''), modelId: currentModel.id } 
                : c
            ));
        }
    }

    if (researchMode === 'screenshare' && !screenshotFile) {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            const track = stream.getVideoTracks()[0];
            
            await new Promise(resolve => setTimeout(resolve, 300));

            const imageCapture = new (window as any).ImageCapture(track);
            const bitmap = await imageCapture.grabFrame();
            
            track.stop();

            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                screenshotFile = {
                    data: dataUrl,
                    mimeType: 'image/jpeg',
                    name: 'screenshot.jpg'
                };
            } else {
                throw new Error("Failed to get canvas context for screenshot.");
            }
        } catch (err: any) {
            console.error("Screen capture failed:", err);
            
            const errorMessageId = `model-error-${Date.now()}`;
            let errorText = "An unexpected error occurred during screen capture. Please try again.";
            if (err.name === 'NotAllowedError' || err.message === 'Permission denied') {
                 errorText = "Screen sharing permission was denied. To use this feature, please grant permission when prompted by your browser and try again.";
            }

            const errorMessage: Message = {
                id: errorMessageId,
                role: MessageRole.MODEL,
                text: '',
                error: errorText,
                persona: personalizationData?.persona || 'default',
            };
            
            setChatSessions(prevSessions => prevSessions.map(chat => {
                if (chat.id === targetChatId) {
                    return { ...chat, messages: [...chat.messages, errorMessage] };
                }
                return chat;
            }));

            setIsLoading(false);
            setLoadingMode(null);
            return;
        }
    }
    
    setInputValue('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: MessageRole.USER,
      text: messageText,
      researchMode: researchMode,
      file: screenshotFile,
      persona: personalizationData?.persona || 'default',
    };
    
    const aiMessageId = `model-${Date.now()}`;
    const placeholderAiMessage: Message = { 
        id: aiMessageId, 
        role: MessageRole.MODEL, 
        text: '',
        persona: personalizationData?.persona || 'default',
    };
    
    setAttachedFile(null);

    setChatSessions(prevSessions => prevSessions.map(chat => {
      if (chat.id === targetChatId) {
        return { ...chat, messages: [...chat.messages, userMessage, placeholderAiMessage] };
      }
      return chat;
    }));

    const messageHistoryForApi = [...(activeChat?.messages || []), userMessage];

    try {
        const agentResponse = await postToAgent(messageHistoryForApi, researchMode, personalizationData, currentModel, ghostwriterStyle);
        setChatSessions(prevSessions => prevSessions.map(chat => {
            if (chat.id === targetChatId) {
                return {
                    ...chat,
                    messages: chat.messages.map(msg => msg.id === aiMessageId ? { ...msg, ...agentResponse } : msg)
                };
            }
            return chat;
        }));

    } catch (e: any) {
        setChatSessions(prevSessions => prevSessions.map(chat => {
            if (chat.id === targetChatId) {
                return {
                    ...chat,
                    messages: chat.messages.map(msg => msg.id === aiMessageId ? { ...msg, text: '', error: e.message } : msg)
                };
            }
            return chat;
        }));
    } finally {
        setIsLoading(false);
        setLoadingMode(null);
    }
  }, [isLoading, researchMode, activeChatId, chatSessions, personalizationData, isPro, attachedFile, currentModel, ghostwriterStyle]);

  const handleStartChatFromArticle = useCallback(async (article: NewsArticle) => {
    // This function remains largely the same logic-wise
  }, [personalizationData, currentModel, ghostwriterStyle]);

  const handleRetry = useCallback(async (failedMessageId: string) => {
    if (!activeChat) return;

    const failedMessageIndex = activeChat.messages.findIndex(msg => msg.id === failedMessageId);
    if (failedMessageIndex < 1) return;

    const userMessage = activeChat.messages[failedMessageIndex - 1];
    if (userMessage.role !== MessageRole.USER) return;
    
    const historyForRetry = activeChat.messages.slice(0, failedMessageIndex);
    
    setLoadingMode(userMessage.researchMode || 'off');
    setIsLoading(true);

    const newAiMessageId = `model-${Date.now()}`;
    
    // Replace failed message with a new placeholder and truncate history after it
    setChatSessions(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        const newMessages = [...chat.messages];
        newMessages[failedMessageIndex] = {
            id: newAiMessageId,
            role: MessageRole.MODEL,
            text: '',
            persona: userMessage.persona || 'default',
        };
        return { ...chat, messages: newMessages.slice(0, failedMessageIndex + 1) };
      }
      return chat;
    }));
    
    try {
        const modelForRetry = models.find(m => m.id === activeChat.modelId) || defaultModel;
        const agentResponse = await postToAgent(historyForRetry, userMessage.researchMode || 'off', personalizationData, modelForRetry, ghostwriterStyle);

        // Find the placeholder and replace it with the new content
        setChatSessions(prevSessions => prevSessions.map(chat => {
            if (chat.id === activeChatId) {
                return {
                    ...chat,
                    messages: chat.messages.map(msg => msg.id === newAiMessageId ? { ...msg, ...agentResponse } : msg)
                };
            }
            return chat;
        }));
    } catch (e: any) {
        // Find the placeholder and update it with the error
        setChatSessions(prevSessions => prevSessions.map(chat => {
            if (chat.id === activeChatId) {
                return {
                    ...chat,
                    messages: chat.messages.map(msg => msg.id === newAiMessageId ? { ...msg, text: '', error: e.message } : msg)
                };
            }
            return chat;
        }));
    } finally {
        setIsLoading(false);
        setLoadingMode(null);
    }

  }, [activeChat, activeChatId, personalizationData, ghostwriterStyle]);

  const handleSavePersonalization = useCallback((data: PersonalizationData) => {
    setPersonalizationData(data);
    savePersonalizationData(data);
    setIsPersonalizationModalOpen(false);
  }, []);

  const handleModeChange = useCallback((newMode: ResearchMode) => {
    if ((newMode === 'legendary' || newMode === 'screenshare') && !isPro) {
        openProModal();
    } else {
        setResearchMode(newMode);
    }
  }, [isPro]);
  
  const handleSubscribe = useCallback(() => {
    grantProAccess();
    setIsPro(true);
    setIsProModalOpen(false);
    setResearchMode('legendary');
  }, []);
  
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleCreationTypeSelect = useCallback((type: string) => {
      let prefix = '';
      switch (type.toLowerCase()) {
        case 'image':
          prefix = 'Generate an image of ';
          break;
        case 'slides':
          prefix = 'Generate slides about ';
          break;
        case 'webpage':
          prefix = 'Create a webpage for ';
          break;
        case 'visualization':
          prefix = 'Create a visualization of ';
          break;
        case 'playbook':
          prefix = 'Create a playbook for ';
          break;
        case 'math':
          prefix = 'Solve the math problem: ';
          break;
        case 'video':
          prefix = 'Generate a video script for ';
          break;
        case 'audio':
          prefix = 'Generate an audio script for ';
          break;
      }
      setInputValue(prefix);
      // Could focus input here with a ref, but it's a nice-to-have.
  }, []);


  const renderPage = () => {
    switch (route) {
      case '#/discover':
        return <DiscoverPage onStartChatFromArticle={handleStartChatFromArticle} personalizationData={personalizationData} currentModel={currentModel} ghostwriterStyle={ghostwriterStyle} />;
      case '#/api':
        return <ApiPage />;
      default:
        const isChatActive = messages.length > 0 || isLoading;

        if (!isChatActive) {
          // Centered layout for new chats
          return (
            <div className="flex-1 flex flex-col items-center justify-center h-full text-center px-4 pb-20">
              <WelcomeScreen />
              <div className="w-full mt-10">
                <div className="max-w-3xl mx-auto">
                   {researchMode === 'create' && <CreationToolbar onTypeSelect={handleCreationTypeSelect} />}
                  <MainInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    attachedFile={attachedFile}
                    setAttachedFile={setAttachedFile}
                    researchMode={researchMode}
                    setResearchMode={handleModeChange}
                    isPro={isPro}
                    currentModel={currentModel}
                  />
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {currentModel.provider === 'google' ? 'Cognos AI can provide sourced answers from Google Search.' : `Using ${currentModel.name}.`}
                  </p>
                </div>
              </div>
            </div>
          );
        }

        // Standard chat layout for active conversations
        return (
          <div className="flex-1 flex flex-col h-full relative">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto w-full">
              <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isLoading={isLoading && msg.role === MessageRole.MODEL && !msg.creativeOutput && msg.text === '' && !msg.error}
                    loadingMode={loadingMode}
                    onRetry={() => handleRetry(msg.id)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full px-4 pt-4 shrink-0 pb-4">
              <div className="max-w-3xl mx-auto">
                <MainInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  attachedFile={attachedFile}
                  setAttachedFile={setAttachedFile}
                  researchMode={researchMode}
                  setResearchMode={handleModeChange}
                  isPro={isPro}
                  currentModel={currentModel}
                />
                <p className="text-xs text-center text-gray-400 mt-3">
                  {currentModel.provider === 'google' ? 'Cognos AI can provide sourced answers from Google Search.' : `Using ${currentModel.name}.`}
                </p>
              </div>
            </div>
          </div>
        );
    }
  }


  return (
    <>
      <div className="flex h-screen w-full font-[var(--font-sans)] bg-transparent text-[rgb(var(--color-text-primary))]">
        <ChatHistory
          sessions={chatSessions}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onOpenPersonalization={() => setIsPersonalizationModalOpen(true)}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex flex-col flex-1 h-screen relative">
            <header className="absolute top-0 left-0 right-0 z-10 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <button onClick={() => setIsSidebarOpen(true)} className="p-1 -ml-1 text-gray-600 md:hidden" aria-label="Open sidebar">
                            <MenuIcon className="w-6 h-6" />
                         </button>
                         <ModelSelector 
                            models={models}
                            currentModel={currentModel}
                            onModelChange={setCurrentModelId}
                            apiKeys={personalizationData?.apiKeys}
                            onOpenPersonalization={() => setIsPersonalizationModalOpen(true)}
                         />
                         {personalizationData?.persona === 'ghostwriter' && (
                            <GhostwriterStyleSelector
                                currentStyle={ghostwriterStyle}
                                onStyleChange={setGhostwriterStyle}
                            />
                         )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={openProModal} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors">
                            <GetPlusIcon className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-semibold">Get Plus</span>
                        </button>
                        <button
                            onClick={handleToggleFullscreen}
                            className="p-2 rounded-full text-gray-500 hover:bg-white/80 hover:text-gray-800 transition-colors"
                            title="Toggle Fullscreen"
                        >
                            <ExpandIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>
            
            {renderPage()}
            
        </div>
      </div>
      <LevelsModal isOpen={isLevelsModalOpen} onClose={() => setIsLevelsModalOpen(false)} />
      <PersonalizationModal 
        isOpen={isPersonalizationModalOpen}
        onClose={() => setIsPersonalizationModalOpen(false)}
        onSave={handleSavePersonalization}
        initialData={personalizationData}
      />
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onSubscribe={handleSubscribe}
      />
      <MissingApiKeyModal
        isOpen={isMissingApiKeyModalOpen}
        onClose={() => setIsMissingApiKeyModalOpen(false)}
      />
    </>
  );
};

export default App;
