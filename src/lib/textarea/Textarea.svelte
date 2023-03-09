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
		class="border border-slate-300 rounded-md py-2 px-4 shadow dark:bg-slate-600 dark:border-slate-700 w-full {className}"
		{required}
	/>
</div>

<div class="mt-4" />
