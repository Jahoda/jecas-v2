<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="text-2xl">
	{@render children?.()}
</div>

<div class="mt-4"></div>
