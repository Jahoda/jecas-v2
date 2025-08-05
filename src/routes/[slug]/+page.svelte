<script lang="ts">
	import Container from '$lib/container/Container.svelte';
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
	<title>{post?.headline || (post && 'title' in post ? post.title : post?.name)}</title>
	<meta name="description" content={post && 'description' in post ? post.description : ''} />
	{#if !data.tag && post}
		<meta property="og:image" content="/api/og?slug={post.url_slug}" />
	{/if}
</svelte:head>

{#if post}
	<HeroPost
		title={post.headline || ('name' in post ? post.name : '')}
		description={post && 'description' in post ? post.description : ''}
		date={'last_modification' in post ? post.last_modification : new Date()}
		href={post.url_slug}
		isTag={Boolean(data.tag)}
		background={'background' in post ? post.background : '#3b82f6'}
		tags={data.tags}
		noImage={Boolean(data.tag)}
		wordCount={'word_count' in post ? post.word_count : 0}
	/>
{/if}
<Container verticalSpace>
	<div class="grid grid-cols-1 gap-8 md:gap-16">
		<div class="xl:grid-cols-post grid grid-cols-1 gap-8">
			<div class="max-md:hidden"></div>
			<div><PostContent content={post?.text_html || ''} /></div>
			<div class="sticky top-2 w-[14rem] self-start text-sm max-xl:hidden">
				{#if post}
					<PostToc slug={post.url_slug} />
				{/if}
			</div>
		</div>

		{#if data.tagPosts}
			<PostList posts={data.tagPosts} tags={data.allTags} pagesTags={data.pagesTags} />
		{:else}
			<div class="m-auto w-full max-w-3xl grid-cols-1">
				{#if post}
					<PostComments slug={post.url_slug} />
				{/if}
			</div>
		{/if}

		{#if data.relatedPosts && data.relatedPosts.length > 0}
			<div class="text-center">
				<h2 class="mb-8 text-2xl font-bold md:text-3xl">Související články</h2>
				<div class="mx-auto max-w-4xl">
					<PostList posts={data.relatedPosts} tags={data.allTags} pagesTags={data.pagesTags} />
				</div>
			</div>
		{/if}
	</div>
</Container>
