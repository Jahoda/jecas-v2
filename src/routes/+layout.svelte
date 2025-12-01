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

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
	<Header />

	<div class="bg -mb-96 h-96 w-full opacity-30 blur-3xl">
		<div class="h-full w-full bg-gradient-to-t from-white dark:from-slate-950"></div>
	</div>

	<main class="relative z-10 py-8">
		{@render children?.()}
	</main>

	<div class="bg -mt-96 h-96 w-full opacity-30 blur-3xl">
		<div class="h-full w-full bg-gradient-to-b from-white dark:from-slate-950"></div>
	</div>

	<Footer />
</div>

<style>
	.bg {
		background-image: linear-gradient(
			135deg,
			#0d6ab7,
			#0e6ebe,
			#0e72c5,
			#0f77cc,
			#0f7bd3,
			#3b7ad7,
			#5578d9,
			#6b75da,
			#916ad1,
			#b05cc1,
			#c84dad,
			#da3f94
		);
		animation: gradient-shift 15s ease infinite;
	}

	@keyframes gradient-shift {
		0%, 100% {
			background-position: 0% 50%;
			background-size: 200% 200%;
		}
		50% {
			background-position: 100% 50%;
			background-size: 200% 200%;
		}
	}
</style>
