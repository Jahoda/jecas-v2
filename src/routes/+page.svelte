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

	export let data: PageData;

	$: pagesTags = groupByPageId(data.pagesTags);
</script>

<svelte:head>
	<title>Je čas.cz – moderní tvorba webových stránek</title>
	<meta
		name="description"
		content="Poznámky o moderním webdesignu, hotová řešení, experimenty a návody."
	/>
</svelte:head>

<section>
	<div class="mt-4 md:mt-8"></div>

	<Container>
		<div class="lg:grid-cols-homepage-2 xl:grid-cols-homepage-3 grid grid-cols-1 gap-8">
			<div class="xlx:col-span-6">
				<div class="grid grid-cols-1 gap-8">
					<div class="grid grid-cols-1 gap-8">
						{#each data.posts.slice(0, 3) as post, index (post.url_slug)}
							<div class="grid">
								<MainPost
									title={post.headline}
									description={post.description}
									date={post.last_modification}
									href={post.url_slug}
									neutral={index > 1}
									small={index > 0}
									wordCount={post.word_count}
									tags={data.tags.filter((tag) => pagesTags[post.id]?.includes(tag.id))}
								/>
							</div>
						{/each}
					</div>

					<PostList posts={data.posts.slice(3)} />

					<div class="flex justify-center">
						<Button large href="/archiv" arrow
							>Dalších cca {data.postCount} článků je v archivu</Button
						>
					</div>
				</div>
			</div>

			<div class="xlx:col-span-2">
				<div class="grid grid-cols-1 gap-8">
					<TagCloud tags={data.tags} />
					<LatestComments />
				</div>
			</div>

			<div class="xlx:col-span-3">
				<div class="grid grid-cols-1 gap-8">
					<TopPosts tags={data.tags} posts={data.favorite} {pagesTags} />
				</div>
			</div>
		</div>
	</Container>

	<div class="mt-4 md:mt-8"></div>
</section>
