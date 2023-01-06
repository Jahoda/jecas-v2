<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import Container from '$lib/container/Container.svelte';
	import LatestComments from '$lib/comments/LatestComments.svelte';
	import TopPosts from '$lib/topPosts/TopPosts.svelte';
	import TagCloud from '$lib/tags/TagCloud.svelte';
</script>

<svelte:head>
	<title>Je čas.cz – moderní tvorba webových stránek</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<section>
	<div class="mt-10" />

	<Container>
		<div class="grid grid-cols-11 gap-8">
			<div class="col-span-6">
				<div class="grid gap-8">
					<MainPost
						href="/dsad"
						title="JS podmínka v objektu"
						description="Jak v JavaScriptu zapsat podmínku uvnitř objektu."
						date="6. ledna 2023"
						image="https://jecas.cz/files/article/js-podminka-objekt.png"
						tags={[
							{
								title: 'JavaScript',
								url: '/js',
								background: '#FEDA3D',
								color: '#000'
							}
						]}
						background="background-image: linear-gradient(to right top, #feda3d, #e5a23c, #bc713d, #894938, #502a2a, #462423, #3c1f1c, #331916, #4f2a14, #604309, #626200, #4d8316)"
					/>

					<MainPost
						small
						href="/dsad"
						title="Storybook"
						description="Storybook je nástroj pro snadné generování přehledu UI komponent."
						date="6. ledna 2023"
						image="https://jecas.cz/files/article/storybook.png"
						tags={[
							{
								title: 'Rady a nápady',
								url: '/js',
								background: '#7957B0',
								color: '#fff'
							},
							{
								title: 'Style guide',
								url: '/js',
								background: '#0271BB',
								color: '#fff'
							},
							{
								title: 'Produktivita',
								url: '/js',
								background: '#FFA23F',
								color: '#fff'
							}
						]}
						background="background-image: linear-gradient(to right top, #7957b0, #6b5db5, #5b63b9, #4a68bb, #356cbc, #5c6dc1, #7b6dc3, #966dc3, #d466b0, #fc698d, #ff7f65, #ffa23f);"
					/>

					<MainPost
						small
						neutral
						href="/dsad"
						title="Jak vytvořit tmavý režim / dark mode v CSS"
						description="Jak co nejlépe vytvořit pro web tmavý režim, aby automaticky respektoval nastavení uživatele."
						date="6. ledna 2023"
						image="https://jecas.cz/files/article/dark-theme.png"
						tags={[
							{
								title: 'JavaScript',
								url: '/js',
								background: '#FEDA3D',
								color: '#000'
							}
						]}
						background="background-image: linear-gradient(to right top, #feda3d, #e5a23c, #bc713d, #894938, #502a2a, #462423, #3c1f1c, #331916, #4f2a14, #604309, #626200, #4d8316)"
					/>

					<div class="grid grid-cols-2 gap-8">
						<MainPost
							neutral
							small
							href="/dsad"
							title="JS podmínka v objektu"
							description="Jak v JavaScriptu zapsat podmínku uvnitř objektu."
							date="6. ledna 2023"
							image="https://jecas.cz/files/article/js-podminka-objekt.png"
							tags={[
								{
									title: 'JavaScript',
									url: '/js',
									background: '#FEDA3D',
									color: '#000'
								}
							]}
							background="background-image: linear-gradient(to right top, #feda3d, #e5a23c, #bc713d, #894938, #502a2a, #462423, #3c1f1c, #331916, #4f2a14, #604309, #626200, #4d8316)"
						/>

						<MainPost
							small
							href="/dsad"
							neutral
							title="Storybook"
							description="Storybook je nástroj pro snadné generování přehledu UI komponent."
							date="6. ledna 2023"
							image="https://jecas.cz/files/article/storybook.png"
							tags={[
								{
									title: 'Rady a nápady',
									url: '/js',
									background: '#7957B0',
									color: '#fff'
								},
								{
									title: 'Style guide',
									url: '/js',
									background: '#0271BB',
									color: '#fff'
								},
								{
									title: 'Produktivita',
									url: '/js',
									background: '#FFA23F',
									color: '#fff'
								}
							]}
							background="background-image: linear-gradient(to right top, #7957b0, #6b5db5, #5b63b9, #4a68bb, #356cbc, #5c6dc1, #7b6dc3, #966dc3, #d466b0, #fc698d, #ff7f65, #ffa23f);"
						/>

						<MainPost
							neutral
							small
							href="/dsad"
							title="JS podmínka v objektu"
							description="Jak v JavaScriptu zapsat podmínku uvnitř objektu."
							date="6. ledna 2023"
							image="https://jecas.cz/files/article/js-podminka-objekt.png"
							tags={[
								{
									title: 'JavaScript',
									url: '/js',
									background: '#FEDA3D',
									color: '#000'
								}
							]}
							background="background-image: linear-gradient(to right top, #feda3d, #e5a23c, #bc713d, #894938, #502a2a, #462423, #3c1f1c, #331916, #4f2a14, #604309, #626200, #4d8316)"
						/>

						<MainPost
							small
							href="/dsad"
							neutral
							title="Storybook"
							description="Storybook je nástroj pro snadné generování přehledu UI komponent."
							date="6. ledna 2023"
							image="https://jecas.cz/files/article/storybook.png"
							tags={[
								{
									title: 'Rady a nápady',
									url: '/js',
									background: '#7957B0',
									color: '#fff'
								},
								{
									title: 'Style guide',
									url: '/js',
									background: '#0271BB',
									color: '#fff'
								},
								{
									title: 'Produktivita',
									url: '/js',
									background: '#FFA23F',
									color: '#fff'
								}
							]}
							background="background-image: linear-gradient(to right top, #7957b0, #6b5db5, #5b63b9, #4a68bb, #356cbc, #5c6dc1, #7b6dc3, #966dc3, #d466b0, #fc698d, #ff7f65, #ffa23f);"
						/>
					</div>
				</div>
			</div>

			<div class="col-span-3">
				<div class="grid gap-8">
					<TagCloud />
					<LatestComments />
				</div>
			</div>

			<div class="col-span-2">
				<div class="grid gap-8">
					<TopPosts />
				</div>
			</div>
		</div>
	</Container>

	<div class="mt-10" />
</section>
