/**
 * Ječas AI - Embedding Pipeline
 *
 * This module handles indexing all articles into vector embeddings
 * for semantic search in the AI chat.
 *
 * Usage:
 *   pnpm run index-articles
 *
 * Requires:
 *   - OPENAI_API_KEY (for embeddings)
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_KEY
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { glob } from 'glob';
import matter from 'gray-matter';
import { marked } from 'marked';

// Types
interface ArticleChunk {
	slug: string;
	title: string;
	chunkIndex: number;
	text: string;
	metadata: {
		tags?: string[];
		date?: string;
		description?: string;
	};
}

interface EmbeddingResponse {
	data: Array<{
		embedding: number[];
		index: number;
	}>;
	usage: {
		prompt_tokens: number;
		total_tokens: number;
	};
}

// Configuration
const CHUNK_SIZE = 1500; // characters per chunk
const CHUNK_OVERLAP = 200; // overlap between chunks
const EMBEDDING_MODEL = 'text-embedding-ada-002';
const BATCH_SIZE = 10; // articles to process in parallel

/**
 * Initialize Supabase client
 */
function getSupabaseClient(): SupabaseClient {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_KEY;

	if (!url || !key) {
		throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
	}

	return createClient(url, key);
}

/**
 * Generate embedding for text using OpenAI API
 */
async function generateEmbedding(text: string): Promise<number[]> {
	const apiKey = process.env.OPENAI_API_KEY;

	if (!apiKey) {
		throw new Error('Missing OPENAI_API_KEY');
	}

	const response = await fetch('https://api.openai.com/v1/embeddings', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: EMBEDDING_MODEL,
			input: text
		})
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`OpenAI API error: ${error}`);
	}

	const data: EmbeddingResponse = await response.json();
	return data.data[0].embedding;
}

/**
 * Strip HTML tags and normalize text
 */
function stripHtml(html: string): string {
	return html
		.replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, ' [code block] ') // Replace code blocks
		.replace(/<code[^>]*>([^<]*)<\/code>/gi, '$1') // Keep inline code content
		.replace(/<[^>]*>/g, '') // Remove all HTML tags
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();
}

/**
 * Split text into overlapping chunks
 */
function chunkText(text: string, slug: string, title: string, metadata: ArticleChunk['metadata']): ArticleChunk[] {
	const chunks: ArticleChunk[] = [];

	// Split by paragraphs first
	const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 50);

	let currentChunk = '';
	let chunkIndex = 0;

	for (const paragraph of paragraphs) {
		// If adding this paragraph would exceed chunk size
		if (currentChunk.length + paragraph.length > CHUNK_SIZE && currentChunk.length > 0) {
			// Save current chunk
			chunks.push({
				slug,
				title,
				chunkIndex: chunkIndex++,
				text: currentChunk.trim(),
				metadata
			});

			// Start new chunk with overlap from previous
			const words = currentChunk.split(' ');
			const overlapWords = words.slice(-Math.floor(CHUNK_OVERLAP / 5)); // Approximate word count
			currentChunk = overlapWords.join(' ') + ' ' + paragraph;
		} else {
			currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
		}
	}

	// Don't forget the last chunk
	if (currentChunk.trim().length > 50) {
		chunks.push({
			slug,
			title,
			chunkIndex: chunkIndex++,
			text: currentChunk.trim(),
			metadata
		});
	}

	return chunks;
}

/**
 * Process a single article file
 */
