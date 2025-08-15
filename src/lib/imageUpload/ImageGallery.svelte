<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	export let slug: string;

	let images: string[] = [];
	let loading = true;

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
		navigator.clipboard.writeText(`<img src="${path}" class="border" alt="" />`);
	}

	onMount(() => {
		loadImages();
	});
</script>

{#if dev && images.length > 0}
	<div class="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
		<h4 class="mb-3 text-sm font-medium text-gray-700">Nahrané obrázky pro tento článek:</h4>
		<div class="grid grid-cols-2 gap-3 md:grid-cols-4">
			{#each images as image}
				<div class="group relative">
					<img
						src={image}
						alt="Nahraný obrázek"
						class="h-24 w-full cursor-pointer rounded border object-cover transition-opacity hover:opacity-75"
						on:click={() => copyImagePath(image)}
					/>
				</div>
			{/each}
		</div>
		<p class="mt-2 text-xs text-gray-500">Klikněte na obrázek pro zkopírování cesty do schránky</p>
	</div>
{/if}
