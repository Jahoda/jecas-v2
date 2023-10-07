<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import IconCode from '$lib/icon/IconCode.svelte';

	import { slide } from 'svelte/transition';
	import IconCopy from '$lib/icon/IconCopy.svelte';
	import IconCheckCircle from '$lib/icon/IconCheckCircle.svelte';

	export let content = 'default content';

	let isShowSource = false;

	function handleToggleSource() {
		isShowSource = !isShowSource;
	}

	$: sourceCode = content.replace(/^\n/g, '');

	function handleCopyToClipboard() {
		navigator.clipboard.writeText(sourceCode);
		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	let isCopied = false;
</script>

<div class="absolute right-0 top-0">
	<Button xSmall on:click={handleToggleSource}>
		<IconCode slot="icon" />
		{#if isShowSource}
			Skrýt zdroj
		{:else}
			Zobrazit zdroj
		{/if}
	</Button>
</div>

{@html content}

{#if isShowSource}
	<div class="relative pt-4" transition:slide={{ duration: 200 }}>
		<div class="absolute right-0 top-10 m-1">
			<Button xSmall on:click={handleCopyToClipboard}>
				<svelte:fragment slot="icon">
					{#if isCopied}
						<IconCheckCircle />
					{:else}
						<IconCopy />
					{/if}
				</svelte:fragment>
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
