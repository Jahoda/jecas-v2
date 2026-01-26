<script lang="ts">
	import { mount, unmount, onMount } from 'svelte';
	import { toggle, toggleClass, zkopirovat } from '$lib/post/utils';
	import LiveDemo from '$lib/liveDemo/LiveDemo.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { cleanupAll } from '$lib/liveDemo/registry';

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	let postContent: HTMLDivElement | undefined = $state();
	let mountedComponents: ReturnType<typeof mount>[] = [];

	function cleanupComponents() {
		// Spustit všechny registrované cleanup funkce z článků
		cleanupAll();

		// Unmountnout všechny LiveDemo komponenty
		mountedComponents.forEach((component) => {
			try {
				unmount(component);
			} catch (error) {
				console.error('Unmount error:', error);
			}
		});
		mountedComponents = [];
	}

	function attachLiveCode() {
		if (postContent) {
			const liveElements = postContent.querySelectorAll<HTMLDivElement>('.live:not(.no-live)');

			liveElements.forEach((element) => {
				const content = element.innerHTML;
				element.innerHTML = '';
				const component = mount(LiveDemo, {
					target: element,
					props: {
						liveContainer: element,
						content: content
					}
				});
				mountedComponents.push(component);
			});
		}
	}

	onMount(() => {
		window.toggleClass = toggleClass;
		window.toggle = toggle;
		window.zkopirovat = zkopirovat;
	});

	beforeNavigate(() => {
		cleanupComponents();
	});

	afterNavigate(() => {
		attachLiveCode();
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
