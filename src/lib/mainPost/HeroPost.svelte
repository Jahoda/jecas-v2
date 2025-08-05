<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import PostImage from '$lib/postImage/PostImage.svelte';
	import ReadingTime from '$lib/readingTime/ReadingTime.svelte';
	import type { Tag } from '$lib/tag/tags';
	import Tags from '$lib/tags/Tags.svelte';
	import { postGradient } from './postGradient';

	export let title: string;
	export let description: string;
	export let date: Date | null = null;
	export let href: string | null = null;
	export let tags: Tag[] | null = null;
	export let small = false;
	export let neutral = false;
	export let noImage = false;
	export let background: string | null = null;
	export let isTag = false;
	export let wordCount: number | null = null;

	let backgroundGradient: string | null = null;

	$: {
		if (isTag) {
			backgroundGradient = `linear-gradient(to right top, ${background}, #5b63b9)`;
		} else if (tags) {
			backgroundGradient = postGradient(tags);
		}
	}
</script>

<div
	class="relative overflow-hidden p-4 text-white shadow-inner max-md:text-center md:p-16 dark:text-white"
	style="--image: url({`/files/article/${href}.png`}); background-image: {backgroundGradient}"
>
	{#if !isTag}
		<div
			class="bg-blur pointer-events-none absolute top-0 left-0 h-full w-full opacity-50 transition-all"
		></div>
	{/if}
	<div class="relative m-auto h-full max-w-[74em] rounded-xl bg-slate-900/50 p-6">
		<div class="flex flex-col max-md:items-center md:flex-row {small ? 'gap-4' : 'gap-8'}">
			{#if !noImage}
				<a
					{href}
					class="flex flex-shrink-0 overflow-hidden rounded-lg shadow {small
						? 'h-[100px] w-[100px]'
						: 'h-[200px] w-[200px]'}"
				>
					{#if href}
						<PostImage slug={href} lazy={!neutral && !small} />
					{/if}
				</a>
			{/if}

			<div class="{small ? 'gap-4' : 'gap-8'} flex flex-col max-md:items-center">
				<svelte:element this={href ? 'a' : 'div'} {href} class={href ? 'hover:underline' : ''}>
					<h1 class="{small ? 'text-2xl' : 'text-3xl sm:text-5xl'} font-bold">
						{@html title}
					</h1>
				</svelte:element>
				{#if description}
					<p class={small ? 'text-sm' : 'text-xl sm:text-2xl'}>
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
		filter: blur(30px);
	}
</style>
