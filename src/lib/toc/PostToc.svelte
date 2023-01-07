<script lang="ts">
	import { onMount } from 'svelte';

	export let slug: string;

	let headlines: TocHeadlineType[];
	let loaded = false;
	let observer: IntersectionObserver;
	let intersectingId: string | null = null;

	interface TocHeadlineType {
		id: string;
		text: string;
	}

	function getHeadlinesFromPage(): TocHeadlineType[] {
		const allHeadlines: NodeListOf<HTMLElement> = document.querySelectorAll('.prose h2');
		return [...allHeadlines].map((item) => {
			observer.observe(item);
			return {
				id: item.id,
				text: item.innerText
			};
		});
	}

	function initObserver() {
		const observerOptions = {
			rootMargin: '0px',
			threshold: 0.5
		};

		observer = new IntersectionObserver(observerCallback, observerOptions);

		function observerCallback(entries: IntersectionObserverEntry[]) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					intersectingId = entry.target.id;
				}
			});
		}
	}

	onMount(() => {
		loaded = true;
		initObserver();
	});

	$: {
		if (loaded) {
			slug, (headlines = getHeadlinesFromPage());
		}
	}
</script>

{#if headlines?.length > 0}
	<div class="font-display text-lg font-bold xl:px-2.5">Obsah:</div>
	<ul>
		{#each headlines as headline}
			<li>
				<a
					href="#{headline.id}"
					class="block py-1 text-link underline hover:no-underline xl:pl-2.5 xl:pr-7.5 {headline.id ===
					intersectingId
						? 'bg-muted/10'
						: ''} "
				>
					{headline.text}
				</a>
			</li>
		{/each}
	</ul>
{/if}
