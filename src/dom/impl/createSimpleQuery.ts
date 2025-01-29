import {DomEl, DomElOrArr, DomOrEl} from "../../com/BrowserTypes";
import {IndexedQuerySelector, SimpleQueryFn} from "../IQueryArg";
import {ISimpleArg, parseFindArg} from "./parseSelector";

export function createSimpleQuery(baseSimpleQuery: (by: DomOrEl, arg: ISimpleArg<any>) => HTMLElement[]): SimpleQueryFn {
	return <El extends DomEl = DomEl>(arg: IndexedQuerySelector, by: DomElOrArr): El[] => {
		const parsedArg = parseFindArg(arg, by);
		const {index, parsedBy} = parsedArg
		const result: El[] = [];
		for (const el of parsedBy) {
			const els = baseSimpleQuery(el, parsedArg) as El[];
			if (index === undefined) {
				result.push(...els)
			} else if (index < 0) {
				result.push(els[els.length + index] as any)
			} else {
				result.push(els[index] as any)
			}
		}
		return result;
	}
}