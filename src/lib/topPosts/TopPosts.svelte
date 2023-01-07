<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';

	export let posts: object[];
</script>

<div class="grid gap-4">
	{#each posts as item}
		<MainPost small title={item.title} description={item.description} href={item.url_slug} />
	{/each}
</div>
