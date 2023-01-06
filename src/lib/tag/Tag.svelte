<script lang="ts">
	export let title: string;
	export let background: string;
	export let color: string;
	export let href: string;
	export let small = false;
</script>

<a
	{href}
	class="border rounded-md px-2 flex border-white/25 {small ? 'text-xs py-0.5' : 'py-1'}"
	style="background: {background}; color: {color}"
>
	{title}
</a>
