import {WinOrDomOrArr} from "../com/BrowserTypes";

export type HtmlEventType = keyof HTMLElementEventMap | string;

export type EventType = keyof DocumentEventMap | keyof WindowEventMap | HtmlEventType | string

export type EventTypeOrArray = EventType | EventType[]

export type Listener<E extends Event = Event> = (event: E) => void

export type EventInit<T = any> = CustomEventInit<T> & MouseEventInit & KeyboardEventInit

export interface IEventProps<T = any> extends EventInit<T> {
	bubbles?: boolean,
	cancelable?: boolean,
	view?: Window | any,
}

export interface IByEventProps<T = any> extends IEventProps<T>{
	by?: WinOrDomOrArr
}

export interface IAddEventOption extends AddEventListenerOptions {
	by?: WinOrDomOrArr
}