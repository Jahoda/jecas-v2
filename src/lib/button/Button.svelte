<script lang="ts">
	export let href: string | null = null;
	export let arrow = false;
	export let xSmall = false;
	export let small = false;
	export let large = false;
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role="button"
	tabindex="0"
	disabled={href ? null : disabled}
	{href}
	class="custom-button bg-blue-light truncate transition-all {xSmall
		? 'rounded'
		: 'rounded-lg'} group hover:bg-blue-dark inline-flex items-center gap-2 active:translate-y-0.5 {small
		? 'px-2 py-1'
		: xSmall
			? 'px-2 py-0.5'
			: large
				? 'px-5 py-4'
				: 'px-4 py-2'} leading-5 {xSmall ? 'text-sm font-normal' : 'font-semibold'} text-white"
	{type}
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
			class="h-6 w-6 transition-transform group-hover:translate-x-1"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
			/>
		</svg>
	{/if}
</svelte:element>
