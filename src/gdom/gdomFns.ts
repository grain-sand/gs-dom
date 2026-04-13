import * as innerProxyFns from "./proxy-fns/base-props";
import {append, appendTo, createEl, filter, query} from "../dom";
// Helper functions that need to be imported
import {input, on, trigger, un} from "../event";
import {newGDom} from "./newGDom";
import {addProxyFn, addProxyFns, gdomFns, getGdomFns} from "./gdomFnsRegistry";

// 初始化 gdomFns 对象
Object.assign(gdomFns, innerProxyFns as any);

export {gdomFns, getGdomFns, addProxyFns, addProxyFn};

// From dom/query.ts
addProxyFn('query', (by) => {
	return (arg: any) => {
		if (typeof arg === 'string') {
			arg = {selector: arg, by, gdom: true};
		} else if (!Array.isArray(arg.raw)) {
			if (Number.isNaN(arg.length) || arg instanceof Element) {
				arg = {selector: arg, by, gdom: true};
			} else {
				arg.by = by;
				arg.gdom = true;
			}
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
		if (typeof value === 'string') {
			input({data: value, by, ...props});
		} else {
			input({...value, by});
		}
		return proxy;
	}
});

// From dom/appendTo.ts
addProxyFn('appendTo', (by: any[], proxy: any) => {
	return (target: any) => {
		appendTo(target, by);
		return proxy;
	}
});

// From dom/filter.ts
addProxyFn('filter', (by: any[]) => {
	return (selector: any) => {
		// 先查找所有子元素，然后过滤
		const allElements: any[] = [];
		for (const el of by) {
			allElements.push(...Array.from(el.querySelectorAll('*')));
			allElements.push(el); // 包括元素本身
		}
		const result = filter(selector, allElements);
		return newGDom(result);
	}
});

// From dom/createEl.ts
addProxyFn('createEl', () => {
	return (tag: any, props?: any) => {
		const result = createEl(tag, props);
		return newGDom(result);
	}
});

// From dom/append.ts
addProxyFn('append', (by: any[], proxy: any) => {
	return (arg: any) => {
		append(arg, by);
		return proxy;
	}
});
