<script lang="ts">
	import Box from '$lib/box/Box.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import { abbreviations } from '$lib/abbreviations';

	let search = $state('');

	const title = 'Slovník zkratek';
	const description =
		'Přehled zkratek používaných ve webovém vývoji a IT. Každá zkratka je automaticky vysvětlena při prvním výskytu v článcích.';

	// Seskupit zkratky podle kategorií (komentářů v kódu)
	const categories = [
		{ name: 'Webové technologie', start: 0, end: 30 },
		{ name: 'CSS preprocesory', start: 30, end: 34 },
		{ name: 'Obrázky a média', start: 34, end: 47 },
		{ name: 'Audio formáty', start: 47, end: 52 },
		{ name: 'Video formáty', start: 52, end: 64 },
		{ name: 'Fonty', start: 64, end: 69 },
		{ name: 'SEO a marketing', start: 69, end: 77 },
		{ name: 'UX/UI', start: 77, end: 81 },
		{ name: 'Obecné IT', start: 81, end: 120 },
		{ name: 'Prohlížeče', start: 120, end: 121 },
		{ name: 'Bezpečnost', start: 121, end: 131 },
		{ name: 'Programování', start: 131, end: 146 },
		{ name: 'Databáze', start: 146, end: 150 },
		{ name: 'Verzování', start: 150, end: 154 },
		{ name: 'Servery a hosting', start: 154, end: 159 },
		{ name: 'Kódování', start: 159, end: 162 },
		{ name: 'Datové formáty', start: 162, end: 169 },
		{ name: 'Geolokace', start: 169, end: 171 },
		{ name: 'Hardware a mobilní', start: 171, end: 183 },
		{ name: 'Cloud', start: 183, end: 186 },
		{ name: 'Business', start: 186, end: 193 },
		{ name: 'Zabezpečení formulářů', start: 193, end: 196 },
		{ name: 'Ostatní', start: 196, end: 207 },
		{ name: 'České zkratky', start: 207, end: 212 }
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

<MainPost noImage {title} {description} />

<Box>
	<div class="p-6">
		<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Celkem <strong>{totalCount}</strong> zkratek
				{#if search.trim()}
					&bull; Nalezeno <strong>{filteredAbbreviations.length}</strong>
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
			<!-- Při vyhledávání zobrazit jako jednu tabulku -->
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
			<!-- Bez vyhledávání zobrazit podle kategorií -->
			<div class="grid grid-cols-1 gap-8">
				{#each categories as category}
					{@const categoryAbbrs = abbreviations.slice(category.start, category.end)}
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
					Při najetí myší na zkratku (např. <abbr title="HyperText Markup Language">HTML</abbr>) se
					zobrazí její plný význam.
				</p>
				<p>
					Toto chování odpovídá best practice pro přístupnost webu podle <abbr
						title="Web Content Accessibility Guidelines">WCAG</abbr
					>.
				</p>
			</div>
		</div>
	</Box>
</div>
