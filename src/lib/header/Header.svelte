<script lang="ts">
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<div class="bg-blue-light dark:bg-blue-light/30 shadow-lg py-2">
	<Container verticalSpace={false}>
		<div class="text-white flex items-center py-1 gap-4 md:gap-8 justify-between -mx-3">
			<a
				href="/"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 px-3 rounded-xl h-10 flex items-center"
			>
				<Logo />
			</a>

			<svelte:element this="h1" class="max-lg:hidden">
				Moderní tvorba webových aplikací
			</svelte:element>

			<div class="flex-1" />

			<Search />

			<a
				href="/kontakt"
				class="hover:bg-blue-dark dark:hover:bg-blue-dark/30 dark:ho py-2 px-4 rounded-md transition-colors"
			>
				O webu
			</a>
		</div>
	</Container>
</div>
