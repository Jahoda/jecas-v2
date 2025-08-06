<script lang="ts">
	import Logo from '$lib/logo/Logo.svelte';
	import { postGradient } from '$lib/mainPost/postGradient';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tags';

	export let post: Post;
	export let tags: Tag[];

	function stripTags(str: string) {
		return str.replace(/(<([^>]+)>)/gi, '');
	}

	function decodeHtmlEntities(str: string) {
		return str.replace('&lt;', '').replace('>', '');
	}
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center p-8"
	style="background-image: {postGradient(tags)}"
>
	<div class="mb-8 flex w-full flex-col items-center rounded-xl bg-slate-900/50 p-6 text-center">
		<div class="flex h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-lg shadow">
			<img
				class="rounded"
				alt=""
				width="200"
				height="200"
				src="https://jecas.cz/files/article/{post.url_slug}.png"
			/>
		</div>

		<div class="flex w-full flex-col text-center">
			<h2 class="mx-auto mt-8 text-5xl font-bold tracking-tight text-white">
				{post.title}
			</h2>

			<p class="mx-auto mt-4 text-2xl text-white">
				{decodeHtmlEntities(stripTags(post.description))}
			</p>
		</div>
	</div>

	<Logo fill="#fff" />
</div>
