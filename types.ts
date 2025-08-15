export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  TOOL = 'tool'
}

export type ResearchMode = 'off' | 'create' | 'deep' | 'legendary' | 'screenshare';

export type ModelProvider = 'google' | 'openai' | 'anthropic';

export interface Model {
  id: string;
  name: string;
  provider: ModelProvider;
  isPro?: boolean;
}

export interface Source {
  uri: string;
  title: string;
}

export interface ToolResult {
  name:string;
  data: any;
}

export interface CreativeOutput {
  type: 'flashcards' | 'spreadsheet' | 'webpage' | 'react_app' | 'binary_animation' | 'image' | 'slides' | 'visualization' | 'playbook' | 'video_script' | 'audio_script' | 'math_solution' | string;
  title: string;
  data: any;
}

export interface AgentResponse {
  text: string;
  sources?: Source[];
  toolResult?: ToolResult;
  creativeOutput?: CreativeOutput;
  error?: string;
  actionLog?: string[];
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  file?: {
    data: string; // base64 data URL
    mimeType: string;
    name: string;
  };
  sources?: Source[];
  toolResult?: ToolResult;
  creativeOutput?: CreativeOutput;
  error?: string;
  researchMode?: ResearchMode;
  persona?: Persona;
  actionLog?: string[];
}

export interface ChatSession {
  id: string;
  title:string;
  createdAt: number;
  messages: Message[];
  modelId: string;
}

export type Theme = 'aura' | 'default' | 'perplexity' | 'manus' | 'cyberpunk' | 'retro' | 'bugatti';
export type Persona = 'default' | 'unhinged' | 'storyteller' | 'romantic' | 'genius' | 'conspiracy' | 'therapist' | 'grok_doc' | 'meditation' | 'sexy' | 'professor' | 'code_wizard' | 'historian' | 'comedian' | 'fitness_coach' | 'kanye_west' | 'movie_buff' | 'music_snob' | 'drill_sergeant' | 'ghostwriter';

export interface PersonalizationData {
  name: string;
  interests: string;
  about: string;
  theme?: Theme;
  persona?: Persona;
  customFields?: { key: string; value: string }[];
  apiKeys?: {
    openai?: string;
    anthropic?: string;
  }
}

export interface NewsArticle {
    title: string;
    summary: string;
    url: string;
    imageUrl?: string;
}
