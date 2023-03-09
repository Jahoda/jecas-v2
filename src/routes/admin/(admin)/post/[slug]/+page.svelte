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

	export let data: PageData;
	export let form: ActionData;

	$: title = data.post ? data.post.title : 'Nový článek';

	$: originalPost = structuredClone(data.post);

	let postForm: PostIn = {
		id: 0,
		title: '',
		headline: '',
		description: '',
		text_html: '',
		url_slug: '',
		last_modification: new Date(),
		status: 0
	};

	$: {
		if (data.post) {
			postForm = data.post as PostIn;
		}
	}

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
</script>

<svelte:head>
	<title>
		{title}
	</title>
</svelte:head>

<Container verticalSpace>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<div>
			{#if form?.success}
				<FlashMessage>
					Článek byl úspěšně uložen.

					<Button small href="/{data.post?.url_slug}">Zobrazit</Button>
				</FlashMessage>
			{:else if $page.url.searchParams.has('created')}
				<FlashMessage>Článek byl úspěšně vytvořen.</FlashMessage>
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

				<div class="mt-4" />

				<form method="POST" use:enhance={preserveForm}>
					<input type="hidden" value={postForm.id} name="id" />
					<input type="hidden" value={postForm.last_modification} name="last_modification" />

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

						<div>
							<Input
								required
								label="URL"
								name="url_slug"
								bind:value={postForm.url_slug}
								on:input={handleSlugChange}
							/>
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

					<div class="mt-4" />

					<Textarea label="Obsah" name="text_html" bind:value={postForm.text_html} />

					<div class="flex gap-4 items-center">
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
					tags={data.tags}
				/>

				<div class="mt-8" />

				<PostContent content={postForm.text_html} />
			</Box>
		</div>
	</div>
</Container>
