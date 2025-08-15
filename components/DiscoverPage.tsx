import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/agentService';
import { type NewsArticle, type PersonalizationData, type Model } from '../types';
import SpinnerIcon from './icons/SpinnerIcon';
import QuickChatSpotlight from './QuickChatSpotlight';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

interface DiscoverPageProps {
  onStartChatFromArticle: (article: NewsArticle) => void;
  personalizationData: PersonalizationData | null;
  currentModel: Model;
  ghostwriterStyle: string;
}

const NewsCard: React.FC<{ article: NewsArticle; onClick: () => void }> = ({ article, onClick }) => (
  <div 
    className="bg-[rgb(var(--color-card-bg))] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col group"
    onClick={onClick}
  >
    <div className="h-40 overflow-hidden">
      <img 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        src={article.imageUrl || `https://source.unsplash.com/random/400x200?news&q=${encodeURIComponent(article.title)}`}
        alt={article.title}
        onError={(e) => { e.currentTarget.src = `https://source.unsplash.com/random/400x200?abstract&q=${encodeURIComponent(article.title)}` }}
      />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-[rgb(var(--color-text-primary))] mb-2 leading-tight">{article.title}</h3>
      <p className="text-sm text-[rgb(var(--color-text-secondary))] flex-grow mb-4">{article.summary}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-xs font-semibold text-[rgb(var(--color-text-accent))] hover:text-[rgb(var(--color-primary))] transition-colors self-start"
      >
        Read More
      </a>
    </div>
  </div>
);

const DiscoverPage: React.FC<DiscoverPageProps> = ({ onStartChatFromArticle, personalizationData, currentModel, ghostwriterStyle }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const articles = await fetchNews();
        setNews(articles);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <>
      <main className="flex-1 bg-[rgb(var(--color-bg))] overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-2">Discover</h1>
          <p className="text-md text-[rgb(var(--color-text-secondary))] mb-8">Here are the latest headlines. Click on an article to start a conversation with Cognos.</p>
          
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <SpinnerIcon className="w-10 h-10 text-[rgb(var(--color-primary))] animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <NewsCard key={index} article={article} onClick={() => onStartChatFromArticle(article)} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <button 
        onClick={() => setIsSpotlightOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] rounded-full shadow-lg flex items-center justify-center hover:bg-[rgb(var(--color-primary-hover))] transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary))]"
        title="Quick Chat"
        aria-label="Open quick chat"
      >
        <ChatBubbleIcon className="w-8 h-8" />
      </button>

      {isSpotlightOpen && (
        <QuickChatSpotlight
          onClose={() => setIsSpotlightOpen(false)}
          personalizationData={personalizationData}
          currentModel={currentModel}
          ghostwriterStyle={ghostwriterStyle}
        />
      )}
    </>
  );
};

export default DiscoverPage;