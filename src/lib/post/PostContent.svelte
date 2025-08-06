<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { mount } from 'svelte';
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
				mount(LiveDemo, {
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

<div
	class="
		prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden prose-a:text-blue-dark prose-a:hover:no-underline prose-blockquote:bg-slate-200 prose-blockquote:p-4 prose-blockquote:rounded-md
		prose-blockquote:border-l-4 prose-blockquote:border-slate-300 m-auto w-full max-w-3xl
		"
	bind:this={postContent}
>
	{@html content}
</div>
