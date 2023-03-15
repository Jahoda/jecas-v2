<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tag';

	export let post: Post;
	export let tags: Tag[];
</script>

<div
	tw="flex flex-col w-full h-full items-center justify-center rounded-2xl p-2"
	style="background: linear-gradient(to right top, #7957b0, #6b5db5, #5b63b9)"
>
	<div tw="bg-slate-900/50 rounded-xl p-3 h-full flex">
		<div tw="flex gap-8">
			<div tw="flex">
				<img width="200" height="200" src="https://jecas.cz/files/article/ai-programovani.png" />
			</div>
			<div tw="flex">
				<h1>{post.headline}</h1>
				<p>{post.description}</p>
				<p>{post.last_modification}</p>
				<p>{post.background}</p>
				<p>{post.url_slug}</p>
				<p>{tags}</p>
			</div>
		</div>
	</div>
</div>
