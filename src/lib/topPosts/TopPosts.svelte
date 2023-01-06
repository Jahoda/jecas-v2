<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';

	const items = [
		{
			title: 'Centrování na webových stránkách',
			href: '/centrovani',
			sdescription:
				'Ucelený popis různých způsobů vertikálního i horizontálního centrování. Se známou i neznámou šířkou nebo výškou.',
			image: 'https://jecas.cz/files/article/centrovani.png'
		},
		{
			title: 'Nástroje pro kontrolu a analysování stránky',
			href: '/kontrola-stranky',
			sdescription:
				'Užitečné nástroje pro analysování, kontrolování a prověřování webových stránek.',
			image: 'https://jecas.cz/files/article/kontrola-stranky.png'
		},
		{
			title: 'SVG',
			href: '/svg',
			sdescription: 'SVG je značkovací jazyk, který se používá k vytváření vektorových grafik.',
			image: 'https://jecas.cz/files/article/svg.png'
		},
		{
			title: 'Kódování',
			href: '/kodovani',
			sdescription:
				'Charakterová sada, čili kódování, je způsob reprezentace znaků pomocí číselných hodnot.',
			image: 'https://jecas.cz/files/article/ceska-klavesnice.png'
		}
	];
</script>

<div class="grid gap-4">
	{#each items as item}
		<MainPost
			small
			title={item.title}
			description={item.description}
			href={item.href}
			image={item.image}
		/>
	{/each}
</div>
