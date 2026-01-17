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
	class="custom-button truncate border border-slate-900 bg-slate-900 text-white transition-all hover:bg-slate-800 dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 group inline-flex items-center gap-2 active:translate-y-0.5 {small
		? 'px-2 py-1'
		: xSmall
			? 'px-2 py-0.5'
			: large
				? 'px-5 py-4'
				: 'px-4 py-2'} leading-5 {xSmall ? 'text-sm font-normal' : 'font-semibold'}"
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
