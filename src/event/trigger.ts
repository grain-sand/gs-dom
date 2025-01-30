import {ByEventProps, EventType, IByEventProps} from "./EventTypes";
import {WinOrDomOrArr} from "../com/BrowserTypes";
import {getDefaultEventProps} from "./DefaultEventProps";
import {addProxyFn} from "../gdom/gdomFns";

export function trigger<Init extends EventInit = EventInit>(type: EventType, props?: ByEventProps<Init>): void;

export function trigger(type: EventType, by: WinOrDomOrArr): void;

export function trigger<Init extends EventInit = EventInit>(type: EventType, props?: ByEventProps<Init> | WinOrDomOrArr): void {
	if (!props) {
		props = {} as any;
	} else if (Array.isArray(props) || props instanceof Window || props instanceof Document || props instanceof Element) {
		props = {by: props} as any;
	}
	const arg = {...getDefaultEventProps(), ...props} as Required<IByEventProps>;
	const {by} = arg;
	let event: any;
	if (typeof Event === 'function') {
		let constructor: any;
		if (type.startsWith('mouse') || type.startsWith('click') || type.startsWith('mousedown') || type.startsWith('mouseup') || type.startsWith('mousemove')) {
			constructor = MouseEvent;
		} else if (type.startsWith('key')) constructor = KeyboardEvent;
		else if (type.startsWith('touch')) constructor = TouchEvent;
		else if (type.startsWith('input')) constructor = InputEvent;
		else constructor = CustomEvent;
		event = new constructor(type, arg)
	} else {
		const {bubbles, cancelable, view, detail} = arg as any;
		let name: string;
		if (type.startsWith('mouse') || type.startsWith('click') || type.startsWith('mousedown') || type.startsWith('mouseup') || type.startsWith('mousemove')) {
			name = 'MouseEvent';
		} else if (type.startsWith('key')) name = 'KeyboardEvent';
		else if (type.startsWith('touch')) name = 'TouchEvent';
		else if (type.startsWith('input')) name = 'InputEvent';
		else name = 'CustomEvent';
		event = document.createEvent(name); //@ts-ignore
		event.initMouseEvent(type, bubbles, cancelable, name === 'CustomEvent' ? detail : view);
	}
	if (Array.isArray(by)) {
		for (let i = 0; i < by.length; i++) {
			by[i].dispatchEvent(event);
		}
	} else {
		(by as any).dispatchEvent(event);
	}
}

addProxyFn('trigger', (by: any[], proxy: any) => {
	return (type: EventType, props: IByEventProps) => {
		props && (props.by = by) || (props = {by});
		trigger(type, props as any);
		return proxy;
	}
})