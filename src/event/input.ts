import {IAddEventOption, IEventProps, Listener} from "./EventTypes";
import {isFunction} from "gs-base";
import {on} from "./on";
import {trigger} from "./trigger";

export type InputEl = HTMLInputElement | HTMLTextAreaElement

export type InputProps = IEventProps & InputEventInit & { data: string, append?: boolean }
export type ByInputProps = InputProps & { by: InputEl | InputEl[] }

export function input(arg: Listener<InputEvent>, options?: IAddEventOption): void

export function input(arg: ByInputProps | InputEl | InputEl[]): void

export function input(arg: any, options?: any) {
	if (isFunction(arg)) {
		on('input', arg, options);
		return;
	}
	const init = arg as ByInputProps;
	const {data, by, append} = init;
	const dataTransfer = init.dataTransfer = new DataTransfer();
	dataTransfer.setData('text', data);
	init.inputType = 'insertFromPaste';
	if (Array.isArray(by)) {
		for (const el of by) {
			if (append && el.value) el.value += data;
			else el.value = data;
		}
	} else {
		if (append && by.value) by.value += data;
		else by.value = data;
	}
	trigger('input', init);
}
