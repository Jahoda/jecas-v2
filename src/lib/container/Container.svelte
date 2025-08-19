<script lang="ts">
	interface Props {
		verticalSpace?: boolean;
		topSpace?: boolean;
		children?: import('svelte').Snippet;
	}

	let { verticalSpace = false, topSpace = false, children }: Props = $props();
</script>

<div class="{verticalSpace ? 'p-4 md:p-10' : 'px-4 md:px-10'} {topSpace ? 'pt-4 md:pt-10' : ''}">
	{@render children?.()}
</div>
