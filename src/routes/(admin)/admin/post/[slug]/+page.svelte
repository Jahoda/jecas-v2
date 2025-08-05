<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import FlashMessage from '$lib/flashMessage/FlashMessage.svelte';
	import { preserveForm, slugify } from '$lib/form/form';
	import Headline from '$lib/headline/Headline.svelte';
	import Input from '$lib/input/Input.svelte';
	import Textarea from '$lib/textarea/Textarea.svelte';
	import type { ActionData, PageData } from './$types';
	import type { PostIn } from '$lib/post/post';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import TagItem from '$lib/tag/TagItem.svelte';
	import type { Tag } from '$lib/tag/tag';
	import IconXMark from '$lib/icon/IconXMark.svelte';
	import Editor from '$lib/editor/Editor.svelte';
	import FileUplad from '$lib/fileUpload/FileUplad.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: title = data.post ? data.post.title : 'Nový článek';

	$: originalPost = structuredClone(data.post);

	let postForm: PostIn = data.post || {
		id: 0,
		title: '',
		headline: '',
		description: '',
		text_html: '',
		url_slug: '',
		last_modification: new Date(),
		status: 0
	};

	let postTags: number[] = data.tags?.map((tag) => tag.id) || [];

	let allTags: Map<number, Tag> = new Map(data.allTags.map((tag) => [tag.id, tag]));

	let isSlugEdited = false;

	function handleNameChange() {
		if (!isSlugEdited && !data.post) {
			postForm.url_slug = slugify(postForm.title);
		}
	}

	function handleSlugChange() {
		isSlugEdited = true;
	}

	function handleUpdateLastModification(event: Event) {
		const target = event.target as HTMLInputElement;
		postForm.last_modification = target.checked
			? new Date()
			: originalPost?.last_modification || new Date();
	}

	function handleAddTag(event: Event) {
		const target = event.target as HTMLInputElement;

		postTags.push(Number(target.value));
		postTags = postTags;
	}

	function handleRemoveTag(id: number) {
		postTags = postTags.filter((tag) => tag !== id);
	}

	let asignedTags: Tag[] = [];
	$: asignedTags = postTags.map((id) => allTags.get(id)) as Tag[];

	function handleSaveOnCtrlS(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 's') {
			event.preventDefault();
			const form = document.querySelector('form') as HTMLFormElement;
			form.dispatchEvent(new Event('submit'));
		}
	}
</script>

<svelte:head>
	<title>
		{title}
	</title>
</svelte:head>

<Container verticalSpace>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<div>
			{#if form?.message}
				<FlashMessage error>
					{form?.message}
				</FlashMessage>
			{/if}
			{#if form?.success}
				<FlashMessage>
					Článek byl úspěšně uložen.
					<Button small href="/{data.post?.url_slug}">Zobrazit</Button>
				</FlashMessage>
			{:else if $page.url.searchParams.has('created')}
				<FlashMessage>
					Článek byl úspěšně vytvořen.
					<Button small href="/{data.post?.url_slug}">Zobrazit</Button>
				</FlashMessage>
			{/if}

			<Box>
				<div class="flex justify-between gap-4">
					<Headline>
						{#if postForm.title}
							{postForm.title}
						{:else}
							Nový článek
						{/if}
					</Headline>
				</div>

				<div class="mt-4"></div>

				<form method="POST" use:enhance={preserveForm}>
					<input type="hidden" value={postForm.id} name="id" />
					<input type="hidden" value={postForm.last_modification} name="last_modification" />
					<input type="hidden" value={postTags.join(',')} name="postTags" />

					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div class="col-span-2">
							<Input
								full
								required
								label="Titulek"
								name="title"
								bind:value={postForm.title}
								on:input={handleNameChange}
							/>
							<Input full label="Nadpis" name="headline" bind:value={postForm.headline} />
						</div>

						<div class="flex flex-col justify-between">
							<Input
								required
								label="URL"
								name="url_slug"
								bind:value={postForm.url_slug}
								on:input={handleSlugChange}
							/>

							<FileUplad name="thumbnail" bucket="post-thumbnails" filePath={postForm.url_slug} />
						</div>
					</div>

					<Textarea label="Popis" name="description" bind:value={postForm.description} />

					<div class="flex items-center gap-4">
						<CreatedAt date={postForm.last_modification} />

						<label for="update" class="flex items-center gap-2">
							<input type="checkbox" id="update" on:change={handleUpdateLastModification} />
							<span> Aktualisovat čas editace </span>
						</label>
					</div>

					<div class="mt-4"></div>

					<Editor name="text_html" bind:value={postForm.text_html} />

					<div class="mt-4"></div>

					<div class="flex flex-wrap gap-2">
						{#each postTags as tagId (tagId)}
							{@const tag = allTags.get(tagId)}
							{#if tag}
								<TagItem title={tag.name} background={tag.background} color={tag.color}>
									<button
										type="button"
										on:click={() => handleRemoveTag(tag.id)}
										class="hover:bg-white/10"
									>
										<IconXMark /></button
									>
								</TagItem>
							{/if}
						{/each}

						<select on:change={handleAddTag} class="rounded-md border px-2 py-1 hover:bg-slate-100">
							<option value="">Přidat tag</option>
							{#each data.allTags as tag}
								<option value={tag.id}>
									{tag.name}
								</option>
							{/each}
						</select>
					</div>

					<div class="mt-4"></div>

					<div class="mt-8"></div>

					<div class="flex items-center gap-4">
						<Button large>Uložit</Button>
						<div class="flex flex-col">
							<label for="draft">
								<input
									type="radio"
									name="status"
									id="draft"
									bind:group={postForm.status}
									value={0}
								/>
								<span class="ml-2">Neveřejný</span>
							</label>
							<label for="public">
								<input
									type="radio"
									name="status"
									id="public"
									bind:group={postForm.status}
									value={1}
								/>
								<span class="ml-2">Veřejný</span>
							</label>
						</div>
					</div>
				</form>
			</Box>
		</div>
		<div contenteditable="true">
			<Box>
				<MainPost
					title={postForm.headline}
					description={postForm.description}
					date={postForm.last_modification}
					href="/{postForm.url_slug}"
					tags={asignedTags}
				/>

				<div class="mt-8"></div>

				<PostContent content={postForm.text_html} />
			</Box>
		</div>
	</div>
</Container>

<svelte:window on:keydown|capture={handleSaveOnCtrlS} />
