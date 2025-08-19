<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		show?: boolean;
		defaultName?: string;
	}

	let { show = $bindable(false), defaultName = '' }: Props = $props();

	const dispatch = createEventDispatcher<{
		confirm: { filename: string };
		cancel: void;
	}>();

	let filename = $state('');
	let inputElement: HTMLInputElement | undefined = $state();

	function handleSubmit() {
		if (filename.trim()) {
			const cleanFilename = filename.trim().replace(/[^a-zA-Z0-9.-]/g, '-');
			dispatch('confirm', { filename: cleanFilename });
			show = false;
		}
	}

	function handleCancel() {
		dispatch('cancel');
		show = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		} else if (event.key === 'Escape') {
			handleCancel();
		}
	}

	run(() => {
		if (show && inputElement) {
			setTimeout(() => {
				inputElement?.focus();
				inputElement?.select();
			}, 100);
		}
	});

	run(() => {
		if (show) {
			filename = defaultName;
		}
	});
</script>

{#if show}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
		transition:fade
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6" onkeydown={handleKeydown}>
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Zadejte název souboru</h3>

			<div class="mb-4">
				<label for="filename" class="mb-2 block text-sm font-medium text-gray-700">
					Název souboru
				</label>
				<input
					bind:this={inputElement}
					id="filename"
					type="text"
					bind:value={filename}
					class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
					placeholder="např. muj-obrazek.png"
				/>
				<p class="mt-1 text-xs text-gray-500">
					Pouze písmena, čísla, tečky a pomlčky. Přípona bude automaticky přidána.
				</p>
			</div>

			<div class="flex justify-end space-x-3">
				<button
					type="button"
					onclick={handleCancel}
					class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
				>
					Zrušit
				</button>
				<button
					type="button"
					onclick={handleSubmit}
					class="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
				>
					Potvrdit
				</button>
			</div>
		</div>
	</div>
{/if}
