<script lang="ts">
	export let value: string;
	export let name: string;
	export let label: string;
	export let required: boolean = false;
	let className: string = '';
	export { className as class };
</script>

<div>
	<label for={name}>{label}</label>

	<div class="mt-1" />

	<textarea
		bind:value
		{name}
		id={name}
		class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600 {className}"
		{required}
	/>
</div>

<div class="mt-4" />
