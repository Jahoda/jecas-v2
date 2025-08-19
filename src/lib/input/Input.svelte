<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		value?: string | null;
		name: string;
		label: string;
		showLabel?: boolean;
		placeholder?: string | null;
		disabled?: boolean;
		required?: boolean;
		full?: boolean;
		type?:
			| 'text'
			| 'password'
			| 'email'
			| 'number'
			| 'tel'
			| 'url'
			| 'search'
			| 'date'
			| 'time'
			| 'datetime-local'
			| 'month'
			| 'week';
		icon?: import('svelte').Snippet;
	}

	let {
		value = $bindable(null),
		name,
		label,
		showLabel = true,
		placeholder = null,
		disabled = false,
		required = false,
		full = false,
		type = 'text',
		icon
	}: Props = $props();
</script>

<div>
	{#if showLabel}
		<label for={name}>{label}</label>

		<div class="mt-1"></div>
	{/if}

	<div class="relative">
		{#if icon}
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
			>
				{@render icon?.()}
			</div>
		{/if}
		<input
			{type}
			bind:value
			{name}
			{disabled}
			id={name}
			{placeholder}
			class="rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600 {full
				? 'w-full'
				: ''}
            {icon ? 'pl-10' : ''}"
			{required}
			oninput={bubble('input')}
		/>
	</div>
</div>

<div class="mt-4"></div>
