<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	interface Props {
		slug: string;
	}

	let { slug }: Props = $props();

	const reactions = [
		{ key: 'nice', emoji: '👍', label: 'Hezké' },
		{ key: 'didnt_know', emoji: '😲', label: 'Neznal jsem' },
		{ key: 'use_it', emoji: '😝', label: 'Používám' }
	] as const;

	let counts = $state<Record<string, number>>({ nice: 0, didnt_know: 0, use_it: 0 });
	let voted = $state<Record<string, boolean>>({ nice: false, didnt_know: false, use_it: false });
	let submitting = $state<string | null>(null);
	let loading = $state(true);

	let totalCount = $derived(Object.values(counts).reduce((a, b) => a + b, 0));

	function loadVoted() {
		try {
			const stored = localStorage.getItem(`reactions_${slug}`);
			if (stored) voted = JSON.parse(stored);
		} catch {
			// ignore
		}
	}

	function saveVoted() {
		localStorage.setItem(`reactions_${slug}`, JSON.stringify(voted));
	}

	async function fetchCounts() {
		try {
			const { data } = await supabase
				.from('article_reactions')
				.select('reaction')
				.eq('slug', slug);

			if (data) {
				const c: Record<string, number> = { nice: 0, didnt_know: 0, use_it: 0 };
				for (const row of data) {
					c[row.reaction] = (c[row.reaction] || 0) + 1;
				}
				counts = c;
			}
		} catch {
			// ignore
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadVoted();
		fetchCounts();
	});

	$effect(() => {
		if (slug) {
			loading = true;
			loadVoted();
			fetchCounts();
		}
	});

	async function react(reaction: string) {
		if (submitting) return;
		submitting = reaction;

		try {
			const res = await fetch(`/api/reactions/${slug}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ reaction })
			});
			const data = await res.json();

			if (data.success) {
				if (data.toggled === 'on') {
					counts[reaction]++;
					voted[reaction] = true;
				} else {
					counts[reaction] = Math.max(0, counts[reaction] - 1);
					voted[reaction] = false;
				}
				saveVoted();
			}
		} catch {
			// ignore
		} finally {
			submitting = null;
		}
	}
</script>

<div class="flex flex-col items-center gap-4 py-6">
	<h3 class="text-xl font-bold dark:text-white">Co si myslíte o tomto článku?</h3>

	{#if totalCount > 0}
		<p class="text-sm text-slate-500 dark:text-slate-400">
			{totalCount}
			{totalCount === 1 ? 'Odpověď' : totalCount < 5 ? 'Odpovědi' : 'Odpovědí'}
		</p>
	{/if}

	<div class="flex gap-8">
		{#each reactions as r (r.key)}
			<button
				onclick={() => react(r.key)}
				disabled={submitting !== null || loading}
				class="flex flex-col items-center gap-1 transition-transform hover:scale-110 disabled:opacity-50 {voted[r.key] ? 'scale-110' : ''}"
			>
				<span class="text-4xl {voted[r.key] ? 'drop-shadow-lg' : ''}">{r.emoji}</span>
				<span class="text-lg font-bold dark:text-white {voted[r.key] ? 'text-blue-600 dark:text-blue-400' : ''}">
					{loading ? '–' : counts[r.key]}
				</span>
				<span class="text-xs text-slate-500 dark:text-slate-400">{r.label}</span>
			</button>
		{/each}
	</div>
</div>
