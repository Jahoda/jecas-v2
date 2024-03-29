<script lang="ts">
	import ScrollbarWidthSetter from '$lib/scrollbarWidthSetter/ScrollbarWidthSetter.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import { onNavigate } from '$app/navigation';

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

	$: ({ supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<ScrollbarWidthSetter />

<Header user={data?.session?.user} />

<div class="bg -mb-72 h-72 w-full opacity-20">
	<div class="h-full w-full bg-gradient-to-t from-white dark:from-slate-900" />
</div>

<main class="relative z-10">
	<slot />
</main>

<div class="bg -mt-72 h-72 w-full opacity-20">
	<div class="h-full w-full bg-gradient-to-b from-white dark:from-slate-900" />
</div>

<Footer />

<style>
	.bg {
		background-image: linear-gradient(
			to right top,
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
	}
</style>
