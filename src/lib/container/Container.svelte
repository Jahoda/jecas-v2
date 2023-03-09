<script lang="ts">
	export let verticalSpace = false;
	export let topSpace = false;
</script>

<div class="{verticalSpace ? 'p-4 md:p-10' : 'px-4 md:px-10'} {topSpace ? 'pt-4 md:pt-10' : ''}">
	<slot />
</div>
