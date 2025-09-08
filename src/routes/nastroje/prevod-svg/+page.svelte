<script lang="ts">
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import IconDownload from '$lib/icon/IconDownload.svelte';
	import IconUpload from '$lib/icon/IconUpload.svelte';
	import IconCode from '$lib/icon/IconCode.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import Input from '$lib/input/Input.svelte';
	import Textarea from '$lib/textarea/Textarea.svelte';

	let svgText = $state('');
	let svgFile = $state<File | null>(null);
	let width = $state(800);
	let height = $state(600);
	let backgroundColor = $state('#ffffff');
	let showCheckerboard = $state(true);
	let exportTransparent = $state(true);
	let outputImage = $state<string | null>(null);
	let isConverting = $state(false);
	let error = $state('');
	let sanitizationNotes = $state<string[]>([]);

	let conversionTimeout: ReturnType<typeof setTimeout>;

	function scheduleConversion() {
		clearTimeout(conversionTimeout);
		conversionTimeout = setTimeout(() => {
			convertSvgToPng();
		}, 500);
	}

	function handleSvgTextChange() {
		if (svgText.trim()) {
			svgFile = null;
			updateDimensions(svgText);
			scheduleConversion();
		}
	}

	function handleTextareaInput() {
		handleSvgTextChange();
		resetFileInput();
	}

	function resetFileInput() {
		const fileInput = document.getElementById('svg-file') as HTMLInputElement;
		if (fileInput) {
			fileInput.value = '';
		}
	}

	function handleBackgroundChange() {
		if (svgText.trim() || svgFile) {
			convertSvgToPng();
		}
	}

	function handleDimensionChange() {
		if (svgText.trim() || svgFile) {
			convertSvgToPng();
		}
	}

	const title = 'Převod SVG do PNG';
	const description =
		'Nástroj pro převod SVG souborů nebo textu do PNG formátu s možností nastavení rozměrů a pozadí.';

	function detectSvgDimensions(svgContent: string) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(svgContent, 'image/svg+xml');
		const svgElement = doc.querySelector('svg');

		if (!svgElement) return null;

		let detectedWidth = svgElement.getAttribute('width');
		let detectedHeight = svgElement.getAttribute('height');
		let viewBox = svgElement.getAttribute('viewBox');

		if (viewBox) {
			const viewBoxParts = viewBox.split(' ');
			if (viewBoxParts.length === 4) {
				const [, , vbWidth, vbHeight] = viewBoxParts;
				if (!detectedWidth) detectedWidth = vbWidth;
				if (!detectedHeight) detectedHeight = vbHeight;
			}
		}

		if (detectedWidth && detectedHeight) {
			const widthNum = parseFloat(detectedWidth);
			const heightNum = parseFloat(detectedHeight);

			if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
				return { width: Math.round(widthNum), height: Math.round(heightNum) };
			}
		}

		return null;
	}

	function updateDimensions(svgContent: string) {
		const dimensions = detectSvgDimensions(svgContent);
		if (dimensions) {
			width = dimensions.width;
			height = dimensions.height;
		}
	}

	function sanitizeSvgContent(svgContent: string) {
		const notes: string[] = [];
		let content = svgContent.replace(/^\uFEFF/, '').trim();
		const parser = new DOMParser();
		let doc = parser.parseFromString(content, 'image/svg+xml');
		if (doc.querySelector('parsererror')) {
			const blocks = content.match(/<svg[\s\S]*?<\/svg>/gi);
			if (blocks && blocks.length) {
				blocks.sort((a, b) => b.length - a.length);
				content = blocks[0];
				notes.push('Zrecyklováno více kořenových <svg> na jeden');
			} else {
				content = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
				notes.push('Obalen nevalidní obsah do <svg>');
			}
			doc = parser.parseFromString(content, 'image/svg+xml');
		}
		const root = doc.querySelector('svg');
		if (!root) return { svg: content, notes };
		if (!root.getAttribute('xmlns')) {
			root.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			notes.push('Doplněn xmlns atribut');
		}
		const wAttr = root.getAttribute('width');
		const hAttr = root.getAttribute('height');
		const vb = root.getAttribute('viewBox');
		if ((!wAttr || !hAttr) && vb) {
			const p = vb.split(/\s+/);
			if (p.length === 4) {
				root.setAttribute('width', p[2]);
				root.setAttribute('height', p[3]);
				notes.push('Doplněny rozměry z viewBoxu');
			}
		}
		if (!root.getAttribute('width') || !root.getAttribute('height')) {
			root.setAttribute('width', String(width));
			root.setAttribute('height', String(height));
			if (!root.getAttribute('viewBox')) {
				root.setAttribute('viewBox', `0 0 ${width} ${height}`);
			}
			notes.push('Doplněny chybějící rozměry');
		}
		const serialized = new XMLSerializer().serializeToString(doc);
		return { svg: serialized, notes };
	}

	function drawCheckerboard(ctx: CanvasRenderingContext2D, width: number, height: number) {
		const tileSize = 20;
		const lightColor = '#ffffff';
		const darkColor = '#e0e0e0';

		for (let y = 0; y < height; y += tileSize) {
			for (let x = 0; x < width; x += tileSize) {
				const isEvenRow = Math.floor(y / tileSize) % 2 === 0;
				const isEvenCol = Math.floor(x / tileSize) % 2 === 0;
				const shouldBeDark = isEvenRow ? isEvenCol : !isEvenCol;

				ctx.fillStyle = shouldBeDark ? darkColor : lightColor;
				ctx.fillRect(x, y, tileSize, tileSize);
			}
		}
	}

	async function convertSvgToPng() {
		if (isConverting) return;

		isConverting = true;
		error = '';
		outputImage = null;

		try {
			let svgContent = '';

			if (svgFile) {
				svgContent = await svgFile.text();
			} else if (svgText.trim()) {
				svgContent = svgText.trim();
			} else {
				isConverting = false;
				return;
			}

			if (!svgContent.includes('<svg')) {
				throw new Error('Neplatný SVG obsah');
			}

			const sanitized = sanitizeSvgContent(svgContent);
			sanitizationNotes = sanitized.notes;
			const finalSvg = sanitized.svg;

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('Nelze vytvořit canvas kontext');

			canvas.width = width;
			canvas.height = height;

			if (showCheckerboard) {
				drawCheckerboard(ctx, width, height);
			} else if (!exportTransparent) {
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, width, height);
			}

			const img = new Image();
			const svgBlob = new Blob([finalSvg], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(svgBlob);

			img.onload = () => {
				ctx.drawImage(img, 0, 0, width, height);
				outputImage = canvas.toDataURL('image/png');
				URL.revokeObjectURL(url);
				isConverting = false;
			};

			img.onerror = () => {
				URL.revokeObjectURL(url);
				throw new Error('Chyba při načítání SVG');
			};

			img.src = url;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Nastala chyba při převodu';
			isConverting = false;
		}
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			svgFile = target.files[0];
			svgText = '';

			svgFile
				.text()
				.then((content) => {
					updateDimensions(content);
					convertSvgToPng();
				})
				.catch(() => {
					// Ignore errors during dimension detection
				});
		}
	}

	async function downloadImage() {
		if (!outputImage) return;

		try {
			let svgContent = '';

			if (svgFile) {
				svgContent = await svgFile.text();
			} else if (svgText.trim()) {
				svgContent = svgText.trim();
			} else {
				return;
			}

			if (!svgContent.includes('<svg')) {
				return;
			}
			const sanitized = sanitizeSvgContent(svgContent);
			const finalSvg = sanitized.svg;

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			canvas.width = width;
			canvas.height = height;

			if (!exportTransparent) {
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, width, height);
			}

			const img = new Image();
			const svgBlob = new Blob([finalSvg], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(svgBlob);

			img.onload = () => {
				ctx.drawImage(img, 0, 0, width, height);
				const downloadDataUrl = canvas.toDataURL('image/png');

				const link = document.createElement('a');
				link.download = 'converted-image.png';
				link.href = downloadDataUrl;
				link.click();

				URL.revokeObjectURL(url);
			};

			img.onerror = () => {
				URL.revokeObjectURL(url);
			};

			img.src = url;
		} catch (err) {
			console.error('Chyba při stahování:', err);
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<MainPost noImage {title} {description} />

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
	<Box>
		<div class="grid grid-cols-1 gap-6 p-6">
			<h2 class="text-xl font-semibold">Vstupní SVG</h2>

			<div class="grid grid-cols-1 gap-4">
				<div>
					<div class="mb-2 flex items-center gap-2">
						<IconUpload />
						<label for="svg-file" class="mb-2 block text-sm font-medium">Nahrát SVG soubor</label>
					</div>

					<input
						id="svg-file"
						type="file"
						accept=".svg"
						onchange={handleFileChange}
						class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
					/>
					{#if svgFile}
						<p class="mt-2 text-sm text-gray-600">Nahrán soubor: {svgFile.name}</p>
					{/if}
				</div>

				<div class="relative">
					<div class="mb-2 flex items-center gap-2">
						<IconCode />
						<label for="svg-text" class="text-sm font-medium">Nebo vložit SVG text</label>
					</div>
					<textarea
						bind:value={svgText}
						name="svg-text"
						id="svg-text"
						oninput={handleTextareaInput}
						placeholder="<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'>...</svg>"
						class="min-h-[200px] w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
						rows={8}
					></textarea>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<div>
						<label for="width" class="mb-2 block text-sm font-medium">Šířka (px)</label>
						<input
							id="width"
							name="width"
							type="number"
							bind:value={width}
							min={1}
							max={4000}
							onchange={handleDimensionChange}
							class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
						/>
					</div>
				</div>
				<div>
					<div>
						<label for="height" class="mb-2 block text-sm font-medium">Výška (px)</label>
						<input
							id="height"
							name="height"
							type="number"
							bind:value={height}
							min={1}
							max={4000}
							onchange={handleDimensionChange}
							class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
						/>
					</div>
				</div>
			</div>

			<div class="text-xs text-gray-600">
				<p>💡 Rozměry se automaticky detekují z SVG obsahu</p>
			</div>

			<div>
				<label for="checkerboard" class="mb-2 block text-sm font-medium">Pozadí</label>
				<div class="grid grid-cols-1 gap-3">
					<div class="flex items-center gap-3">
						<input
							type="checkbox"
							bind:checked={showCheckerboard}
							onchange={handleBackgroundChange}
							id="checkerboard"
							class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="checkerboard" class="text-sm">Šachovnicové pozadí (pouze náhled)</label>
					</div>

					<div class="flex items-center gap-3">
						<input
							type="checkbox"
							bind:checked={exportTransparent}
							onchange={handleBackgroundChange}
							id="transparent-export"
							class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="transparent-export" class="text-sm">Exportovat průhledné PNG</label>
					</div>

					{#if !showCheckerboard}
						<div class="flex items-center gap-3">
							<input
								type="color"
								bind:value={backgroundColor}
								onchange={handleBackgroundChange}
								class="h-10 w-16 cursor-pointer rounded border border-gray-300"
							/>
							<input
								type="text"
								bind:value={backgroundColor}
								onchange={handleBackgroundChange}
								placeholder="#ffffff"
								class="flex-1 rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
							/>
						</div>
					{/if}
				</div>
			</div>

			{#if error}
				<div class="rounded-lg bg-red-50 p-4 text-red-700">
					<p class="text-sm">{error}</p>
				</div>
			{/if}
		</div>
	</Box>

	{#if outputImage}
		<Box>
			<div class="grid grid-cols-1 gap-6 p-6">
				<h2 class="text-xl font-semibold">Výstupní PNG</h2>

				<div class="grid grid-cols-1 gap-4">
					<div class="rounded-lg border border-gray-200 p-4">
						<img
							src={outputImage}
							alt="Převedený obrázek"
							class="mx-auto max-h-96 max-w-full rounded"
						/>
					</div>

					{#if exportTransparent}
						<p class="text-xs text-gray-600">Export: průhledné PNG (pozadí se nevyplňuje)</p>
					{/if}

					{#if sanitizationNotes.length}
						<div class="rounded-lg bg-amber-50 p-3 text-amber-800">
							<ul class="list-disc pl-5 text-sm">
								{#each sanitizationNotes as note}
									<li>{note}</li>
								{/each}
							</ul>
						</div>
					{/if}

					<Button onclick={downloadImage}>
						{#snippet icon()}
							<IconDownload />
						{/snippet}
						Stáhnout PNG
					</Button>

					<div class="text-sm text-gray-600">
						<p>Rozměry: {width} × {height} px</p>
					</div>
				</div>
			</div>
		</Box>
	{/if}
</div>

<div class="mt-8">
	<Box>
		<div class="grid grid-cols-1 gap-4 p-6">
			<h3 class="text-lg font-semibold">Jak používat</h3>
			<div class="grid grid-cols-1 gap-3 text-sm text-gray-700">
				<p>
					1. <strong>Nahrajte SVG soubor</strong> – klikněte na tlačítko pro výběr souboru a vyberte
					.svg soubor
				</p>
				<p>
					2. <strong>Nebo vložte SVG text</strong> – zkopírujte SVG kód a vložte ho do textového pole
				</p>
				<p>3. <strong>Nastavte parametry</strong> – zvolte šířku, výšku a barvu pozadí</p>
				<p>4. <strong>Stáhněte</strong> – po převodu můžete obrázek stáhnout</p>
			</div>
		</div>
	</Box>
</div>
