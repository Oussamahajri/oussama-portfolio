export interface AIQuickPrompt {
  id: string;
  label: string;
  query: string;
  category: 'identity' | 'skills' | 'projects' | 'recruiter' | 'vision';
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  codeSnippet?: string;
  tags?: string[];
  suggestedFollowups?: string[];
  streaming?: boolean;
}

export interface AIKnowledgeItem {
  id: string;
  triggers: string[];
  response: string;
  codeSnippet?: string;
  relatedCategory: string;
  suggestedFollowups?: string[];
}
