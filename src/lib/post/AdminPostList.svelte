<script lang="ts">
	import { searchText } from '$lib/adminSearch/adminSearch';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import type { Post } from '$lib/post/post';

	interface Props {
		title: string;
		posts: Post[];
	}

	let { title, posts }: Props = $props();

	let sortBy: 'date' | 'title' | 'length' = $state('date');
	let sortDirection: 'asc' | 'desc' = $state('desc');

	function updateFilteredPosts() {
		let filtered = posts.filter((post) =>
			post.title.toLowerCase().includes($searchText.toLowerCase())
		);

		filtered.sort((a, b) => {
			let comparison = 0;

			switch (sortBy) {
				case 'date':
					comparison =
						(a.last_modification || a.date).getTime() - (b.last_modification || b.date).getTime();
					break;
				case 'title':
					comparison = a.title.localeCompare(b.title);
					break;
				case 'length':
					const aLength = a.word_count || 0;
					const bLength = b.word_count || 0;
					comparison = aLength - bLength;
					break;
			}

			return sortDirection === 'asc' ? comparison : -comparison;
		});

		return filtered;
	}

	const filtredPosts: Post[] = $derived.by(updateFilteredPosts);

	function handleDirectionChange() {
		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	}
</script>

<Box>
	<div class="flex items-center justify-between">
		<div class="text-2xl">
			{title} ({filtredPosts.length})
		</div>

		<div class="flex items-center gap-2">
			<select
				bind:value={sortBy}
				class="rounded border border-slate-300 bg-white px-3 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
			>
				<option value="date">Datum</option>
				<option value="title">Název</option>
				<option value="length">Délka</option>
			</select>

			<button
				onclick={handleDirectionChange}
				class="rounded border border-slate-300 bg-white px-3 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
				title={sortDirection === 'asc' ? 'Vzestupně' : 'Sestupně'}
			>
				{sortDirection === 'asc' ? '↑' : '↓'}
			</button>
		</div>
	</div>

	<div class="mt-8"></div>

	<div class="space-y-4">
		{#each filtredPosts as post (post.id)}
			<div class="flex items-center gap-4 rounded-lg bg-slate-100 p-2 dark:bg-slate-600">
				<div
					class="h-8 w-8 shrink-0 rounded-full"
					style="background: url('/files/article/{post.url_slug}.png') no-repeat center center; background-size: cover"
				></div>
				<div class="min-w-0 flex-1">
					<a
						href="/{post.url_slug}"
						class="text-blue-dark dark:text-blue-light block truncate underline hover:no-underline"
					>
						{post.title}
					</a>
					{#if sortBy === 'length' && post.word_count}
						<div class="text-xs text-slate-500 dark:text-slate-400">
							{post.word_count} slov
						</div>
					{/if}
				</div>
				<div class="ml-auto flex justify-end">
					<div class="inline-flex">
						<Button href="/admin/post/{post.url_slug}">Upravit</Button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Box>
