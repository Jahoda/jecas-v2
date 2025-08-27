<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	interface Props {
		slug: string;
	}

	let { slug }: Props = $props();

	let images: string[] = $state([]);
	let loading = true;
	let isExpanded = $state(false);

	async function loadImages() {
		if (!dev) return;

		try {
			const response = await fetch(`/api/images/${slug}`);
			if (response.ok) {
				const data = await response.json();
				images = data.images || [];
			}
		} catch (error) {
			console.error('Failed to load images:', error);
		} finally {
			loading = false;
		}
	}

	function copyImagePath(path: string) {
		navigator.clipboard.writeText(`<p><img src="${path}" class="border" alt="" /></p>`);
	}

	onMount(() => {
		loadImages();
	});
</script>

{#if dev && images.length > 0}
	<div class="mb-4 rounded-md border border-gray-200 bg-gray-50">
		<button
			onclick={() => (isExpanded = !isExpanded)}
			class="flex w-full items-center justify-between p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
		>
			<span>🖼️ Nahrané obrázky ({images.length})</span>
			<svg
				class="h-4 w-4 transition-transform {isExpanded ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if isExpanded}
			<div class="border-t border-gray-200 p-3">
				<div class="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
					{#each images as image}
						<button onclick={() => copyImagePath(image)} class="group relative">
							<img
								src={image}
								alt="Nahraný obrázek"
								class="h-16 w-full cursor-pointer rounded border object-cover transition-opacity hover:opacity-75"
							/>
						</button>
					{/each}
				</div>
				<p class="mt-2 text-xs text-gray-500">
					Klikněte na obrázek pro zkopírování cesty do schránky
				</p>
			</div>
		{/if}
	</div>
{/if}
