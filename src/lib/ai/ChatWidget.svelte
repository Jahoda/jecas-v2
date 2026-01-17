<script lang="ts">
	/**
	 * Ječas AI Chat Widget
	 *
	 * Floating chat bubble that opens an AI assistant powered by
	 * RAG (Retrieval Augmented Generation) over 1082 articles.
	 */

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Types
	interface Message {
		id: string;
		role: 'user' | 'assistant';
		content: string;
		sources?: Array<{ title: string; slug: string }>;
		timestamp: Date;
	}

	interface SessionInfo {
		tier: string;
		limit: number;
		used: number;
		remaining: number;
	}

	// State
	let isOpen = $state(false);
	let messages = $state<Message[]>([]);
	let input = $state('');
	let isLoading = $state(false);
	let sessionId = $state<string | null>(null);
	let sessionInfo = $state<SessionInfo | null>(null);
	let messagesContainer: HTMLDivElement;
	let inputElement: HTMLTextAreaElement;

	// Suggested questions
	const suggestions = [
		'Jak funguje CSS Grid?',
		'Vysvětli mi flexbox',
		'Co je to responsive design?',
		'Jak optimalizovat web pro rychlost?'
	];

	// Generate unique ID
	function generateId(): string {
		return Math.random().toString(36).substring(2, 15);
	}

	// Load session info
	async function loadSessionInfo() {
		try {
			const params = sessionId ? `?sessionId=${sessionId}` : '';
			const response = await fetch(`/api/chat${params}`);
			if (response.ok) {
				const data = await response.json();
				sessionInfo = data;
				if (data.messages?.length) {
					messages = data.messages.map((m: any, i: number) => ({
						id: generateId(),
						role: m.role,
						content: m.content,
						timestamp: new Date()
					}));
				}
			}
		} catch (error) {
			console.error('Failed to load session info:', error);
		}
	}

	// Send message
	async function sendMessage(text?: string) {
		const messageText = text || input.trim();
		if (!messageText || isLoading) return;

		input = '';

		// Add user message
		const userMessage: Message = {
			id: generateId(),
			role: 'user',
			content: messageText,
			timestamp: new Date()
		};
		messages = [...messages, userMessage];

		isLoading = true;
		scrollToBottom();

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages.map((m) => ({ role: m.role, content: m.content })),
					sessionId
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Něco se pokazilo');
			}

			// Update session ID
			if (data.sessionId) {
				sessionId = data.sessionId;
				if (browser) {
					localStorage.setItem('jecas_ai_session', sessionId!);
				}
			}

			// Update remaining
			if (sessionInfo && typeof data.remaining === 'number') {
				sessionInfo = { ...sessionInfo, remaining: data.remaining, used: sessionInfo.limit - data.remaining };
			}

			// Add assistant message
			const assistantMessage: Message = {
				id: generateId(),
				role: 'assistant',
				content: data.message,
				sources: data.sources,
				timestamp: new Date()
			};
			messages = [...messages, assistantMessage];
		} catch (error) {
			// Add error message
			const errorMessage: Message = {
				id: generateId(),
				role: 'assistant',
				content: error instanceof Error ? error.message : 'Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.',
				timestamp: new Date()
			};
			messages = [...messages, errorMessage];
		} finally {
			isLoading = false;
			scrollToBottom();
		}
	}

	// Scroll to bottom of messages
	function scrollToBottom() {
		setTimeout(() => {
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		}, 100);
	}

	// Handle keyboard
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	// Toggle chat
	function toggleChat() {
		isOpen = !isOpen;
		if (isOpen) {
			setTimeout(() => inputElement?.focus(), 100);
		}
	}

	// Clear chat
	function clearChat() {
		messages = [];
		sessionId = null;
		if (browser) {
			localStorage.removeItem('jecas_ai_session');
		}
	}

	// Format message content (basic markdown)
	function formatContent(content: string): string {
		return content
			// Code blocks
			.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
			// Inline code
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			// Bold
			.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
			// Links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
			// Line breaks
			.replace(/\n/g, '<br>');
	}

	// Load session on mount
	onMount(() => {
		if (browser) {
			const savedSession = localStorage.getItem('jecas_ai_session');
			if (savedSession) {
				sessionId = savedSession;
			}
			loadSessionInfo();
		}
	});
</script>

