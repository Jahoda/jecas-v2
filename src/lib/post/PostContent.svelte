<script lang="ts">
	import { mount, onMount } from 'svelte';
	import { toggle, toggleClass, zkopirovat } from '$lib/post/utils';
	import LiveDemo from '$lib/liveDemo/LiveDemo.svelte';
	import { afterNavigate } from '$app/navigation';

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	let postContent: HTMLDivElement | undefined = $state();

	function attachLiveCode() {
		if (postContent) {
			const liveElements = postContent.querySelectorAll<HTMLDivElement>('.live');

			liveElements.forEach((element) => {
				const content = element.innerHTML;
				element.innerHTML = '';
				mount(LiveDemo, {
					target: element,
					props: {
						liveContainer: element,
						content: content
					}
				});
			});
		}
	}

	onMount(() => {
		window.toggleClass = toggleClass;
		window.toggle = toggle;
		window.zkopirovat = zkopirovat;
	});

	afterNavigate(() => {
		attachLiveCode();
	});
</script>

<div
	class="
		prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden prose-a:text-blue-dark prose-a:hover:no-underline prose-blockquote:bg-slate-200 dark:prose-blockquote:bg-slate-700 prose-blockquote:p-4 prose-blockquote:rounded-md
		prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 m-auto w-full max-w-3xl
		"
	bind:this={postContent}
>
	{@html content}
</div>
