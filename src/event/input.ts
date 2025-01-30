import {IAddEventOption, IEventProps, Listener} from "./EventTypes";
import {isBoolean, isFunction, isString} from "gs-base";
import {on} from "./on";
import {trigger} from "./trigger";
import {addProxyFn} from "../gdom/gdomFns";

export type InputEl = HTMLInputElement | HTMLTextAreaElement

export type InputProps = IEventProps & InputEventInit & { data: string }
export type ByInputProps = InputProps & { by: InputEl | InputEl[] }

export function input(arg: Listener<InputEvent>, options?: IAddEventOption): void

export function input(arg: ByInputProps | InputEl | InputEl[]): void

export function input(arg: any, options?: any) {
	if (isFunction(arg)) {
		on('input', arg, options);
		return;
	}
	const init = arg as ByInputProps;
	const {data, by} = init;
	const dataTransfer = init.dataTransfer = new DataTransfer();
	dataTransfer.setData('text', data);
	init.inputType = 'insertFromPaste';
	if (Array.isArray(by)) {
		for (const el of by) el.value += data;
	} else {
		by.value += data;
	}
	trigger('input', init);
}

addProxyFn('input', (by, proxy) => {
	return (arg?: any, options?: boolean | IAddEventOption) => {
		if (isFunction(arg)) {
			on('input', arg as any,
				(isBoolean(options) ? {capture: options, by} : {...options as any, by}) as any
			);
		} else {
			if (arg) {
				if (isString(arg)) {
					arg = {data: arg, by};
				} else {
					arg = {...arg, by};
				}
			} else {
				arg = {by};
			}
			input(arg);
		}
		return proxy;
	}
})