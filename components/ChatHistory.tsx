
import React from 'react';
import { type ChatSession } from '../types';
import LogoIcon from './icons/LogoIcon';
import { EditIcon } from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import DiscoverIcon from './icons/DiscoverIcon';
import CloseIcon from './icons/CloseIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onOpenPersonalization: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContent: React.FC<Omit<ChatHistoryProps, 'isOpen' | 'onClose'>> = ({
  sessions,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onOpenPersonalization,
  onNavigate
}) => (
  <>
    {/* Header */}
    <div className="flex-shrink-0 p-4 flex items-center justify-between border-b border-[rgb(var(--color-border))] h-[69px]">
      <a href="#/" onClick={(e) => onNavigate(e, '#/')} className="flex items-center gap-2 text-[rgb(var(--color-text-primary))] hover:opacity-80 transition-opacity">
        <LogoIcon className="w-7 h-7 text-indigo-500 shrink-0" />
        <span className="text-lg font-bold group-hover:opacity-100 opacity-0 transition-opacity whitespace-nowrap delay-150">Cognos AI</span>
      </a>
      <button
        onClick={onNewChat}
        className="p-1.5 rounded-md text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))]"
        title="New Chat"
      >
        <EditIcon className="w-5 h-5" />
      </button>
    </div>

    {/* Chat History List */}
    <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
      <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:opacity-100 opacity-0 transition-opacity whitespace-nowrap delay-150">History</h3>
      {sessions.map((session) => (
        <div
          key={session.id}
          className="group/item relative"
        >
          <button
            onClick={() => onSelectChat(session.id)}
            className={`flex items-center gap-3 w-full text-left rounded-md transition-colors px-3 py-2 text-sm truncate ${
              activeChatId === session.id
                ? 'bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))] font-semibold'
                : 'text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))]'
            }`}
          >
            <ChatBubbleIcon className="w-5 h-5 shrink-0" />
            <span className="truncate group-hover:opacity-100 opacity-0 transition-opacity whitespace-nowrap delay-150">{session.title}</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDeleteChat(session.id); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 opacity-0 group-hover/item:opacity-100 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
            title="Delete Chat"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </nav>

    {/* Footer Actions */}
    <div className="p-2 border-t border-[rgb(var(--color-border))]">
       <a
          href="#/discover"
          onClick={(e) => onNavigate(e, '#/discover')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))] transition-colors"
        >
          <DiscoverIcon className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium group-hover:opacity-100 opacity-0 transition-opacity whitespace-nowrap delay-150">Discover</span>
        </a>
      <button
          onClick={onOpenPersonalization}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg-hover))] hover:text-[rgb(var(--color-text-primary))] transition-colors"
        >
          <UserCircleIcon className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium group-hover:opacity-100 opacity-0 transition-opacity whitespace-nowrap delay-150">Personalize</span>
        </button>
    </div>
  </>
);

const ChatHistory: React.FC<ChatHistoryProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <>
      {/* Mobile Sidebar (off-canvas) */}
      <div 
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 z-50 h-full flex flex-col bg-[rgb(var(--color-bg))] w-72 shadow-xl md:hidden transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent {...props} />
         <button onClick={props.onClose} className={`absolute top-3 right-3 z-50 md:hidden p-2 rounded-full bg-white/50 text-gray-800 ${isOpen ? 'block' : 'hidden'}`}>
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
      
      {/* Desktop Sidebar (persistent, hover-to-expand) */}
      <aside className="hidden md:flex flex-col shrink-0 bg-[rgb(var(--color-bg-alt))] border-r border-[rgb(var(--color-border))] w-20 hover:w-64 transition-all duration-300 ease-in-out group">
          <SidebarContent {...props} />
      </aside>
    </>
  );
};

export default ChatHistory;
