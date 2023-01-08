<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Archiv ječas.cz</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<Container verticalSpace>
	<div class="grid gap-8 grid-cols-6">
		{#each data.post as post, index}
			<div class="grid {index > 9 ? 'col-span-2' : 'col-span-3'}">
				<MainPost
					title={post.headline}
					description={post.description}
					date={post.last_modification}
					href={post.url_slug}
					neutral={index > 0}
					small={index > 1}
				/>
			</div>
		{/each}
	</div>
</Container>
