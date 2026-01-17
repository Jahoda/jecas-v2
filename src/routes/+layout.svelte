<script lang="ts">
	import ScrollbarWidthSetter from '$lib/scrollbarWidthSetter/ScrollbarWidthSetter.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import { onNavigate } from '$app/navigation';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	inject({ mode: dev ? 'development' : 'production' });
</script>

<ScrollbarWidthSetter />

<!-- Background grid lines -->
<div class="grid-background" aria-hidden="true"></div>

<Header />

<main class="relative z-10">
	{@render children?.()}
</main>

<Footer />

<style>
	.grid-background {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-color: #ffffff;
		background-image:
			linear-gradient(to right, #e2e8f0 1px, transparent 1px),
			linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
		background-size: 80px 80px;
	}

	:global(.dark) .grid-background {
		background-color: #0f172a;
		background-image:
			linear-gradient(to right, #334155 1px, transparent 1px),
			linear-gradient(to bottom, #334155 1px, transparent 1px);
	}

	@media (prefers-color-scheme: dark) {
		.grid-background {
			background-color: #0f172a;
			background-image:
				linear-gradient(to right, #334155 1px, transparent 1px),
				linear-gradient(to bottom, #334155 1px, transparent 1px);
		}
	}
</style>
