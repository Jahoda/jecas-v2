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
		Když budu mít něco opravdu zajímavého, můžu vám to poslat e-mailem
	</p>

	<!-- Social proof -->
	<div class="mb-4 flex flex-wrap gap-4 text-sm text-white/70">
		<div class="flex items-center gap-1.5">
			<svg
				class="h-4 w-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				></path>
			</svg>
			<span>Přidej se k 500+ čtenářům</span>
		</div>
		<div class="flex items-center gap-1.5">
			<svg
				class="h-4 w-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
				></path>
			</svg>
			<span>Jen kvalitní obsah</span>
		</div>
		<div class="flex items-center gap-1.5">
			<svg
				class="h-4 w-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
				></path>
			</svg>
			<span>Žádný spam</span>
		</div>
	</div>

	<form onsubmit={handleSubmit} class="flex flex-col gap-3 sm:max-w-xl sm:flex-row">
		<input
			type="email"
			bind:value={email}
			placeholder="vas@email.cz"
			required
			disabled={loading}
			class="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 shadow backdrop-blur-sm transition focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none disabled:opacity-50"
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
