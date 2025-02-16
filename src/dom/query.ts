import {DomEl} from "../com/BrowserTypes";
import {isString} from "gs-base";
import {gdomEl} from "../gdom/gdomEl";
import {IByQueryArg, IGdomByQueryArg, IndexedSelectorOrArr, IValidQueryArg} from "./IQueryArg";
import {filter} from "./filter";
import {nextAll, parents, prevAll} from "./directionQueries";
import {find} from "./find";
import {children} from "./children";
import {GDom} from "../gdom/IGDom";
import {addProxyFn} from "../gdom/gdomFns";


/**
 * - `selector` 为`string`且起始为
 *   - `^` 向所有父级查找
 *   - `>` 仅从子级中查找
 *   - `{` 向左面的兄弟元素查找
 *   - `~` 向右面的兄弟元素查找
 *
 * - `selector` 为`string[]`时
 *   - 将会依次查找
 *   - 且上一次查找结果将作为下次查找的参照
 *
 * - `selector` 为`Element`时
 *   - 将作为值返回
 *
 * - `selector` 为或 `GDom` 时
 *   - 将直接返回
 */
export function query<EL extends DomEl = DomEl>(arg: IGdomByQueryArg): GDom<EL>;

export function query<EL extends DomEl = DomEl>(selector: IndexedSelectorOrArr | IByQueryArg): EL[];

export function query<EL extends DomEl = DomEl>(arg: any): GDom<EL> | EL[] {
	arg.selectors || (arg = {selectors: arg});
	Array.isArray(arg.selectors) || (arg.selectors = [arg.selectors]);
	arg.by && (Array.isArray(arg.by) || (arg.by = [arg.by])) || (arg = {...arg, by: [document]});
	const {by, withBy = 'none', selectors, gdom} = arg as IValidQueryArg;
	const result: EL[] = [];

	if (withBy !== 'none') {
		result.push(...filter(selectors[selectors.length - 1], by) as any);
		if (result.length && withBy === 'return') {
			return gdomEl(result, gdom as any);
		}
	}
	let tmp = by;
	for (const selector of selectors as any[]) {
		switch (isString(selector) ? selector?.charAt(0) : selector?.selector?.charAt(0)) {
			case '^':
				tmp = parents(selector, tmp)
				break;
			case '>':
				tmp = children(selector, tmp)
				break;
			case '{':
				tmp = prevAll(selector, tmp)
				break;
			case '~':
				tmp = nextAll(selector, tmp)
				break;
			default:
				tmp = find(selector, tmp)
				break;
		}

	}
	result.push(...tmp as any);
	return gdomEl(result, gdom as any);
}

addProxyFn('query', (by) => {
	return (arg: any) => {
		if (!Array.isArray(arg.raw)) {
			if (isNaN(arg.length) || arg instanceof Element) {
				arg = {selector: arg};
			}
			arg.by = by;
			arg.gdom = true;
		}
		return query(arg);
	}
})