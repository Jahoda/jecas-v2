<script lang="ts">
	export let name: string;

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

	const parts = name.split(' ');

	$: first = parts[0] ? parts[0][0] : '';
	$: second = parts[1] ? parts[1][0] : '';
</script>

<div
	class="bg-blue-dark flex h-full w-full items-center justify-center rounded-full text-white"
	style="background: {stringToColor(name)}"
>
	{first}{second}
</div>
