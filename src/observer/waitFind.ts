import {IByWaitFindArg, IGdomByWaitFindArg} from "./IWaitFindArg";
import {observe} from "./observe";
import {addProxyFn, GDom} from "../gdom";
import {gdomEl} from "../gdom/gdomEl";
import {find, QuerySelector} from "../dom";

export function waitFind<T extends HTMLElement>(selector: QuerySelector, arg: IGdomByWaitFindArg): Promise<GDom<T>[] | undefined>;

export function waitFind<T extends HTMLElement>(selector: QuerySelector, arg?: IByWaitFindArg): Promise<T[] | undefined>;

export async function waitFind<T extends HTMLElement>(selector: QuerySelector, arg?: IByWaitFindArg): Promise<GDom<T>[] | T[]> {
	const {
		gdom = false,
		throwError = false,
		subtree = true,
		timeout = 300,
		minFindCount = 1,
		by = document
	} = (arg || {}) as Required<IByWaitFindArg>;
	let els: any[] = find(selector, by);
	// (globalThis as any).top.console.log(els)
	els.length || (els = await new Promise((resolve, reject) => {
		const arr: any[] = [];
		const observer = observe({
			by,
			subtree,
			selectors: [{
				selector, addedElements: (els) => {
					arr.push(...els);
					if (arr.length >= minFindCount) {
						clearTimeout(timerId)
						observer.disconnect();
						resolve(arr);
					}
				}
			}]
		})
		const timerId = setTimeout(() => {
			observer.disconnect();
			if (throwError) {
				reject(new Error(`find ${selector} timout ${timeout} s`))
			}
			return arr;
		}, timeout * 1000);
	}))
	return gdomEl(els, gdom as any);
}

addProxyFn('waitFind', (els) => {
	return (selector: string, arg: IByWaitFindArg) => {
		arg || (arg = {});
		arg.by = els as any;
		arg.gdom = true;
		return waitFind(selector, arg)
	};
})