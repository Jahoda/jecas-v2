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
	<div class="inline-flex flex-col rounded-xl bg-black/10 p-4 dark:bg-white/10">
		<ul class="space-y-1">
			{#each headlines as headline}
				<li>
					<a
						href="#{headline.id}"
						class="block rounded-md px-4 py-1 no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/5 {headline.id ===
						intersectingId
							? 'bg-black/10 no-underline dark:bg-white/10'
							: ''} "
					>
						{headline.text}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
