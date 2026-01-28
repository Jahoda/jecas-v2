<script lang="ts">
	import { mount, onMount } from 'svelte';
	import { toggle, toggleClass, zkopirovat } from '$lib/post/utils';
	import LiveDemo from '$lib/liveDemo/LiveDemo.svelte';
	import { afterNavigate } from '$app/navigation';
	import { highlightAllCodeBlocks } from '$lib/highlight';

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	let postContent: HTMLDivElement | undefined = $state();

	function attachLiveCode() {
		if (postContent) {
			const liveElements = postContent.querySelectorAll<HTMLDivElement>('.live:not(.no-live)');

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

	function applyCodeHighlighting() {
		if (postContent) {
			highlightAllCodeBlocks(postContent);
		}
	}

	function executeInlineScripts() {
		if (!postContent) return;
		const scripts = postContent.querySelectorAll('script');
		scripts.forEach((oldScript) => {
			const newScript = document.createElement('script');
			for (const attr of oldScript.attributes) {
				newScript.setAttribute(attr.name, attr.value);
			}
			newScript.textContent = oldScript.textContent;
			oldScript.replaceWith(newScript);
		});
	}

	onMount(() => {
		window.toggleClass = toggleClass;
		window.toggle = toggle;
		window.zkopirovat = zkopirovat;
	});

	afterNavigate(() => {
		applyCodeHighlighting();
		attachLiveCode();
		executeInlineScripts();
	});
</script>

<div
	class="
		prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden prose-a:text-blue-dark prose-a:hover:no-underline prose-blockquote:bg-slate-200 dark:prose-blockquote:bg-slate-700 prose-blockquote:p-4 prose-blockquote:rounded-md
		prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600
		prose-kbd:bg-gray-100 dark:prose-kbd:bg-gray-800 prose-kbd:border prose-kbd:border-gray-300 dark:prose-kbd:border-gray-600 prose-kbd:rounded prose-kbd:px-1.5 prose-kbd:py-0.5 prose-kbd:text-xs prose-kbd:align-middle prose-kbd:font-mono prose-kbd:shadow-sm prose-kbd:text-gray-800 dark:prose-kbd:text-gray-200
		m-auto w-full max-w-3xl
		"
	bind:this={postContent}
	id="post-content"
>
	{@html content}
</div>
