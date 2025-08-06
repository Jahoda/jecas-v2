<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	onMount(() => {
		const form = document.getElementById('logout-form') as HTMLFormElement;
		if (form) {
			form.submit();
		}
	});
</script>

<form id="logout-form" method="POST" use:enhance>
	<p>Logging out...</p>
</form>
