<script lang="ts">
	import { searchText } from '$lib/adminSearch/adminSearch';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import IconMagnifyingGlass from '$lib/icon/IconMagnifyingGlass.svelte';
	import IconPlus from '$lib/icon/IconPlus.svelte';
	import IconPlusCircle from '$lib/icon/IconPlusCircle.svelte';
	import Input from '$lib/input/Input.svelte';
	import SkeletonLoader from '$lib/loader/SkeletonLoader.svelte';
	import AdminPostList from '$lib/post/AdminPostList.svelte';
	import TagItem from '$lib/tag/TagItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<Container verticalSpace>
	<div class="flex items-center gap-4">
		<Button href="/admin/post/new" large>
			<IconPlus slot="icon" />
			Nový článek
		</Button>
		<Input
			name="search"
			placeholder="Hledaný název článku"
			showLabel={false}
			label="Hledat"
			bind:value={$searchText}
		>
			<IconMagnifyingGlass slot="icon" />
		</Input>
	</div>

	<div class="mt-8" />

	<div class="grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
		<div>
			<AdminPostList title="Koncepty" posts={data.drafts} />
		</div>
		<div>
			{#await data.optional.posts}
				<SkeletonLoader />
			{:then posts}
				<AdminPostList title="Poslední články" {posts} />
			{/await}
		</div>
		<div>
			<Box>
				{#await data.optional.tags}
					<SkeletonLoader />
				{:then tags}
					<div class="flex items-center justify-between">
						<div class="text-2xl">
							Tagy ({tags.length})
						</div>

						<Button href="/admin/tag/new">
							<IconPlusCircle slot="icon" />
							Nový tag
						</Button>
					</div>

					<div class="mt-8" />

					<div class="space-y-4">
						{#each tags as tag}
							<div
								class="flex items-center justify-between gap-8 rounded-lg bg-slate-100 p-2 dark:bg-slate-600"
							>
								<TagItem
									title={tag.name}
									background={tag.background}
									color={tag.color}
									href={tag.url_slug}
								/>
								<div class="flex justify-end">
									<div class="inline-flex">
										<Button href="/admin/tag/{tag.url_slug}">Upravit</Button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/await}
			</Box>
		</div>
	</div>
</Container>
