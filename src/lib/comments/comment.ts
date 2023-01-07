export type Avatar = {
	isCustom: boolean;
	large: {
		cache: string;
	};
};

export type Author = {
	username: string;
	about: string;
	name: string;
	disable3rdPartyTrackers: boolean;
	isPowerContributor: boolean;
	avatar: Avatar;
};

export type Thread = {
	feed: string;
	clean_title: string;
	dislikes: number;
	likes: number;
	message: string;
	// additional properties not listed in the original object
};

export type CommentContent = {
	author: Author;
	canVote: boolean;
	createdAt: string;
	dislikes: number;
	editableUntil: string;
	forum: string;
	id: string;
	isApproved: boolean;
	isAtFlagLimit: boolean;
	isDeleted: boolean;
	isDeletedByAuthor: boolean;
	isEdited: boolean;
	isFlagged: boolean;
	isHighlighted: boolean;
	isNewUserNeedsApproval: boolean;
	isSpam: boolean;
	likes: number;
	media: any[];
	message: string;
	moderationLabels: any[];
	numReports: number;
	parent: any;
	points: number;
	raw_message: string;
	sb: boolean;
	thread: Thread;
	url: string;
};
