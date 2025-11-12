<script lang="ts">
	import { postGradient } from '$lib/mainPost/postGradient';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		post: Post;
		tags: Tag[];
	}

	let { post, tags }: Props = $props();

	function stripTags(str: string) {
		return str.replace(/(<([^>]+)>)/gi, '');
	}

	function decodeHtmlEntities(str: string) {
		return str.replace('&lt;', '').replace('>', '');
	}

	const gradient = postGradient(tags);
</script>

<div
	tw="flex h-full w-full flex-col items-center justify-center p-8"
	style="background-image: {gradient}"
>
	<div tw="mb-8 flex w-full flex-col items-center rounded-xl p-6 text-center" style="background-color: rgba(15, 23, 42, 0.5)">
		<div tw="flex h-[200px] w-[200px] overflow-hidden rounded-lg">
			<img
				alt=""
				width="200"
				height="200"
				src="https://jecas.cz/files/article/{post.url_slug}.png"
			/>
		</div>

		<div tw="flex w-full flex-col text-center">
			<h2 tw="mx-auto mt-8 text-5xl font-bold text-white" style="max-width: 1000px">
				{post.title}
			</h2>

			<p tw="mx-auto mt-4 text-2xl text-white" style="max-width: 900px">
				{decodeHtmlEntities(stripTags(post.description))}
			</p>
		</div>
	</div>

	<div tw="flex items-center justify-center">
		<svg width="120" height="40" viewBox="0 0 120 40" fill="white">
			<text x="10" y="30" font-size="24" font-weight="bold" fill="white">Je čas.cz</text>
		</svg>
	</div>
</div>
