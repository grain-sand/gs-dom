import {EventType, IAddEventOption, IByEventProps, Listener} from "../EventTypes";
import {WinOrDomOrArr} from "../../com/BrowserTypes";
import {isBoolean, isFunction} from "gs-base";
import {on} from "../on";
import {trigger} from "../trigger";
import {addProxyFn} from "../../gdom/gdomFns";

export function defineEvent(type: EventType) {
	addProxyFn(type, (by, proxy) => {
		return (arg?: Listener | IByEventProps, options?: boolean | IAddEventOption) => {
			if (isFunction(arg)) {
				on(type, arg as any,
					(isBoolean(options) ? {capture: options, by} : {...options as any, by}) as any
				);
			} else {
				trigger(type, arg ? {...arg as any, by} : {by});
			}
			return proxy;
		}
	})
	return <E extends Event = Event,Init extends EventInit = EventInit>(arg: Listener<E> | IByEventProps | WinOrDomOrArr, options?: IAddEventOption&Init): void => {
		if (isFunction(arg)) {
			on(type, arg as any, options);
		} else {
			trigger(type, arg as any);
		}
	}
}