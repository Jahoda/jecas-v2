<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		href?: string | null;
		arrow?: boolean;
		xSmall?: boolean;
		small?: boolean;
		large?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		icon?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		onclick?: () => void;
	}

	let {
		href = null,
		arrow = false,
		xSmall = false,
		small = false,
		large = false,
		disabled = false,
		type = 'button',
		icon,
		children,
		onclick
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role="button"
	tabindex="0"
	disabled={href ? null : disabled}
	{href}
	class="custom-button bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 truncate transition-all duration-300 {xSmall
		? 'rounded-md'
		: 'rounded-xl'} group shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 inline-flex items-center justify-center gap-2 active:translate-y-0.5 hover:-translate-y-0.5 hover:scale-105 {small
		? 'px-3 py-2'
		: xSmall
			? 'px-2 py-1'
			: large
				? 'px-8 py-5 text-lg'
				: 'px-6 py-3'} leading-5 {xSmall ? 'text-sm font-medium' : 'font-bold'} text-white"
	{type}
	{onclick}
	onkeypress={bubble('keypress')}
>
	{@render icon?.()}

	{@render children?.()}

	{#if arrow}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
			/>
		</svg>
	{/if}
</svelte:element>
