<script lang="ts">
	import { dev } from '$app/environment';
	import ImageUpload from './ImageUpload.svelte';
	import ImageGallery from './ImageGallery.svelte';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		slug: string;
	}

	let { slug }: Props = $props();

	const dispatch = createEventDispatcher<{
		insertImage: { path: string; filename: string };
	}>();

	let uploadStatus = $state('');
	let isExpanded = $state(false);

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

{#if dev}
	<div class="mb-4 rounded-md border border-gray-200 bg-gray-50">
		<button
			onclick={() => (isExpanded = !isExpanded)}
			class="flex w-full items-center justify-between p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
		>
			<span>📷 Nahrávání obrázků</span>
			<svg
				class="h-4 w-4 transition-transform {isExpanded ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if isExpanded}
			<div class="border-t border-gray-200 p-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<h4 class="mb-2 text-sm font-medium text-gray-700">Náhledový obrázek</h4>
						<p class="mb-2 text-xs text-gray-600">
							Uloží se jako <code class="rounded bg-gray-100 px-1"
								>static/files/article/{slug}.png</code
							>
						</p>
						<ImageUpload {slug} type="preview" on:upload={handleUpload} />
					</div>

					<div>
						<h4 class="mb-2 text-sm font-medium text-gray-700">Obrázek ke článku</h4>
						<p class="mb-2 text-xs text-gray-600">
							Uloží se jako <code class="rounded bg-gray-100 px-1"
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
						class="mt-3 rounded-md p-2 text-sm {uploadStatus.startsWith('✅')
							? 'bg-green-100 text-green-800'
							: uploadStatus.startsWith('❌')
								? 'bg-red-100 text-red-800'
								: 'bg-blue-100 text-blue-800'}"
					>
						{uploadStatus}
					</div>
				{/if}

				<div class="mt-3 text-xs text-gray-600">
					<p>
						<strong>Tip:</strong> Pro vložení obrázku použijte Ctrl+V nebo přetáhněte soubor do zóny výše.
					</p>
					<p>
						Markdown kód bude automaticky vložen do aktivního textového pole nebo zkopírován do
						schránky.
					</p>
				</div>
			</div>
		{/if}
	</div>

	<ImageGallery {slug} />
{/if}
