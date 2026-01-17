/**
 * Ječas AI - Chat API Endpoint
 *
 * POST /api/chat
 *
 * Request body:
 * {
 *   messages: Array<{ role: 'user' | 'assistant', content: string }>,
 *   sessionId?: string
 * }
 *
 * Response:
 * {
 *   message: string,
 *   sources: Array<{ title: string, slug: string }>,
 *   sessionId: string
 * }
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js';
import {
	SUPABASE_URL,
	SUPABASE_SERVICE_KEY,
	OPENAI_API_KEY,
	ANTHROPIC_API_KEY
} from '$env/static/private';

// Types
interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

interface Source {
	title: string;
	slug: string;
	similarity?: number;
}

interface SearchResult {
	article_slug: string;
	article_title: string;
	chunk_text: string;
	similarity: number;
}

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Rate limit config
const FREE_LIMIT = 10;
const BASIC_LIMIT = 100;
const PRO_LIMIT = 500;

/**
 * Generate embedding for query
 */
async function generateQueryEmbedding(query: string): Promise<number[]> {
	const response = await fetch('https://api.openai.com/v1/embeddings', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'text-embedding-ada-002',
			input: query
		})
	});

	if (!response.ok) {
		throw new Error('Failed to generate embedding');
	}

	const data = await response.json();
	return data.data[0].embedding;
}

/**
 * Search for relevant article chunks
 */
async function searchArticles(queryEmbedding: number[], limit = 5): Promise<SearchResult[]> {
	const { data, error: searchError } = await supabase.rpc('search_articles', {
		query_embedding: queryEmbedding,
		match_count: limit,
		match_threshold: 0.65
	});

	if (searchError) {
		console.error('Search error:', searchError);
		return [];
	}

	return data || [];
}

/**
 * Build context from search results
 */
function buildContext(results: SearchResult[]): { context: string; sources: Source[] } {
	if (!results.length) {
		return { context: '', sources: [] };
	}

	const sources: Source[] = [];
	const contextParts: string[] = [];

	for (const result of results) {
		// Avoid duplicates
		if (!sources.find((s) => s.slug === result.article_slug)) {
			sources.push({
				title: result.article_title,
				slug: result.article_slug,
				similarity: result.similarity
			});
		}

		contextParts.push(`### ${result.article_title}\n${result.chunk_text}\n[Zdroj: /${result.article_slug}]`);
	}

	return {
		context: contextParts.join('\n\n---\n\n'),
		sources
	};
}

/**
 * Call Anthropic API
 */
async function callClaude(
	systemPrompt: string,
	messages: ChatMessage[]
): Promise<string> {
	const response = await fetch('https://api.anthropic.com/v1/messages', {
		method: 'POST',
		headers: {
			'x-api-key': ANTHROPIC_API_KEY,
			'anthropic-version': '2023-06-01',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 1024,
			system: systemPrompt,
			messages: messages.map((m) => ({
				role: m.role,
				content: m.content
			}))
		})
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error('Anthropic API error:', errorText);
		throw new Error('Failed to get AI response');
	}

	const data = await response.json();

	if (data.content && data.content[0] && data.content[0].type === 'text') {
		return data.content[0].text;
	}

	throw new Error('Unexpected response format');
}

/**
 * Check rate limit for user
 */
async function checkRateLimit(userIdentifier: string): Promise<{ allowed: boolean; remaining: number }> {
	// Get user subscription tier
	const { data: subscription } = await supabase
		.from('ai_subscriptions')
		.select('tier, message_limit')
		.eq('user_email', userIdentifier)
		.single();

	const limit = subscription?.message_limit || FREE_LIMIT;

	// Check and increment usage
	const { data: allowed } = await supabase.rpc('check_and_increment_usage', {
		p_user_identifier: userIdentifier,
		p_max_messages: limit
	});

	// Get current usage
	const { data: usage } = await supabase
		.from('chat_usage')
		.select('message_count')
		.eq('user_identifier', userIdentifier)
		.eq('date', new Date().toISOString().split('T')[0])
		.single();

	const used = usage?.message_count || 0;

	return {
		allowed: allowed ?? false,
		remaining: Math.max(0, limit - used)
	};
}

/**
 * Get or create session
 */
async function getOrCreateSession(sessionId?: string, userEmail?: string): Promise<string> {
	if (sessionId) {
		// Verify session exists
		const { data } = await supabase
			.from('chat_sessions')
			.select('id')
			.eq('id', sessionId)
			.single();

		if (data) return sessionId;
	}

	// Create new session
	const { data, error: insertError } = await supabase
		.from('chat_sessions')
		.insert({
			user_email: userEmail,
			is_premium: false
		})
		.select('id')
		.single();

	if (insertError || !data) {
		throw new Error('Failed to create session');
	}

	return data.id;
}

/**
 * Save message to database
 */
async function saveMessage(
	sessionId: string,
	role: 'user' | 'assistant',
	content: string,
	sources?: Source[]
): Promise<void> {
	await supabase.from('chat_messages').insert({
		session_id: sessionId,
		role,
		content,
		sources: sources || []
	});
}

