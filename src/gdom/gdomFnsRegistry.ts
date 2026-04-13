import {GDomFn} from "./IGDom";

// 全局 gdomFns 对象
export const gdomFns: Record<string | symbol, GDomFn<any>> = {};

// 导出一个函数，每次调用都返回最新的gdomFns对象
export function getGdomFns() {
	return gdomFns;
}


export function addProxyFns(fns: Record<string | symbol, GDomFn<any>>) {
	Object.assign(gdomFns, fns);
}

export function addProxyFn(key: string, fn: GDomFn<any>) {
	gdomFns[key] = fn;
}
