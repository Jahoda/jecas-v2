<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import IconArrowLeft from '$lib/icon/IconArrowLeft.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let isDashboard = $derived($page.url.pathname === '/admin/dashboard');
</script>

<Container topSpace>
	<Button href={isDashboard ? '/' : '/admin'}>
		{#snippet icon()}
			<IconArrowLeft />
		{/snippet}
		Zpět {isDashboard ? 'na web' : 'do administrace'}
	</Button>
</Container>

{@render children?.()}
