import * as innerProxyFns from "./proxy-fns/base-props";
import {GDomFn} from "./IGDom";
import {appendTo, createEl, filter, query} from "../dom";
// Helper functions that need to be imported
import {input, on, trigger, un} from "../event";
import {newGDom} from "./newGDom";

export const gdomFns: Record<string | symbol, GDomFn<any>> = {...innerProxyFns as any};


export function addProxyFns(fns: Record<string | symbol, GDomFn<any>>) {
	Object.assign(gdomFns, fns);
}

export function addProxyFn(key: string, fn: GDomFn<any>) {
	gdomFns[key] = fn;
}

// From dom/query.ts
addProxyFn('query', (by) => {
	return (arg: any) => {
		if (!Array.isArray(arg.raw)) {
			if (isNaN(arg.length) || arg instanceof Element) {
				arg = {selector: arg};
			}
			arg.by = by;
			arg.gdom = true;
		}
		return query(arg);
	}
});

// From event/on.ts
addProxyFn('on', (by: any[], proxy: any) => {
	return (event: any, listener: any, options: any) => {
		if (typeof event === 'object' && event !== null) {
			listener && (listener.by = by) || (listener = {by});
			on(event, listener);
		} else {
			options && (options.by = by) || (options = {by});
			on(event, listener, options);
		}
		return proxy;
	}
});

// From event/un.ts
addProxyFn('un', (by: any[], proxy: any) => {
	return (event: any, listener: any, options: any) => {
		if (typeof event === 'object' && event !== null) {
			listener && (listener.by = by) || (listener = {by});
			un(event, listener);
		} else {
			options && (options.by = by) || (options = {by});
			un(event, listener, options);
		}
		return proxy;
	}
});

// From event/trigger.ts
addProxyFn('trigger', (by: any[], proxy: any) => {
	return (event: any, props?: any) => {
		trigger(event, {...props, by});
		return proxy;
	}
});

// From event/input.ts
addProxyFn('input', (by: any[], proxy: any) => {
	return (value: any, props?: any) => {
		input(value, {...props, by});
		return proxy;
	}
});

// From dom/appendTo.ts
addProxyFn('appendTo', (by: any[], proxy: any) => {
	return (target: any) => {
		appendTo(by, target);
		return proxy;
	}
});

// From dom/filter.ts
addProxyFn('filter', (by: any[]) => {
	return (selector: any) => {
		return newGDom(filter(selector, by));
	}
});

// From dom/createEl.ts
addProxyFn('createEl', () => {
	return (tag: any, props?: any) => {
		return newGDom(createEl(tag, props));
	}
});

