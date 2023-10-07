<script lang="ts">
	import { onMount } from 'svelte';

	export let slug: string;

	let mounted = false;

	interface Disqus extends Window {
		DISQUS: {
			reset: (options: {
				reload: boolean;
				config: (this: { page: { identifier: string; url: string } }) => void;
			}) => void;
		};
	}

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://jecas.disqus.com/embed.js';
		document.documentElement.appendChild(script);
		script.onload = handleLoadDisqus;

		return () => {
			script.remove();
		};
	});

	function handleLoadDisqus() {
		mounted = true;
	}

	function resetDisqus(slug: string) {
		(window as unknown as Disqus)['DISQUS'].reset({
			reload: true,
			config: function () {
				this.page.identifier = slug;
				this.page.url = `https://jecas.cz/${slug}`;
			}
		});
	}

	$: {
		if (mounted) {
			resetDisqus(slug);
		}
	}
</script>

<div class="rounded-md bg-black/10 p-8 dark:bg-gray-800" id="disqus_thread" />
