<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/button/Button.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function copyEmails() {
		const emails = data.subscribers.map((s) => s.email).join(', ');
		navigator.clipboard.writeText(emails);
		alert('E-maily zkopírovány do schránky!');
	}

	function downloadCSV() {
		const csv = [
			'Email,Přihlášen',
			...data.subscribers.map((s) => `${s.email},${s.subscribed_at}`)
		].join('\n');

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `newsletter-${new Date().toISOString().split('T')[0]}.csv`;
		a.click();
	}
</script>

<div class="mx-auto max-w-4xl p-8">
	<h1 class="mb-8 text-3xl font-bold">Newsletter odběratelé</h1>

	{#if data.error}
		<div class="mb-6 rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-200">
			<p class="font-semibold">Chyba při načítání odběratelů:</p>
			<p class="mt-2">{data.error}</p>
			<p class="mt-2 text-sm">
				Zkontrolujte, že máte v .env nastavené SUPABASE_URL a SUPABASE_SERVICE_KEY a restartujte dev
				server.
			</p>
		</div>
	{/if}

	<div class="mb-6 flex gap-4">
		<Button onclick={copyEmails}>Kopírovat e-maily</Button>
		<Button onclick={downloadCSV}>Stáhnout CSV</Button>
	</div>

	<div class="mb-4 rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
		<p class="font-semibold">Celkem: {data.subscribers.length} odběratelů</p>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
		<table class="w-full">
			<thead class="bg-gray-50 dark:bg-gray-800">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">E-mail</th>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">Přihlášen</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">Status</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
				{#each data.subscribers as subscriber}
					<tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
						<td class="px-6 py-4 whitespace-nowrap">{subscriber.email}</td>
						<td class="px-6 py-4 whitespace-nowrap"
							>{new Date(subscriber.subscribed_at).toLocaleDateString('cs-CZ')}</td
						>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="rounded-full px-2 py-1 text-xs font-semibold {subscriber.status === 'active'
									? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
									: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}"
							>
								{subscriber.status}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
