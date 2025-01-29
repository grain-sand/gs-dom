import {isFunction} from "gs-base";
import {GDom} from "./IGDom";
import {WinOrDom} from "../com/BrowserTypes";
import {gdomFns} from "./gdomFns";


export function newGDom<By extends WinOrDom = WinOrDom>(by: By | By[]): GDom<By> {
	return new Proxy(Array.isArray(by) ? by : [by], {
		get(target, property, receiver) {
			if (property in gdomFns) {
				return (gdomFns[property as keyof typeof gdomFns] as Function)(target, receiver);
			}
			if (property in target) {
				return Reflect.get(target, property, receiver);
			}
			const [first] = target;

			// @ts-ignore
			const firstProp = first[property];
			if (firstProp !== undefined) {
				if (!isFunction(firstProp)) {
					return firstProp;
				}
				return (...args: any[]) => {
					const rv = firstProp.apply(first, args);
					if (target.length > 1) for (const el of target.slice(1)) {
						// @ts-ignore
						el[property](...args);
					}
					return rv;
				};
			}
		}
	}) as any;
}