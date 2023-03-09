<script>
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import IconArrowLeft from '$lib/icon/IconArrowLeft.svelte';
</script>

<Container topSpace>
	<Button href="/admin">
		<IconArrowLeft slot="icon" />
		Zpět do administrace
	</Button>
</Container>

<slot />
