export type HtmlEventType = keyof HTMLElementEventMap | string;

export type EventType = keyof DocumentEventMap | keyof WindowEventMap | HtmlEventType | string

export type EventTypeOrArray = EventType | EventType[]

export type Listener = (event: Event) => void

export interface IEventProps {
	bubbles?: boolean,
	cancelable?: boolean,
	detail?: any
	view?: Window | any,
}