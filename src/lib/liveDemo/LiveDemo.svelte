<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import IconCode from '$lib/icon/IconCode.svelte';
	import { slide } from 'svelte/transition';
	import IconCopy from '$lib/icon/IconCopy.svelte';
	import IconCheckCircle from '$lib/icon/IconCheckCircle.svelte';
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		content: string;
		liveContainer: HTMLDivElement;
	}

	let { content, liveContainer }: Props = $props();

	let isShowSource = $state(false);
	let addedScripts: HTMLScriptElement[] = $state([]);

	function handleToggleSource() {
		isShowSource = !isShowSource;
	}

	function getContentWithoutScripts(content: string) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;

		const scripts = tempDiv.querySelectorAll('script');
		scripts.forEach((script) => script.remove());

		return tempDiv.innerHTML;
	}

	let sourceCode = $derived(content.replace(/^\n/g, ''));

	function handleCopyToClipboard() {
		navigator.clipboard.writeText(sourceCode);
		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	let isCopied = $state(false);

	function extractAndExecuteScripts() {
		if (!liveContainer) return;

		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;

		const scripts = tempDiv.querySelectorAll('script');
		scripts.forEach((script) => {
			const newScript = document.createElement('script');

			if (script.src) {
				newScript.src = script.src;
			} else if (script.textContent) {
				newScript.textContent = script.textContent;
			}

			liveContainer.appendChild(newScript);
			addedScripts.push(newScript);
		});
	}

	const contentWithoutScripts = $derived(getContentWithoutScripts(content));

	function cleanupScripts() {
		addedScripts.forEach((script) => {
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		});
		addedScripts = [];
	}

	onMount(() => {
		extractAndExecuteScripts();
	});

	onDestroy(() => {
		cleanupScripts();
	});
</script>

<div class="absolute top-0 right-0">
	<Button xSmall onclick={handleToggleSource}>
		{#snippet icon()}
			<IconCode />
		{/snippet}
		{#if isShowSource}
			Skrýt zdroj
		{:else}
			Zobrazit zdroj
		{/if}
	</Button>
</div>

{@html contentWithoutScripts}

{#if isShowSource}
	<div class="relative pt-4" transition:slide={{ duration: 200 }}>
		<div class="absolute top-10 right-0 m-1">
			<Button xSmall onclick={handleCopyToClipboard}>
				{#snippet icon()}
					{#if isCopied}
						<IconCheckCircle />
					{:else}
						<IconCopy />
					{/if}
				{/snippet}
				{#if isCopied}
					Zkopírováno
				{:else}
					Kopírovat
				{/if}
			</Button>
		</div>
		<pre class="mb-0 rounded-md bg-gray-100 p-4"><code>{sourceCode}</code></pre>
	</div>
{/if}
