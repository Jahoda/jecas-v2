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
	class="relative rounded-2xl {selected
		? 'shadow-2xl shadow-blue-500/30'
		: ''} @container p-2 shadow {small ? '' : ''} {neutral
		? 'bg-gray-50 dark:bg-slate-700 dark:text-white'
		: 'text-white dark:text-white'}"
	style="--image: url({`/files/article/${href}.png`});{neutral
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
						{@html title}
					</h1>
				</svelte:element>
				{#if description}
					<p class={small ? 'text-sm' : 'text-xl md:text-2xl'}>
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
