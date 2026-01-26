<script lang="ts">
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import IconDownload from '$lib/icon/IconDownload.svelte';
	import IconUpload from '$lib/icon/IconUpload.svelte';
	import IconTrash from '$lib/icon/IconTrash.svelte';
	import IconPlus from '$lib/icon/IconPlus.svelte';

	const title = 'SVG Editor pro náhledy';
	const description = 'Editor pro vytváření náhledových obrázků článků 200×200 px s vrstvami, smart snapping a Git commit.';

	// Canvas size
	const CANVAS_SIZE = 200;
	const CANVAS_SCALE = 2; // For sharp display

	// Layer types
	type LayerType = 'rect' | 'text' | 'image' | 'badge';

	interface Layer {
		id: string;
		type: LayerType;
		x: number;
		y: number;
		width: number;
		height: number;
		// Style
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
		borderRadius?: number;
		// Text specific
		text?: string;
		fontSize?: number;
		fontWeight?: string;
		textAlign?: 'left' | 'center' | 'right';
		// Image specific
		imageData?: string;
		// State
		visible: boolean;
		locked: boolean;
	}

	// State
	let layers = $state<Layer[]>([]);
	let selectedLayerId = $state<string | null>(null);
	let isDragging = $state(false);
	let isResizing = $state(false);
	let resizeHandle = $state<string | null>(null);
	let dragOffset = $state({ x: 0, y: 0 });
	let snapLines = $state<{ x: number[]; y: number[] }>({ x: [], y: [] });
	let showSnapLines = $state(false);

	// Background
	let backgroundColor = $state('#1e293b');
	let gradientEnabled = $state(true);
	let gradientEndColor = $state('#334155');

	// Git commit state
	let articleSlug = $state('');
	let isCommitting = $state(false);
	let commitMessage = $state('');
	let commitError = $state('');
	let commitSuccess = $state('');

	// Tool state
	let activeTool = $state<'select' | 'rect' | 'text' | 'badge'>('select');

	// Clipboard paste state
	let showPasteEditor = $state(false);
	let pastedImage = $state<string | null>(null);
	let pastedImageOriginalSize = $state<{ width: number; height: number } | null>(null);

	// Canvas element reference
	let canvasContainer: HTMLDivElement;

	// Helper functions
	function generateId(): string {
		return Math.random().toString(36).substring(2, 9);
	}

	function getSelectedLayer(): Layer | undefined {
		return layers.find(l => l.id === selectedLayerId);
	}

	// Snapping logic
	const SNAP_THRESHOLD = 5;

	function getSnapPoints(excludeId: string): { x: number[]; y: number[] } {
		const points = {
			x: [0, CANVAS_SIZE / 2, CANVAS_SIZE],
			y: [0, CANVAS_SIZE / 2, CANVAS_SIZE]
		};

		layers.forEach(layer => {
			if (layer.id !== excludeId) {
				// Add layer edges and center
				points.x.push(layer.x, layer.x + layer.width / 2, layer.x + layer.width);
				points.y.push(layer.y, layer.y + layer.height / 2, layer.y + layer.height);
			}
		});

		return points;
	}

	function snapValue(value: number, snapPoints: number[]): { snapped: number; didSnap: boolean } {
		for (const point of snapPoints) {
			if (Math.abs(value - point) < SNAP_THRESHOLD) {
				return { snapped: point, didSnap: true };
			}
		}
		return { snapped: value, didSnap: false };
	}

	function snapPosition(layer: Layer, x: number, y: number): { x: number; y: number } {
		const points = getSnapPoints(layer.id);
		const newSnapLines = { x: [] as number[], y: [] as number[] };

		// Snap left edge
		let snapX = snapValue(x, points.x);
		if (snapX.didSnap) {
			newSnapLines.x.push(snapX.snapped);
		} else {
			// Snap center
			snapX = snapValue(x + layer.width / 2, points.x);
			if (snapX.didSnap) {
				snapX.snapped -= layer.width / 2;
				newSnapLines.x.push(snapX.snapped + layer.width / 2);
			} else {
				// Snap right edge
				snapX = snapValue(x + layer.width, points.x);
				if (snapX.didSnap) {
					snapX.snapped -= layer.width;
					newSnapLines.x.push(snapX.snapped + layer.width);
				}
			}
		}

		// Snap top edge
		let snapY = snapValue(y, points.y);
		if (snapY.didSnap) {
			newSnapLines.y.push(snapY.snapped);
		} else {
			// Snap center
			snapY = snapValue(y + layer.height / 2, points.y);
			if (snapY.didSnap) {
				snapY.snapped -= layer.height / 2;
				newSnapLines.y.push(snapY.snapped + layer.height / 2);
			} else {
				// Snap bottom edge
				snapY = snapValue(y + layer.height, points.y);
				if (snapY.didSnap) {
					snapY.snapped -= layer.height;
					newSnapLines.y.push(snapY.snapped + layer.height);
				}
			}
		}

		snapLines = newSnapLines;
		showSnapLines = newSnapLines.x.length > 0 || newSnapLines.y.length > 0;

		return { x: snapX.snapped, y: snapY.snapped };
	}

	// Layer operations
	function addLayer(type: LayerType) {
		const newLayer: Layer = {
			id: generateId(),
			type,
			x: CANVAS_SIZE / 2 - 40,
			y: CANVAS_SIZE / 2 - 20,
			width: type === 'text' ? 100 : 80,
			height: type === 'text' ? 30 : 40,
			fill: type === 'text' ? '#ffffff' : '#2563eb',
			stroke: undefined,
			strokeWidth: 0,
			borderRadius: type === 'badge' ? 8 : 0,
			text: type === 'text' || type === 'badge' ? 'Text' : undefined,
			fontSize: 16,
			fontWeight: 'bold',
			textAlign: 'center',
			visible: true,
			locked: false
		};

		layers = [...layers, newLayer];
		selectedLayerId = newLayer.id;
		activeTool = 'select';
	}

	function deleteLayer(id: string) {
		layers = layers.filter(l => l.id !== id);
		if (selectedLayerId === id) {
			selectedLayerId = null;
		}
	}

	function moveLayerUp(id: string) {
		const index = layers.findIndex(l => l.id === id);
		if (index < layers.length - 1) {
			const newLayers = [...layers];
			[newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
			layers = newLayers;
		}
	}

	function moveLayerDown(id: string) {
		const index = layers.findIndex(l => l.id === id);
		if (index > 0) {
			const newLayers = [...layers];
			[newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
			layers = newLayers;
		}
	}

	// Mouse event handlers
	function getMousePosition(e: MouseEvent): { x: number; y: number } {
		const rect = canvasContainer.getBoundingClientRect();
		const scale = CANVAS_SIZE / rect.width;
		return {
			x: (e.clientX - rect.left) * scale,
			y: (e.clientY - rect.top) * scale
		};
	}

	function handleCanvasMouseDown(e: MouseEvent) {
		if (activeTool !== 'select') {
			// Add new layer at click position
			if (activeTool === 'rect' || activeTool === 'text' || activeTool === 'badge') {
				addLayer(activeTool);
				const pos = getMousePosition(e);
				const layer = layers[layers.length - 1];
				layer.x = pos.x - layer.width / 2;
				layer.y = pos.y - layer.height / 2;
				layers = [...layers.slice(0, -1), layer];
			}
			return;
		}

		const pos = getMousePosition(e);

		// Check if clicking on a resize handle
		const selected = getSelectedLayer();
		if (selected) {
			const handle = getResizeHandle(pos, selected);
			if (handle) {
				isResizing = true;
				resizeHandle = handle;
				return;
			}
		}

		// Check if clicking on a layer (reverse order for z-index)
		for (let i = layers.length - 1; i >= 0; i--) {
			const layer = layers[i];
			if (layer.locked) continue;
			if (pos.x >= layer.x && pos.x <= layer.x + layer.width &&
				pos.y >= layer.y && pos.y <= layer.y + layer.height) {
				selectedLayerId = layer.id;
				isDragging = true;
				dragOffset = { x: pos.x - layer.x, y: pos.y - layer.y };
				return;
			}
		}

		// Clicked on empty space
		selectedLayerId = null;
	}

	function getResizeHandle(pos: { x: number; y: number }, layer: Layer): string | null {
		const handleSize = 8;
		const handles = [
			{ name: 'nw', x: layer.x, y: layer.y },
			{ name: 'ne', x: layer.x + layer.width, y: layer.y },
			{ name: 'sw', x: layer.x, y: layer.y + layer.height },
			{ name: 'se', x: layer.x + layer.width, y: layer.y + layer.height },
			{ name: 'n', x: layer.x + layer.width / 2, y: layer.y },
			{ name: 's', x: layer.x + layer.width / 2, y: layer.y + layer.height },
			{ name: 'w', x: layer.x, y: layer.y + layer.height / 2 },
			{ name: 'e', x: layer.x + layer.width, y: layer.y + layer.height / 2 }
		];

		for (const handle of handles) {
			if (Math.abs(pos.x - handle.x) < handleSize && Math.abs(pos.y - handle.y) < handleSize) {
				return handle.name;
			}
		}
		return null;
	}

	function handleCanvasMouseMove(e: MouseEvent) {
		if (!isDragging && !isResizing) return;

		const pos = getMousePosition(e);
		const layer = getSelectedLayer();
		if (!layer) return;

		if (isDragging) {
			let newX = pos.x - dragOffset.x;
			let newY = pos.y - dragOffset.y;

			// Apply snapping
			const snapped = snapPosition(layer, newX, newY);
			newX = snapped.x;
			newY = snapped.y;

			// Update layer position
			const index = layers.findIndex(l => l.id === layer.id);
			layers[index] = { ...layer, x: newX, y: newY };
			layers = [...layers];
		} else if (isResizing && resizeHandle) {
			const index = layers.findIndex(l => l.id === layer.id);
			let { x, y, width, height } = layer;

			switch (resizeHandle) {
				case 'se':
					width = Math.max(20, pos.x - x);
					height = Math.max(20, pos.y - y);
					break;
				case 'sw':
					width = Math.max(20, x + width - pos.x);
					height = Math.max(20, pos.y - y);
					x = pos.x;
					break;
				case 'ne':
					width = Math.max(20, pos.x - x);
					height = Math.max(20, y + height - pos.y);
					y = pos.y;
					break;
				case 'nw':
					width = Math.max(20, x + width - pos.x);
					height = Math.max(20, y + height - pos.y);
					x = pos.x;
					y = pos.y;
					break;
				case 'n':
					height = Math.max(20, y + height - pos.y);
					y = pos.y;
					break;
				case 's':
					height = Math.max(20, pos.y - y);
					break;
				case 'w':
					width = Math.max(20, x + width - pos.x);
					x = pos.x;
					break;
				case 'e':
					width = Math.max(20, pos.x - x);
					break;
			}

			layers[index] = { ...layer, x, y, width, height };
			layers = [...layers];
		}
	}

	function handleCanvasMouseUp() {
		isDragging = false;
		isResizing = false;
		resizeHandle = null;
		showSnapLines = false;
		snapLines = { x: [], y: [] };
	}

	// Keyboard shortcuts
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Delete' || e.key === 'Backspace') {
			if (selectedLayerId && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
				e.preventDefault();
				deleteLayer(selectedLayerId);
			}
		}
		if (e.key === 'Escape') {
			selectedLayerId = null;
			activeTool = 'select';
		}
	}

	// Clipboard paste handler
	function handlePaste(e: ClipboardEvent) {
		const items = e.clipboardData?.items;
		if (!items) return;

		for (const item of items) {
			if (item.type.startsWith('image/')) {
				e.preventDefault();
				const file = item.getAsFile();
				if (file) {
					const reader = new FileReader();
					reader.onload = (event) => {
						const img = new Image();
						img.onload = () => {
							pastedImage = event.target?.result as string;
							pastedImageOriginalSize = { width: img.width, height: img.height };
							showPasteEditor = true;
						};
						img.src = event.target?.result as string;
					};
					reader.readAsDataURL(file);
				}
				break;
			}
		}
	}

	function addPastedImageAsLayer() {
		if (!pastedImage) return;

		const newLayer: Layer = {
			id: generateId(),
			type: 'image',
			x: 0,
			y: 0,
			width: CANVAS_SIZE,
			height: CANVAS_SIZE,
			imageData: pastedImage,
			visible: true,
			locked: false
		};

		layers = [newLayer, ...layers]; // Add at bottom
		selectedLayerId = newLayer.id;
		showPasteEditor = false;
		pastedImage = null;
	}

	// Export to PNG
	async function exportToPng(): Promise<string> {
		const canvas = document.createElement('canvas');
		canvas.width = CANVAS_SIZE;
		canvas.height = CANVAS_SIZE;
		const ctx = canvas.getContext('2d')!;

		// Draw background
		if (gradientEnabled) {
			const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_SIZE);
			gradient.addColorStop(0, backgroundColor);
			gradient.addColorStop(1, gradientEndColor);
			ctx.fillStyle = gradient;
		} else {
			ctx.fillStyle = backgroundColor;
		}
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

		// Draw layers
		for (const layer of layers) {
			if (!layer.visible) continue;

			if (layer.type === 'image' && layer.imageData) {
				const img = new Image();
				await new Promise<void>((resolve) => {
					img.onload = () => {
						ctx.drawImage(img, layer.x, layer.y, layer.width, layer.height);
						resolve();
					};
					img.src = layer.imageData!;
				});
			} else if (layer.type === 'rect' || layer.type === 'badge') {
				ctx.fillStyle = layer.fill || '#2563eb';
				if (layer.borderRadius && layer.borderRadius > 0) {
					roundRect(ctx, layer.x, layer.y, layer.width, layer.height, layer.borderRadius);
					ctx.fill();
				} else {
					ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
				}

				if (layer.type === 'badge' && layer.text) {
					ctx.fillStyle = '#ffffff';
					ctx.font = `${layer.fontWeight || 'bold'} ${layer.fontSize || 16}px Liberation Sans, DejaVu Sans, sans-serif`;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(layer.text, layer.x + layer.width / 2, layer.y + layer.height / 2);
				}
			} else if (layer.type === 'text' && layer.text) {
				ctx.fillStyle = layer.fill || '#ffffff';
				ctx.font = `${layer.fontWeight || 'bold'} ${layer.fontSize || 16}px Liberation Sans, DejaVu Sans, sans-serif`;
				ctx.textAlign = layer.textAlign || 'center';
				ctx.textBaseline = 'middle';
				const textX = layer.textAlign === 'left' ? layer.x :
					layer.textAlign === 'right' ? layer.x + layer.width :
					layer.x + layer.width / 2;
				ctx.fillText(layer.text, textX, layer.y + layer.height / 2);
			}
		}

		return canvas.toDataURL('image/png');
	}

	function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
	}

	async function downloadPng() {
		const dataUrl = await exportToPng();
		const link = document.createElement('a');
		link.download = articleSlug ? `${articleSlug}.png` : 'preview.png';
		link.href = dataUrl;
		link.click();
	}

	// Git commit
	async function commitToGit() {
		if (!articleSlug) {
			commitError = 'Zadejte slug článku';
			return;
		}

		isCommitting = true;
		commitError = '';
		commitSuccess = '';

		try {
			const imageData = await exportToPng();
			const base64Data = imageData.split(',')[1];

			const response = await fetch('/api/git-commit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					filename: `static/files/article/${articleSlug}.png`,
					content: base64Data,
					message: commitMessage || `Add preview image for ${articleSlug}`
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Commit failed');
			}

			commitSuccess = `Obrázek úspěšně uložen: ${result.commitUrl || 'OK'}`;
		} catch (err) {
			commitError = err instanceof Error ? err.message : 'Nepodařilo se uložit do Gitu';
		} finally {
			isCommitting = false;
		}
	}

	// Update layer property helper
	function updateSelectedLayer<K extends keyof Layer>(key: K, value: Layer[K]) {
		if (!selectedLayerId) return;
		const index = layers.findIndex(l => l.id === selectedLayerId);
		if (index === -1) return;
		layers[index] = { ...layers[index], [key]: value };
		layers = [...layers];
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<svelte:window onkeydown={handleKeyDown} onpaste={handlePaste} />

<MainPost noImage {title} {description} />

<div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
	<!-- Canvas Area -->
	<Box>
		<div class="p-4">
			<div class="mb-4 flex flex-wrap gap-2">
				<button
					class="rounded px-3 py-1.5 text-sm font-medium transition-colors {activeTool === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}"
					onclick={() => activeTool = 'select'}
				>
					Výběr
				</button>
				<button
					class="rounded px-3 py-1.5 text-sm font-medium transition-colors {activeTool === 'rect' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}"
					onclick={() => activeTool = 'rect'}
				>
					Obdélník
				</button>
				<button
					class="rounded px-3 py-1.5 text-sm font-medium transition-colors {activeTool === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}"
					onclick={() => activeTool = 'text'}
				>
					Text
				</button>
				<button
					class="rounded px-3 py-1.5 text-sm font-medium transition-colors {activeTool === 'badge' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}"
					onclick={() => activeTool = 'badge'}
				>
					Badge
				</button>
			</div>

			<!-- Canvas -->
			<div
				bind:this={canvasContainer}
				class="relative mx-auto cursor-crosshair select-none overflow-hidden rounded-lg border-2 border-gray-300"
				style="width: {CANVAS_SIZE * CANVAS_SCALE}px; height: {CANVAS_SIZE * CANVAS_SCALE}px; background: {gradientEnabled ? `linear-gradient(to bottom, ${backgroundColor}, ${gradientEndColor})` : backgroundColor}"
				onmousedown={handleCanvasMouseDown}
				onmousemove={handleCanvasMouseMove}
				onmouseup={handleCanvasMouseUp}
				onmouseleave={handleCanvasMouseUp}
				role="application"
				aria-label="Canvas pro editaci obrázku"
			>
				<!-- Layers -->
				{#each layers as layer (layer.id)}
					{#if layer.visible}
						<div
							class="absolute {layer.locked ? 'pointer-events-none' : ''}"
							style="
								left: {layer.x * CANVAS_SCALE}px;
								top: {layer.y * CANVAS_SCALE}px;
								width: {layer.width * CANVAS_SCALE}px;
								height: {layer.height * CANVAS_SCALE}px;
								{layer.type === 'image' ? '' : `background-color: ${layer.fill || 'transparent'}`};
								{layer.borderRadius ? `border-radius: ${layer.borderRadius * CANVAS_SCALE}px` : ''};
								{selectedLayerId === layer.id ? 'outline: 2px solid #3b82f6; outline-offset: 1px;' : ''}
							"
						>
							{#if layer.type === 'image' && layer.imageData}
								<img
									src={layer.imageData}
									alt="Layer"
									class="h-full w-full object-cover"
									style={layer.borderRadius ? `border-radius: ${layer.borderRadius * CANVAS_SCALE}px` : ''}
								/>
							{:else if layer.type === 'text' && layer.text}
								<div
									class="flex h-full w-full items-center"
									style="
										color: {layer.fill || '#ffffff'};
										font-size: {(layer.fontSize || 16) * CANVAS_SCALE}px;
										font-weight: {layer.fontWeight || 'bold'};
										justify-content: {layer.textAlign === 'left' ? 'flex-start' : layer.textAlign === 'right' ? 'flex-end' : 'center'};
										background: transparent;
									"
								>
									{layer.text}
								</div>
							{:else if layer.type === 'badge' && layer.text}
								<div
									class="flex h-full w-full items-center justify-center"
									style="
										color: #ffffff;
										font-size: {(layer.fontSize || 16) * CANVAS_SCALE}px;
										font-weight: {layer.fontWeight || 'bold'};
									"
								>
									{layer.text}
								</div>
							{/if}

							<!-- Resize handles -->
							{#if selectedLayerId === layer.id && !layer.locked}
								{#each ['nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'] as handle}
									<div
										class="absolute h-3 w-3 rounded-full border-2 border-blue-500 bg-white"
										style="
											{handle.includes('n') ? 'top: -6px;' : ''}
											{handle.includes('s') ? 'bottom: -6px;' : ''}
											{handle.includes('w') ? 'left: -6px;' : ''}
											{handle.includes('e') ? 'right: -6px;' : ''}
											{handle === 'n' || handle === 's' ? 'left: 50%; transform: translateX(-50%);' : ''}
											{handle === 'w' || handle === 'e' ? 'top: 50%; transform: translateY(-50%);' : ''}
											cursor: {handle}-resize;
										"
									></div>
								{/each}
							{/if}
						</div>
					{/if}
				{/each}

				<!-- Snap lines -->
				{#if showSnapLines}
					{#each snapLines.x as x}
						<div
							class="pointer-events-none absolute top-0 h-full w-px bg-pink-500"
							style="left: {x * CANVAS_SCALE}px"
						></div>
					{/each}
					{#each snapLines.y as y}
						<div
							class="pointer-events-none absolute left-0 h-px w-full bg-pink-500"
							style="top: {y * CANVAS_SCALE}px"
						></div>
					{/each}
				{/if}

				<!-- Center guides (always visible faintly) -->
				<div class="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-gray-400 opacity-20"></div>
				<div class="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gray-400 opacity-20"></div>
			</div>

			<p class="mt-2 text-center text-xs text-gray-500">
				200 × 200 px (zobrazeno 2×) | Ctrl+V pro vložení obrázku
			</p>
		</div>
	</Box>

	<!-- Sidebar -->
	<div class="flex flex-col gap-4">
		<!-- Layers Panel -->
		<Box>
			<div class="p-4">
				<h3 class="mb-3 text-sm font-semibold">Vrstvy</h3>
				<div class="mb-3 flex gap-2">
					<button
						class="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
						onclick={() => addLayer('rect')}
					>
						+ Obdélník
					</button>
					<button
						class="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
						onclick={() => addLayer('text')}
					>
						+ Text
					</button>
					<button
						class="rounded bg-purple-500 px-2 py-1 text-xs text-white hover:bg-purple-600"
						onclick={() => addLayer('badge')}
					>
						+ Badge
					</button>
				</div>

				<div class="max-h-40 space-y-1 overflow-y-auto">
					{#each [...layers].reverse() as layer (layer.id)}
						<div
							class="flex items-center gap-2 rounded px-2 py-1 text-sm {selectedLayerId === layer.id ? 'bg-blue-100' : 'hover:bg-gray-100'}"
							onclick={() => selectedLayerId = layer.id}
							role="button"
							tabindex="0"
							onkeydown={(e) => e.key === 'Enter' && (selectedLayerId = layer.id)}
						>
							<span class="flex-1 truncate">
								{layer.type === 'text' || layer.type === 'badge' ? layer.text || layer.type : layer.type}
							</span>
							<button
								class="text-gray-400 hover:text-red-500"
								onclick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }}
								aria-label="Smazat vrstvu"
							>
								<IconTrash />
							</button>
						</div>
					{/each}
					{#if layers.length === 0}
						<p class="py-4 text-center text-xs text-gray-400">Žádné vrstvy</p>
					{/if}
				</div>
			</div>
		</Box>

		<!-- Properties Panel -->
		{#if selectedLayerId}
			{@const layer = getSelectedLayer()}
			{#if layer}
				<Box>
					<div class="space-y-3 p-4">
						<h3 class="text-sm font-semibold">Vlastnosti</h3>

						<div class="grid grid-cols-2 gap-2">
							<div>
								<label class="text-xs text-gray-500">X</label>
								<input
									type="number"
									value={Math.round(layer.x)}
									onchange={(e) => updateSelectedLayer('x', parseInt(e.currentTarget.value))}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
							<div>
								<label class="text-xs text-gray-500">Y</label>
								<input
									type="number"
									value={Math.round(layer.y)}
									onchange={(e) => updateSelectedLayer('y', parseInt(e.currentTarget.value))}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
							<div>
								<label class="text-xs text-gray-500">Šířka</label>
								<input
									type="number"
									value={Math.round(layer.width)}
									onchange={(e) => updateSelectedLayer('width', parseInt(e.currentTarget.value))}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
							<div>
								<label class="text-xs text-gray-500">Výška</label>
								<input
									type="number"
									value={Math.round(layer.height)}
									onchange={(e) => updateSelectedLayer('height', parseInt(e.currentTarget.value))}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
						</div>

						{#if layer.type !== 'image'}
							<div>
								<label class="text-xs text-gray-500">Barva</label>
								<div class="flex gap-2">
									<input
										type="color"
										value={layer.fill || '#2563eb'}
										onchange={(e) => updateSelectedLayer('fill', e.currentTarget.value)}
										class="h-8 w-12 cursor-pointer rounded border"
									/>
									<input
										type="text"
										value={layer.fill || '#2563eb'}
										onchange={(e) => updateSelectedLayer('fill', e.currentTarget.value)}
										class="flex-1 rounded border px-2 py-1 text-sm"
									/>
								</div>
							</div>
						{/if}

						{#if layer.type === 'rect' || layer.type === 'badge'}
							<div>
								<label class="text-xs text-gray-500">Zaoblení rohů</label>
								<input
									type="number"
									value={layer.borderRadius || 0}
									onchange={(e) => updateSelectedLayer('borderRadius', parseInt(e.currentTarget.value))}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
						{/if}

						{#if layer.type === 'text' || layer.type === 'badge'}
							<div>
								<label class="text-xs text-gray-500">Text</label>
								<input
									type="text"
									value={layer.text || ''}
									onchange={(e) => updateSelectedLayer('text', e.currentTarget.value)}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
							<div>
								<label class="text-xs text-gray-500">Velikost písma</label>
								<input
									type="number"
									value={layer.fontSize || 16}
									onchange={(e) => updateSelectedLayer('fontSize', parseInt(e.currentTarget.value))}
									class="w-full rounded border px-2 py-1 text-sm"
								/>
							</div>
						{/if}
					</div>
				</Box>
			{/if}
		{/if}

		<!-- Background Panel -->
		<Box>
			<div class="space-y-3 p-4">
				<h3 class="text-sm font-semibold">Pozadí</h3>
				<div>
					<label class="text-xs text-gray-500">Barva</label>
					<div class="flex gap-2">
						<input
							type="color"
							bind:value={backgroundColor}
							class="h-8 w-12 cursor-pointer rounded border"
						/>
						<input
							type="text"
							bind:value={backgroundColor}
							class="flex-1 rounded border px-2 py-1 text-sm"
						/>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<input type="checkbox" bind:checked={gradientEnabled} id="gradient" />
					<label for="gradient" class="text-sm">Gradient</label>
				</div>
				{#if gradientEnabled}
					<div>
						<label class="text-xs text-gray-500">Koncová barva</label>
						<div class="flex gap-2">
							<input
								type="color"
								bind:value={gradientEndColor}
								class="h-8 w-12 cursor-pointer rounded border"
							/>
							<input
								type="text"
								bind:value={gradientEndColor}
								class="flex-1 rounded border px-2 py-1 text-sm"
							/>
						</div>
					</div>
				{/if}
			</div>
		</Box>

		<!-- Export Panel -->
		<Box>
			<div class="space-y-3 p-4">
				<h3 class="text-sm font-semibold">Export & Git</h3>

				<div>
					<label class="text-xs text-gray-500">Slug článku</label>
					<input
						type="text"
						bind:value={articleSlug}
						placeholder="nazev-clanku"
						class="w-full rounded border px-2 py-1 text-sm"
					/>
				</div>

				<div>
					<label class="text-xs text-gray-500">Commit message (volitelné)</label>
					<input
						type="text"
						bind:value={commitMessage}
						placeholder="Add preview image"
						class="w-full rounded border px-2 py-1 text-sm"
					/>
				</div>

				<div class="flex gap-2">
					<Button onclick={downloadPng}>
						{#snippet icon()}
							<IconDownload />
						{/snippet}
						Stáhnout
					</Button>
					<Button onclick={commitToGit} disabled={isCommitting}>
						{#snippet icon()}
							<IconUpload />
						{/snippet}
						{isCommitting ? 'Ukládám...' : 'Commit'}
					</Button>
				</div>

				{#if commitError}
					<p class="rounded bg-red-50 p-2 text-xs text-red-600">{commitError}</p>
				{/if}
				{#if commitSuccess}
					<p class="rounded bg-green-50 p-2 text-xs text-green-600">{commitSuccess}</p>
				{/if}
			</div>
		</Box>
	</div>
</div>

<!-- Paste Image Dialog -->
{#if showPasteEditor && pastedImage}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-lg font-semibold">Vložit obrázek</h3>
			<div class="mb-4 overflow-hidden rounded border">
				<img
					src={pastedImage}
					alt="Vložený obrázek"
					class="mx-auto max-h-64 object-contain"
				/>
			</div>
			{#if pastedImageOriginalSize}
				<p class="mb-4 text-sm text-gray-500">
					Původní velikost: {pastedImageOriginalSize.width} × {pastedImageOriginalSize.height} px
				</p>
			{/if}
			<div class="flex justify-end gap-2">
				<button
					class="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
					onclick={() => { showPasteEditor = false; pastedImage = null; }}
				>
					Zrušit
				</button>
				<button
					class="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
					onclick={addPastedImageAsLayer}
				>
					Přidat jako vrstvu
				</button>
			</div>
		</div>
	</div>
{/if}

<div class="mt-8">
	<Box>
		<div class="grid grid-cols-1 gap-4 p-6">
			<h3 class="text-lg font-semibold">Jak používat</h3>
			<div class="grid grid-cols-1 gap-3 text-sm text-gray-700">
				<p><strong>Vrstvy:</strong> Přidejte obdélníky, texty nebo badge tlačítky nahoře nebo v panelu vrstev.</p>
				<p><strong>Přesun:</strong> Klikněte a táhněte vrstvu. Editor automaticky přichytává k okrajům a středu.</p>
				<p><strong>Změna velikosti:</strong> Vyberte vrstvu a táhněte za rohy nebo strany.</p>
				<p><strong>Obrázek:</strong> Použijte Ctrl+V pro vložení obrázku ze schránky.</p>
				<p><strong>Export:</strong> Zadejte slug článku a klikněte na "Commit" pro uložení do Gitu.</p>
			</div>
		</div>
	</Box>
</div>
