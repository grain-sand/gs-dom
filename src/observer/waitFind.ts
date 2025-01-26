import {IByWaitFindArg, IGdomByWaitFindArg, IWaitFindArg} from "./IWaitFindArg";
import {observe} from "./observe";
import {manyQuerySelectorAll} from "../helper";
import {GDom} from "../gdom";

let gdomEl: Function;

export function waitFind<T extends HTMLElement>(selector: string, arg: IGdomByWaitFindArg): Promise<GDom<T>[] | undefined>;

export function waitFind<T extends HTMLElement>(selector: string, arg?: IByWaitFindArg): Promise<T[] | undefined>;

export async function waitFind<T extends HTMLElement>(selector: string, arg?: IByWaitFindArg): Promise<GDom<T>[] | T[]> {
	const {
		gdom = false,
		throwError = false,
		subtree = true,
		timeout = 300,
		minFindCount = 1,
		by = document
	} = (arg || (arg = {})) as Required<IByWaitFindArg>;
	let els: any[] = manyQuerySelectorAll(by, selector);
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
	gdomEl || (gdomEl = ((await import('../gdom/gdomEl')).gdomEl));
	return gdomEl(els, gdom as any);
}