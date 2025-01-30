import {SimpleQueryFn} from "../IQueryArg";
import {createSimpleQuery} from "./createSimpleQuery";
import {newGDom} from "../../gdom/newGDom";
import {addProxyFn} from "../../gdom/gdomFns";

export function createDirectionQuery(name: string, dirFn: (by: HTMLElement) => Element | null | undefined): SimpleQueryFn {
	const fn: SimpleQueryFn = createSimpleQuery((by, {selector, skipCheck, check}) => {
		const result: HTMLElement[] = [];
		let tmpEl: HTMLElement | null = by as any;
		while ((tmpEl = dirFn(tmpEl as any) as any)) {
			if (tmpEl.matches(selector) && (skipCheck || check(tmpEl))) {
				result.push(tmpEl);
			}
		}
		return result;
	});
	addProxyFn(name, (by) => {
		return (arg: any) => newGDom(fn(arg, by as any))
	})
	return fn;
}