async function processArticle(
	filePath: string
): Promise<{ slug: string; chunks: ArticleChunk[] } | null> {
	try {
		const content = await Bun.file(filePath).text();
		const { data: frontmatter, content: body } = matter(content);

		// Skip drafts
		if (frontmatter.draft) {
			return null;
		}

		// Extract slug from file path
		const slug = filePath.replace(/^.*\/posts\//, '').replace(/\.md$/, '');

		// Convert markdown to HTML, then strip to plain text
		const html = await marked.parse(body);
		const plainText = stripHtml(html);

		// Skip very short articles
		if (plainText.length < 100) {
			return null;
		}

		// Create chunks
		const chunks = chunkText(plainText, slug, frontmatter.title || slug, {
			tags: frontmatter.tags,
			date: frontmatter.date,
			description: frontmatter.description
		});

		return { slug, chunks };
	} catch (error) {
		console.error(`Error processing ${filePath}:`, error);
		return null;
	}
}

/**
 * Index a single chunk into Supabase
 */
async function indexChunk(supabase: SupabaseClient, chunk: ArticleChunk): Promise<boolean> {
	try {
		// Generate embedding
		const embedding = await generateEmbedding(chunk.text);

		// Upsert into database
		const { error } = await supabase.from('article_embeddings').upsert(
			{
				article_slug: chunk.slug,
				article_title: chunk.title,
				chunk_index: chunk.chunkIndex,
				chunk_text: chunk.text,
				embedding: embedding,
				metadata: chunk.metadata,
				updated_at: new Date().toISOString()
			},
			{
				onConflict: 'article_slug,chunk_index'
			}
		);

		if (error) {
			console.error(`Error indexing ${chunk.slug}[${chunk.chunkIndex}]:`, error);
			return false;
		}

		return true;
	} catch (error) {
		console.error(`Error indexing ${chunk.slug}[${chunk.chunkIndex}]:`, error);
		return false;
	}
}

/**
 * Main indexing function
 */
export async function indexAllArticles(options?: {
	verbose?: boolean;
	dryRun?: boolean;
	limit?: number;
}): Promise<{
	total: number;
	indexed: number;
	chunks: number;
	errors: number;
}> {
	const { verbose = false, dryRun = false, limit } = options || {};

	console.log('🚀 Starting article indexing...');
	console.log(`   Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);

	const supabase = dryRun ? null : getSupabaseClient();

	// Find all markdown files
	let files = await glob('content/posts/**/*.md');

	// Apply limit if specified
	if (limit) {
		files = files.slice(0, limit);
	}

	console.log(`📚 Found ${files.length} articles to process`);

	let totalChunks = 0;
	let indexedChunks = 0;
	let errors = 0;
	let processedArticles = 0;

	// Process in batches
	for (let i = 0; i < files.length; i += BATCH_SIZE) {
		const batch = files.slice(i, i + BATCH_SIZE);

		const results = await Promise.all(batch.map(processArticle));

		for (const result of results) {
			if (!result) continue;

			processedArticles++;
			totalChunks += result.chunks.length;

			if (verbose) {
				console.log(`📄 ${result.slug}: ${result.chunks.length} chunks`);
			}

			if (!dryRun && supabase) {
				for (const chunk of result.chunks) {
					const success = await indexChunk(supabase, chunk);
					if (success) {
						indexedChunks++;
					} else {
						errors++;
					}

					// Rate limiting - OpenAI has limits
					await new Promise((resolve) => setTimeout(resolve, 100));
				}
			}
		}

		// Progress update
		const progress = Math.round(((i + batch.length) / files.length) * 100);
		console.log(`⏳ Progress: ${progress}% (${i + batch.length}/${files.length})`);
	}

	console.log('\n✅ Indexing complete!');
	console.log(`   Articles processed: ${processedArticles}`);
	console.log(`   Total chunks: ${totalChunks}`);
	console.log(`   Indexed chunks: ${indexedChunks}`);
	console.log(`   Errors: ${errors}`);

	return {
		total: processedArticles,
		indexed: indexedChunks,
		chunks: totalChunks,
		errors
	};
}

/**
 * Delete all embeddings for an article
 */
export async function deleteArticleEmbeddings(slug: string): Promise<boolean> {
	const supabase = getSupabaseClient();

	const { error } = await supabase.from('article_embeddings').delete().eq('article_slug', slug);

	if (error) {
		console.error(`Error deleting embeddings for ${slug}:`, error);
		return false;
	}

	return true;
}

/**
 * Re-index a single article
 */
export async function reindexArticle(filePath: string): Promise<boolean> {
	const result = await processArticle(filePath);

	if (!result) {
		return false;
	}

	const supabase = getSupabaseClient();

	// Delete old embeddings
	await deleteArticleEmbeddings(result.slug);

	// Index new chunks
	let success = true;
	for (const chunk of result.chunks) {
		const indexed = await indexChunk(supabase, chunk);
		if (!indexed) success = false;
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	return success;
}

// CLI interface
if (import.meta.main) {
	const args = process.argv.slice(2);
	const dryRun = args.includes('--dry-run');
	const verbose = args.includes('--verbose');
	const limitArg = args.find((a) => a.startsWith('--limit='));
	const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

	indexAllArticles({ dryRun, verbose, limit })
		.then((result) => {
			console.log('\nResult:', JSON.stringify(result, null, 2));
			process.exit(result.errors > 0 ? 1 : 0);
		})
		.catch((error) => {
			console.error('Fatal error:', error);
			process.exit(1);
		});
}
