<script lang="ts">
	import Search from '$lib/search/Search.svelte';

	import Container from '$lib/container/Container.svelte';
	import Logo from '$lib/logo/Logo.svelte';
	import type { User } from '@supabase/supabase-js';
	import IconUserCircle from '$lib/icon/IconUserCircle.svelte';

	export let user: User | null = null;
</script>

<div class="bg-blue-light py-2 shadow-lg dark:bg-blue-light/30">
	<Container verticalSpace={false}>
		<div class="-mx-3 flex items-center justify-between gap-1 py-1 text-white md:gap-8">
			<a
				href="/"
				class="flex h-10 items-center rounded-xl px-3 hover:bg-blue-dark dark:hover:bg-blue-dark/30"
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
				class="rounded-md px-4 py-2 transition-colors hover:bg-blue-dark dark:hover:bg-blue-dark/30"
			>
				O webu
			</a>

			{#if user}
				<a
					href="/admin/dashboard"
					class="rounded-md p-2 transition-colors hover:bg-blue-dark dark:hover:bg-blue-dark/30"
				>
					<IconUserCircle />
				</a>
			{/if}
		</div>
	</Container>
</div>
