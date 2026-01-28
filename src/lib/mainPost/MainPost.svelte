<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import PostImage from '$lib/postImage/PostImage.svelte';
	import ReadingTime from '$lib/readingTime/ReadingTime.svelte';
	import type { Tag } from '$lib/tag/tags';
	import Tags from '$lib/tags/Tags.svelte';
	import { preventWidows } from '$lib/typography/typography';

	interface Props {
		title: string;
		description: string;
		date?: Date | null;
		href?: string | null;
		slug?: string | null;
		background?: string | null;
		tags?: Tag[] | null;
		small?: boolean;
		neutral?: boolean;
		selected?: boolean;
		noImage?: boolean;
		wordCount?: number | null;
		lazy?: boolean;
		headingLevel?: 'h1' | 'h2';
		visited?: boolean;
	}

	let {
		title,
		description,
		date = null,
		href = null,
		slug = null,
		background = null,
		tags = null,
		small = false,
		neutral = false,
		selected = false,
		noImage = false,
		wordCount = null,
		lazy = true,
		headingLevel = 'h2',
		visited = false
	}: Props = $props();

	// Use slug for image if provided, otherwise fall back to href
	const imageSlug = $derived(slug || href);

	let tagsColors = $derived(tags?.map((tag) => tag.background).filter((color) => color) || []);

	let backgroundGradient = $derived(
		`linear-gradient(to right top, ${tagsColors.join(',')}, #5b63b9)`
	);

	const safeTitle = $derived(preventWidows(title));
	const safeDescription = $derived(preventWidows(description));
</script>

<div
	class="relative rounded-2xl {selected
		? 'shadow-2xl shadow-blue-500/30'
		: ''} @container p-2 shadow {small ? '' : ''} {neutral
		? 'bg-gray-50 dark:bg-slate-700 dark:text-white'
		: 'text-white dark:text-white'}"
	style="--image: url({`/files/article/${imageSlug}.png`});{neutral
		? ''
		: background
			? `background: ${background}`
			: `background-image: ${backgroundGradient}`}"
>
	<div
		class="{selected
			? 'bg-blue-light/30'
			: neutral
				? 'bg-slate-500/10 dark:bg-slate-900/50'
				: 'bg-slate-900/50'} rounded-xl {small ? 'p-3' : 'p-6'} h-full"
	>
		<div
			class="bg-blur pointer-events-none absolute top-0 left-0 -z-10 hidden h-full w-full opacity-50 transition-all"
		></div>
		<div
			class="flex flex-col items-center text-center {small
				? 'gap-4 @sm:flex-row @sm:items-start @sm:text-left'
				: 'gap-8 @xl:flex-row @xl:items-start @xl:text-left'}"
		>
			{#if !noImage && imageSlug}
				<svelte:element
					this={href ? 'a' : 'div'}
					href={href ? `/${href}` : null}
					class="flex flex-shrink-0 overflow-hidden rounded-lg shadow {small
						? 'h-[100px] w-[100px]'
						: 'h-[200px] w-[200px]'}"
				>
					<PostImage slug={imageSlug} {lazy} />
				</svelte:element>
			{/if}

			<div
				class="{small
					? 'gap-4 @sm:items-start'
					: 'gap-8 @xl:items-start'} flex flex-col items-center overflow-hidden"
			>
				<svelte:element
					this={href ? 'a' : 'div'}
					href={href ? `/${href}` : null}
					class={href ? 'hover:underline' : ''}
				>
					<svelte:element
						this={headingLevel}
						class="{small ? 'line-clamp-2 text-2xl' : 'text-3xl md:text-5xl'} font-bold"
					>
						{@html safeTitle}
					</svelte:element>
				</svelte:element>
				{#if description}
					<p class="{small ? 'line-clamp-3 text-sm' : 'text-xl md:text-2xl'} break-words">
						{@html safeDescription}
					</p>
				{/if}

				{#if date}
					<CreatedAt {date} {small} />
				{/if}

				{#if tags && tags.length > 0}
					<Tags {tags} {small} />
				{/if}

				{#if wordCount}
					<ReadingTime {wordCount} />
				{/if}

				{#if visited}
					<span class="flex items-center gap-1 text-xs opacity-60" title="Navštíveno">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3.5 w-3.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
						Navštíveno
					</span>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.bg-blur {
		background-image: var(--image);
		background-size: cover;
		background-position: center;
		filter: blur(60px);
	}
</style>
