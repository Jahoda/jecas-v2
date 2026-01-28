<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { DiscussionComment } from './types';
	import DiscussionCommentItem from './DiscussionCommentItem.svelte';
	import DiscussionForm from './DiscussionForm.svelte';
	import { saveToken } from './commentTokens';

	interface Props {
		slug: string;
	}

	let { slug }: Props = $props();

	let comments: DiscussionComment[] = $state([]);
	let loading = $state(true);
	let replyTo = $state<number | null>(null);

	// Sestaví strom komentářů z plochého seznamu
	function buildTree(flat: DiscussionComment[]): DiscussionComment[] {
		const map = new Map<number, DiscussionComment>();
		const roots: DiscussionComment[] = [];

		for (const c of flat) {
			map.set(c.id, { ...c, replies: [] });
		}
		for (const c of flat) {
			const node = map.get(c.id)!;
			if (c.parent_id && map.has(c.parent_id)) {
				map.get(c.parent_id)!.replies!.push(node);
			} else {
				roots.push(node);
			}
		}
		return roots;
	}

	async function fetchComments() {
		try {
			const { data } = await supabase
				.from('comments')
				.select('id, slug, parent_id, author_name, gravatar_hash, message, is_approved, created_at, updated_at')
				.eq('slug', slug)
				.eq('is_approved', true)
				.order('created_at', { ascending: true });

			if (data) {
				comments = buildTree(data as DiscussionComment[]);
			}
		} catch {
			// tiché selhání
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchComments();
	});

	// Znovu načte při změně slug (navigace)
	$effect(() => {
		if (slug) {
			loading = true;
			replyTo = null;
			fetchComments();
		}
	});

	function handleReply(parentId: number) {
		replyTo = replyTo === parentId ? null : parentId;
	}

	function handleCancelReply() {
		replyTo = null;
	}

	function handleSubmitted(comment: DiscussionComment, editToken: string) {
		saveToken(comment.id, editToken);
		// Add auto-approved comments to the tree immediately
		if (comment.is_approved) {
			if (comment.parent_id) {
				// Add as reply
				function addReply(list: DiscussionComment[]): DiscussionComment[] {
					return list.map((c) => {
						if (c.id === comment.parent_id) {
							return { ...c, replies: [...(c.replies || []), { ...comment, replies: [] }] };
						}
						return { ...c, replies: addReply(c.replies || []) };
					});
				}
				comments = addReply(comments);
			} else {
				// Add as root comment
				comments = [...comments, { ...comment, replies: [] }];
			}
		}
		replyTo = null;
	}

	function handleDeleted(id: number) {
		function removeFromTree(list: DiscussionComment[]): DiscussionComment[] {
			return list
				.filter((c) => c.id !== id)
				.map((c) => ({ ...c, replies: removeFromTree(c.replies || []) }));
		}
		comments = removeFromTree(comments);
	}

	function handleUpdated(updated: DiscussionComment) {
		function updateInTree(list: DiscussionComment[]): DiscussionComment[] {
			return list.map((c) => {
				if (c.id === updated.id) {
					return { ...c, ...updated, replies: c.replies };
				}
				return { ...c, replies: updateInTree(c.replies || []) };
			});
		}
		comments = updateInTree(comments);
	}

	let totalCount = $derived(
		(function count(list: DiscussionComment[]): number {
			return list.reduce((sum, c) => sum + 1 + count(c.replies || []), 0);
		})(comments)
	);
</script>

<div id="{slug}-discussion" class="mt-8 scroll-mt-4">
	<div class="mb-6 flex items-center gap-3">
		<h2 class="text-xl font-bold dark:text-white">Diskuse</h2>
		{#if totalCount > 0}
			<span
				class="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
			>
				{totalCount}
			</span>
		{/if}
	</div>

	{#if loading}
		<div class="flex flex-col gap-4">
			{#each [1, 2] as _}
				<div class="flex gap-3">
					<div class="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"></div>
					<div class="flex-1">
						<div class="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
						<div class="mt-2 h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		{#if comments.length > 0}
			<div class="mb-8 flex flex-col gap-6">
				{#each comments as comment (comment.id)}
					<DiscussionCommentItem
						{comment}
						{slug}
						replyToId={replyTo}
						onReply={handleReply}
						onDeleted={handleDeleted}
						onUpdated={handleUpdated}
						onSubmitted={handleSubmitted}
						onCancelReply={handleCancelReply}
					/>
				{/each}
			</div>
		{:else}
			<div class="mb-8 rounded-xl bg-slate-50 p-6 text-center dark:bg-slate-800/50">
				<p class="text-slate-500 dark:text-slate-400">
					Zatím žádné komentáře. Buďte první, kdo přidá komentář!
				</p>
			</div>
		{/if}

		<div class="border-t border-slate-200 pt-6 dark:border-slate-700">
			<h3 class="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
				Přidat komentář
			</h3>
			<DiscussionForm {slug} onSubmitted={handleSubmitted} />
		</div>
	{/if}
</div>
