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
				.select('id, slug, parent_id, author_name, message, is_approved, created_at, updated_at')
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

	function handleSubmitted(comment: DiscussionComment, editToken: string) {
		saveToken(comment.id, editToken);
		// Komentář čeká na schválení, nepřidáváme ho do stromu
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

<div class="mt-8">
	<h2 class="mb-6 text-xl font-bold dark:text-white">
		Diskuse {totalCount > 0 ? `(${totalCount})` : ''}
	</h2>

	{#if loading}
		<div class="grid gap-4">
			<div class="h-16 animate-pulse rounded bg-gray-100 dark:bg-slate-800"></div>
			<div class="h-16 animate-pulse rounded bg-gray-100 dark:bg-slate-800"></div>
		</div>
	{:else}
		{#if comments.length > 0}
			<div class="mb-8 flex flex-col gap-4">
				{#each comments as comment (comment.id)}
					<DiscussionCommentItem
						{comment}
						onReply={handleReply}
						onDeleted={handleDeleted}
						onUpdated={handleUpdated}
					/>
					{#if replyTo === comment.id}
						<div class="ml-12 border-l-2 border-blue-300 pl-4 dark:border-blue-700">
							<DiscussionForm
								{slug}
								parentId={comment.id}
								onSubmitted={handleSubmitted}
								onCancel={() => (replyTo = null)}
							/>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<p class="mb-6 text-sm text-slate-500 dark:text-slate-400">
				Zatím žádné komentáře. Buďte první!
			</p>
		{/if}

		<div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
			<h3 class="mb-3 text-sm font-medium dark:text-white">Napsat komentář</h3>
			<DiscussionForm {slug} onSubmitted={handleSubmitted} />
		</div>
	{/if}
</div>
