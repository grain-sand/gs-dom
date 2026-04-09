import {DomEl, DomElOrArr} from "../com";
import {isString} from "gs-base";
import {IByQueryArg, IndexedSelectorOrArr, IValidQueryArg} from "./IQueryArg";
import {filter} from "./filter";
import {nextAll, parents, prevAll} from "./directionQueries";
import {find} from "./find";
import {children} from "./children";


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
 */
export function query<EL extends DomEl = DomEl>(selector: IndexedSelectorOrArr | IByQueryArg): EL[];
export function query<EL extends DomEl = DomEl>(arg: { selector: string, by?: DomElOrArr }): EL[];

export function query<EL extends DomEl = DomEl>(arg: any): EL[] {
	// 处理对象形式的参数
	if (arg.selector) {
		arg = {selectors: arg.selector, by: arg.by};
	}
	arg.selectors || (arg = {selectors: arg});
	Array.isArray(arg.selectors) || (arg.selectors = [arg.selectors]);
	arg.by && (Array.isArray(arg.by) || (arg.by = [arg.by])) || (arg = {...arg, by: [document]});
	const {by, withBy = 'none', selectors} = arg as IValidQueryArg;
	const result: EL[] = [];

	if (withBy !== 'none') {
		result.push(...filter(selectors[selectors.length - 1], by) as any);
		if (result.length && withBy === 'return') {
			return result;
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
	return result;
}
