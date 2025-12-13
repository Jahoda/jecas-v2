<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import Timeline from '$lib/timeline/Timeline.svelte';
	import { groupByPageId } from '$lib/tags/tags';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let pagesTags = $derived(groupByPageId(data.pagesTags));
</script>

<svelte:head>
	<title>Archiv ječas.cz</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<Container verticalSpace>
	<div class="archive-header">
		<h1 class="archive-title">Archiv článků</h1>
		<p class="archive-subtitle">
			Chronologický přehled všech {data.posts.length} publikovaných článků
		</p>
	</div>

	<Timeline posts={data.posts} tags={data.tags} {pagesTags} />
</Container>

<style>
	.archive-header {
		text-align: center;
		margin-bottom: 3rem;
		padding: 2rem 1rem;
	}

	.archive-title {
		font-size: 3rem;
		font-weight: 800;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}

	.archive-subtitle {
		font-size: 1.25rem;
		color: #6b7280;
	}

	:global(.dark) .archive-subtitle {
		color: #9ca3af;
	}

	@media (max-width: 768px) {
		.archive-title {
			font-size: 2rem;
		}

		.archive-subtitle {
			font-size: 1rem;
		}

		.archive-header {
			margin-bottom: 2rem;
			padding: 1rem 0.5rem;
		}
	}
</style>
