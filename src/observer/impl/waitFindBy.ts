import {IWaitFindArg} from "../IWaitFindArg";
import {manyQuerySelectorAll} from "../../helper";
import {observerBy} from "./observerBy";
import {WinAndDom} from "../../com/BrowserTypes";

export function waitFindBy(by: WinAndDom | WinAndDom[], selector: string, arg?: IWaitFindArg): Promise<HTMLElement[] | undefined> {
	const {throwError = false, subtree = true, timeout = 300, minFindCount = 1}: IWaitFindArg = arg || {}
	const els = manyQuerySelectorAll(by as any, selector);
	if (els.length) return Promise.resolve(els);
	return new Promise((resolve, reject) => {
		const arr: any[] = [];
		const observer = observerBy(by as any, {
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
			if (!throwError) return resolve(arr.length ? arr : undefined)
			reject(new Error(`find ${selector} timout ${timeout} s`))
		}, timeout * 1000);
	})
}
