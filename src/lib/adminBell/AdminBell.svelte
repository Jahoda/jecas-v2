<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	interface PendingComment {
		id: number;
		slug: string;
		author_name: string;
		message: string;
		created_at: string;
	}

	let isAdmin = $state(false);
	let comments = $state<PendingComment[]>([]);
	let open = $state(false);
	let loading = $state<number | null>(null);

	async function fetchPending() {
		try {
			const res = await fetch('/api/admin/pending-comments');
			const data = await res.json();
			isAdmin = data.authenticated;
			comments = data.comments ?? [];
		} catch {
			isAdmin = false;
		}
	}

	onMount(() => {
		fetchPending();
		// Refresh every 30s
		const interval = setInterval(fetchPending, 30000);
		return () => clearInterval(interval);
	});

	async function approve(id: number) {
		loading = id;
		try {
			const res = await fetch(`/api/comments/id/${id}/approve`, { method: 'PATCH' });
			if (res.ok) {
				comments = comments.filter((c) => c.id !== id);
			}
		} finally {
			loading = null;
		}
	}

	async function remove(id: number) {
		loading = id;
		try {
			const res = await fetch(`/api/comments/id/${id}/admin-delete`, { method: 'DELETE' });
			if (res.ok) {
				comments = comments.filter((c) => c.id !== id);
			}
		} finally {
			loading = null;
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.admin-bell')) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

{#if isAdmin}
	<div class="admin-bell relative">
		<button
			onclick={() => (open = !open)}
			class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 relative rounded-md p-2 transition-colors"
			title="Komentáře ke schválení"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
			</svg>
			{#if comments.length > 0}
				<span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
					{comments.length}
				</span>
			{/if}
		</button>

		{#if open}
			<div class="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg bg-white shadow-xl dark:bg-slate-800">
				<div class="border-b border-slate-200 p-3 dark:border-slate-700">
					<span class="text-sm font-medium text-slate-700 dark:text-slate-300">
						Ke schválení ({comments.length})
					</span>
				</div>
				{#if comments.length === 0}
					<div class="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
						Žádné komentáře ke schválení
					</div>
				{:else}
					<div class="max-h-96 overflow-y-auto">
						{#each comments as comment (comment.id)}
							<div class="border-b border-slate-100 p-3 last:border-0 dark:border-slate-700">
								<div class="mb-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
									<span class="font-medium text-slate-700 dark:text-slate-300">{comment.author_name}</span>
									<span>•</span>
									<a href="/{comment.slug}" class="text-blue-600 hover:underline dark:text-blue-400" onclick={() => (open = false)}>
										/{comment.slug}
									</a>
								</div>
								<p class="mb-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
									{comment.message}
								</p>
								<div class="flex gap-2">
									<button
										onclick={() => approve(comment.id)}
										disabled={loading === comment.id}
										class="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700 disabled:opacity-50"
									>
										{loading === comment.id ? '...' : 'Schválit'}
									</button>
									<button
										onclick={() => remove(comment.id)}
										disabled={loading === comment.id}
										class="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
									>
										Smazat
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
				<a
					href="/admin/comments"
					class="block border-t border-slate-200 p-3 text-center text-sm text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-700"
					onclick={() => (open = false)}
				>
					Zobrazit vše
				</a>
			</div>
		{/if}
	</div>
{/if}
