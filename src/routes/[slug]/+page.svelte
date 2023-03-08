<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostList from '$lib/post/PostList.svelte';
	import PostComments from '$lib/postComments/PostComments.svelte';
	import PostToc from '$lib/toc/PostToc.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: post = data.page || data.tag;
</script>

<svelte:head>
	<title>{post?.title || post?.name}</title>
	<meta
		name="description"
		content="{post?.description}"
	/>
</svelte:head>

<Container verticalSpace>
	<div class="grid grid-cols-1 gap-4 md:gap-8">
		<div class="m-auto max-w-3xl">
			<div class="grid grid-cols-1">
				<MainPost
					title={post.headline}
					description={post.description}
					date={post.last_modification}
					background={post.background}
					href={post.url_slug}
					tags={data.tags}
					noImage={Boolean(data.tag)}
				/>
			</div>
		</div>
		<div class="grid xl:grid-cols-post gap-8">
			<div />
			<div><PostContent content={post.text_html} /></div>
			<div class="sticky top-2 max-xl:hidden self-start"><PostToc slug={post.url_slug} /></div>
		</div>

		{#if data.tagPosts}
			<PostList posts={data.tagPosts} />
		{:else}
			<div class="m-auto max-w-3xl grid-cols-1 w-full">
				<PostComments slug={post.url_slug} />
			</div>
		{/if}
	</div>
</Container>
