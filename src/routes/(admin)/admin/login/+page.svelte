<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import Input from '$lib/input/Input.svelte';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	const redirectTo = $page.url.searchParams.get('redirect') || '/admin';
</script>

<svelte:head>
	<title>Admin Login</title>
</svelte:head>

<Container verticalSpace>
	<div class="mx-auto max-w-md">
		<div class="rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
			<h1 class="mb-6 text-center text-2xl font-bold dark:text-white">Přihlášení</h1>

			{#if form?.error}
				<div
					class="mb-4 rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300"
				>
					{form.error}
				</div>
			{/if}

			<form method="POST" use:enhance class="flex flex-col gap-4">
				<input type="hidden" name="redirect" value={redirectTo} />

				<Input name="name" type="text" label="Jméno" placeholder="Zadejte jméno" required />

				<Input
					name="password"
					type="password"
					label="Heslo"
					placeholder="Zadejte heslo"
					required
				/>

				<Button type="submit" large>Přihlásit</Button>
			</form>
		</div>
	</div>
</Container>
