<script lang="ts">
	import { dev } from '$app/environment';
	import Container from '$lib/container/Container.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostList from '$lib/post/PostList.svelte';
	import PostComments from '$lib/postComments/PostComments.svelte';
	import PostToc from '$lib/toc/PostToc.svelte';
	import PostNavigation from '$lib/postNavigation/PostNavigation.svelte';
	import type { PageData } from './$types';
	import HeroPost from '$lib/mainPost/HeroPost.svelte';
	import ImageUploadManager from '$lib/imageUpload/ImageUploadManager.svelte';
	import { htmlToPlainText } from '$lib/xml/xml';
	import { schemaScript } from '$lib/schemaScript/schemaScript';
	import { AnnotationPanel } from '$lib/annotation';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let post = $derived(data.page || data.tag);
	let contentContainerRef: HTMLDivElement | undefined = $state();

	const baseUrl = 'https://jecas.cz';
	const pageUrl = $derived(data.page ? `${baseUrl}/${data.page.url_slug}` : baseUrl);
	const imageUrl = $derived(
		data.page ? `${baseUrl}/api/og?slug=${data.page.url_slug}` : `${baseUrl}/favicon-196x196.png`
	);
	const descriptionText = $derived(data.page ? htmlToPlainText(data.page.description) : '');
	const datePublished = $derived(data.page ? new Date((data.page as any).date).toISOString() : '');
	const dateModified = $derived(
		data.page
			? new Date((data.page as any).last_modification ?? (data.page as any).date).toISOString()
			: ''
	);
	const tagNames = $derived(data.tags?.map((t) => t.name) ?? []);
	const articleLd = $derived(
		data.page
			? {
					'@context': 'https://schema.org',
					'@type': 'Article',
					headline: data.page.headline || data.page.title,
					datePublished,
					dateModified,
					author: { '@type': 'Person', name: 'Bohumil Jahoda' },
					mainEntityOfPage: pageUrl,
					image: [imageUrl],
					publisher: {
						'@type': 'Organization',
						name: 'Je čas.cz',
						logo: { '@type': 'ImageObject', url: `${baseUrl}/favicon-196x196.png` }
					},
					keywords: tagNames
				}
			: null
	);
	const breadcrumbsLd = $derived(
		data.page
			? {
					'@context': 'https://schema.org',
					'@type': 'BreadcrumbList',
					itemListElement: [
						{ '@type': 'ListItem', position: 1, name: 'Je čas.cz', item: baseUrl },
						{ '@type': 'ListItem', position: 2, name: data.page.title, item: pageUrl }
					]
				}
			: null
	);
</script>

<svelte:head>
	<title>{post && 'title' in post ? post.title : post?.name}</title>
	<meta
		name="description"
		content={post && 'description' in post ? htmlToPlainText(post.description) : ''}
	/>
	{#if data.page}
		<link rel="canonical" href={pageUrl} />
		<meta property="og:url" content={pageUrl} />
		<meta property="og:title" content={data.page.title} />
		<meta property="og:description" content={descriptionText} />
		<meta property="og:image" content={imageUrl} />
		<meta property="og:type" content="article" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={data.page.title} />
		<meta name="twitter:description" content={descriptionText} />
		<meta name="twitter:image" content={imageUrl} />
		{@html schemaScript(articleLd)}
		{@html schemaScript(breadcrumbsLd)}
	{/if}
</svelte:head>

{#if post}
	<HeroPost
		title={post.headline || ('name' in post ? post.name : '')}
		description={post && 'description' in post ? post.description : ''}
		date={'last_modification' in post ? post.last_modification : null}
		href={post.url_slug}
		isTag={Boolean(data.tag)}
		background={'background' in post ? post.background : '#3b82f6'}
		tags={data.tags}
		noImage={Boolean(data.tag)}
		wordCount={'word_count' in post ? post.word_count : 0}
	/>
{/if}
<Container verticalSpace>
	{#if dev && data.page}
		<ImageUploadManager slug={data.page.url_slug} />
	{/if}
	<div class="grid grid-cols-1 gap-8 md:gap-16">
		<div class="xl:grid-cols-post grid grid-cols-1 gap-8">
			<div class="max-md:hidden"></div>
			<div><PostContent content={post?.text_html || ''} bind:containerRef={contentContainerRef} /></div>
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
				{#if post && data.prevNextPosts}
					<PostNavigation prev={data.prevNextPosts.prev} next={data.prevNextPosts.next} />
				{/if}
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

{#if data.page}
	<AnnotationPanel
		slug={data.page.url_slug}
		articleTitle={data.page.title}
		contentContainer={contentContainerRef}
	/>
{/if}
