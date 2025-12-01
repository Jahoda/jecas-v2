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

<section>
	<div class="mt-8 md:mt-12"></div>

	<Container>
		<div class="lg:grid-cols-homepage-2 xl:grid-cols-homepage-3 grid grid-cols-1 gap-10 md:gap-12">
			<div class="xlx:col-span-6">
				<div class="grid grid-cols-1 gap-10 md:gap-12">
					<div class="grid grid-cols-1 gap-6 md:gap-10">
						{#each data.posts.slice(0, 3) as post, index (post.url_slug)}
							<div class="grid">
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
							</div>
						{/each}
					</div>

					<PostList posts={data.posts.slice(3)} tags={data.tags} {pagesTags} />

					<div class="flex justify-center pt-4">
						<Button large href="/archiv" arrow
							>Dalších cca {data.postCount} článků je v archivu</Button
						>
					</div>
				</div>
			</div>

			<div class="xlx:col-span-2">
				<div class="grid grid-cols-1 gap-10 md:gap-12">
					<TagCloud tags={data.tags} />
					{#await data.comments then comments}
						<LatestComments {comments} />
					{/await}
				</div>
			</div>

			<div class="xlx:col-span-3">
				<div class="grid grid-cols-1 gap-10 md:gap-12">
					<TopPosts tags={data.tags} posts={data.favorite} {pagesTags} />
				</div>
			</div>
		</div>
	</Container>

	<div class="mt-8 md:mt-12"></div>
</section>
