import {ChildTag, IChildTagProps, ITagProps} from "./ITagProps";
import {isFunction} from "gs-base";
import {appendTo} from "./appendTo";
import {createTag} from "./impl/createTag";
import {ElOrArr} from "../com/BrowserTypes";
import {addProxyFn} from "../gdom/gdomFns";
import {on} from "../event/on";

const fnRecord: Record<string, (value: any, els: HTMLElement[]) => any> = {
	text: (v: string, els) => {
		for (const el of els) el.textContent = v
	},
	val: (v: string, els) => {
		for (const el of els as HTMLInputElement[]) el.value = v
	},
	html: (v: string, els) => {
		for (const el of els) el.innerHTML = v
	},
	append,
	appendTo
};

export function createEl(tag: string | IChildTagProps, props?: ITagProps | Object) {
	const {els, validProps} = createTag(tag, props);
	if (validProps) for (const [key, value] of Object.entries(validProps)) {
		if (key in fnRecord) {
			fnRecord[key](value, els)
		} else if (isFunction(value)) {
			on(key, value as any, {by: els})
		} else {
			for (const el of els) {
				el.setAttribute(key, `${value}`)
			}
		}
	}
	return els;
}

export function append(arg: ChildTag | ChildTag[], els: ElOrArr) {
	Array.isArray(arg) || (arg = [arg as any]);
	const parent = Array.isArray(els) ? els[0] : els;
	for (const prop of arg as ChildTag[]) {
		if (prop instanceof HTMLElement) {
			parent.appendChild(prop)
		} else {
			for (const e of createEl(prop)) {
				parent.appendChild(e);
			}
		}
	}
}

addProxyFn('append', (by, proxy) => {
	return (arg: any) => {
		append(arg, by as any)
		return proxy;
	}
})