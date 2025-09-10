<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function getHref(page: number) {
		return page <= 1 ? '/archiv' : `/archiv?page=${page}`;
	}
</script>

<svelte:head>
	<title>Archiv ječas.cz</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<Container verticalSpace>
	<div class="grid grid-cols-6 gap-8">
		{#each data.posts as post, index}
			<div
				class="grid {index > 9
					? 'col-span-6 lg:col-span-3 xl:col-span-2'
					: 'col-span-6 xl:col-span-3'}"
			>
				<MainPost
					title={post.headline}
					description={post.description}
					date={post.last_modification}
					href={post.url_slug}
					neutral={index > 0}
					small={index > 1}
					wordCount={post.word_count}
					tags={data.postTagsBySlug[post.url_slug]}
				/>
			</div>
		{/each}
	</div>

	{#if data.pages.totalPages > 1}
		<nav class="mt-8 flex items-center justify-center gap-4">
			{#if data.pages.page > 1}
				<a class="rounded px-3 py-1 hover:underline" href={getHref(data.pages.page - 1)}
					>Předchozí</a
				>
			{/if}
			<div>
				Stránka {data.pages.page} / {data.pages.totalPages}
			</div>
			{#if data.pages.page < data.pages.totalPages}
				<a class="rounded px-3 py-1 hover:underline" href={getHref(data.pages.page + 1)}>Další</a>
			{/if}
		</nav>
	{/if}
</Container>
