<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import PostImage from '$lib/postImage/PostImage.svelte';
	import ReadingTime from '$lib/readingTime/ReadingTime.svelte';
	import type { Tag } from '$lib/tag/tags';
	import Tags from '$lib/tags/Tags.svelte';

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

	let backgroundGradient = $derived(
		`linear-gradient(to right top, ${tagsColors.join(',')}, #5b63b9)`
	);
</script>

<div
	class="group relative rounded-3xl {selected
		? 'shadow-2xl shadow-blue-500/40 ring-2 ring-blue-400/50'
		: 'shadow-lg hover:shadow-2xl'} @container p-2 transition-all duration-500 hover:-translate-y-1 {small ? '' : ''} {neutral
		? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 dark:text-white hover:from-gray-100 hover:to-gray-50 dark:hover:from-slate-700 dark:hover:to-slate-800'
		: 'text-white dark:text-white'}"
	style="--image: url({`/files/article/${href}.png`});{neutral
		? ''
		: background
			? `background: ${background}`
			: `background-image: ${backgroundGradient}`}"
>
	<div
		class="{selected
			? 'bg-gradient-to-br from-blue-500/40 to-purple-500/40 backdrop-blur-sm'
			: neutral
				? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
				: 'bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-md'} rounded-2xl {small ? 'p-4' : 'p-8'} h-full transition-all duration-500 group-hover:backdrop-blur-lg"
	>
		<div
			class="bg-blur pointer-events-none absolute top-0 left-0 -z-10 hidden h-full w-full opacity-50 transition-all"
		></div>
		<div
			class="flex flex-col items-center text-center {small
				? 'gap-4 @sm:flex-row @sm:items-start @sm:text-left'
				: 'gap-8 @xl:flex-row @xl:items-start @xl:text-left'}"
		>
			{#if !noImage}
				<a
					href={href ? `/${href}` : null}
					class="flex flex-shrink-0 overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 group-hover:rotate-2 ring-2 ring-white/20 {small
						? 'h-[120px] w-[120px]'
						: 'h-[220px] w-[220px]'}"
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
					class={href ? 'transition-all duration-300 hover:scale-105' : ''}
				>
					<h1 class="{small ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'} font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white to-blue-100 dark:from-white dark:to-purple-100 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-500">
						{@html title}
					</h1>
				</svelte:element>
				{#if description}
					<p class="{small ? 'text-base md:text-lg' : 'text-xl md:text-2xl'} leading-relaxed opacity-95 group-hover:opacity-100 transition-opacity duration-300">
						{@html description}
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

<style>
	.bg-blur {
		background-image: var(--image);
		background-size: cover;
		background-position: center;
		filter: blur(60px);
	}
</style>
