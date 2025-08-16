<script lang="ts">
	import { dev } from '$app/environment';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { slugify } from '$lib/form/form';
	import FileNameDialog from './FileNameDialog.svelte';

	export let slug: string;
	export let type: 'preview' | 'content' = 'content';

	const dispatch = createEventDispatcher<{
		upload: { file: File; type: 'preview' | 'content'; filename: string };
	}>();

	let dropZone: HTMLElement;
	let isDragOver = false;
	let isUploading = false;
	let showFileNameDialog = false;
	let pendingFile: File | null = null;

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragOver = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			handleFileUpload(files[0]);
		}
	}

	function handlePaste(event: ClipboardEvent) {
		if (type === 'preview') return;

		const items = event.clipboardData?.items;
		if (!items) return;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile();
				if (file) {
					pendingFile = file;
					showFileNameDialog = true;
					break;
				}
			}
		}
	}

	function handleFileUpload(file: File) {
		if (!file.type.startsWith('image/')) {
			alert('Prosím nahrajte pouze obrázek.');
			return;
		}

		isUploading = true;

		const extension = file.name.split('.').pop() || 'png';
		const baseName = file.name.replace(/\.[^/.]+$/, '');
		const slugifiedName = slugify(baseName);
		const filename = type === 'preview' ? `${slug}.png` : `${slugifiedName}.${extension}`;

		dispatch('upload', { file, type, filename });

		setTimeout(() => {
			isUploading = false;
		}, 1000);
	}

	function handleFileInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			handleFileUpload(file);
		}
		target.value = '';
	}

	function handleFileNameConfirm(event: CustomEvent<{ filename: string }>) {
		if (pendingFile) {
			const extension = pendingFile.name.split('.').pop() || 'png';
			const slugifiedName = slugify(event.detail.filename);
			const filename = `${slugifiedName}.${extension}`;

			dispatch('upload', { file: pendingFile, type, filename });
			pendingFile = null;
		}
	}

	function handleFileNameCancel() {
		pendingFile = null;
		showFileNameDialog = false;
	}
</script>

<svelte:document on:paste={handlePaste} />

{#if dev}
	<div
		bind:this={dropZone}
		class="relative rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors {isDragOver
			? 'border-blue-500 bg-blue-50'
			: 'border-gray-300 hover:border-gray-400'}"
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:drop={handleDrop}
	>
		{#if isUploading}
			<div class="flex items-center justify-center">
				<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
				<span class="ml-2 text-gray-600">Nahrávám...</span>
			</div>
		{:else}
			<div class="space-y-4">
				<div class="text-gray-600">
					<svg
						class="mx-auto h-12 w-12 text-gray-400"
						stroke="currentColor"
						fill="none"
						viewBox="0 0 48 48"
					>
						<path
							d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<p class="text-lg font-medium text-gray-900">
						{type === 'preview' ? 'Náhledový obrázek' : 'Obrázek ke článku'}
					</p>
					<p class="text-sm text-gray-500">Přetáhněte obrázek sem nebo klikněte pro výběr</p>
					<p class="mt-2 text-xs text-gray-400">
						Podporováno: PNG, JPG, GIF, WebP | Paste ze schránky: Ctrl+V
					</p>
				</div>
				<div>
					<label
						for="file-upload-{type}"
						class="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
					>
						Vybrat soubor
					</label>
					<input
						id="file-upload-{type}"
						type="file"
						accept="image/*"
						class="hidden"
						on:change={handleFileInput}
					/>
				</div>
			</div>
		{/if}
	</div>
{/if}

<FileNameDialog
	bind:show={showFileNameDialog}
	defaultName="obrazek"
	on:confirm={handleFileNameConfirm}
	on:cancel={handleFileNameCancel}
/>
