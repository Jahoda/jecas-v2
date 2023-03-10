<script lang="ts">
	import { enhance } from '$app/forms';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import Input from '$lib/input/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { session, profile } = data;

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string | null = profile?.full_name;
	let username: string | null = profile?.username;
	let website: string | null = profile?.website;
	let avatarUrl: string | null = profile?.avatar_url;

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<Container verticalSpace>
	<div class="max-w-md m-auto">
		<Box>
			<form
				class="form-widget"
				method="post"
				action="?/update"
				use:enhance={handleSubmit}
				bind:this={profileForm}
			>
				<Input label="Email" name="email" value={session.user.email} disabled />

				<Input label="Full Name" name="fullName" value={form?.fullName ?? fullName} />

				<Input label="Username" name="username" value={form?.username ?? username} />

				<Input label="Website" name="website" value={form?.website ?? website} />

				<Button disabled={loading}>
					{loading ? 'Loading...' : 'Aktualisovat'}
				</Button>
			</form>

			<div class="mt-4" />

			<form method="post" action="?/signout" use:enhance={handleSubmit}>
				<div>
					<button class="button block" disabled={loading}>Odhlásit</button>
				</div>
			</form>
		</Box>
	</div>
</Container>
