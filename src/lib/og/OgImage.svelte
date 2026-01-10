<script lang="ts">
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		post: Post;
		tags: Tag[];
	}

	let { post, tags }: Props = $props();

	function stripTags(str: string) {
		return str.replace(/(<([^>]+)>)/gi, '');
	}

	function decodeHtmlEntities(str: string) {
		return str
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'");
	}

	function postGradient(tags: Tag[]) {
		const tagsColors = tags?.map((tag) => tag.background).filter((color) => color) || [];
		if (tagsColors.length === 0) {
			return 'linear-gradient(to right top, #3b82f6, #5b63b9)';
		}
		return `linear-gradient(to right top, ${tagsColors.join(',')}, #5b63b9)`;
	}

	function formatDate(date: Date | string | null) {
		if (!date) return '';
		return new Date(date).toLocaleDateString('cs-CZ', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function calcReadingTime(wordCount: number) {
		const wordsPerMinute = 200;
		const minutes = wordCount / wordsPerMinute;
		return Math.ceil(minutes);
	}

	function pluralize(count: number) {
		return count === 1 ? 'minuta' : count > 4 ? 'minut' : 'minuty';
	}

	let description = $derived(decodeHtmlEntities(stripTags(post.description || '')));
	let displayDate = $derived(formatDate(post.last_modification || post.date));
	let readingTime = $derived(post.word_count ? calcReadingTime(post.word_count) : null);
</script>

<!-- OG Image: 1200x630 -->
<div
	style="
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 48px;
		background-image: {postGradient(tags)};
	"
>
	<!-- Main content card -->
	<div
		style="
			display: flex;
			flex: 1;
			background: rgba(15, 23, 42, 0.6);
			border-radius: 24px;
			padding: 40px;
		"
	>
		<!-- Left: Thumbnail -->
		<div
			style="
				display: flex;
				flex-shrink: 0;
				width: 200px;
				height: 200px;
				border-radius: 16px;
				overflow: hidden;
				box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
			"
		>
			<img
				src="https://jecas.cz/files/article/{post.url_slug}.png"
				alt=""
				width="200"
				height="200"
				style="width: 200px; height: 200px; object-fit: cover;"
			/>
		</div>

		<!-- Right: Content -->
		<div
			style="
				display: flex;
				flex-direction: column;
				flex: 1;
				margin-left: 40px;
				gap: 20px;
			"
		>
			<!-- Title -->
			<h1
				style="
					font-size: 48px;
					font-weight: 700;
					color: white;
					line-height: 1.1;
					margin: 0;
				"
			>
				{post.headline || post.title}
			</h1>

			<!-- Description -->
			{#if description}
				<p
					style="
						font-size: 24px;
						color: rgba(255, 255, 255, 0.9);
						line-height: 1.4;
						margin: 0;
					"
				>
					{description.length > 120 ? description.slice(0, 120) + '...' : description}
				</p>
			{/if}

			<!-- Meta row: Date + Reading time -->
			<div style="display: flex; align-items: center; gap: 32px; margin-top: auto;">
				<!-- Date -->
				{#if displayDate}
					<div style="display: flex; align-items: center; gap: 8px;">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
							/>
						</svg>
						<span style="font-size: 20px; color: white;">{displayDate}</span>
					</div>
				{/if}

				<!-- Reading time -->
				{#if readingTime}
					<div style="display: flex; align-items: center; gap: 8px;">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span style="font-size: 20px; color: white;">
							{readingTime}
							{pluralize(readingTime)}
						</span>
					</div>
				{/if}
			</div>

			<!-- Tags -->
			{#if tags && tags.length > 0}
				<div style="display: flex; gap: 12px; flex-wrap: wrap;">
					{#each tags.slice(0, 4) as tag}
						<div
							style="
								display: flex;
								padding: 8px 16px;
								border-radius: 8px;
								font-size: 18px;
								font-weight: 500;
								background: {tag.background || '#6366f1'};
								color: {tag.color || 'white'};
								border: 1px solid rgba(255, 255, 255, 0.25);
							"
						>
							{tag.name}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Logo at bottom -->
	<div style="display: flex; justify-content: center; margin-top: 24px;">
		<svg width="160" height="32" viewBox="0 0 160 32" fill="white">
			<path
				d="M8.25181 27.8809C10.9851 27.7321 12.8073 27.4642 13.7184 26.8688C14.8117 26.0651 15.3584 24.8445 15.3584 23.1477L15.2977 5.28666H10.7422V22.6714C10.7422 24.1599 10.3473 25.0529 9.52735 25.4101C8.70736 25.7078 6.85479 25.9162 4 25.9162V28C5.73109 28 7.15849 27.9405 8.25181 27.8809ZM50.7092 25.9757V23.892H30.0575V16.4498H47.0648V14.5447H30.0575V7.40022H50.7092V5.31643H25.502V26.0651H50.7092V25.9757ZM94.2295 23.6836C90.4029 24.0408 87.0622 24.2789 84.2681 24.2789C81.4437 24.2789 79.3178 24.0706 77.8904 23.7431C76.3719 23.2668 75.2786 22.8501 74.5497 21.957C73.7978 21.2564 73.2702 20.3566 73.0312 19.3671C72.7275 18.3848 72.606 17.1345 72.606 15.5568C72.606 12.3716 73.4564 10.1389 74.7319 8.82911C76.2504 7.51929 79.1963 6.86439 83.5392 6.86439C86.7585 6.86439 90.2206 7.043 94.3813 7.40022L94.5636 5.46527C90.251 5.01874 86.4851 4.8699 83.3266 4.8699C80.1074 4.8699 77.5563 5.01874 75.5215 5.46527C73.5171 5.9118 71.9682 6.65601 70.8749 7.54906C69.7208 8.53142 68.9616 9.63286 68.5364 10.8831C68.0814 12.3688 67.8763 13.9172 67.929 15.4675C67.929 17.3131 68.1112 18.8313 68.5364 20.0518C68.9616 21.2426 69.7512 22.4333 70.8142 23.3264C71.8771 24.2194 73.4564 24.9338 75.4912 25.4101C77.5563 25.8269 80.1985 26.0651 83.3874 26.0651C86.7281 26.0651 90.3725 25.8567 94.5636 25.4697L94.2295 23.6836ZM153.967 7.48953L154.393 5.55458L152.358 5.40573C148.288 5.10805 144.765 4.95921 141.88 4.95921C132.982 4.95921 128.517 6.80485 128.517 10.5259C128.517 12.3716 129.52 13.7111 131.463 14.4851C133.285 15.2889 136.626 15.914 141.242 16.4201C144.796 16.7178 147.225 17.1643 148.531 17.6703C149.837 18.1466 150.475 18.9504 150.475 20.0518C150.475 22.8501 147.499 24.2194 141.576 24.2194C138.752 24.2194 134.591 24.0408 129.185 23.6836L128.669 25.6185L130.795 25.7674C135.199 26.065 138.843 26.2734 141.728 26.2734C150.536 26.2734 155 24.1301 155 19.903C155 18.1764 154.089 16.9261 152.388 16.1819C150.627 15.4377 147.65 14.8423 143.429 14.3958C139.177 13.8897 136.444 13.4432 135.016 12.9669C133.619 12.4906 132.891 11.6273 132.891 10.3771C132.891 8.11466 135.928 6.98346 141.91 6.98346C144.249 6.98346 148.41 7.16207 153.967 7.48953ZM88.4592 1H86.0296L83.2962 2.57773L80.4718 1H78.103L82.0511 3.38148H84.4807L88.4288 1H88.4592ZM112.057 5.01874L100.516 24.4576V26.839H103.249L113.727 9.12679L121.107 17.1643H123.749V14.7828L114.79 5.01874H112.057Z"
			/>
		</svg>
	</div>
</div>
