<script lang="ts">
	import { slide } from 'svelte/transition';

	const loadingPhrases = ['webů', 'aplikací', 'formulářů', 'v JavaScriptu'];

	let phraseIndex = 0;

	function changePhrase() {
		phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
	}

	setInterval(changePhrase, 3000);
</script>

<div class="flex gap-1">
	<div>Moderní tvorba</div>
	{#key phraseIndex}
		<span class="text-center" in:slide={{ duration: 200 }}>
			{loadingPhrases[phraseIndex]}
		</span>
	{/key}
</div>
