<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<div class="bg w-full h-72 opacity-20 -mb-72">
	<div class="bg-gradient-to-b from-white/0 to-white w-full h-full" />
</div>

<main class="relative">
	<slot />
</main>
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
