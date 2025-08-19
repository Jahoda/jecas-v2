<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="rounded-xl bg-white p-4 shadow-md dark:bg-slate-700">
	{@render children?.()}
</div>
