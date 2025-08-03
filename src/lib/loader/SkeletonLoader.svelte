<script lang="ts">
	export let line = 1;
</script>

{#each Array(line) as _}
	<div>
		<div class="inline-flex h-4 w-36 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>
	</div>
{/each}
