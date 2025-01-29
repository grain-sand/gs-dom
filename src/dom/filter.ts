import {IndexedQuerySelector} from "./IQueryArg";
import {DomEl, ElOrArr} from "../com/BrowserTypes";
import {isFunction} from "gs-base";
import {addProxyFn, newGDom} from "../gdom";
import {parseFindArg} from "./impl/parseSelector";

export function filter<El extends DomEl = DomEl>(arg: IndexedQuerySelector, by: ElOrArr): El[] {
	let {selector, index, skipCheck, check, parsedBy} = parseFindArg(arg, by);
	const result = parsedBy.filter((b) => b.matches(selector) && (skipCheck || check(b)))
	if (index === undefined) {
		return result as El[];
	}
	index < 0 && (index = result.length + index)
	return (result[index] ? [result[index]] : []) as El[];
}

addProxyFn('filter', (by) => {
	return (arg: any) => {
		if (isFunction(arg)) {
			return by.filter(arg);
		}
		return newGDom(filter(arg, by as any));
	}
})