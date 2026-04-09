import {SimpleQueryFn} from "./IQueryArg";
import {createSimpleQuery} from "./impl/createSimpleQuery";

export const find: SimpleQueryFn = createSimpleQuery((by, {selector, skipCheck, check}) => {
	const result = Array.from(by.querySelectorAll(selector)) as HTMLElement[];
	return skipCheck ? result : result.filter(check);
});
