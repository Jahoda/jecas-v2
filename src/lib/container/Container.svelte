<script lang="ts">
	export let verticalSpace = false;
</script>

<div class={verticalSpace ? 'p-10' : 'px-10'}>
	<slot />
</div>
