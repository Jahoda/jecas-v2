<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import Date from '$lib/date/CreatedAt.svelte';
	import { generateGradient } from '$lib/mainPost/gradientGenerator';
	import ReadingTime from '$lib/readingTime/ReadingTime.svelte';
	import Tags from '$lib/tags/Tags.svelte';

	export let title: string;
	export let description: string;
	export let date: string | null = null;
	export let href: string | null = null;
	export let background: string | null = null;
	export let tags: object[] | null = null;
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
	class="relative rounded-2xl shadow p-2 {small ? '' : ''} {neutral
		? 'bg-gray-50 dark:bg-slate-700 dark:text-white'
		: 'text-white dark:text-white'}"
	style="--image: url({`/files/article/${href}.png`});{neutral
		? ''
		: `background-image: ${backgroundGradient}`}"
>
	<div
		class="{neutral
			? 'dark:bg-slate-900/50 bg-slate-500/10'
			: 'bg-slate-900/50'} rounded-xl p-3 h-full"
	>
		<div
			class="bg-blur absolute top-0 left-0 w-full h-full transition-all -z-10 opacity-50 hidden"
		/>
		<div class="flex md:flex-row flex-col {small ? 'gap-4' : 'gap-8'}">
			{#if !noImage}
				<a
					{href}
					class="flex rounded-lg overflow-hidden flex-shrink-0 shadow {small
						? 'w-[100px] h-[100px]'
						: 'w-[200px] h-[200px]'}"
				>
					<img
						src={`/files/article/${href}.png`}
						loading={!neutral && !small ? null : 'lazy'}
						alt=""
						width="200"
						height="200"
					/>
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
