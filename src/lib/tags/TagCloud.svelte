<script lang="ts">
	import TagCount from './TagCount.svelte';

	export let tags: object[];

	$: filteredTags = tags.filter((tag) => tag.background).slice(0, 10);
</script>

<div class="grid text-white gap-4 text-sm text-center">
	{#each filteredTags as tag}
		<TagCount {tag} max={tags[0].count + 3} />
	{/each}
</div>
