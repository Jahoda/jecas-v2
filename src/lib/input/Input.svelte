<script lang="ts">
	export let value: string;
	export let name: string;
	export let label: string;
	export let showLabel = true;
	export let placeholder: string | null = null;
	export let required: boolean = false;
	export let full: boolean = false;
</script>

<div>
	{#if showLabel}
		<label for={name}>{label}</label>

		<div class="mt-1" />
	{/if}

	<div class="relative">
		{#if $$slots.icon}
			<div
				class="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none text-gray-400"
			>
				<slot name="icon" />
			</div>
		{/if}
		<input
			type="text"
			bind:value
			{name}
			id={name}
			{placeholder}
			class="border border-slate-300 rounded-md py-2 px-4 shadow dark:bg-slate-600 dark:border-slate-700 {full
				? 'w-full'
				: ''}
            {$$slots.icon ? 'pl-10' : ''}"
			{required}
			on:input
		/>
	</div>
</div>

<div class="mt-4" />
