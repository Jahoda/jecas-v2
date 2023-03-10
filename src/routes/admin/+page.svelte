<script lang="ts">
	import { searchText } from '$lib/adminSearch/adminSearch';
	import Box from '$lib/box/Box.svelte';
	import Button from '$lib/button/Button.svelte';
	import Container from '$lib/container/Container.svelte';
	import IconMagnifyingGlass from '$lib/icon/IconMagnifyingGlass.svelte';
	import IconPlus from '$lib/icon/IconPlus.svelte';
	import IconPlusCircle from '$lib/icon/IconPlusCircle.svelte';
	import Input from '$lib/input/Input.svelte';
	import SkeletonLoader from '$lib/loader/SkeletonLoader.svelte';
	import AdminPostList from '$lib/post/AdminPostList.svelte';
	import TagItem from '$lib/tag/TagItem.svelte';
	import type { PageData } from './$types';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data: PageData;
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<Container>
	<Auth
		supabaseClient={data.supabase}
		view="magic_link"
		redirectTo={`${data.url}/logging-in?redirect=/admin/dashboard`}
		showLinks={false}
		appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
	/>
</Container>
