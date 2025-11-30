<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Game from './Game.svelte';
</script>

<svelte:head>
	<title>3D Stack Game - Threlte</title>
	<meta name="description" content="Jednoduchá 3D hra postavená s Threlte frameworkem" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
	<div class="container mx-auto px-4 py-8">
		<div class="mb-8 text-center">
			<h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">3D Stack Game</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-300">
				Postavte co nejvyšší věž! Klikněte pro umístění bloku.
			</p>
			<div class="mt-4 space-x-4">
				<a
					href="/threlte"
					class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
				>
					← Zpět na článek
				</a>
				<a
					href="/nastroje/threlte-demo"
					class="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
				>
					🎮 3D Demo
				</a>
			</div>
		</div>

		<div class="relative mx-auto max-w-5xl">
			<div class="overflow-hidden rounded-2xl border-4 border-indigo-500/30 shadow-2xl">
				<div class="aspect-[4/3] w-full">
					<Canvas>
						<Game />
					</Canvas>
				</div>
			</div>

			<div class="mt-8 grid gap-6 md:grid-cols-3">
				<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-2 text-xl font-semibold text-white">🎯 Cíl</h3>
					<p class="text-gray-300">Umístěte bloky přesně na sebe a postavte vysokou věž</p>
				</div>
				<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-2 text-xl font-semibold text-white">🖱️ Ovládání</h3>
					<p class="text-gray-300">Klikněte (nebo zmáčkněte mezerník) pro umístění bloku</p>
				</div>
				<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-2 text-xl font-semibold text-white">⚡ Vytvořeno v Threlte</h3>
					<p class="text-gray-300">Deklarativní 3D framework pro Svelte</p>
				</div>
			</div>
		</div>
	</div>
</div>
