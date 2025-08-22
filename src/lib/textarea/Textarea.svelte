<script lang="ts">
	interface Props {
		value: string;
		name: string;
		label: string;
		required?: boolean;
		class?: string;
		placeholder?: string;
	}

	let {
		value = $bindable(),
		name,
		label,
		required = false,
		class: className = '',
		placeholder = ''
	}: Props = $props();
</script>

<div>
	<label for={name}>{label}</label>

	<div class="mt-1"></div>

	<textarea
		bind:value
		{name}
		id={name}
		class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600 {className}"
		{required}
		{placeholder}
	></textarea>
</div>

<div class="mt-4"></div>
