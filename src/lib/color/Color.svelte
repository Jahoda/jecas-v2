<script lang="ts">
	export let value: string;
	export let name: string;
	export let label: string;
</script>

<div>
	<label for={name}>{label}</label>

	<div class="mt-1"></div>
	<div class="flex items-center gap-2">
		<input type="color" id={name} {name} class="h-10" bind:value />

		<slot />
	</div>
</div>

<div class="mt-4"></div>
