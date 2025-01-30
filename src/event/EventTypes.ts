import {WinOrDomOrArr} from "../com/BrowserTypes";

export type HtmlEventType = keyof HTMLElementEventMap | string;

export type EventType = keyof DocumentEventMap | keyof WindowEventMap | HtmlEventType | string

export type EventTypeOrArray = EventType | EventType[]

export type Listener<E extends Event = Event> = (event: E) => void

export interface IEventProps {
	view?: Window | any,
}

export interface IByEventProps extends IEventProps {
	by?: WinOrDomOrArr
}

export interface IAddEventOption extends AddEventListenerOptions {
	by?: WinOrDomOrArr
}

export type EventRecord = Record<EventType, Listener>

export type EventProp<Init extends EventInit = EventInit> = IEventProps & Init

export type ByEventProps<Init extends EventInit = EventInit> = IByEventProps & Init