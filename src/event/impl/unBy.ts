import {EventTypeOrArray, Listener} from "../EventTypes";
import {WinAndDomOrArr} from "../../com/BrowserTypes";

export function unBy(by: WinAndDomOrArr, event: EventTypeOrArray, listener: Listener) {
	if (Array.isArray(event)) {
		for (const e of event) {
			unBy(by, e, listener);
		}
		return;
	}
	if (Array.isArray(by)) {
		for (const b of by) {
			b.removeEventListener(event as any, listener);
		}
	} else {
		(by as any).removeEventListener(event, listener);
	}
}