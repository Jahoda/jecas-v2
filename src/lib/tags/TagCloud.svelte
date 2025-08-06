<script lang="ts">
	import type { Tag } from '$lib/tag/tags';
	import TagCount from './TagCount.svelte';

	export let tags: Tag[];

	$: filteredTags = tags.filter((tag) => tag.background).slice(0, 10);
</script>

<div class="grid gap-4 text-center text-sm text-white">
	{#each filteredTags as tag}
		<TagCount {tag} max={(tags[0]?.count || 0) + 3} />
	{/each}
</div>
