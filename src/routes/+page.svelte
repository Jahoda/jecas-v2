<script lang="ts">
	import Button from '$lib/button/Button.svelte';

	import MainPost from '$lib/mainPost/MainPost.svelte';
	import Container from '$lib/container/Container.svelte';
	import LatestComments from '$lib/comments/LatestComments.svelte';
	import TopPosts from '$lib/topPosts/TopPosts.svelte';
	import TagCloud from '$lib/tags/TagCloud.svelte';

	import type { PageData } from './$types';
	import { groupByPageId } from '$lib/tags/tags';
	import PostList from '$lib/post/PostList.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const pagesTags = $derived(groupByPageId(data.pagesTags));
</script>

<svelte:head>
	<title>Je čas.cz – moderní tvorba webových stránek</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>

	<!-- OpenGraph pro hezčí sdílení na Facebooku: https://jecas.cz/nahled-odkazu -->
	<meta property="og:url" content="https://jecas.cz/" />
	<meta property="og:title" content="Je čas.cz – moderní tvorba webových stránek" />
	<meta
		property="og:description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<section class="border-t border-slate-200 dark:border-slate-800">
	<Container>
		<div class="lg:grid-cols-homepage-2 xl:grid-cols-homepage-3 grid grid-cols-1">
			<!-- Main content column -->
			<div class="py-8">
				<div class="grid grid-cols-1 gap-4">
					{#each data.posts.slice(0, 3) as post, index (post.url_slug)}
						<MainPost
							title={post.headline}
							description={post.description}
							date={post.last_modification}
							href={post.url_slug}
							neutral={index > 1}
							small={index > 0}
							lazy={index > 1}
							wordCount={post.word_count}
							tags={data.tags.filter((tag) => pagesTags[post.url_slug]?.includes(tag.url_slug))}
						/>
					{/each}
				</div>

				<div class="mt-8">
					<PostList posts={data.posts.slice(3)} tags={data.tags} {pagesTags} />
				</div>

				<div class="mt-8 flex justify-center">
					<Button large href="/archiv" arrow
						>Dalších cca {data.postCount} článků je v archivu</Button
					>
				</div>
			</div>

			<!-- Sidebar: Tags & Comments -->
			<div
				class="border-slate-200 py-8 max-lg:border-t lg:border-l lg:pl-8 dark:border-slate-800"
			>
				<div class="grid grid-cols-1 gap-8">
					<TagCloud tags={data.tags} />

					<div class="border-t border-slate-200 pt-8 dark:border-slate-800">
						<LatestComments />
					</div>
				</div>
			</div>

			<!-- Sidebar: Top Posts -->
			<div
				class="border-slate-200 py-8 max-xl:border-t xl:border-l xl:pl-8 dark:border-slate-800"
			>
				<TopPosts tags={data.tags} posts={data.favorite} {pagesTags} />
			</div>
		</div>
	</Container>
</section>
