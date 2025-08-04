<script lang="ts">
	import { onMount } from 'svelte';
	import type { PowerfulTag } from '$lib/tag/powerfulTags';
	
	let tags: PowerfulTag[] = [];
	let loading = true;
	let error = '';
	
	onMount(async () => {
		try {
			const response = await fetch('/admin/api/tags');
			if (response.ok) {
				tags = await response.json();
			} else {
				error = 'Failed to load tags';
			}
		} catch (e) {
			error = 'Error loading tags';
		} finally {
			loading = false;
		}
	});
	
	function getContrastColor(bgColor: string | null): string {
		if (!bgColor) return '#000000';
		
		// Remove # if present
		const hex = bgColor.replace('#', '');
		
		// Ensure we have a valid hex string
		if (hex.length !== 6) return '#000000';
		
		// Convert to RGB
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);
		
		// Calculate brightness
		const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		
		return brightness > 128 ? '#000000' : '#ffffff';
	}
	
	function getTagBackground(tag: PowerfulTag): string {
		return tag.background || '#3b82f6';
	}
	
	function getTagColor(tag: PowerfulTag): string {
		if (tag.color && tag.color !== 'null') {
			return tag.color;
		}
		return getContrastColor(getTagBackground(tag));
	}
</script>

<svelte:head>
	<title>Manage Tags - Admin</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">Powerful Tags Management</h1>
		<p class="text-gray-600 mt-2">Manage your blog tags with rich metadata, colors, and descriptions.</p>
	</div>
	
	{#if loading}
		<div class="flex justify-center py-8">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
		</div>
	{:else if error}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
			{error}
		</div>
	{:else}
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
			<div class="px-4 py-5 sm:p-6">
				<div class="mb-4 flex justify-between items-center">
					<h2 class="text-lg font-medium">All Tags ({tags.length})</h2>
					<button 
						class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						on:click={() => window.location.href = '/admin/tags/new'}
					>
						Add New Tag
					</button>
				</div>
				
				<div class="grid gap-4">
					{#each tags as tag}
						<div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="flex items-center gap-3 mb-2">
																			<span 
										class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
										style="background-color: {getTagBackground(tag)}; color: {getTagColor(tag)}"
									>
											{tag.name}
										</span>
										<span class="text-sm text-gray-500">
											/{tag.url_slug}
										</span>
										<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
											{tag.usage_count || 0} posts
										</span>
										{#if tag.status === 0}
											<span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
												Inactive
											</span>
										{/if}
									</div>
									
									{#if tag.headline}
										<h3 class="font-medium text-gray-900 mb-1">{tag.headline}</h3>
									{/if}
									
									{#if tag.text_html}
										<div class="text-sm text-gray-600 prose prose-sm">
											{@html tag.text_html}
										</div>
									{/if}
								</div>
								
								<div class="flex gap-2 ml-4">
									<button 
										class="text-blue-600 hover:text-blue-800 text-sm"
										on:click={() => window.location.href = `/admin/tags/edit/${tag.id}`}
									>
										Edit
									</button>
									<button 
										class="text-green-600 hover:text-green-800 text-sm"
										on:click={() => window.open(`/${tag.url_slug}`, '_blank')}
									>
										View
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
				
				{#if tags.length === 0}
					<div class="text-center py-8 text-gray-500">
						<p>No tags found. Start by adding your first tag!</p>
					</div>
				{/if}
			</div>
		</div>
		
		<div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
			<h3 class="font-medium text-blue-900 mb-2">💡 Tag Features</h3>
			<ul class="text-sm text-blue-800 space-y-1">
				<li>• <strong>Rich Metadata:</strong> Headlines, descriptions, and full HTML content</li>
				<li>• <strong>Custom Styling:</strong> Background colors and text colors</li>
				<li>• <strong>SEO URLs:</strong> Custom URL slugs for better SEO</li>
				<li>• <strong>Usage Tracking:</strong> Automatic post count tracking</li>
				<li>• <strong>Status Control:</strong> Enable/disable tags</li>
			</ul>
		</div>
	{/if}
</div>

<style>
	.prose {
		max-width: none;
	}
	.prose p {
		margin: 0;
	}
</style>