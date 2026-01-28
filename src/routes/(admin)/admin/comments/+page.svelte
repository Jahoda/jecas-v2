<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let loading = $state<number | null>(null);

	async function approve(id: number) {
		loading = id;
		try {
			const res = await fetch(`/api/comments/id/${id}/approve`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: getAdminPassword() })
			});
			if (res.ok) {
				await invalidateAll();
			}
		} finally {
			loading = null;
		}
	}

	async function remove(id: number) {
		if (!confirm('Opravdu smazat tento komentář?')) return;
		loading = id;
		try {
			const res = await fetch(`/api/comments/id/${id}/admin-delete`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: getAdminPassword() })
			});
			if (res.ok) {
				await invalidateAll();
			}
		} finally {
			loading = null;
		}
	}

	function getAdminPassword(): string {
		return document.cookie
			.split('; ')
			.find((row) => row.startsWith('admin_session='))
			?.split('=')[1] ?? '';
	}

	function formatDate(date: string): string {
		return new Date(date).toLocaleString('cs-CZ');
	}
</script>

<svelte:head>
	<title>Moderace komentářů | Admin</title>
</svelte:head>

<Container topSpace>
	<h1 class="mb-6 text-2xl font-bold dark:text-white">Moderace komentářů</h1>

	<div class="mb-8">
		<h2 class="mb-4 text-xl font-semibold dark:text-white">
			Ke schválení ({data.pending.length})
		</h2>

		{#if data.pending.length === 0}
			<p class="text-slate-500 dark:text-slate-400">Žádné komentáře ke schválení.</p>
		{:else}
			<div class="flex flex-col gap-4">
				{#each data.pending as comment (comment.id)}
					<Box>
						<div class="flex flex-col gap-2">
							<div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
								<span class="font-medium text-slate-700 dark:text-slate-300">{comment.author_name}</span>
								{#if comment.author_email}
									<span>({comment.author_email})</span>
								{/if}
								<span>•</span>
								<span>{formatDate(comment.created_at)}</span>
								<span>•</span>
								<a href="/{comment.slug}" class="text-blue-600 hover:underline dark:text-blue-400">
									/{comment.slug}
								</a>
							</div>
							<p class="whitespace-pre-wrap dark:text-white">{comment.message}</p>
							<div class="mt-2 flex gap-2">
								<Button small onclick={() => approve(comment.id)} disabled={loading === comment.id}>
									{loading === comment.id ? 'Ukládám...' : 'Schválit'}
								</Button>
								<button
									onclick={() => remove(comment.id)}
									disabled={loading === comment.id}
									class="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
								>
									Smazat
								</button>
							</div>
						</div>
					</Box>
				{/each}
			</div>
		{/if}
	</div>

	<div>
		<h2 class="mb-4 text-xl font-semibold dark:text-white">
			Schválené (posledních 50)
		</h2>

		{#if data.approved.length === 0}
			<p class="text-slate-500 dark:text-slate-400">Zatím žádné schválené komentáře.</p>
		{:else}
			<div class="flex flex-col gap-4">
				{#each data.approved as comment (comment.id)}
					<Box>
						<div class="flex flex-col gap-2">
							<div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
								<span class="font-medium text-slate-700 dark:text-slate-300">{comment.author_name}</span>
								<span>•</span>
								<span>{formatDate(comment.created_at)}</span>
								<span>•</span>
								<a href="/{comment.slug}" class="text-blue-600 hover:underline dark:text-blue-400">
									/{comment.slug}
								</a>
							</div>
							<p class="whitespace-pre-wrap text-sm dark:text-white">{comment.message}</p>
							<div class="mt-1">
								<button
									onclick={() => remove(comment.id)}
									disabled={loading === comment.id}
									class="text-xs text-red-600 hover:underline dark:text-red-400"
								>
									Smazat
								</button>
							</div>
						</div>
					</Box>
				{/each}
			</div>
		{/if}
	</div>
</Container>
