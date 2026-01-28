<script lang="ts">
	import AvatarByName from '$lib/avatar/AvatarByName.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import ShowAll from '$lib/showAll/ShowAll.svelte';

	interface LatestComment {
		id: number;
		slug: string;
		author_name: string;
		author_email: string | null;
		message: string;
		created_at: string;
		article_title: string;
	}

	interface Props {
		comments: LatestComment[];
	}

	let { comments }: Props = $props();
</script>

{#if comments.length > 0}
	<div class="grid gap-4">
		{#each comments as comment (comment.id)}
			<div class="flex gap-4 text-sm">
				<div class="flex flex-col items-center gap-2">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border bg-slate-50 dark:border-slate-600 dark:bg-slate-900"
					>
						<AvatarByName name={comment.author_name} email={comment.author_email} />
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<div
						class="grid grid-cols-1 gap-2 rounded-md bg-slate-50/80 p-3 shadow dark:bg-slate-800 dark:text-white"
					>
						<div class="break-words">
							<ShowAll>
								{comment.message}
							</ShowAll>

							— <b>{comment.author_name}</b>
						</div>

						<div class="flex flex-wrap justify-between gap-4 overflow-x-hidden">
							<a
								href="/{comment.slug}#{comment.slug}-discussion"
								class="truncate text-blue-600 hover:underline dark:text-blue-400"
							>
								{comment.article_title}
							</a>

							<CreatedAt date={new Date(comment.created_at)} small />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
