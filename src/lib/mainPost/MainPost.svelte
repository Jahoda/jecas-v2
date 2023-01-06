<script lang="ts">
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import Date from '$lib/date/CreatedAt.svelte';
	import Tags from '$lib/tags/Tags.svelte';

	export let title: string;
	export let description: string;
	export let date: string;
	export let href: string;
	export let image: string;
	export let background: string =
		'background-image: linear-gradient(to right top, #7957b0, #6b5db5, #5b63b9, #4a68bb, #356cbc, #5c6dc1, #7b6dc3, #966dc3, #d466b0, #fc698d, #ff7f65, #ffa23f);';
	export let tags: object[] | null = null;
	export let small = false;
	export let neutral = false;
</script>

<div
	class="rounded-2xl shadow {small ? 'p-4' : 'p-8'} {neutral ? 'bg-gray-50' : 'text-white'}"
	style={neutral ? '' : background}
>
	<div class="flex {small ? 'gap-4' : 'gap-8'}">
		<a
			{href}
			class="flex rounded-lg overflow-hidden flex-shrink-0 shadow {small
				? 'w-[100px] h-[100px]'
				: 'w-[200px] h-[200px]'}"
		>
			<img src={image} alt="" width="200" height="200" />
		</a>

		<div class="{small ? 'gap-4' : 'gap-8'} flex flex-col">
			<a {href} class="hover:underline">
				<h1 class="{small ? 'text-2xl' : 'text-5xl'} font-bold">
					{title}
				</h1></a
			>
			{#if description}
				<p class={small ? 'text-sm' : 'text-2xl'}>
					{description}
				</p>
			{/if}

			{#if date}
				<CreatedAt {date} {small} />
			{/if}

			{#if tags}
				<Tags {tags} {small} />
			{/if}
		</div>
	</div>
</div>
