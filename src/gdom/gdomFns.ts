
import * as innerProxyFns from "./proxy-fns";
import {GDomFn} from "./IGDom";

export const gdomFns: Record<string | symbol, GDomFn<any>> = {...innerProxyFns as any};


export function addProxyFns(fns: Record<string | symbol, GDomFn<any>>) {
	Object.assign(gdomFns, fns);
}

export function addProxyFn(key: string, fn: GDomFn<any>) {
	gdomFns[key] = fn;
}