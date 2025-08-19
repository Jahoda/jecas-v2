<script lang="ts">
	interface Props {
		value: string;
		name: string;
		label: string;
		children?: import('svelte').Snippet;
	}

	let { value = $bindable(), name, label, children }: Props = $props();
</script>

<div>
	<label for={name}>{label}</label>

	<div class="mt-1"></div>
	<div class="flex items-center gap-2">
		<input type="color" id={name} {name} class="h-10" bind:value />

		{@render children?.()}
	</div>
</div>

<div class="mt-4"></div>
