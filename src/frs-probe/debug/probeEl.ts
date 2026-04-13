import {query} from "../../dom";
import {getReactProps} from "../react/getReactProps";
import {safeStringify} from "../common/safeStringify";

type ArgType = string | Element | undefined

let defaultArg: ArgType = undefined;

let defaultDepth: number | undefined;

export function probeEl(arg?: ArgType, depth: number = defaultDepth): void {
	arg || (arg = defaultArg);
	const el = typeof arg === "string" ? query(arg)?.[0] : arg;
	if (!el) {
		console.log(undefined);
		return;
	}
	console.log(JSON.parse(safeStringify(el, {maxDepth: depth || 6})));
}

export function probeReactProps(arg?: ArgType, depth: number = defaultDepth): void {
	arg || (arg = defaultArg);
	const el = typeof arg === "string" ? query(arg)?.[0] : arg;
	if (!el) {
		console.log(undefined);
		return;
	}
	const props = getReactProps(el);
	if (!props) {
		console.log(undefined);
		return;
	}
	console.log(JSON.parse(safeStringify(props, {maxDepth: depth || 5})));
}

export function exposeProbe(arg?: ArgType, depth?: number) {
	defaultArg = arg;
	defaultDepth = depth;
	const g = typeof window === 'object' ? window : self;
	Object.defineProperties(g, {
		probeEl: {
			value: probeEl,
			writable: false,
			configurable: false,
			enumerable: true,
		},
		probeReactProps: {
			value: probeReactProps,
			writable: false,
			configurable: false,
			enumerable: true,
		},
	})
}
