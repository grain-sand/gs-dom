import {IAddEventOption, IByEventProps, Listener} from "./EventTypes";
import {WinOrDomOrArr} from "../com/BrowserTypes";
import {defineEvent} from "./impl/defineEvent";

export type EventFnType<E extends Event = Event, Init extends EventInit = EventInit> = {
	(arg: Listener<E>, options?: IAddEventOption): void
	(arg: IByEventProps & Init | WinOrDomOrArr): void
};

export type KeyEventFn = EventFnType<KeyboardEvent, KeyboardEventInit>

export type MouseEventFn = EventFnType<MouseEvent, MouseEventInit>

export const focus: EventFnType = defineEvent('focus');

export const blur: EventFnType = defineEvent('blur');

export const change: EventFnType = defineEvent('change');

export const mouseenter: MouseEventFn = defineEvent('mouseenter');

export const mouseleave: MouseEventFn = defineEvent('mouseleave');

export const mouseover: MouseEventFn = defineEvent('mouseover');

export const mouseout: MouseEventFn = defineEvent('mouseout');

export const mousedown: MouseEventFn = defineEvent('mousedown');

export const mouseup: MouseEventFn = defineEvent('mouseup');

export const click: MouseEventFn = defineEvent('click');

export const keyup: KeyEventFn = defineEvent('keyup');

export const keydown: KeyEventFn = defineEvent('keydown');