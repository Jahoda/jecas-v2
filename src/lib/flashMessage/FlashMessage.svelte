<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import IconCheckCircle from '$lib/icon/IconCheckCircle.svelte';
	import IconXMark from '$lib/icon/IconXMark.svelte';

	export let error = false;

	let hide = false;

	function handleClose() {
		hide = true;
	}

	setTimeout(handleClose, 5000);
</script>

{#if !hide}
	<div transition:slide>
		<div
			class="rounded-md {error
				? 'bg-red-200 red-green-800 border-red-500'
				: 'bg-green-200 text-green-800 border-green-500'} p-4 border flex items-center gap-2 justify-between"
			transition:fade
		>
			<div class="flex gap-2">
				<IconCheckCircle />
				<slot />
			</div>

			<button
				aria-label="Zavřít"
				class="{error ? 'hover:bg-red-100' : 'hover:bg-green-100'} rounded-sm transition-colors"
				on:click={handleClose}
			>
				<IconXMark />
			</button>
		</div>

		<div class="pt-8" />
	</div>
{/if}
