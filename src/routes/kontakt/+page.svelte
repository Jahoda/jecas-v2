<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostComments from '$lib/postComments/PostComments.svelte';
	import HeroPost from '$lib/mainPost/HeroPost.svelte';
	import { htmlToPlainText } from '$lib/xml/xml';
	import { schemaScript } from '$lib/schemaScript/schemaScript';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const baseUrl = 'https://jecas.cz';
	const pageUrl = `${baseUrl}/kontakt`;
	const imageUrl = `${baseUrl}/files/article/kontakt.png`;
	const descriptionText = $derived(htmlToPlainText(data.page.description));
	const datePublished = $derived(new Date(data.page.date).toISOString());
	const dateModified = $derived(
		new Date(data.page.last_modification ?? data.page.date).toISOString()
	);
	const articleLd = $derived({
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
		}
	});
	const breadcrumbsLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Je čas.cz', item: baseUrl },
			{ '@type': 'ListItem', position: 2, name: data.page.title, item: pageUrl }
		]
	});
</script>

<svelte:head>
	<title>{data.page.title}</title>
	<meta name="description" content={descriptionText} />
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
</svelte:head>

<HeroPost
	title={data.page.headline}
	description={data.page.description}
	date={data.page.last_modification}
	href={data.page.url_slug}
	noImage={false}
	wordCount={data.page.word_count ?? 0}
/>

<Container verticalSpace>
	<div class="grid grid-cols-1 gap-8 md:gap-16">
		<div class="xl:grid-cols-post grid grid-cols-1 gap-8">
			<div class="max-md:hidden"></div>
			<div><PostContent content={data.page.text_html} /></div>
			<div class="max-xl:hidden"></div>
		</div>

		<div class="m-auto w-full max-w-3xl grid-cols-1">
			<PostComments slug={data.page.url_slug} />
		</div>
	</div>
</Container>
