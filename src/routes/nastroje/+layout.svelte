<script>
	import Container from '$lib/container/Container.svelte';
</script>

<Container verticalSpace>
	<div class="grid grid-cols-1 gap-9">
		<slot />
	</div>
</Container>
