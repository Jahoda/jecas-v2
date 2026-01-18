<script lang="ts">
	import type { Tag } from '$lib/tag/tags';
	import TagCount from './TagCount.svelte';

	interface Props {
		tags: Tag[];
	}

	let { tags }: Props = $props();

	let filteredTags = $derived(tags.filter((tag) => tag.background).slice(0, 10));
</script>

<div class="grid text-center text-sm text-white">
	{#each filteredTags as tag, index}
		<div class={index > 0 ? '-mt-px' : ''}>
			<TagCount {tag} max={(tags[0]?.count || 0) + 3} />
		</div>
	{/each}
</div>
