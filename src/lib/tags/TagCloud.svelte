<script lang="ts">
	import type { Tag } from '$lib/tag/tag';
	import TagCount from './TagCount.svelte';

	export let tags: Tag[];

	$: filteredTags = tags.filter((tag) => tag.background).slice(0, 10);
</script>

<div class="grid text-white gap-4 text-sm text-center">
	{#each filteredTags as tag}
		<TagCount {tag} max={tags[0].count + 3} />
	{/each}
</div>
