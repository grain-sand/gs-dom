import {EventType, IEventProps} from "../EventTypes";
import {getDefaultEventProps} from "../../gdom/DefaultEventProps";
import {WinOrDomOrArr} from "../../com/BrowserTypes";

export function triggerBy(by: WinOrDomOrArr, type: EventType, props?: IEventProps) {
	const arg= {...getDefaultEventProps(), ...props} as  Required<IEventProps>;
	let event: any;
	if (typeof Event === 'function') {
		let constructor: any;
		if (type.startsWith('mouse') || type.startsWith('click') || type.startsWith('mousedown') || type.startsWith('mouseup') || type.startsWith('mousemove')) {
			constructor = MouseEvent;
		} else if (type.startsWith('key')) constructor = KeyboardEvent;
		else if (type.startsWith('touch')) constructor = TouchEvent;
		else constructor = CustomEvent;
		event = new constructor(type, arg)
	} else {
		const {bubbles, cancelable, view, detail} = arg;
		let name: string;
		if (type.startsWith('mouse') || type.startsWith('click') || type.startsWith('mousedown') || type.startsWith('mouseup') || type.startsWith('mousemove')) {
			name = 'MouseEvent';
		} else if (type.startsWith('key')) name = 'KeyboardEvent';
		else if (type.startsWith('touch')) name = 'TouchEvent';
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