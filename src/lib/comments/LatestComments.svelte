<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import AvatarByName from '$lib/avatar/AvatarByName.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';

	interface LatestComment {
		id: number;
		slug: string;
		author_name: string;
		message: string;
		created_at: string;
	}

	let comments = $state<LatestComment[]>([]);
	let loading = $state(true);

	async function fetchLatestComments() {
		try {
			const { data } = await supabase
				.from('comments')
				.select('id, slug, author_name, message, created_at')
				.eq('is_approved', true)
				.order('created_at', { ascending: false })
				.limit(8);

			if (data) {
				comments = data;
			}
		} catch {
			// tiché selhání
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchLatestComments();
	});

	function truncate(text: string, maxLength: number) {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength).trim() + '…';
	}
</script>

<div>
	<h2 class="mb-4 text-lg font-bold dark:text-white">Poslední komentáře</h2>

	{#if loading}
		<div class="flex flex-col gap-3">
			{#each [1, 2, 3] as _}
				<div class="flex gap-3">
					<div class="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"></div>
					<div class="flex-1">
						<div class="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
						<div class="mt-2 h-10 animate-pulse rounded bg-slate-100 dark:bg-slate-800"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else if comments.length > 0}
		<div class="flex flex-col gap-4">
			{#each comments as comment (comment.id)}
				<a
					href="/{comment.slug}#{comment.slug}-discussion"
					class="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
				>
					<div class="flex-shrink-0">
						<AvatarByName name={comment.author_name} size="sm" />
					</div>
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-2 text-xs">
							<span class="font-medium text-slate-700 dark:text-slate-300">
								{comment.author_name}
							</span>
							<span class="text-slate-400">·</span>
							<CreatedAt date={new Date(comment.created_at)} small />
						</div>
						<p
							class="mt-1 line-clamp-2 text-sm text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200"
						>
							{truncate(comment.message, 100)}
						</p>
						<p class="mt-1 text-xs text-blue-600 dark:text-blue-400">
							/{comment.slug}
						</p>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p class="text-sm text-slate-500 dark:text-slate-400">Zatím žádné komentáře.</p>
	{/if}
</div>
