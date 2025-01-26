import {EventType, EventTypeOrArray, IAddEventOption, Listener} from "./EventTypes";
import {isObject} from "gs-base";

export function on(event: Record<EventType, Listener> | Object, options?: boolean | IAddEventOption): void;
export function on(event: EventTypeOrArray, listener: Listener, options?: boolean | IAddEventOption): void;
export function on(event: any, listener: any, options?: any) {
	if (Array.isArray(event)) {
		for (const e of event) {
			on(e, listener, options);
		}
		return;
	}
	if (isObject(event)) {
		for (const [key, value] of Object.entries(event)) {
			if(value instanceof Function) {
				on(key, value as any, listener || options);
			}
		}
		return;
	}
	if (options && Array.isArray(options.by)) {
		for (const by of options.by) {
			on(event, listener, {...options, by});
		}
		return;
	}
	options === true && (options = {capture: true});
	options || (options = {});
	(options.by || document).addEventListener(event, listener, options);
}