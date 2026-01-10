<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		slug: string;
		articleTitle: string;
	}

	let { slug, articleTitle }: Props = $props();

	let shouldLoad = $state(false);
	let AnnotationPanel: typeof import('./AnnotationPanel.svelte').default | null = $state(null);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		// URL param ?annotate=1 sets cookie and enables mode
		if (params.get('annotate') === '1') {
			document.cookie = 'annotation_mode=1; path=/; max-age=315360000'; // 10 years
		}
		// URL param ?annotate=0 removes cookie
		if (params.get('annotate') === '0') {
			document.cookie = 'annotation_mode=; path=/; max-age=0';
		}

		// Check if we should show annotations:
		// 1. Vercel preview environment (*.vercel.app)
		// 2. Cookie 'annotation_mode' is set
		const isVercelPreview = window.location.hostname.endsWith('vercel.app');
		const hasCookie = document.cookie.includes('annotation_mode=1');

		shouldLoad = isVercelPreview || hasCookie;

		if (shouldLoad) {
			// Dynamically import the annotation panel
			import('./AnnotationPanel.svelte').then((module) => {
				AnnotationPanel = module.default;
			});
		}
	});
</script>

{#if shouldLoad && AnnotationPanel}
	<AnnotationPanel {slug} {articleTitle} />
{/if}
