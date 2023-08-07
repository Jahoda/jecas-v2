<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import PostImage from '$lib/postImage/PostImage.svelte';
	import ReadingTime from '$lib/readingTime/ReadingTime.svelte';
	import type { Tag } from '$lib/tag/tag';
	import Tags from '$lib/tags/Tags.svelte';

	export let title: string;
	export let description: string;
	export let date: Date | null = null;
	export let href: string | null = null;
	export let background: string | null = null;
	export let tags: Tag[] | null = null;
	export let small = false;
	export let neutral = false;
	export let noImage = false;
	export let wordCount: number | null = null;

	// $: backgroundGradient = background
	// 	? `linear-gradient(to right top, ${background}, #000`
	// 	: `linear-gradient(to right top, #7957b0, #6b5db5, #5b63b9, #4a68bb, #356cbc, #5c6dc1, #7b6dc3, #966dc3, #d466b0, #fc698d, #ff7f65, #ffa23f)`;

	$: tagsColors = tags?.map((tag) => tag.background).filter((color) => color) || [];
	$: color1 = tagsColors[0] || '#7957b0';
	$: color2 = tagsColors[1] || '#6b5db5';
	$: color3 = tagsColors[2] || '#5b63b9';

	$: backgroundGradient = `linear-gradient(to right top, ${tagsColors.join(',')}, #5b63b9)`;
	// $: backgroundGradient = generateGradient(color1, color2, color3);
</script>

<div
	class="relative @container rounded-2xl shadow p-2 {small ? '' : ''} {neutral
		? 'bg-gray-50 dark:bg-slate-700 dark:text-white'
		: 'text-white dark:text-white'}"
	style="--image: url({`/files/article/${href}.png`});{neutral
		? ''
		: background
		? `background: ${background}`
		: `background-image: ${backgroundGradient}`}"
>
	<div
		class="{neutral ? 'dark:bg-slate-900/50 bg-slate-500/10' : 'bg-slate-900/50'} rounded-xl {small
			? 'p-3'
			: 'p-6'} h-full"
	>
		<div
			class="bg-blur absolute top-0 left-0 w-full h-full transition-all -z-10 opacity-50 hidden"
		/>
		<div
			class="flex flex-col items-center text-center {small
				? 'gap-4 @sm:flex-row @sm:text-left @sm:items-start'
				: '@xl:flex-row gap-8 @xl:text-left @xl:items-start'}"
		>
			{#if !noImage}
				<a
					{href}
					class="flex rounded-lg overflow-hidden flex-shrink-0 shadow {small
						? 'w-[100px] h-[100px]'
						: 'w-[200px] h-[200px]'}"
				>
					{#if href}
						<PostImage slug={href} lazy={!neutral && !small} />
					{/if}
				</a>
			{/if}

			<div class="{small ? 'gap-4' : 'gap-8'} flex flex-col">
				<svelte:element this={href ? 'a' : 'div'} {href} class={href ? 'hover:underline' : ''}>
					<h1 class="{small ? 'text-2xl' : 'text-5xl'} font-bold">
						{@html title}
					</h1>
				</svelte:element>
				{#if description}
					<p class={small ? 'text-sm' : 'text-2xl'}>
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
