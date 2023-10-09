<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import IconArrowLeft from '$lib/icon/IconArrowLeft.svelte';

	$: isDashboard = $page.url.pathname === '/admin/dashboard';
</script>

<Container topSpace>
	<Button href={isDashboard ? '/' : '/admin'}>
		<IconArrowLeft slot="icon" />
		Zpět {isDashboard ? 'na web' : 'do administrace'}
	</Button>
</Container>

<slot />
