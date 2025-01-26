
import * as innerProxyFns from "./proxy-fns";
import {GDomFn} from "./IGDom";

export const proxyFns: Record<string | symbol, GDomFn<any>> = {...innerProxyFns as any};


export function addProxyFns(fns: Record<string | symbol, GDomFn<any>>) {
	Object.assign(proxyFns, fns);
}

export function addProxyFn(key: string, fn: GDomFn<any>) {
	proxyFns[key] = fn;
}