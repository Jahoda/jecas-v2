<script lang="ts">
	interface Props {
		name: string;
	}

	let { name }: Props = $props();

	function hashCode(str: string) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}

	function intToRGB(i: number) {
		const c = (i & 0x00ffffff).toString(16).toUpperCase();

		return '00000'.substring(0, 6 - c.length) + c;
	}

	function stringToColor(string: string) {
		return intToRGB(hashCode(string));
	}

	let parts = $derived(name.split(' '));
	let first = $derived(parts[0] ? parts[0][0] : '');
	let second = $derived(parts[1] ? parts[1][0] : '');
</script>

<div
	class="bg-blue-dark flex h-full w-full items-center justify-center rounded-full text-white"
	style="background: {stringToColor(name)}"
>
	{first}{second}
</div>
