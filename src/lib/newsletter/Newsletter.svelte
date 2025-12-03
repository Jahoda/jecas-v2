<script lang="ts">
	import Button from '$lib/button/Button.svelte';

	let email = $state('');
	let loading = $state(false);
	let message = $state<{ type: 'success' | 'error'; text: string } | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		message = null;

		try {
			const response = await fetch('/api/newsletter/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Nepodařilo se přihlásit k odběru novinek');
			}

			message = {
				type: 'success',
				text: data.message || 'Úspěšně jste se přihlásili k odběru novinek!'
			};
			email = '';
		} catch (err) {
			message = {
				type: 'error',
				text: err instanceof Error ? err.message : 'Nepodařilo se přihlásit k odběru novinek'
			};
		} finally {
			loading = false;
		}
	}
</script>

<div class="rounded-lg bg-white/10 p-6 backdrop-blur-sm dark:bg-slate-800/30">
	<h3 class="mb-2 text-xl font-semibold text-white">Novinky e-mailem</h3>
	<p class="mb-4 text-sm text-white/80">
		Nechte si zasílat novinky o moderním webdesignu přímo do e-mailu.
	</p>

	<form onsubmit={handleSubmit} class="flex flex-col gap-3 sm:flex-row sm:max-w-xl">
		<input
			type="email"
			bind:value={email}
			placeholder="vas@email.cz"
			required
			disabled={loading}
			class="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 shadow backdrop-blur-sm transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
		/>
		<Button type="submit" disabled={loading}>
			{loading ? 'Odesílání...' : 'Přihlásit se'}
		</Button>
	</form>

	{#if message}
		<div
			class="mt-3 max-w-xl rounded-md p-3 text-sm {message.type === 'success'
				? 'bg-green-500/20 text-green-100'
				: 'bg-red-500/20 text-red-100'}"
		>
			{message.text}
		</div>
	{/if}
</div>
