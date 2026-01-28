<script lang="ts">
	interface Props {
		name: string;
		email?: string | null;
		size?: 'sm' | 'md' | 'lg';
	}

	let { name, email = null, size = 'md' }: Props = $props();

	// Simple MD5 implementation for Gravatar
	function md5(string: string): string {
		function rotateLeft(value: number, shift: number) {
			return (value << shift) | (value >>> (32 - shift));
		}

		function addUnsigned(x: number, y: number) {
			return (x + y) >>> 0;
		}

		const K = [
			0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
			0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193,
			0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d,
			0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
			0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
			0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
			0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244,
			0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
			0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
			0xeb86d391
		];
		const S = [
			7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5,
			9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10,
			15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
		];

		const bytes = new TextEncoder().encode(string);
		const bitLen = bytes.length * 8;
		const padding = new Uint8Array(((bytes.length + 8) >>> 6 << 6) + 64);
		padding.set(bytes);
		padding[bytes.length] = 0x80;
		const view = new DataView(padding.buffer);
		view.setUint32(padding.length - 8, bitLen, true);

		let a0 = 0x67452301,
			b0 = 0xefcdab89,
			c0 = 0x98badcfe,
			d0 = 0x10325476;

		for (let i = 0; i < padding.length; i += 64) {
			const M = new Uint32Array(16);
			for (let j = 0; j < 16; j++) M[j] = view.getUint32(i + j * 4, true);

			let A = a0,
				B = b0,
				C = c0,
				D = d0;

			for (let j = 0; j < 64; j++) {
				let F: number, g: number;
				if (j < 16) {
					F = (B & C) | (~B & D);
					g = j;
				} else if (j < 32) {
					F = (D & B) | (~D & C);
					g = (5 * j + 1) % 16;
				} else if (j < 48) {
					F = B ^ C ^ D;
					g = (3 * j + 5) % 16;
				} else {
					F = C ^ (B | ~D);
					g = (7 * j) % 16;
				}
				F = addUnsigned(addUnsigned(addUnsigned(F, A), addUnsigned(K[j], M[g])), 0);
				A = D;
				D = C;
				C = B;
				B = addUnsigned(B, rotateLeft(F, S[j]));
			}

			a0 = addUnsigned(a0, A);
			b0 = addUnsigned(b0, B);
			c0 = addUnsigned(c0, C);
			d0 = addUnsigned(d0, D);
		}

		const result = new DataView(new ArrayBuffer(16));
		result.setUint32(0, a0, true);
		result.setUint32(4, b0, true);
		result.setUint32(8, c0, true);
		result.setUint32(12, d0, true);

		return Array.from(new Uint8Array(result.buffer))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}

	// Predefined pleasant colors with good contrast for white text
	const avatarColors = [
		'#3b82f6', // blue
		'#8b5cf6', // violet
		'#ec4899', // pink
		'#f97316', // orange
		'#14b8a6', // teal
		'#22c55e', // green
		'#ef4444', // red
		'#6366f1', // indigo
		'#0ea5e9', // sky
		'#a855f7', // purple
		'#f59e0b', // amber
		'#10b981', // emerald
		'#06b6d4', // cyan
		'#84cc16', // lime
		'#e11d48', // rose
		'#7c3aed' // violet-600
	];

	function hashCode(str: string) {
		let hash = 0;
		const normalized = str.toLowerCase().trim();
		for (let i = 0; i < normalized.length; i++) {
			hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
		}
		return Math.abs(hash);
	}

	function getColor(string: string) {
		const index = hashCode(string) % avatarColors.length;
		return avatarColors[index];
	}

	let parts = $derived(name.trim().split(/\s+/));
	let initials = $derived(
		parts.length >= 2 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : name.slice(0, 2)
	);

	const sizeClasses = {
		sm: 'h-7 w-7 text-xs',
		md: 'h-9 w-9 text-sm',
		lg: 'h-12 w-12 text-base'
	};

	const sizePx = {
		sm: 28,
		md: 36,
		lg: 48
	};

	let gravatarHash = $derived(email ? md5(email.trim().toLowerCase()) : null);
	let gravatarUrl = $derived(
		gravatarHash ? `https://www.gravatar.com/avatar/${gravatarHash}?s=${sizePx[size] * 2}&d=404` : null
	);

	let imageError = $state(false);
	let showGravatar = $derived(email && !imageError);

	// Reset error when email changes
	$effect(() => {
		if (email) imageError = false;
	});
</script>

{#if showGravatar}
	<img
		src={gravatarUrl}
		alt={name}
		class="rounded-full object-cover {sizeClasses[size]}"
		onerror={() => (imageError = true)}
	/>
{:else}
	<div
		class="flex items-center justify-center rounded-full font-semibold uppercase text-white {sizeClasses[size]}"
		style="background-color: {getColor(name)}"
	>
		{initials}
	</div>
{/if}
