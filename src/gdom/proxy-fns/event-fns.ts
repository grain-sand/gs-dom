import {EventType, IByEventProps, on as onBy, trigger as triggerBy, un as unBy} from '../../event';
import {isObject} from "gs-base";

export function trigger(by: any[], proxy: any): any {
	return (type: EventType, props: IByEventProps) => {
		props && (props.by = by) || (props = {by});
		triggerBy(type, props);
		return proxy;
	}
}

export function on(by: any[], proxy: any): any {
	return (event: any, listener: any, options: any) => {
		if (isObject(event)) {
			listener && (listener.by = by) || (listener = {by});
			onBy(event, listener);
		} else {
			options && (options.by = by) || (options = {by});
			onBy(event, listener, options);
		}
		return proxy;
	}
}

export function un(els: any[], proxy: any): any {
	return (event: any, listener: any) => {
		unBy(event, listener, els);
		return proxy;
	}
}