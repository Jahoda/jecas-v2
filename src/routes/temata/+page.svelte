<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const categories: { name: string; slugs: string[] }[] = [
		{
			name: 'HTML',
			slugs: ['html', 'html-tagy', 'html-atributy', 'formulare', 'tabulky']
		},
		{
			name: 'CSS',
			slugs: [
				'css',
				'css-vlastnosti',
				'css-funkce',
				'css-pravidla',
				'selektory-css',
				'stylovani',
				'layout',
				'responsive',
				'preprocesory',
				'webove-animace'
			]
		},
		{
			name: 'JavaScript',
			slugs: ['js', 'ts', 'js-udalosti', 'js-ajax', 'js-vyber-elementu', 'regexp', 'async']
		},
		{
			name: 'Frameworky a knihovny',
			slugs: ['frameworky', 'knihovny', 'svelte', 'vue-js', 'nette']
		},
		{
			name: 'Backend a databáze',
			slugs: ['php', 'php-pdo', 'sql']
		},
		{
			name: 'Design a UX',
			slugs: [
				'ux',
				'typografie',
				'pisma',
				'ikony',
				'obrazky',
				'lightbox',
				'menu',
				'scroll',
				'prepinani-vzhledu',
				'style-guide'
			]
		},
		{
			name: 'Provoz a výkon',
			slugs: ['hosting', 'cloud', 'domeny', 'ftp', 'zrychlovani', 'lazy-loading', 'offline', 'seo']
		},
		{
			name: 'Bezpečnost',
			slugs: ['zabezpeceni', 'hesla', 'spam-ochrana']
		},
		{
			name: 'Nástroje a workflow',
			slugs: ['git', 'produktivita', 'testovani', 'wysiwyg', 'tinymce', 'cms', 'wordpress']
		},
		{
			name: 'Média a obsah',
			slugs: ['video', 'youtube', 'hlas', 'schranka', 'reklama', 'ziskavani-obsahu']
		},
		{
			name: 'Služby a platformy',
			slugs: ['google', 'ga', 'facebook', 'twitter', 'seznam', 'bing', 'apple', 'windows', 'mapy']
		},
		{
			name: 'Ostatní',
			slugs: [
				'ai',
				'hotova-reseni',
				'napady',
				'hacky',
				'fixed',
				'lokalisace',
				'datum',
				'rozliseni',
				'odkazy',
				'recense',
				'konference',
				'st',
				'webove-prohlizece',
				'google-plus'
			]
		}
	];

	let tagsBySlug = $derived(new Map(data.tags.map((tag) => [tag.url_slug, tag])));

	let categoriesWithTags = $derived(
		categories
			.map((cat) => ({
				name: cat.name,
				tags: cat.slugs
					.map((slug) => tagsBySlug.get(slug))
					.filter((tag) => tag && (tag.count ?? 0) > 0)
			}))
			.filter((cat) => cat.tags.length > 0)
	);

	let uncategorized = $derived(
		data.tags.filter(
			(tag) => (tag.count ?? 0) > 0 && !categories.some((cat) => cat.slugs.includes(tag.url_slug))
		)
	);
</script>

<svelte:head>
	<title>Témata – ječas.cz</title>
	<meta
		name="description"
		content="Přehled všech témat na ječas.cz – HTML, CSS, JavaScript, frameworky, backend, design, výkon a další."
	/>
</svelte:head>

<Container verticalSpace>
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-2 text-center text-3xl font-bold md:text-5xl">Témata</h1>
		<p class="mb-10 text-center text-slate-400">Články rozdělené podle zaměření</p>

		<div class="space-y-6">
			{#each categoriesWithTags as category}
				<section class="rounded-2xl bg-gray-50 p-2 shadow dark:bg-slate-700">
					<div class="rounded-xl bg-slate-500/10 p-5 dark:bg-slate-900/50">
						<h2 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">{category.name}</h2>
						<div class="flex flex-wrap gap-2">
							{#each category.tags as tag}
								{#if tag}
									<TagBadge {tag} size="lg" showCount />
								{/if}
							{/each}
						</div>
					</div>
				</section>
			{/each}

			{#if uncategorized.length > 0}
				<section class="rounded-2xl bg-gray-50 p-2 shadow dark:bg-slate-700">
					<div class="rounded-xl bg-slate-500/10 p-5 dark:bg-slate-900/50">
						<h2 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">Další</h2>
						<div class="flex flex-wrap gap-2">
							{#each uncategorized as tag}
								<TagBadge {tag} size="lg" showCount />
							{/each}
						</div>
					</div>
				</section>
			{/if}
		</div>
	</div>
</Container>
