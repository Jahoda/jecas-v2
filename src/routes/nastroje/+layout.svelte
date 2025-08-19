<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Container verticalSpace>
	<div class="grid grid-cols-1 gap-9">
		{@render children?.()}
	</div>
</Container>
