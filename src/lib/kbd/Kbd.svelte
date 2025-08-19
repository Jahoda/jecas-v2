<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<kbd class="rounded border bg-slate-100 px-1 py-0.5 text-xs text-slate-500">
	{@render children?.()}
</kbd>
