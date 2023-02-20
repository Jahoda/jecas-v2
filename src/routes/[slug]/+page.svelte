<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostToc from '$lib/toc/PostToc.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: post = data.page || data.tag;
</script>

<svelte:head>
	<title>{post?.title}</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<Container verticalSpace>
	<div class="m-auto max-w-3xl">
		<div class="grid grid-cols-1 gap-4 md:gap-8">
			<MainPost
				title={post.headline}
				description={post.description}
				date={post.last_modification}
				background={post.background}
				href={post.url_slug}
				tags={data.tags}
				noImage={data.tag}
			/>

			<PostToc slug={post.url_slug} />

			<PostContent content={post.text_html} />
		</div>
	</div>
</Container>
