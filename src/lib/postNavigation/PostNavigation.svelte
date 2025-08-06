<script lang="ts">
	import type { Post } from '$lib/post/post';
	import MainPost from '$lib/mainPost/MainPost.svelte';

	interface Props {
		prev: Post | null;
		next: Post | null;
	}

	let { prev, next }: Props = $props();
</script>

{#if prev || next}
	<nav class="my-8" aria-label="Navigace mezi články">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#if prev}
				<div class="relative grid">
					<div
						class="absolute top-4 left-4 z-10 rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-600 shadow"
					>
						← Předchozí
					</div>
					<MainPost
						title={prev.headline}
						description={prev.description}
						date={prev.last_modification}
						href={prev.url_slug}
						small={true}
						neutral={true}
						wordCount={prev.word_count}
						tags={[]}
					/>
				</div>
			{/if}

			{#if next}
				<div class="relative grid">
					<div
						class="absolute top-4 right-4 z-10 rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-600 shadow"
					>
						Následující →
					</div>
					<MainPost
						title={next.headline}
						description={next.description}
						date={next.last_modification}
						href={next.url_slug}
						small={true}
						neutral={true}
						wordCount={next.word_count}
						tags={[]}
					/>
				</div>
			{/if}
		</div>
	</nav>
{/if}
