<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostList from '$lib/post/PostList.svelte';
	import PostComments from '$lib/postComments/PostComments.svelte';
	import PostToc from '$lib/toc/PostToc.svelte';
	import type { PageData } from './$types';
	import HeroPost from "$lib/mainPost/HeroPost.svelte";

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
		background={post.background}
		href={post.url_slug}
		tags={data.tags}
		noImage={Boolean(data.tag)}
		wordCount="{post.word_count}"
/>
<Container verticalSpace>
	<div class="grid grid-cols-1 gap-8 md:gap-16">
		<div class="grid xl:grid-cols-post gap-8">
			<div class="max-md:hidden" />
			<div><PostContent content={post.text_html} /></div>
			<div class="sticky top-2 max-xl:hidden self-start w-[14rem] text-sm"><PostToc slug={post.url_slug} /></div>
		</div>

		{#if data.tagPosts}
			<PostList posts={data.tagPosts} />
		{:else}
			<div class="m-auto max-w-3xl grid-cols-1 w-full">
				{#key post.url_slug}
					<PostComments slug={post.url_slug} />
				{/key}
			</div>
		{/if}

		{#if data.relatedPosts}
			<div class="grid justify-center">
				<PostList posts={data.relatedPosts} />
			</div>
		{/if}
	</div>
</Container>
