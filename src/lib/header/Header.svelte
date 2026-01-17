<script lang="ts">
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
</script>

<div
	class="relative z-20 border-b border-slate-200 bg-white/80 py-2 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80"
>
	<Container verticalSpace={false}>
		<div
			class="-mx-3 flex items-center justify-between gap-1 py-1 text-slate-900 dark:text-slate-100 md:gap-8"
		>
			<a
				href="/"
				class="flex h-10 items-center rounded-lg px-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
			>
				<Logo />
			</a>

			<svelte:element this={'h1'} class="text-sm font-medium text-slate-600 dark:text-slate-400 max-lg:hidden">
				Moderní tvorba webových aplikací
			</svelte:element>

			<div class="flex-1"></div>

			<Search />

			<a
				href="/kontakt"
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
			>
				O webu
			</a>
		</div>
	</Container>
</div>
