<script lang="ts">
	import TimelineItem from './TimelineItem.svelte';
	import type { Tag } from '$lib/tag/tags';

	interface Post {
		headline: string;
		description: string;
		last_modification: Date | null;
		url_slug: string;
		word_count: number | null;
	}

	interface Props {
		posts: Post[];
		tags: Tag[];
		pagesTags: Record<string, string[]>;
	}

	let { posts, tags, pagesTags }: Props = $props();

	// Group posts by year and month
	let groupedPosts = $derived.by(() => {
		const groups: Record<
			string,
			Record<string, { posts: Post[]; monthName: string; year: number; month: number }>
		> = {};

		posts.forEach((post) => {
			if (!post.last_modification) return;

			const date = new Date(post.last_modification);
			const year = date.getFullYear();
			const month = date.getMonth();
			const monthNames = [
				'Leden',
				'Únor',
				'Březen',
				'Duben',
				'Květen',
				'Červen',
				'Červenec',
				'Srpen',
				'Září',
				'Říjen',
				'Listopad',
				'Prosinec'
			];

			const yearKey = year.toString();
			const monthKey = month.toString();

			if (!groups[yearKey]) {
				groups[yearKey] = {};
			}

			if (!groups[yearKey][monthKey]) {
				groups[yearKey][monthKey] = {
					posts: [],
					monthName: monthNames[month],
					year,
					month
				};
			}

			groups[yearKey][monthKey].posts.push(post);
		});

		// Sort years and months in descending order
		const sortedGroups = Object.keys(groups)
			.sort((a, b) => parseInt(b) - parseInt(a))
			.map((year) => ({
				year: parseInt(year),
				months: Object.keys(groups[year])
					.sort((a, b) => parseInt(b) - parseInt(a))
					.map((month) => groups[year][month])
			}));

		return sortedGroups;
	});
</script>

<div class="timeline-container">
	{#each groupedPosts as yearGroup, yearIndex}
		<div class="year-section">
			<div class="year-header">
				<div class="year-marker">
					<div class="year-dot"></div>
					<div class="year-line"></div>
				</div>
				<h2 class="year-title">{yearGroup.year}</h2>
			</div>

			{#each yearGroup.months as monthGroup}
				<div class="month-section">
					<div class="month-header">
						<div class="month-marker">
							<div class="month-dot"></div>
						</div>
						<h3 class="month-title">{monthGroup.monthName}</h3>
					</div>

					<div class="posts-list">
						{#each monthGroup.posts as post}
							<TimelineItem
								{post}
								tags={tags.filter((tag) => pagesTags[post.url_slug]?.includes(tag.url_slug))}
							/>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.timeline-container {
		position: relative;
		padding: 2rem 0;
	}

	.year-section {
		position: relative;
		margin-bottom: 3rem;
	}

	.year-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.year-marker {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.year-dot {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
		z-index: 2;
		transition: all 0.3s ease;
	}

	.year-line {
		position: absolute;
		top: 24px;
		width: 3px;
		height: calc(100% + 2rem);
		background: linear-gradient(180deg, #667eea 0%, rgba(102, 126, 234, 0.3) 100%);
	}

	.year-title {
		font-size: 2.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	.month-section {
		position: relative;
		margin-bottom: 2.5rem;
		margin-left: 2rem;
	}

	.month-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.month-marker {
		position: relative;
	}

	.month-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
		transition: all 0.3s ease;
	}

	.month-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
		margin: 0;
	}

	:global(.dark) .month-title {
		color: #e5e7eb;
	}

	.posts-list {
		margin-left: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.year-title {
			font-size: 2rem;
		}

		.month-title {
			font-size: 1.25rem;
		}

		.month-section {
			margin-left: 1rem;
		}

		.posts-list {
			margin-left: 1rem;
		}
	}

	/* Dark mode adjustments */
	:global(.dark) .year-dot {
		box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3);
	}

	:global(.dark) .month-dot {
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
	}
</style>
