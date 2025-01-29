import {SimpleQueryFn} from "./IQueryArg";
import {createSimpleQuery} from "./impl/createSimpleQuery";

export const children: SimpleQueryFn = createSimpleQuery((by, {selector, skipCheck, check}) => {
	return Array.from(by.children)
		.filter(e => e.matches(selector) && (skipCheck || check(e as any))) as HTMLElement[]
});