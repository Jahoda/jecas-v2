<script>
	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<button
	type="button"
	class="flex items-center w-72 text-left text-sm space-x-3 px-4 h-10 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400"
	><svg
		width="24"
		height="24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="flex-none text-slate-300 dark:text-slate-400"
		aria-hidden="true"><path d="m19 19-3.5-3.5" /><circle cx="11" cy="11" r="6" /></svg
	>
	<span class="flex-auto"> Rychlé hledání</span>
	<kbd class="font-sans font-semibold dark:text-slate-500">
		<abbr title="Command" class="no-underline text-slate-300 dark:text-slate-500">⌘</abbr> K
	</kbd>
</button>
