<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import PostContent from '$lib/post/PostContent.svelte';
	import PostList from '$lib/post/PostList.svelte';
	import PostComments from '$lib/postComments/PostComments.svelte';
	import PostToc from '$lib/toc/PostToc.svelte';
	import type { PageData } from './$types';
	import HeroPost from '$lib/mainPost/HeroPost.svelte';

	export let data: PageData;
</script>

{data.frontmatter.title}