<script lang="ts">
	export let value: string | null = null;
	export let name: string;
	export let label: string;
	export let showLabel = true;
	export let placeholder: string | null = null;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let full: boolean = false;
	export let type:
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
		| 'week' = 'text';
</script>

<div>
	{#if showLabel}
		<label for={name}>{label}</label>

		<div class="mt-1"></div>
	{/if}

	<div class="relative">
		{#if $$slots.icon}
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
			>
				<slot name="icon" />
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
            {$$slots.icon ? 'pl-10' : ''}"
			{required}
			on:input
		/>
	</div>
</div>

<div class="mt-4"></div>
