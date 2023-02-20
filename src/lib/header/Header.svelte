<script>
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<div class="bg-blue-light shadow-lg">
	<Container verticalSpace={false}>
		<div class="text-white flex items-center py-1 gap-4 md:gap-8 justify-between">
			<a href="/" class="hover:bg-blue-dark px-3 -mx-3 rounded-xl">
				<Logo />
			</a>

			<svelte:element this="h1" class="max-lg:hidden">
				Moderní tvorba webových stránek a aplikací
			</svelte:element>

			<div class="flex-1" />

			<Search />

			<a href="/kontakt" class="hover:bg-blue-dark py-2 px-4 rounded-md transition-colors">
				O webu
			</a>
		</div>
	</Container>
</div>
