<script lang="ts">
	import type { Tag } from '$lib/tag/tags';
	import TagItem from '$lib/tag/TagItem.svelte';

	interface Props {
		tags: Tag[];
		small?: boolean;
	}

	let { tags, small = false }: Props = $props();
</script>

<div class="flex flex-wrap {small ? 'gap-2' : 'gap-4'}">
	{#each tags as tag}
		<TagItem
			{small}
			background={tag.background}
			color={tag.color}
			title={tag.name}
			href={tag.url_slug}
		/>
	{/each}
</div>
