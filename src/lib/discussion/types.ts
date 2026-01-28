export interface DiscussionComment {
	id: number;
	slug: string;
	parent_id: number | null;
	author_name: string;
	gravatar_hash?: string | null;
	message: string;
	is_approved: boolean;
	created_at: string;
	updated_at: string;
	replies?: DiscussionComment[];
}

export interface CommentFormData {
	slug: string;
	parent_id?: number | null;
	author_name: string;
	author_email?: string;
	message: string;
	honeypot?: string;
}

export interface CommentWithToken extends DiscussionComment {
	edit_token: string;
}
