<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import { groupByPageId } from '$lib/tags/tags';
	import type { PageData } from './$types';

	export let data: PageData;

	$: pagesTags = groupByPageId(data.pagesTags);
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
					tags={data.tags.filter((tag) => pagesTags[post.url_slug]?.includes(tag.url_slug))}
				/>
			</div>
		{/each}
	</div>
</Container>
