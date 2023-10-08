<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { toggle, toggleClass, zkopirovat } from '$lib/post/utils';
	import LiveDemo from '$lib/liveDemo/LiveDemo.svelte';

	export let content: string;

	let postContent: HTMLDivElement;

	function attachLiveCode() {
		if (postContent) {
			const liveElements = postContent.querySelectorAll('.live');

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
		}
	}

	afterUpdate(() => {
		window.toggleClass = toggleClass;
		window.toggle = toggle;
		window.zkopirovat = zkopirovat;

		attachLiveCode();
	});
</script>

<div class="prose m-auto w-full max-w-3xl dark:prose-invert" bind:this={postContent}>
	{@html content}
</div>
