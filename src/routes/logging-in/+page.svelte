<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Box from '$lib/box/Box.svelte';
	import Container from '$lib/container/Container.svelte';
	import SkeletonLoader from '$lib/loader/SkeletonLoader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto(redirectTo ?? '/profil');
		}
	}
</script>

<Container verticalSpace>
	<Box>
		<SkeletonLoader />
	</Box>
</Container>
