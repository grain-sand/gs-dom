import {isFunction} from "gs-base";
import {GDom} from "./IGDom";
import {WinAndDom} from "../com/BrowserTypes";
import {IWaitFindArg, ObserverArg} from "../observer";

export function proxyGDom<By extends WinAndDom = any>(by: By | By[]): GDom<By> {
	return new Proxy(Array.isArray(by) ? by : [by], {
		get(target, property, receiver) {
			if (property in proxyFns) {
				return proxyFns[property](target as any, receiver) as any;
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

const proxyFns: Record<string | symbol, (els: any[], proxy: any) => any> = {
	text(els: any[], proxy: any): any {
		return (...ars: any[]) => {
			if (ars.length) {
				for (const el of els) el.innerText = ars[0]
				return proxy;
			}
			return els[0].innerText;
		}
	},
	html(els: any[], proxy: any): any {
		return (...ars: any[]) => {
			if (ars.length) {
				for (const el of els) el.innerHTML = ars[0]
				return proxy;
			}
			return els[0].innerHTML;
		}
	},
	trigger(els: any[], proxy: any): any {
		return (...ars: any[]) => {
			for (const el of els) el.dispatchEvent(new Event(ars[0]))
			return proxy;
		}
	},
	on(els: any[], proxy: any): any {
		return (...ars: any[]) => {
			for (const el of els) el.addEventListener(ars[0], ars[1], ars[2])
			return proxy;
		}
	},
	un(els: any[], proxy: any): any {
		return (...ars: any[]) => {
			for (const el of els) el.removeEventListener(ars[0], ars[1])
			return proxy;
		}
	},
	observer(els: any[], proxy: any): any {
		return async (arg: ObserverArg) => {
			const {observerBy} = await import('../observer/impl/observerBy')
			return observerBy(els, arg)
		};
	},
	waitFind(els: any[], proxy: any): any {
		return async (selector: string, arg?: IWaitFindArg) => {
			const {waitFindBy} = await import("../observer/impl/waitFindBy");
			const r = await waitFindBy(els, selector, arg)
			if (r) return proxyGDom(r!)
		};
	}
}