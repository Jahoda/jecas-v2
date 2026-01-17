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
		background?: string | null;
		tags?: Tag[] | null;
		small?: boolean;
		neutral?: boolean;
		selected?: boolean;
		noImage?: boolean;
		wordCount?: number | null;
		lazy?: boolean;
	}

	let {
		title,
		description,
		date = null,
		href = null,
		background = null,
		tags = null,
		small = false,
		neutral = false,
		selected = false,
		noImage = false,
		wordCount = null,
		lazy = true
	}: Props = $props();

	let tagsColors = $derived(tags?.map((tag) => tag.background).filter((color) => color) || []);

	const safeTitle = $derived(preventWidows(title));
	const safeDescription = $derived(preventWidows(description));
</script>

<div
	class="group relative text-slate-900 transition-colors hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-900 {selected
		? 'bg-slate-50 dark:bg-slate-900'
		: ''} @container"
	style="--accent-color: {tagsColors[0] || '#3b82f6'};"
>
	<!-- Left accent bar -->
	<div
		class="absolute top-0 left-0 h-full w-1"
		style="background-color: var(--accent-color);"
	></div>
	<div class="{small ? 'p-4 pl-5' : 'p-6 pl-8'} h-full">
		<div
			class="flex flex-col items-center text-center {small
				? 'gap-4 @sm:flex-row @sm:items-start @sm:text-left'
				: 'gap-8 @xl:flex-row @xl:items-start @xl:text-left'}"
		>
			{#if !noImage}
				<a
					href={href ? `/${href}` : null}
					class="flex flex-shrink-0 overflow-hidden rounded-lg shadow {small
						? 'h-[100px] w-[100px]'
						: 'h-[200px] w-[200px]'}"
				>
					{#if href}
						<PostImage slug={href} {lazy} />
					{/if}
				</a>
			{/if}

			<div
				class="{small
					? 'gap-4 @sm:items-start'
					: 'gap-8 @xl:items-start'} flex flex-col items-center"
			>
				<svelte:element
					this={href ? 'a' : 'div'}
					href={href ? `/${href}` : null}
					class={href ? 'hover:underline' : ''}
				>
					<h1 class="{small ? 'text-2xl' : 'text-3xl md:text-5xl'} font-bold">
						{@html safeTitle}
					</h1>
				</svelte:element>
				{#if description}
					<p class={small ? 'text-sm' : 'text-xl md:text-2xl'}>
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
			</div>
		</div>
	</div>
</div>

