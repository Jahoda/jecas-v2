/**
 * Ječas AI Module
 *
 * AI-powered chat assistant for web design questions,
 * using RAG (Retrieval Augmented Generation) over 1082 articles.
 */

// Re-export components
export { default as ChatWidget } from './ChatWidget.svelte';

// Re-export utilities
export { indexAllArticles, deleteArticleEmbeddings, reindexArticle } from './embeddings';

// Types
export interface ChatMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	sources?: Array<{ title: string; slug: string }>;
	timestamp: Date;
}

export interface SessionInfo {
	tier: 'free' | 'basic' | 'pro' | 'unlimited';
	limit: number;
	used: number;
	remaining: number;
}
