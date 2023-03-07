<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Header />

<div class="bg w-full h-72 opacity-20 -mb-72">
	<div class="bg-gradient-to-t dark:from-slate-900 from-white w-full h-full" />
</div>

<main class="relative z-10">
	<slot />
</main>

<div class="bg w-full h-72 opacity-20 -mt-72">
	<div class="bg-gradient-to-b dark:from-slate-900 from-white w-full h-full" />
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
