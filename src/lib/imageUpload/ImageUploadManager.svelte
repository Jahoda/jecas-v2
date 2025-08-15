<script lang="ts">
	import { dev } from '$app/environment';
	import ImageUpload from './ImageUpload.svelte';
	import ImageGallery from './ImageGallery.svelte';
	import { createEventDispatcher } from 'svelte';

	export let slug: string;

	const dispatch = createEventDispatcher<{
		insertImage: { path: string; filename: string };
	}>();

	let uploadStatus = '';

	async function handleUpload(
		event: CustomEvent<{ file: File; type: 'preview' | 'content'; filename: string }>
	) {
		const { file, type, filename } = event.detail;

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('type', type);
			formData.append('slug', slug);
			formData.append('filename', filename);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(`Upload failed: ${response.statusText}`);
			}

			const result = await response.json();

			if (result.success) {
				uploadStatus = `✅ ${type === 'preview' ? 'Náhledový obrázek' : 'Obrázek'} úspěšně nahrán`;

				if (type === 'content') {
					const imagePath = `/files/${slug}/${filename}`;
					dispatch('insertImage', { path: imagePath, filename });
				}

				setTimeout(() => {
					uploadStatus = '';
				}, 3000);
			}
		} catch (error) {
			console.error('Upload error:', error);
			uploadStatus = `❌ Chyba při nahrávání: ${error instanceof Error ? error.message : 'Neznámá chyba'}`;

			setTimeout(() => {
				uploadStatus = '';
			}, 5000);
		}
	}

	function insertImageMarkdown(path: string, filename: string) {
		const markdown = `![${filename}](${path})`;

		const textarea = document.querySelector(
			'textarea, [contenteditable="true"]'
		) as HTMLTextAreaElement;
		if (textarea) {
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const text = textarea.value;

			textarea.value = text.substring(0, start) + markdown + text.substring(end);
			textarea.setSelectionRange(start + markdown.length, start + markdown.length);
			textarea.focus();
		} else {
			navigator.clipboard.writeText(markdown);
			uploadStatus = '📋 Markdown kód zkopírován do schránky';
			setTimeout(() => {
				uploadStatus = '';
			}, 3000);
		}
	}

	function handleInsertImage(event: CustomEvent<{ path: string; filename: string }>) {
		insertImageMarkdown(event.detail.path, event.detail.filename);
	}
</script>

<div class="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
	<h3 class="mb-4 text-lg font-semibold text-yellow-800">Nahrávání obrázků (Dev režim)</h3>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<h4 class="mb-2 font-medium text-yellow-700">Náhledový obrázek</h4>
			<p class="mb-3 text-sm text-yellow-600">
				Bude uložen jako <code class="rounded bg-yellow-100 px-1"
					>static/files/article/{slug}.png</code
				>
			</p>
			<ImageUpload {slug} type="preview" on:upload={handleUpload} />
		</div>

		<div>
			<h4 class="mb-2 font-medium text-yellow-700">Obrázek ke článku</h4>
			<p class="mb-3 text-sm text-yellow-600">
				Bude uložen jako <code class="rounded bg-yellow-100 px-1"
					>static/files/{slug}/[timestamp]-[nazev].png</code
				>
			</p>
			<ImageUpload
				{slug}
				type="content"
				on:upload={handleUpload}
				on:insertImage={handleInsertImage}
			/>
		</div>
	</div>

	{#if uploadStatus}
		<div
			class="mt-4 rounded-md p-3 {uploadStatus.startsWith('✅')
				? 'bg-green-100 text-green-800'
				: uploadStatus.startsWith('❌')
					? 'bg-red-100 text-red-800'
					: 'bg-blue-100 text-blue-800'}"
		>
			{uploadStatus}
		</div>
	{/if}

	<div class="mt-4 text-xs text-yellow-600">
		<p>
			<strong>Tip:</strong> Pro vložení obrázku do článku použijte Ctrl+V nebo přetáhněte soubor do zóny
			výše.
		</p>
		<p>
			Markdown kód bude automaticky vložen do aktivního textového pole nebo zkopírován do schránky.
		</p>
	</div>
</div>

<ImageGallery {slug} />
