<script>
	import Search from './Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<div class="bg-blue-light shadow-lg">
	<Container>
		<div class="text-white flex items-center py-1 gap-8 justify-between">
			<a href="/" class="hover:bg-blue-dark px-5 -mx-5 rounded-xl">
				<Logo />
			</a>

			<svelte:element this="h1"> Moderní tvorba webových stránek a aplikací </svelte:element>

			<div class="flex-1" />

			<Search />

			<a href="/kontakt" class="hover:bg-blue-dark py-2 px-4 rounded-md transition-colors">
				O webu
			</a>
		</div>
	</Container>
</div>
