import { DisplayType } from './DisplayType';

export interface IContent {
	id?: string;
	prerollMetadata?: any;
	promotedMetadata?: any;
	displayType?: DisplayType;
	tweetContext?: any;
	socialContext?: any;
	innerTombstoneInfo?: any;
	forwardPivot?: any;
	hasModeratedReplies?: any;
	ruxContext?: any;
	conversation_annotation?: any;
	retweetedStatusId?: any;
	replyBadge?: any;
	highlights?: any;
	grok_translated_post?: any;
	count?: number;
	lastRevealedTimestamp?: number | null;
}
