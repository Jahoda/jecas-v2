<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import IconCode from '$lib/icon/IconCode.svelte';
	import { slide } from 'svelte/transition';
	import IconCopy from '$lib/icon/IconCopy.svelte';
	import IconCheckCircle from '$lib/icon/IconCheckCircle.svelte';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { codeToHtml } from 'shiki';
	import prettier from 'prettier/standalone';
	import parserHtml from 'prettier/plugins/html';

	interface Props {
		content: string;
		liveContainer: HTMLDivElement;
	}

	let { content, liveContainer }: Props = $props();

	let isShowSource = $state(false);
	let addedScripts: HTMLScriptElement[] = $state([]);
	let cleanupScriptContent: string | undefined = $state();

	function handleToggleSource() {
		isShowSource = !isShowSource;
	}

	function createTempDiv(content: string): HTMLDivElement {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;
		return tempDiv;
	}

	function getContentWithoutScripts(content: string, selector: string = 'script') {
		const tempDiv = createTempDiv(content);
		const scripts = tempDiv.querySelectorAll(selector);
		scripts.forEach((script) => script.remove());
		return tempDiv.innerHTML;
	}

	function getSourceCodeWithoutCleanUp(content: string) {
		return getContentWithoutScripts(content, 'script[data-cleanup]');
	}

	const sourceCode = $derived(getSourceCodeWithoutCleanUp(content));

	const prettierSourceCode = $derived(
		prettier.format(getSourceCodeWithoutCleanUp(content), { parser: 'html', plugins: [parserHtml] })
	);

	function handleCopyToClipboard() {
		navigator.clipboard.writeText(sourceCode);
		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	let isCopied = $state(false);

	function createScriptElement(script: HTMLScriptElement): HTMLScriptElement {
		const newScript = document.createElement('script');

		if (script.src) {
			newScript.src = script.src;
		} else if (script.textContent) {
			newScript.textContent = script.textContent;
		}

		return newScript;
	}

	function extractAndExecuteScripts() {
		if (!liveContainer) return;

		const tempDiv = createTempDiv(content);
		const scripts = tempDiv.querySelectorAll('script:not([data-cleanup])');

		scripts.forEach((script) => {
			const scriptElement = script as HTMLScriptElement;
			const newScript = createScriptElement(scriptElement);

			liveContainer.appendChild(newScript);
			addedScripts.push(newScript);
		});
	}

	function storeCleanupScript() {
		const tempDiv = createTempDiv(content);
		const cleanupElement = tempDiv.querySelector('[data-cleanup]');

		if (cleanupElement && cleanupElement.textContent) {
			cleanupScriptContent = cleanupElement.textContent;
		}
	}

	const contentWithoutScripts = $derived(getContentWithoutScripts(content));

	async function getFormatedSourceCode(content: string) {
		const formatedCode = await prettier.format(getSourceCodeWithoutCleanUp(content), {
			parser: 'html',
			plugins: [parserHtml]
		});
		const highlightedCode = await codeToHtml(formatedCode.trim(), {
			lang: 'html',
			theme: 'vitesse-dark'
		});

		return highlightedCode;
	}

	onMount(() => {
		extractAndExecuteScripts();
		storeCleanupScript();
	});

	function executeCleanupScript() {
		if (cleanupScriptContent) {
			const newScript = document.createElement('script');
			newScript.textContent = cleanupScriptContent;
			liveContainer.appendChild(newScript);
		}
	}

	beforeNavigate(executeCleanupScript);
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
		{#await getFormatedSourceCode(sourceCode) then code}
			{@html code}
		{/await}
	</div>
{/if}
