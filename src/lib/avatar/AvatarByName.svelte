<script lang="ts">
	interface Props {
		name: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { name, size = 'md' }: Props = $props();

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
</script>

<div
	class="flex items-center justify-center rounded-full font-semibold uppercase text-white {sizeClasses[size]}"
	style="background-color: {getColor(name)}"
>
	{initials}
</div>
