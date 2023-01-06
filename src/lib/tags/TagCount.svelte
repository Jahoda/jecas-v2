<script lang="ts">
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

	export let tag;
</script>

<a href={tag.url_slug} class="group rounded-md overflow-hidden flex relative">
	<div
		class="absolute top-0 left-0 w-full h-full opacity-50 !bg-slate-300"
		style="background: {tagColors[tag.url_slug] || null}"
	/>
	<div
		class="transition-all whitespace-nowrap group-hover:!w-full drop-shadow-2xl shadow-black border flex border-white/25 h-11 pl-4 pr-2 items-center justify-between gap-2 {tag.count /
			(219 + 5) <
		0.3
			? 'text-xs'
			: ''}"
		style="background: {tagColors[tag.url_slug] || null}; color: {tag.color ||
			'#fff'}; width: {(tag.count / (219 + 5)) * 100}%"
	>
		{tag.name}

		<div class="bg-slate-800/10 rounded-md py-1 px-2 text-white">
			{tag.count}
		</div>
	</div>
</a>
