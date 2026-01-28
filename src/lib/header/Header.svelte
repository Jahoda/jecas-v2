<script lang="ts">
	import { page } from '$app/stores';
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';

	const isHomepage = $derived($page.url.pathname === '/');
</script>

<div class="bg-blue-light dark:bg-blue-light/30 py-2 shadow-lg">
	<Container verticalSpace={false}>
		<div class="-mx-3 flex items-center justify-between gap-1 py-1 text-white md:gap-8">
			<a
				href="/"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 flex h-10 items-center rounded-xl px-3"
			>
				<Logo />
			</a>

			<svelte:element this={isHomepage ? 'h1' : 'span'} class="max-lg:hidden">
				Moderní tvorba webových aplikací
			</svelte:element>

			<div class="flex-1"></div>

			<Search />

			<a
				href="/temata"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 rounded-md px-4 py-2 transition-colors max-sm:hidden"
			>
				Témata
			</a>

			<a
				href="/kontakt"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 rounded-md px-4 py-2 transition-colors"
			>
				O webu
			</a>
		</div>
	</Container>
</div>
