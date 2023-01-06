<script lang="ts">
	import TagCount from './TagCount.svelte';

	import Tag from '$lib/tag/Tag.svelte';

	const tagColors = {
		html: '#D7401B',
		'html-tagy': '#D7401B',
		'html-atributy': '#D7401B',
		css: '#0271BB',
		'css-vlastnosti': '#0271BB',
		'selektory-css': '#0271BB',
		js: '#FEDA3F',
		'google-plus': '#D1402D',
		seznam: '#E7202B',
		'seznam-text': '#EEEEEE',
		'webove-prohlizece': '#76E7FF',
		seo: '#EE9104',
		'hotova-reseni': '#4D8316',
		napady: '#7957B0',
		'webove-animace': '#DA3F94',
		formulare: '#178666',
		'lazy-loading': '#DF2824',
		knihovny: '#686868',
		google: '#4583F0',
		responsive: '#3429FA',
		tabulky: '#BE7041',
		wordpress: '#000',
		zrychlovani: '#969EF8',
		domeny: '#C7A6F4',
		scroll: '#587E70',
		ga: '#F05721',
		reklama: '#ff0000',
		nette: '#3484D2',
		windows: '#0078D6',
		wysiwyg: '#DFDFDF',
		youtube: '#AA2A25',
		produktivita: '#FFA23F',
		php: '#9999CC',
		menu: '#E6C6A6',
		obrazky: '#7CE09F',
		mapy: '#CFF596',
		zabezpeceni: '#62CCC1',
		sql: '#015A84',
		'sql-text': '#FFB562',
		layout: '#EEFBBD',
		'layout-text': '#546705',
		hacky: '#272822',
		'hacky-text': '#91E22A',
		preprocesory: '#eb4a4b',
		recense: '#777451',
		bing: '#f4bd27',
		konference: '#532fc1',
		hosting: '#1206ca'
	};

	const tags = [
		{
			count: 219,
			tag_id: 7,
			url_slug: 'css',
			name: 'CSS'
		},
		{
			count: 216,
			tag_id: 22,
			url_slug: 'hotova-reseni',
			name: 'Hotová řešení'
		},
		{
			count: 174,
			tag_id: 25,
			url_slug: 'napady',
			name: 'Rady a nápady'
		},
		{
			count: 154,
			tag_id: 4,
			url_slug: 'js',
			name: 'JavaScript',
			color: '#000'
		},
		{
			count: 86,
			tag_id: 3,
			url_slug: 'html',
			name: 'HTML'
		},
		{
			count: 54,
			tag_id: 11,
			url_slug: 'produktivita',
			name: 'Produktivita'
		},
		{
			count: 50,
			tag_id: 23,
			url_slug: 'formulare',
			name: 'Formuláře'
		},
		{
			count: 48,
			tag_id: 34,
			url_slug: 'php',
			name: 'PHP'
		},
		{
			count: 43,
			tag_id: 32,
			url_slug: 'responsive',
			name: 'Responsivní design'
		},
		{
			count: 37,
			tag_id: 24,
			url_slug: 'webove-prohlizece',
			name: 'Prohlížeče',
			color: '#000'
		},
		{
			count: 29,
			tag_id: 12,
			url_slug: 'seo',
			name: 'SEO'
		},
		{
			count: 29,
			tag_id: 33,
			url_slug: 'obrazky',
			name: 'Obrázky',
			color: '#000'
		}
	];
</script>

<div class="grid text-white gap-4 text-sm text-center">
	{#each tags as tag}
		<TagCount {tag} />
	{/each}
</div>
