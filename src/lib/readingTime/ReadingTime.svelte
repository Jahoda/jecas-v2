<script lang="ts">
	export let wordCount: number;

	function pluralize(count: number, singular: string, plural: string, many: string) {
		return count === 1 ? singular : count > 4 ? many : plural;
	}

	function calcReadingTime(wordCount: number) {
		const wordsPerMinute = 200;
		const minutes = wordCount / wordsPerMinute;
		const readTime = Math.ceil(minutes);
		return readTime;
	}
</script>

<div class="flex items-center gap-1 text-sm">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="h-4 w-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>

	<div>
		{calcReadingTime(wordCount)}
		{pluralize(calcReadingTime(wordCount), 'minuta', 'minuty', 'minut')}
	</div>
</div>
