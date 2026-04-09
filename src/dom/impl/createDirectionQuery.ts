import {SimpleQueryFn} from "../IQueryArg";
import {createSimpleQuery} from "./createSimpleQuery";

export function createDirectionQuery(name: string, dirFn: (by: HTMLElement) => Element | null | undefined): SimpleQueryFn {
	return createSimpleQuery((by, {selector, skipCheck, check}) => {
		const result: HTMLElement[] = [];
		let tmpEl: HTMLElement | null = by as any;
		while ((tmpEl = dirFn(tmpEl as any) as any)) {
			if (tmpEl.matches(selector) && (skipCheck || check(tmpEl))) {
				result.push(tmpEl);
			}
		}
		return result;
	});
}
