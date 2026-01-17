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

<div class="min-h-screen bg-white dark:bg-slate-950">
	<Header />

	<main>
		{@render children?.()}
	</main>

	<Footer />
</div>
