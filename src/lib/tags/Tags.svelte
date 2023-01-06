<script lang="ts">
	import Tag from '$lib/tag/Tag.svelte';

	export let tags: object[];
	export let small = false;
</script>

<div class="flex flex-wrap {small ? 'gap-2' : 'gap-4'}">
	{#each tags as tag}
		<Tag {small} background={tag.background} color={tag.color} title={tag.title} href={tag.url} />
	{/each}
</div>