/**
 * Track query for analytics
 */
async function trackQuery(query: string, sources: Source[]): Promise<void> {
	await supabase.rpc('track_query', {
		p_query: query,
		p_sources: sources.map((s) => s.slug)
	});
}

// System prompt
const SYSTEM_PROMPT = `Jsi Ječas AI, přátelský a odborný asistent pro webdesign a frontend development.

PRAVIDLA:
1. Odpovídej VŽDY česky, přirozeně a srozumitelně
2. Odpovědi zakládej primárně na poskytnutém kontextu z článků
3. Pokud kontext obsahuje relevantní informace, vždy cituj zdroj ve formátu: [Název článku](/slug)
4. Pokud téma není v kontextu, můžeš odpovědět z obecných znalostí, ale upozorni na to
5. Buď stručný ale kompletní - preferuj kratší, jasné odpovědi
6. Používej code snippety kde je to vhodné (markdown formát)
7. Pokud si nejsi jistý, řekni to upřímně
8. Buď přátelský a povzbuzující, ale ne přehnaně

FORMÁT ODPOVĚDÍ:
- Používej markdown pro strukturování (nadpisy, seznamy, code blocks)
- Code snippety vždy s označením jazyka (\`\`\`css, \`\`\`javascript, atd.)
- Na konci odpovědi můžeš navrhnout související otázky

KONTEXT Z ČLÁNKŮ:`;

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
	try {
		const body = await request.json();
		const { messages, sessionId: requestSessionId } = body;

		// Validate input
		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			throw error(400, 'Messages array is required');
		}

		const lastMessage = messages[messages.length - 1];
		if (lastMessage.role !== 'user') {
			throw error(400, 'Last message must be from user');
		}

		const query = lastMessage.content;
		if (!query || query.length > 2000) {
			throw error(400, 'Query must be between 1 and 2000 characters');
		}

		// Get user identifier (email from cookie or IP)
		const userEmail = cookies.get('user_email');
		const userIdentifier = userEmail || getClientAddress();

		// Check rate limit
		const rateLimit = await checkRateLimit(userIdentifier);
		if (!rateLimit.allowed) {
			return json(
				{
					error: 'Denní limit zpráv vyčerpán',
					message: 'Dosáhl jsi denního limitu zpráv. Pro více zpráv si pořiď premium předplatné.',
					remaining: 0
				},
				{ status: 429 }
			);
		}

		// Get or create session
		const sessionId = await getOrCreateSession(requestSessionId, userEmail);

		// Save user message
		await saveMessage(sessionId, 'user', query);

		// Generate embedding for query
		const queryEmbedding = await generateQueryEmbedding(query);

		// Search for relevant articles
		const searchResults = await searchArticles(queryEmbedding);

		// Build context
		const { context, sources } = buildContext(searchResults);

		// Build system prompt with context
		const fullSystemPrompt = context
			? `${SYSTEM_PROMPT}\n\n${context}`
			: `${SYSTEM_PROMPT}\n\nŽádný relevantní kontext nebyl nalezen. Odpověz z obecných znalostí, ale upozorni uživatele, že toto téma není pokryto v článcích na Ječas.cz.`;

		// Filter messages for API (only last 10 for context window)
		const recentMessages = messages.slice(-10).map((m: ChatMessage) => ({
			role: m.role,
			content: m.content
		}));

		// Call Claude
		const response = await callClaude(fullSystemPrompt, recentMessages);

		// Save assistant message
		await saveMessage(sessionId, 'assistant', response, sources);

		// Track query for analytics
		await trackQuery(query, sources);

		return json({
			message: response,
			sources: sources.map((s) => ({ title: s.title, slug: s.slug })),
			sessionId,
			remaining: rateLimit.remaining - 1
		});
	} catch (err) {
		console.error('Chat API error:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		throw error(500, 'Něco se pokazilo. Zkuste to prosím znovu.');
	}
};

// GET endpoint for session info
export const GET: RequestHandler = async ({ url, cookies, getClientAddress }) => {
	const sessionId = url.searchParams.get('sessionId');

	// Get user identifier
	const userEmail = cookies.get('user_email');
	const userIdentifier = userEmail || getClientAddress();

	// Get subscription info
	const { data: subscription } = await supabase
		.from('ai_subscriptions')
		.select('tier, message_limit')
		.eq('user_email', userIdentifier)
		.single();

	// Get today's usage
	const { data: usage } = await supabase
		.from('chat_usage')
		.select('message_count')
		.eq('user_identifier', userIdentifier)
		.eq('date', new Date().toISOString().split('T')[0])
		.single();

	const limit = subscription?.message_limit || FREE_LIMIT;
	const used = usage?.message_count || 0;

	// Get session messages if sessionId provided
	let messages: ChatMessage[] = [];
	if (sessionId) {
		const { data } = await supabase
			.from('chat_messages')
			.select('role, content')
			.eq('session_id', sessionId)
			.order('created_at', { ascending: true });

		messages = data || [];
	}

	return json({
		tier: subscription?.tier || 'free',
		limit,
		used,
		remaining: Math.max(0, limit - used),
		messages
	});
};
