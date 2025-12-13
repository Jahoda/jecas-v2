<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import ReadingTime from '$lib/readingTime/ReadingTime.svelte';
	import Tags from '$lib/tags/Tags.svelte';
	import PostImage from '$lib/postImage/PostImage.svelte';
	import type { Tag } from '$lib/tag/tags';

	interface Post {
		headline: string;
		description: string;
		last_modification: Date | null;
		url_slug: string;
		word_count: number | null;
	}

	interface Props {
		post: Post;
		tags: Tag[];
	}

	let { post, tags }: Props = $props();

	let tagsColors = $derived(tags?.map((tag) => tag.background).filter((color) => color) || []);

	let backgroundGradient = $derived(
		tagsColors.length > 0
			? `linear-gradient(135deg, ${tagsColors.join(',')}, #5b63b9)`
			: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
	);
</script>

<article class="timeline-item">
	<a href={`/${post.url_slug}`} class="timeline-item-link">
		<div class="timeline-item-content" style="background-image: {backgroundGradient}">
			<div class="timeline-item-overlay">
				<div class="timeline-item-body">
					<div class="timeline-item-image-wrapper">
						<div class="timeline-item-image">
							<PostImage slug={post.url_slug} lazy={true} />
						</div>
					</div>

					<div class="timeline-item-text">
						<h4 class="timeline-item-title">
							{@html post.headline}
						</h4>

						{#if post.description}
							<p class="timeline-item-description">
								{@html post.description}
							</p>
						{/if}

						<div class="timeline-item-meta">
							{#if post.last_modification}
								<CreatedAt date={post.last_modification} small={true} />
							{/if}

							{#if post.word_count}
								<ReadingTime wordCount={post.word_count} />
							{/if}
						</div>

						{#if tags && tags.length > 0}
							<div class="timeline-item-tags">
								<Tags {tags} small={true} />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</a>
</article>

<style>
	.timeline-item {
		position: relative;
		transition: all 0.3s ease;
	}

	.timeline-item-link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.timeline-item-content {
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: all 0.3s ease;
	}

	.timeline-item:hover .timeline-item-content {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		transform: translateY(-4px);
	}

	.timeline-item-overlay {
		background: rgba(15, 23, 42, 0.75);
		backdrop-filter: blur(8px);
		padding: 1.25rem;
		transition: background 0.3s ease;
	}

	:global(.dark) .timeline-item-overlay {
		background: rgba(15, 23, 42, 0.85);
	}

	.timeline-item:hover .timeline-item-overlay {
		background: rgba(15, 23, 42, 0.65);
	}

	:global(.dark) .timeline-item:hover .timeline-item-overlay {
		background: rgba(15, 23, 42, 0.75);
	}

	.timeline-item-body {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.timeline-item-image-wrapper {
		flex-shrink: 0;
	}

	.timeline-item-image {
		width: 80px;
		height: 80px;
		border-radius: 0.75rem;
		overflow: hidden;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease;
	}

	.timeline-item:hover .timeline-item-image {
		transform: scale(1.05);
	}

	.timeline-item-text {
		flex: 1;
		min-width: 0;
		color: white;
	}

	.timeline-item-title {
		font-size: 1.125rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
		line-height: 1.4;
		transition: color 0.3s ease;
	}

	.timeline-item:hover .timeline-item-title {
		color: #a5b4fc;
	}

	.timeline-item-description {
		font-size: 0.875rem;
		margin: 0 0 0.75rem 0;
		line-height: 1.5;
		opacity: 0.9;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.timeline-item-meta {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
		font-size: 0.875rem;
		opacity: 0.85;
		margin-bottom: 0.5rem;
	}

	.timeline-item-tags {
		margin-top: 0.75rem;
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.timeline-item-body {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.timeline-item-image {
			width: 120px;
			height: 120px;
		}

		.timeline-item-text {
			width: 100%;
		}

		.timeline-item-meta {
			justify-content: center;
		}
	}
</style>
