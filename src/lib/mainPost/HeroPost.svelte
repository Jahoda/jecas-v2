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
	export let tags: Tag[] | null = null;
	export let small = false;
	export let neutral = false;
	export let noImage = false;
	export let wordCount: number | null = null;

	$: tagsColors = tags?.map((tag) => tag.background).filter((color) => color) || [];

	$: backgroundGradient = `linear-gradient(to right top, ${tagsColors.join(',')}, #5b63b9)`;
</script>

<div
	class="relative p-4 text-white shadow-inner dark:text-white max-md:text-center md:p-16"
	style="--image: url({`/files/article/${href}.png`}); background-image: {backgroundGradient}"
>
	<div class="m-auto h-full max-w-[74em] rounded-xl bg-slate-900/50 p-6">
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
