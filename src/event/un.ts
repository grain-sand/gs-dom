import {EventType, EventTypeOrArray, Listener} from "./EventTypes";
import {WinOrDomOrArr} from "../com/BrowserTypes";
import {isObject} from "gs-base";

export function un(event: Record<EventType, Listener> | Object, by?: WinOrDomOrArr): void;
export function un(event: EventTypeOrArray, listener: Listener, by?: WinOrDomOrArr): void;

export function un(event: any, listener: any, by?: WinOrDomOrArr): void {
	if (Array.isArray(event)) {
		for (const e of event) {
			un(e, listener, by);
		}
		return;
	}
	if (isObject(event)) {
		for (const [key, value] of Object.entries(event)) {
			if(value instanceof Function) {
				un(key, value as any, listener || by);
			}
		}
		return;
	}
	if (Array.isArray(by)) {
		for (const el of by) {
			un(event, listener, el);
		}
		return;
	}
	(by || document).removeEventListener(event, listener);
}