import {IndexedQuerySelector} from "./IQueryArg";
import {ElOrArr} from "../com/BrowserTypes";
import {EventType, Listener} from "../event/EventTypes";

export type TagString = `<${string}`

export interface ITagProps extends Record<EventType, undefined | string | Listener | ChildTag | ChildTag[] | HTMLElement | IndexedQuerySelector> {
	text?: string
	html?: string
	val?: string
	src?: string
	href?: string
	id?: string
	append?: ChildTag | ChildTag[]
	appendTo?: ElOrArr | IndexedQuerySelector
}

export interface IChildTagProps extends ITagProps {
	tag: string
}

export type ChildTag = string | HTMLElement | IChildTagProps;