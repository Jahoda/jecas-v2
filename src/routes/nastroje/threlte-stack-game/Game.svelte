<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	type Block = {
		x: number;
		z: number;
		width: number;
		depth: number;
		y: number;
		color: string;
	};

	type GameState = 'playing' | 'gameOver';

	let gameState: GameState = $state('playing');
	let score = $state(0);
	let blocks: Block[] = $state([
		{
			x: 0,
			z: 0,
			width: 3,
			depth: 3,
			y: 0,
			color: '#3b82f6'
		}
	]);

	let currentBlock: Block = $state({
		x: 0,
		z: 3,
		width: 3,
		depth: 3,
		y: 0.5,
		color: '#8b5cf6'
	});

	let direction: 'x' | 'z' = $state('x');
	let speed = $state(2);
	let time = 0;

	const colors = [
		'#3b82f6',
		'#8b5cf6',
		'#ec4899',
		'#f59e0b',
		'#10b981',
		'#ef4444',
		'#06b6d4',
		'#f97316'
	];

	function getRandomColor() {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	useTask((delta) => {
		if (gameState !== 'playing') return;

		time += delta * speed;

		if (direction === 'x') {
			currentBlock.x = Math.sin(time) * 4;
		} else {
			currentBlock.z = Math.sin(time) * 4;
		}

		currentBlock.y = blocks.length * 0.5 + 0.25;
	});

	function placeBlock() {
		if (gameState !== 'playing') return;

		const previousBlock = blocks[blocks.length - 1];
		const overlapX = Math.min(
			previousBlock.x + previousBlock.width / 2,
			currentBlock.x + currentBlock.width / 2
		) - Math.max(previousBlock.x - previousBlock.width / 2, currentBlock.x - currentBlock.width / 2);

		const overlapZ = Math.min(
			previousBlock.z + previousBlock.depth / 2,
			currentBlock.z + currentBlock.depth / 2
		) - Math.max(previousBlock.z - previousBlock.depth / 2, currentBlock.z - currentBlock.depth / 2);

		if (overlapX <= 0 || overlapZ <= 0) {
			gameState = 'gameOver';
			return;
		}

		const newWidth = direction === 'x' ? overlapX : currentBlock.width;
		const newDepth = direction === 'z' ? overlapZ : currentBlock.depth;

		const newX =
			direction === 'x'
				? (Math.min(
						previousBlock.x + previousBlock.width / 2,
						currentBlock.x + currentBlock.width / 2
					) +
						Math.max(
							previousBlock.x - previousBlock.width / 2,
							currentBlock.x - currentBlock.width / 2
						)) /
					2
				: currentBlock.x;

		const newZ =
			direction === 'z'
				? (Math.min(
						previousBlock.z + previousBlock.depth / 2,
						currentBlock.z + currentBlock.depth / 2
					) +
						Math.max(
							previousBlock.z - previousBlock.depth / 2,
							currentBlock.z - currentBlock.depth / 2
						)) /
					2
				: currentBlock.z;

		blocks.push({
			x: newX,
			z: newZ,
			width: newWidth,
			depth: newDepth,
			y: blocks.length * 0.5,
			color: currentBlock.color
		});

		score++;
		direction = direction === 'x' ? 'z' : 'x';
		speed = Math.min(speed + 0.1, 5);

		currentBlock = {
			x: direction === 'x' ? 0 : newX,
			z: direction === 'z' ? 0 : newZ,
			width: newWidth,
			depth: newDepth,
			y: blocks.length * 0.5 + 0.25,
			color: getRandomColor()
		};
		time = 0;
	}

	function restartGame() {
		gameState = 'playing';
		score = 0;
		speed = 2;
		time = 0;
		direction = 'x';
		blocks = [
			{
				x: 0,
				z: 0,
				width: 3,
				depth: 3,
				y: 0,
				color: '#3b82f6'
			}
		];
		currentBlock = {
			x: 0,
			z: 3,
			width: 3,
			depth: 3,
			y: 0.5,
			color: '#8b5cf6'
		};
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			if (gameState === 'gameOver') {
				restartGame();
			} else {
				placeBlock();
			}
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});
</script>

<T.PerspectiveCamera makeDefault position={[8, 10, 8]} fov={50} lookAt={[0, blocks.length * 0.3, 0]} />

<T.DirectionalLight position={[5, 10, 5]} intensity={1} castShadow />
<T.AmbientLight intensity={0.6} />

<!-- Placed blocks -->
{#each blocks as block (block.y)}
	<T.Mesh position={[block.x, block.y, block.z]} castShadow receiveShadow>
		<T.BoxGeometry args={[block.width, 0.5, block.depth]} />
		<T.MeshStandardMaterial color={block.color} metalness={0.3} roughness={0.5} />
	</T.Mesh>
{/each}

<!-- Current moving block -->
{#if gameState === 'playing'}
	<T.Mesh position={[currentBlock.x, currentBlock.y, currentBlock.z]} castShadow>
		<T.BoxGeometry args={[currentBlock.width, 0.5, currentBlock.depth]} />
		<T.MeshStandardMaterial
			color={currentBlock.color}
			metalness={0.4}
			roughness={0.4}
			transparent
			opacity={0.9}
		/>
	</T.Mesh>
{/if}

<!-- Ground -->
<T.Mesh position={[0, -0.5, 0]} receiveShadow>
	<T.BoxGeometry args={[20, 0.5, 20]} />
	<T.MeshStandardMaterial color="#1e293b" metalness={0.1} roughness={0.9} />
</T.Mesh>

<!-- UI -->
<HTML position={[0, blocks.length * 0.5 + 3, 0]} center>
	<div
		class="pointer-events-auto select-none rounded-lg bg-black/80 px-6 py-3 text-center backdrop-blur-sm"
		onclick={gameState === 'gameOver' ? restartGame : placeBlock}
		onkeydown={(e) => e.key === 'Enter' && (gameState === 'gameOver' ? restartGame() : placeBlock())}
		role="button"
		tabindex="0"
	>
		<div class="text-3xl font-bold text-white">Skóre: {score}</div>
		{#if gameState === 'gameOver'}
			<div class="mt-2 text-xl font-bold text-red-400">Hra skončila!</div>
			<button
				class="mt-3 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
			>
				🔄 Hrát znovu
			</button>
		{:else}
			<div class="mt-1 text-sm text-gray-300">Klikněte nebo stiskněte mezerník</div>
		{/if}
	</div>
</HTML>
