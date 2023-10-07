<script lang="ts">
	import { onMount } from 'svelte';
	import { toggle, toggleClass } from '$lib/post/utils';
	import LiveDemo from '$lib/liveDemo/LiveDemo.svelte';

	export let content: string;

	onMount(() => {
		window.toggleClass = toggleClass;
		window.toggle = toggle;

		const liveElements = document.querySelectorAll('.live');

		liveElements.forEach((element) => {
			const content = element.innerHTML;
			element.innerHTML = '';
			new LiveDemo({
				target: element,
				props: {
					content: content
				}
			});
		});
	});
</script>

<div class="prose m-auto w-full max-w-3xl dark:prose-invert">
	{@html content}
</div>
