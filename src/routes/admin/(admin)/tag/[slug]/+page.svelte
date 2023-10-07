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
	import type { TagIn } from '$lib/tag/tag';
	import Textarea from '$lib/textarea/Textarea.svelte';
	import type { ActionData, PageData } from './$types';
	import TagItem from '$lib/tag/TagItem.svelte';
	import Color from '$lib/color/Color.svelte';
	import { generateRandomHexColor, calcColorsContrast } from '$lib/color/color';
	import IconArrowPath from '$lib/icon/IconArrowPath.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: title = data.tag ? data.tag.name : 'Nový tag';

	const randomColor = generateRandomHexColor();

	let tagForm: TagIn = {
		name: '',
		background: randomColor,
		color: '#ffffff',
		url_slug: '',
		headline: '',
		text_html: ''
	};

	$: {
		if (data.tag) {
			tagForm = data.tag as TagIn;
		}
	}

	function handleRegenerateColor() {
		tagForm.background = generateRandomHexColor();
	}

	let contrastRatio: number = 0;

	$: {
		contrastRatio = calcColorsContrast(tagForm.color, tagForm.background);
	}

	let isSlugEdited = false;

	function handleNameChange() {
		if (!isSlugEdited) {
			tagForm.url_slug = slugify(tagForm.name);
		}
	}

	function handleSlugChange() {
		isSlugEdited = true;
	}
</script>

<svelte:head>
	<title>
		{title}
	</title>
</svelte:head>

<div class="m-auto max-w-lg">
	<Container verticalSpace>
		{#if form?.success}
			<FlashMessage>Tag byl úspěšně uložen.</FlashMessage>
		{:else if $page.url.searchParams.has('created')}
			<FlashMessage>Tag byl úspěšně vytvořen.</FlashMessage>
		{/if}

		<Box>
			<div class="flex justify-between gap-4">
				<Headline>
					{#if tagForm.name}
						{tagForm.name}
					{:else}
						Nový tag
					{/if}
				</Headline>
				<div class="flex flex-col justify-center gap-1">
					<TagItem
						title={tagForm.name || 'Nový tag'}
						background={tagForm.background}
						color={tagForm.color}
						href={tagForm.url_slug}
					/>
					<div class="text-sm">
						Kontrast:
						{contrastRatio}
					</div>
				</div>
			</div>

			<div class="mt-4" />

			<form method="POST" use:enhance={preserveForm}>
				<Input
					required
					label="Název"
					name="name"
					bind:value={tagForm.name}
					on:input={handleNameChange}
				/>

				<Input label="Nadpis" name="headline" bind:value={tagForm.headline} />

				<Color label="Barva" name="background" bind:value={tagForm.background}>
					<button
						on:click={handleRegenerateColor}
						type="button"
						class="rounded p-1 hover:bg-gray-200"
					>
						<IconArrowPath />
					</button>
				</Color>

				<Color label="Barva textu" name="color" bind:value={tagForm.color} />

				<Input
					required
					label="URL"
					name="url_slug"
					bind:value={tagForm.url_slug}
					on:input={handleSlugChange}
				/>

				<Textarea label="Popis" name="text_html" bind:value={tagForm.text_html} />

				<Button large>Uložit</Button>
			</form>
		</Box>
	</Container>
</div>
