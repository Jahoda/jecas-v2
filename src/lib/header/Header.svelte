<script lang="ts">
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<div class="bg-blue-light relative z-20 py-2 shadow-lg dark:bg-blue-light/30">
	<Container verticalSpace={false}>
		<div class="-mx-3 flex items-center justify-between gap-1 py-1 text-white md:gap-8">
			<a
				href="/"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 flex h-10 items-center rounded-xl px-3"
			>
				<Logo />
			</a>

			<svelte:element this={'h1'} class="max-lg:hidden">
				Moderní tvorba webových aplikací
			</svelte:element>

			<div class="flex-1"></div>

			<Search />

			<a
				href="/kontakt"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 rounded-md px-4 py-2 transition-colors"
			>
				O webu
			</a>
		</div>
	</Container>
</div>
