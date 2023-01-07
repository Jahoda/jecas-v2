<script lang="ts">
	export let href: string;
	export let arrow = false;
</script>

<a
	{href}
	class="bg-blue-light rounded-lg gap-2 active:translate-y-0.5 transition-transform flex items-center group hover:bg-blue-dark px-5 py-4 leading-5 font-semibold text-white"
>
	<slot />

	{#if arrow}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 group-hover:translate-x-1 transition-transform"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
			/>
		</svg>
	{/if}
</a>
