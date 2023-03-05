<script lang="ts">
	import { onMount } from 'svelte';

	export let slug: string;

	let mounted = false;

	let disqusElement: HTMLDivElement;

	interface DisqusConfig extends Window {
		disqus_url: string;
	}

	function mountDisqusComments() {
		mounted = true;
		(window as unknown as DisqusConfig).disqus_url = `https://jecas.cz/${slug}`;

		const disqusThread = document.createElement('div');
		disqusThread.id = 'disqus_thread';
		disqusElement.appendChild(disqusThread);

		const script = document.createElement('script');
		script.src = 'https://jecas.disqus.com/embed.js';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
	}

	onMount(mountDisqusComments);
</script>

<div bind:this={disqusElement} class="dark:bg-gray-800 bg-black/10 p-8 rounded-md" />
