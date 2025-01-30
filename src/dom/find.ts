import {SimpleQueryFn} from "./IQueryArg";
import {createSimpleQuery} from "./impl/createSimpleQuery";
import {isFunction} from "gs-base";
import {newGDom} from "../gdom/newGDom";
import {addProxyFn} from "../gdom/gdomFns";

export const find: SimpleQueryFn = createSimpleQuery((by, {selector, skipCheck, check}) => {
	const result = Array.from(by.querySelectorAll(selector)) as HTMLElement[];
	return skipCheck ? result : result.filter(check);
});

addProxyFn('find', (by) => {
	return (arg: any) => {
		if (isFunction(arg)) {
			return by.find(arg);
		}
		return newGDom(find(arg, by as any));
	}
})