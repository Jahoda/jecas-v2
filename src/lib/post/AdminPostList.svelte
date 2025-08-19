<script lang="ts">
	import { run } from 'svelte/legacy';

	import { searchText } from '$lib/adminSearch/adminSearch';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import type { Post } from '$lib/post/post';

	interface Props {
		title: string;
		posts: Post[];
	}

	let { title, posts }: Props = $props();

	let filtredPosts: Post[] = $state([]);

	run(() => {
		filtredPosts = posts.filter((post) =>
			post.title.toLowerCase().includes($searchText.toLowerCase())
		);
	});
</script>

<Box>
	<div class="text-2xl">
		{title} ({filtredPosts.length})
	</div>

	<div class="mt-8"></div>

	<div class="space-y-4">
		{#each filtredPosts as post (post.id)}
			<div class="flex items-center gap-4 rounded-lg bg-slate-100 p-2 dark:bg-slate-600">
				<div
					class="h-8 w-8 shrink-0 rounded-full"
					style="background: url('/files/article/{post.url_slug}.png') no-repeat center center; background-size: cover"
				></div>
				<a
					href="/{post.url_slug}"
					class="text-blue-dark dark:text-blue-light underline hover:no-underline"
				>
					{post.title}
				</a>
				<div class="ml-auto flex justify-end">
					<div class="inline-flex">
						<Button href="/admin/post/{post.url_slug}">Upravit</Button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Box>
