<script lang="ts">
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
		return str.replace(/&lt;/g, '').replace(/&gt;/g, '');
	}

	// Create gradient from tags
	const tagsColors = tags?.map((tag) => tag.background).filter((color) => color) || [];
	const gradient = tagsColors.length > 0
		? `linear-gradient(to right top, ${tagsColors.join(', ')}, #5b63b9)`
		: 'linear-gradient(to right top, #3b82f6, #5b63b9)';

	const cleanDescription = decodeHtmlEntities(stripTags(post.description));
	const imageUrl = `https://jecas.cz/files/article/${post.url_slug}.png`;
</script>

<div
	tw="flex h-full w-full flex-col items-center justify-center p-8"
	style="background: {gradient}"
>
	<div tw="mb-8 flex w-full max-w-5xl flex-col items-center rounded-xl p-8 text-center" style="background-color: rgba(15, 23, 42, 0.5)">
		<div tw="flex h-48 w-48 overflow-hidden rounded-lg bg-gray-800">
			<img
				alt=""
				width="200"
				height="200"
				src={imageUrl}
			/>
		</div>

		<div tw="flex w-full flex-col text-center">
			<h2 tw="mx-auto mt-8 text-5xl font-bold text-white leading-tight px-4">
				{post.title}
			</h2>

			<p tw="mx-auto mt-6 text-2xl text-gray-100 px-8 leading-relaxed">
				{cleanDescription}
			</p>
		</div>
	</div>

	<div tw="flex items-center justify-center mt-4 text-3xl font-bold text-white">
		Je čas.cz
	</div>
</div>
