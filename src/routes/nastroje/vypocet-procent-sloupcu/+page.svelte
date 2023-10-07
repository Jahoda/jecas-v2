<script lang="ts">
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import IconPlusCircle from '$lib/icon/IconPlusCircle.svelte';
	import IconTrash from '$lib/icon/IconTrash.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';

	let items = [834, 306];

	function sum(arr: number[]) {
		return arr.reduce((acc, cur) => acc + cur, 0);
	}

	function handleAdd() {
		items.push(100);
		items = items;
	}

	function handleRemove(indexToRemove: number) {
		items.splice(indexToRemove, 1);
		items = items;
	}

	function calcPercent(item: number) {
		return `${((item / sum(items)) * 100).toFixed(2)}%`;
	}

	const title = 'Výpočet procentuální šířky sloupců';
	const description = 'Nástroj přepočte procentuální šířku sloupců na základě zadaných hodnot.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<MainPost noImage {title} {description} />

<div class="flex gap-6">
	{#each items as item, index}
		<div style="width: {calcPercent(item)}">
			<Box>
				<div class="grid max-w-xs grid-cols-1 gap-4 p-4">
					<p>
						{calcPercent(item)}
					</p>

					<input type="number" bind:value={item} />

					<Button on:click={() => handleRemove(index)}>
						<IconTrash slot="icon" />
						Smazat
					</Button>
				</div>
			</Box>
		</div>
	{/each}
</div>

<div class="m-auto max-w-xs">
	<Button on:click={handleAdd}>
		<IconPlusCircle slot="icon" />
		Přidat sloupec
	</Button>
</div>
