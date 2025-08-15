
import { type ChatSession } from '../types';
import { defaultModel } from '../config/models';

const CHAT_HISTORY_KEY = 'cognos_ai_chat_history';

/**
 * Retrieves all chat sessions from local storage.
 * @returns An array of ChatSession objects.
 */
export function getChatSessions(): ChatSession[] {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!saved) return [];
    
    let sessions = JSON.parse(saved) as ChatSession[];
    // For backward compatibility, add default modelId if missing
    sessions = sessions.map(s => ({ ...s, modelId: s.modelId || defaultModel.id }));
    // Sort by createdAt descending to show newest first
    return sessions.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Failed to parse chat history from localStorage", error);
    return [];
  }
}

/**
 * Saves all chat sessions to local storage, stripping large file data to prevent quota errors.
 * @param sessions An array of ChatSession objects to save.
 */
export function saveChatSessions(sessions: ChatSession[]): void {
  try {
    // Sanitize sessions to remove large file data before saving
    const sanitizedSessions = sessions.map(session => ({
      ...session,
      messages: session.messages.map(message => {
        // If the message has a file with data, strip the data for storage
        if (message.file && message.file.data) {
          const { data, ...fileMetadata } = message.file;
          return { ...message, file: fileMetadata };
        }
        return message;
      })
    }));

    const dataToSave = JSON.stringify(sanitizedSessions);
    localStorage.setItem(CHAT_HISTORY_KEY, dataToSave);
  } catch (error) {
    console.error("Failed to save chat history to localStorage", error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error("CRITICAL: LocalStorage quota exceeded even after sanitization. The chat history is too large to be saved.");
      // In a real app, we might show a user-facing error here.
    }
  }
}
