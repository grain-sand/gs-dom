import {IReactProps} from "../react/IReactProps";

// 定义 displayType 的所有可选值
export const DisplayTypes = [
  'Tweet',
  'defaultDisplayType',
  'FocalTweet'
] as const;

// 从数组定义联合类型
export type DisplayType = typeof DisplayTypes[number];

export interface IClientEventInfo {
	component?: string;
	element?: string;
}

export interface IModuleMetadata {
	conversationMetadata?: any;
	gridCarouselMetadata?: any;
	verticalMetadata?: any;
}

export interface IItemMetadata {
	clientEventInfo?: IClientEventInfo;
	feedbackInfo?: any;
	reactiveTriggers?: any;
	moduleMetadata?: IModuleMetadata;
}

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

export interface IEntry {
	type?: string;
	entryId?: string;
	sortIndex?: string;
	itemMetadata?: IItemMetadata;
	dispensable?: any;
	treeDisplay?: any;
	pill_group?: any;
	content?: any | IContent;
	shouldCountTowardsAdSpacing?: boolean | any;
	position?: number;
}

export interface IModule {
	applyFeedbackAction?: Function;
	applyNewTweetsBarInstructions?: Function;
	applyReactionInstructions?: Function;
	clearActiveCover?: Function;
	clearAllEntries?: Function;
	clearDroppedAds?: Function;
	deleteTimeline?: Function;
	fetchBottom?: Function;
	fetchCursor?: Function;
	fetchGraphQLDarkRead?: Function;
	fetchInitial?: Function;
	fetchInitialOrTop?: Function;
	fetchTop?: Function;
	getCreationOptions?: Function;
	impressEntry?: Function;
	injectEntry?: Function;
	injectTimelineModuleEntry?: Function;
	markAllAsRead?: Function;
	markTopEntrySeen?: Function;
	perfKey?: string;
	pinEntry?: Function;
	processCallback?: Function;
	removeAlert?: Function;
	removeEntry?: Function;
	removeTweets?: Function;
	restoreInjections?: Function;
	restoreTimeline?: Function;
	scopeId?: any;
	selectActiveCover?: Function;
	selectAlert?: Function;
	selectBottomFetchStatus?: Function;
	selectCanRefresh?: Function;
	selectCursorFetchStatus?: Function;
	selectCursorFetchStatusByValue?: Function;
	selectDismissedEntries?: Function;
	selectDroppedAds?: Function;
	selectEntries?: Function;
	selectFeedbackActions?: Function;
	selectHasHoistedAnEntry?: Function;
	selectInitialFetchStatus?: Function;
	selectIsEmptyTimeline?: Function;
	selectIsUnread?: Function;
	selectMetadata?: Function;
	selectNewTweetsBar?: Function;
	selectPageConfiguration?: Function;
	selectPinnedEntry?: Function;
	selectPollingIntervalMs?: Function;
	selectTimeline?: Function;
	selectTopFetchStatus?: Function;
	selectTopUnreadCount?: Function;
	selectUnavailableReason?: Function;
	selectUnreadEntries?: Function;
	selectUnreadEntriesCount?: Function;
	timelineId?: string;
	timelineType?: any;
	undoFeedbackAction?: Function;
	unpinCurrentlyPinnedEntry?: Function;
	updateDismissCause?: Function;
	updateEntry?: Function;
}

export interface IItemData {
	type?: string;
	entryId?: string;
	content?: any;
	itemMetadata?: any;
	shouldCountTowardsAdSpacing?: any;
	sortIndex?: string;
	position?: number;
}

export interface IItem {
	id?: string;
	_renderer?: Function;
	canBeAnchor?: boolean;
	data?: IItemData;
	sortIndex?: string;
}

export interface IReactXCellDivProps extends IReactProps<IEntry, IItem, IReactXCellDivProps> {
	displayType?: DisplayType;
	module?: IModule;
	setAPI?: Function;
}
