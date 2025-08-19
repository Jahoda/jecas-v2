<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import IconClipboardDocument from '$lib/icon/IconClipboardDocument.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';

	let value = $state("Text to translation key\nHello world's.");
	let textarea: HTMLTextAreaElement | undefined = $state();

	function camelize(str: string) {
		return str
			.replace("'", '')
			.replace('.', '')
			.replace(':', '')
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	function convertToTranslations(value: string) {
		const lines: string[] = [];
		value.split('\n').forEach((line) => {
			if (line.length > 2) {
				const text = `"${camelize(line)}": "${line}",`;
				lines.push(text);
			}
		});

		return lines;
	}

	function remove(index: number) {
		lines.splice(index, 1);
		lines = lines;
	}

	let lines = $derived(convertToTranslations(value));

	const title = 'Převod textu na překlady';
	const description = 'Ze zadaného textu vytvoří automaticky překladové klíče';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<MainPost noImage {title} {description} />

<textarea bind:value bind:this={textarea} onfocus={() => textarea?.select()} rows="10" cols="50"
></textarea>

<div class="inline-flex">
	<Button onclick={() => navigator.clipboard.writeText(lines.join('\n'))}>
		{#snippet icon()}
			<IconClipboardDocument />
		{/snippet}
		Zkopírovat překlady
	</Button>
</div>

<hr />

<div class="grid gap-1">
	{#each lines as line, index}
		<code class="flex items-center gap-1">
			<div class="select-none">
				<Button onclick={() => remove(index)} small>×</Button>
			</div>
			{line}
		</code>
	{/each}
</div>
