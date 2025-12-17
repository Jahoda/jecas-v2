<script lang="ts">
	import Box from '$lib/box/Box.svelte';
	import Container from '$lib/container/Container.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import { abbreviations } from '$lib/abbreviations';

	let search = $state('');

	const title = 'Slovník zkratek';
	const description =
		'Přehled zkratek používaných ve webovém vývoji a IT. Každá zkratka je automaticky vysvětlena při prvním výskytu v článcích.';

	// Seskupit zkratky podle kategorií
	const categories = [
		{ name: 'Webové technologie', filter: (i: number) => i < 31 },
		{ name: 'CSS preprocesory', filter: (i: number) => i >= 31 && i < 35 },
		{ name: 'Obrázky', filter: (i: number) => i >= 35 && i < 48 },
		{ name: 'Audio', filter: (i: number) => i >= 48 && i < 53 },
		{ name: 'Video', filter: (i: number) => i >= 53 && i < 65 },
		{ name: 'Fonty', filter: (i: number) => i >= 65 && i < 70 },
		{ name: 'SEO a marketing', filter: (i: number) => i >= 70 && i < 78 },
		{ name: 'UX/UI', filter: (i: number) => i >= 78 && i < 82 },
		{ name: 'IT a sítě', filter: (i: number) => i >= 82 && i < 121 },
		{ name: 'Prohlížeče', filter: (i: number) => i >= 121 && i < 122 },
		{ name: 'Bezpečnost', filter: (i: number) => i >= 122 && i < 134 },
		{ name: 'Programování', filter: (i: number) => i >= 134 && i < 150 },
		{ name: 'Databáze', filter: (i: number) => i >= 150 && i < 154 },
		{ name: 'Verzování', filter: (i: number) => i >= 154 && i < 158 },
		{ name: 'Servery', filter: (i: number) => i >= 158 && i < 163 },
		{ name: 'Kódování', filter: (i: number) => i >= 163 && i < 166 },
		{ name: 'Datové formáty', filter: (i: number) => i >= 166 && i < 173 },
		{ name: 'Geolokace', filter: (i: number) => i >= 173 && i < 175 },
		{ name: 'Hardware', filter: (i: number) => i >= 175 && i < 187 },
		{ name: 'Cloud', filter: (i: number) => i >= 187 && i < 190 },
		{ name: 'Business', filter: (i: number) => i >= 190 && i < 197 },
		{ name: 'Formuláře', filter: (i: number) => i >= 197 && i < 200 },
		{ name: 'Ostatní', filter: (i: number) => i >= 200 && i < 211 },
		{ name: 'České zkratky', filter: (i: number) => i >= 211 }
	];

	let filteredAbbreviations = $derived(
		search.trim()
			? abbreviations.filter(
					(a) =>
						a.short.toLowerCase().includes(search.toLowerCase()) ||
						a.title.toLowerCase().includes(search.toLowerCase())
				)
			: abbreviations
	);

	let totalCount = abbreviations.length;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Container verticalSpace>
	<MainPost noImage {title} {description} />

	<Box>
		<div class="p-6">
			<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Celkem <strong>{totalCount}</strong> zkratek
					{#if search.trim()}
						• Nalezeno <strong>{filteredAbbreviations.length}</strong>
					{/if}
				</p>
				<input
					type="search"
					bind:value={search}
					placeholder="Hledat zkratku..."
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600 sm:w-64"
				/>
			</div>

			{#if search.trim()}
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead class="bg-slate-100 text-xs uppercase dark:bg-slate-700">
							<tr>
								<th class="px-4 py-3">Zkratka</th>
								<th class="px-4 py-3">Význam</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredAbbreviations as abbr}
								<tr class="border-b dark:border-slate-700">
									<td class="px-4 py-3 font-mono font-semibold">{abbr.short}</td>
									<td class="px-4 py-3">{abbr.title}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="grid grid-cols-1 gap-8">
					{#each categories as category}
						{@const categoryAbbrs = abbreviations.filter((_, i) => category.filter(i))}
						{#if categoryAbbrs.length > 0}
							<div>
								<h2 class="mb-3 text-lg font-semibold">{category.name}</h2>
								<div class="overflow-x-auto">
									<table class="w-full text-left text-sm">
										<thead class="bg-slate-100 text-xs uppercase dark:bg-slate-700">
											<tr>
												<th class="px-4 py-2">Zkratka</th>
												<th class="px-4 py-2">Význam</th>
											</tr>
										</thead>
										<tbody>
											{#each categoryAbbrs as abbr}
												<tr class="border-b dark:border-slate-700">
													<td class="px-4 py-2 font-mono font-semibold">{abbr.short}</td>
													<td class="px-4 py-2">{abbr.title}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</Box>

	<div class="mt-8">
		<Box>
			<div class="grid grid-cols-1 gap-4 p-6">
				<h3 class="text-lg font-semibold">Jak to funguje</h3>
				<div class="grid grid-cols-1 gap-3 text-sm text-gray-700 dark:text-gray-300">
					<p>
						Zkratky z tohoto slovníku jsou <strong>automaticky vysvětleny</strong> při prvním výskytu
						v každém článku na webu.
					</p>
					<p>
						Při najetí myší na zkratku (např. <abbr title="HyperText Markup Language">HTML</abbr>)
						se zobrazí její plný význam.
					</p>
				</div>
			</div>
		</Box>
	</div>
</Container>
