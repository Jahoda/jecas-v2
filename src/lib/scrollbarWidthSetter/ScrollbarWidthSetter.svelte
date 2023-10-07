<script lang="ts">
	import { onMount } from 'svelte';

	function setScrollbarWidth(): void {
		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'scroll';
		outer.style.width = '50px';
		outer.style.height = '50px';
		document.body.appendChild(outer);

		const inner = document.createElement('div');
		inner.style.width = '100%';
		inner.style.height = '100%';
		outer.appendChild(inner);

		const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
		document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

		outer.parentNode?.removeChild(outer);
	}

	onMount(() => {
		setScrollbarWidth();
		window.addEventListener('resize', setScrollbarWidth);
		return () => {
			window.removeEventListener('resize', setScrollbarWidth);
		};
	});
</script>
