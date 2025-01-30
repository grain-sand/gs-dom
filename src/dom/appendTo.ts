import {IByQueryArg, IndexedSelectorOrArr} from "./IQueryArg";
import {ElOrArr} from "../com/BrowserTypes";
import {query} from "./query";
import {addProxyFn} from "../gdom/gdomFns";

export function appendTo(arg: ElOrArr | IndexedSelectorOrArr | IByQueryArg, by: ElOrArr) {
	if (!(arg instanceof HTMLElement) && !((arg as any)[0] instanceof HTMLElement)) {
		arg = query(arg as IndexedSelectorOrArr);
	}
	const parent = (Array.isArray(arg) ? arg[0] : arg) as HTMLElement;
	if (Array.isArray(by)) {
		for (const el of by) {
			parent.appendChild(el);
		}
	} else {
		parent.appendChild(by);
	}
}

addProxyFn('appendTo', (by, proxy) => {
	return (arg: any) => {
		appendTo(arg, by as any);
		return proxy;
	}
})