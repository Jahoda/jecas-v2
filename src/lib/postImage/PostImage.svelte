<script lang="ts">
	export let slug: string;
	export let lazy = true;

	let postImageUrl: string | null = null;

	$: postImageUrl = `https://upipiocepvscgharpdkz.supabase.co/storage/v1/object/public/post-thumbnails/${slug}`;
</script>

<img src={postImageUrl} loading={lazy ? 'lazy' : null} alt="" width="200" height="200" />
