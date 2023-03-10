<script lang="ts">
	export let href: string | null = null;
	export let arrow = false;
	export let small = false;
	export let large = false;
	export let disabled = false;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	disabled={href ? null : disabled}
	{href}
	class="bg-blue-light truncate transition-all rounded-lg gap-2 active:translate-y-0.5 inline-flex items-center group hover:bg-blue-dark {small
		? 'px-2 py-1'
		: large
		? 'px-5 py-4'
		: 'px-4 py-2'} leading-5 font-semibold text-white"
	on:click
	on:keypress
>
	<slot name="icon" />

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
</svelte:element>
