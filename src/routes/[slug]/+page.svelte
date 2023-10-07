<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostList from '$lib/post/PostList.svelte';
	import PostComments from '$lib/postComments/PostComments.svelte';
	import PostToc from '$lib/toc/PostToc.svelte';
	import type { PageData } from './$types';
	import HeroPost from '$lib/mainPost/HeroPost.svelte';

	export let data: PageData;

	$: post = data.page || data.tag;
</script>

<svelte:head>
	<title>{post?.title || post?.name}</title>
	<meta name="description" content={post?.description} />
</svelte:head>

<HeroPost
	title={post.headline}
	description={post.description}
	date={post.last_modification}
	href={post.url_slug}
	isTag={Boolean(data.tag)}
	background={post.background}
	tags={data.tags}
	noImage={Boolean(data.tag)}
	wordCount={post.word_count}
/>
<Container verticalSpace>
	<div class="grid grid-cols-1 gap-8 md:gap-16">
		<div class="grid grid-cols-1 gap-8 xl:grid-cols-post">
			<div class="max-md:hidden" />
			<div><PostContent content={post.text_html} /></div>
			<div class="sticky top-2 w-[14rem] self-start text-sm max-xl:hidden">
				<PostToc slug={post.url_slug} />
			</div>
		</div>

		{#if data.tagPosts}
			<PostList posts={data.tagPosts} />
		{:else}
			<div class="m-auto w-full max-w-3xl grid-cols-1">
				{#key post.url_slug}
					<PostComments slug={post.url_slug} />
				{/key}
			</div>
		{/if}

		{#if data.relatedPosts}
			<PostList posts={data.relatedPosts} />
		{/if}
	</div>
</Container>
