<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import HeroPost from '$lib/mainPost/HeroPost.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const ogImageUrl = $derived(
		`https://jecas.cz/api/og/preview?slug=${data.post.url_slug}&branch=${data.branch}`
	);

	const articleImageUrl = $derived(
		`/preview/files/article/${data.post.url_slug}.png?branch=${data.branch}`
	);
</script>

<svelte:head>
	<title>Preview: {data.post.title}</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta property="og:title" content={`Preview: ${data.post.title}`} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:image" content={ogImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<div class="bg-amber-500 py-2 text-center text-sm font-medium text-black">
	Náhled článku z větve <code class="rounded bg-amber-600/30 px-1">{data.branch}</code>
	&bull;
	<a href="/{data.post.url_slug}" class="underline">Zobrazit publikovanou verzi</a>
</div>

<HeroPost
	title={data.post.headline || data.post.title}
	description={data.post.description}
	date={data.post.last_modification}
	href={data.post.url_slug}
	tags={[]}
	wordCount={0}
	customImageUrl={articleImageUrl}
/>

<Container verticalSpace>
	<div class="grid grid-cols-1 gap-8 md:gap-16">
		<div class="xl:grid-cols-post grid grid-cols-1 gap-8">
			<div class="max-md:hidden"></div>
			<div><PostContent content={data.post.text_html} /></div>
			<div class="max-xl:hidden"></div>
		</div>
	</div>
</Container>
