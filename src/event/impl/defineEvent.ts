import {EventType, IAddEventOption, IByEventProps, Listener} from "../EventTypes";
import {WinOrDomOrArr} from "../../com";
import {isFunction} from "gs-base";
import {on} from "../on";
import {trigger} from "../trigger";

export function defineEvent(type: EventType) {
	return <E extends Event = Event,Init extends EventInit = EventInit>(arg: Listener<E> | IByEventProps | WinOrDomOrArr, options?: IAddEventOption&Init): void => {
		if (isFunction(arg)) {
			on(type, arg as any, options);
		} else {
			trigger(type, arg as any);
		}
	}
}
