import {EventTypeOrArray, Listener} from "../EventTypes";
import {WinAndDomOrArr} from "../../com/BrowserTypes";

export function onBy(by: WinAndDomOrArr, event: EventTypeOrArray, listener: Listener, options?: boolean | AddEventListenerOptions) {
	if (Array.isArray(event)) {
		for (const e of event) {
			onBy(by, e, listener, options);
		}
		return;
	}
	if (Array.isArray(by)) {
		for (const b of by) {
			b.addEventListener(event as any, listener, options as any);
		}
	} else {
		(by as any).addEventListener(event, listener, options);
	}

}