<!-- Floating Button -->
<button
	onclick={toggleChat}
	class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
	aria-label={isOpen ? 'Zavřít chat' : 'Otevřít Ječas AI'}
>
	{#if isOpen}
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
		</svg>
	{:else}
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
			/>
		</svg>
	{/if}
</button>

<!-- Chat Panel -->
{#if isOpen}
	<div
		class="fixed bottom-24 right-6 z-50 flex h-[32rem] w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
		role="dialog"
		aria-label="Ječas AI Chat"
	>
		<!-- Header -->
		<div class="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
			<div>
				<h3 class="font-bold text-white">Ječas AI</h3>
				<p class="text-xs text-blue-100">
					{#if sessionInfo}
						{sessionInfo.remaining} / {sessionInfo.limit} zpráv dnes
					{:else}
						Zeptej se na cokoliv o webdesignu
					{/if}
				</p>
			</div>
			<div class="flex gap-2">
				{#if messages.length > 0}
					<button
						onclick={clearChat}
						class="rounded p-1 text-blue-100 hover:bg-blue-500 hover:text-white"
						title="Vymazat chat"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</div>

		<!-- Messages -->
		<div bind:this={messagesContainer} class="flex-1 space-y-4 overflow-y-auto p-4">
			{#if messages.length === 0}
				<!-- Welcome screen -->
				<div class="mt-4 text-center">
					<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
						<svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
					</div>
					<h4 class="mb-2 font-semibold text-gray-900">Ahoj! Jsem Ječas AI</h4>
					<p class="mb-4 text-sm text-gray-600">
						Znám všech 1082 článků na Ječas.cz a rád ti pomohu s webdesignem.
					</p>
					<div class="space-y-2">
						<p class="text-xs font-medium text-gray-500">Zkus se zeptat:</p>
						{#each suggestions as suggestion}
							<button
								onclick={() => sendMessage(suggestion)}
								class="block w-full rounded-lg bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
							>
								"{suggestion}"
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<!-- Message list -->
				{#each messages as message (message.id)}
					<div class={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
						<div
							class={`max-w-[85%] rounded-2xl px-4 py-2 ${
								message.role === 'user'
									? 'bg-blue-600 text-white'
									: 'bg-gray-100 text-gray-900'
							}`}
						>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<div class="prose prose-sm max-w-none whitespace-pre-wrap">
								{@html formatContent(message.content)}
							</div>

							{#if message.sources && message.sources.length > 0}
								<div class="mt-2 border-t border-gray-200 pt-2">
									<p class="mb-1 text-xs font-medium text-gray-500">Zdroje:</p>
									{#each message.sources as source}
										<a
											href="/{source.slug}"
											class="block text-xs text-blue-600 hover:underline"
											target="_blank"
										>
											{source.title}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}

				<!-- Loading indicator -->
				{#if isLoading}
					<div class="flex justify-start">
						<div class="rounded-2xl bg-gray-100 px-4 py-3">
							<div class="flex space-x-1">
								<div class="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
								<div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0.1s"></div>
								<div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0.2s"></div>
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>

		<!-- Input -->
		<div class="border-t border-gray-200 p-4">
			{#if sessionInfo && sessionInfo.remaining <= 0}
				<div class="rounded-lg bg-yellow-50 p-3 text-center">
					<p class="text-sm text-yellow-800">
						Denní limit vyčerpán.
						<a href="/premium" class="font-medium text-yellow-900 underline">Získej premium</a>
					</p>
				</div>
			{:else}
				<div class="flex gap-2">
					<textarea
						bind:this={inputElement}
						bind:value={input}
						onkeydown={handleKeydown}
						placeholder="Napiš svůj dotaz..."
						rows="1"
						class="flex-1 resize-none rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						disabled={isLoading}
					></textarea>
					<button
						onclick={() => sendMessage()}
						disabled={isLoading || !input.trim()}
						class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Odeslat"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
						</svg>
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Prose overrides for chat */
	:global(.prose code) {
		@apply rounded bg-gray-200 px-1 py-0.5 text-sm;
	}
	:global(.prose pre) {
		@apply my-2 overflow-x-auto rounded-lg bg-gray-800 p-3;
	}
	:global(.prose pre code) {
		@apply bg-transparent p-0 text-gray-100;
	}
</style>
