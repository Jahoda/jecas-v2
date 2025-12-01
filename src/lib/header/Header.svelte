<script lang="ts">
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<div class="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-600/90 via-blue-500/90 to-purple-600/90 dark:from-blue-700/80 dark:via-blue-600/80 dark:to-purple-700/80 border-b border-white/10 shadow-2xl shadow-blue-500/20">
	<Container verticalSpace={false}>
		<div class="-mx-3 flex items-center justify-between gap-2 py-4 text-white md:gap-8">
			<a
				href="/"
				class="group flex h-12 items-center rounded-2xl px-4 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:scale-105"
			>
				<div class="transition-transform duration-300 group-hover:rotate-3">
					<Logo />
				</div>
			</a>

			<svelte:element this={'h1'} class="max-lg:hidden text-lg font-semibold tracking-wide">
				Moderní tvorba webových aplikací
			</svelte:element>

			<div class="flex-1"></div>

			<div class="transform transition-all duration-300 hover:scale-105">
				<Search />
			</div>

			<a
				href="/kontakt"
				class="hidden sm:flex items-center rounded-xl px-5 py-2.5 font-medium transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:scale-105"
			>
				O webu
			</a>
		</div>
	</Container>
</div>
