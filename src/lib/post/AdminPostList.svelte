<script lang="ts">
	import { searchText } from '$lib/adminSearch/adminSearch';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import type { Post } from '$lib/post/post';

	export let title: string;
	export let posts: Post[];

	let filtredPosts: Post[] = [];

	$: filtredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes($searchText.toLowerCase())
	);
</script>

<Box>
	<div class="text-2xl">
		{title} ({filtredPosts.length})
	</div>

	<div class="mt-8"></div>

	<div class="space-y-4">
		{#each filtredPosts as post (post.id)}
			<div
				class="flex items-center justify-between gap-8 rounded-lg bg-slate-100 p-2 dark:bg-slate-600"
			>
				<a
					href="/{post.url_slug}"
					class="text-blue-dark dark:text-blue-light underline hover:no-underline"
				>
					{post.title}
				</a>
				<div class="flex justify-end">
					<div class="inline-flex">
						<Button href="/admin/post/{post.url_slug}">Upravit</Button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Box>
