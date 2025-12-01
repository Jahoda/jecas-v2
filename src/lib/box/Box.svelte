<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="rounded-2xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-1 dark:from-slate-800 dark:to-slate-700 dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70 border border-slate-200/50 dark:border-slate-600/50">
	{@render children?.()}
</div>
