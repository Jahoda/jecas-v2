<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<svelte:head>
	<title>Threlte Demo - Interaktivní 3D scéna</title>
	<meta name="description" content="Živá ukázka Threlte - 3D framework pro Svelte" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<div class="container mx-auto px-4 py-8">
		<div class="mb-8 text-center">
			<h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">Threlte Demo</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-300">
				Interaktivní 3D scéna vytvořená s Threlte - deklarativním 3D frameworkem pro Svelte
			</p>
			<div class="mt-4">
				<a
					href="/threlte"
					class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
				>
					← Zpět na článek
				</a>
			</div>
		</div>

		<div class="relative mx-auto max-w-5xl">
			<div class="overflow-hidden rounded-2xl border-4 border-purple-500/30 shadow-2xl">
				<div class="aspect-video w-full">
					<Canvas>
						<Scene />
					</Canvas>
				</div>
			</div>

			<div class="mt-8 grid gap-6 md:grid-cols-3">
				<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-2 text-xl font-semibold text-white">🎮 Interaktivní</h3>
					<p class="text-gray-300">Otáčejte scénou myší nebo tahem na dotykové obrazovce</p>
				</div>
				<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-2 text-xl font-semibold text-white">⚡ Reaktivní</h3>
					<p class="text-gray-300">Automatické reaktivní propojení se Svelte</p>
				</div>
				<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-2 text-xl font-semibold text-white">📦 Deklarativní</h3>
					<p class="text-gray-300">Píšete komponenty místo imperativního kódu</p>
				</div>
			</div>
		</div>
	</div>
</div>
