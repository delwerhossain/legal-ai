export type Role = 'user' | 'assistant' | 'system' | 'lawyer';

export interface Message {
  id: string;
  content: string;
  role: Role;
  timestamp: Date;
  codeSnippets?: CodeSnippet[];
}

export interface CodeSnippet {
  id: string;
  language: string;
  code: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
  type: 'general' | 'lawyer';
}