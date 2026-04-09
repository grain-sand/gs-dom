import {IByWaitFindArg} from "./IWaitFindArg";
import {observe} from "./observe";
import {find, QuerySelector} from "../dom";

export function waitFind<T extends HTMLElement>(selector: QuerySelector, arg?: IByWaitFindArg): Promise<T[] | undefined>;

export async function waitFind<T extends HTMLElement>(selector: QuerySelector, arg?: IByWaitFindArg): Promise<T[]> {
	const {
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
	return els;
}
