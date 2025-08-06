<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		slug: string;
	}
	let { slug }: Props = $props();

	let mounted = $state(false);

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

	$effect(() => {
		if (mounted) {
			resetDisqus(slug);
		}
	});
</script>

<div class="rounded-md bg-black/10 p-8 text-[#000000] dark:bg-gray-800" id="disqus_thread"></div>
