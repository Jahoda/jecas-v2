<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { OrbitControls, Grid, ContactShadows } from '@threlte/extras';
	import { spring } from 'svelte/motion';

	let cubeRotation = spring(0, { stiffness: 0.05, damping: 0.3 });
	let sphereY = spring(0, { stiffness: 0.1, damping: 0.5 });

	let time = 0;

	useTask((delta) => {
		time += delta;
		cubeRotation.set(time * 0.5);
		sphereY.set(Math.sin(time * 2) * 0.5 + 2);
	});
</script>

<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50}>
	<OrbitControls enableDamping autoRotate autoRotateSpeed={0.5} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
<T.AmbientLight intensity={0.5} />
<T.PointLight position={[-10, 10, -10]} intensity={0.5} color="#8b5cf6" />

<!-- Rotující kostka -->
<T.Mesh position={[0, 1, 0]} rotation.y={$cubeRotation} castShadow>
	<T.BoxGeometry args={[2, 2, 2]} />
	<T.MeshStandardMaterial color="#ec4899" metalness={0.3} roughness={0.4} />
</T.Mesh>

<!-- Plovoucí koule -->
<T.Mesh position={[3, $sphereY, 0]} castShadow>
	<T.SphereGeometry args={[0.8, 32, 32]} />
	<T.MeshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.2} />
</T.Mesh>

<!-- Torus (kroužek) -->
<T.Mesh position={[-3, 1.5, 0]} rotation.x={$cubeRotation} rotation.y={$cubeRotation * 0.5} castShadow>
	<T.TorusGeometry args={[1, 0.4, 16, 100]} />
	<T.MeshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.3} />
</T.Mesh>

<!-- Podlaha s mřížkou -->
<Grid
	position.y={-0.01}
	cellColor="#6b21a8"
	sectionColor="#7c3aed"
	fadeDistance={40}
	cellSize={1}
	sectionSize={5}
	infiniteGrid
/>

<!-- Stíny -->
<ContactShadows position.y={0} opacity={0.4} scale={20} blur={2} />
