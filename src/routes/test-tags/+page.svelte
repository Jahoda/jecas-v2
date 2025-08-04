<script lang="ts">
	import { onMount } from 'svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import type { PowerfulTag } from '$lib/tag/powerfulTags';
	
	let tags: PowerfulTag[] = [];
	let loading = true;
	
	onMount(async () => {
		try {
			const response = await fetch('/admin/api/tags');
			if (response.ok) {
				tags = await response.json();
				tags = tags.slice(0, 20); // Show first 20 tags
			}
		} catch (e) {
			console.error('Error loading tags:', e);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Test Tags Colors</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8">🎨 Tag Colors Test</h1>
	
	{#if loading}
		<div class="flex justify-center py-8">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
		</div>
	{:else}
		<div class="space-y-6">
			<div>
				<h2 class="text-xl font-semibold mb-4">Small Tags</h2>
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						<TagBadge {tag} size="sm" showCount={true} />
					{/each}
				</div>
			</div>
			
			<div>
				<h2 class="text-xl font-semibold mb-4">Medium Tags</h2>
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						<TagBadge {tag} size="md" showCount={true} />
					{/each}
				</div>
			</div>
			
			<div>
				<h2 class="text-xl font-semibold mb-4">Large Tags</h2>
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						<TagBadge {tag} size="lg" showCount={true} />
					{/each}
				</div>
			</div>
			
			<div>
				<h2 class="text-xl font-semibold mb-4">Tag Details</h2>
				<div class="space-y-2">
					{#each tags.slice(0, 5) as tag}
						<div class="bg-gray-50 p-3 rounded">
							<div class="flex items-center gap-3 mb-2">
								<TagBadge {tag} size="md" />
								<span class="text-sm text-gray-600">/{tag.url_slug}</span>
							</div>
							<div class="text-xs text-gray-500">
								Background: <code class="bg-white px-1 rounded">{tag.background}</code>
								Color: <code class="bg-white px-1 rounded">{tag.color}</code>
								Posts: {tag.usage_count || 0}
							</div>
							{#if tag.headline}
								<div class="text-sm mt-1">{tag.headline}</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
		
		<div class="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
			<h3 class="font-medium text-green-900 mb-2">✅ Tag Color Issues Fixed</h3>
			<ul class="text-sm text-green-800 space-y-1">
				<li>• Null color values automatically replaced with contrast-appropriate colors</li>
				<li>• Missing background colors get default blue (#3b82f6)</li>
				<li>• Text color automatically calculated based on background brightness</li>
				<li>• All tags now have valid, non-null color values</li>
			</ul>
		</div>
	{/if}
</div>