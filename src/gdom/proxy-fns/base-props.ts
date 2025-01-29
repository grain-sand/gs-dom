import {isString} from "gs-base";

export function raw(els: any[]): any {
	return [...els];
}

export function text(els: any[], proxy: any): any {
	return (...ars: any[]) => {
		if (ars.length) {
			for (const el of els) el.innerText = ars[0]
			return proxy;
		}
		return els[0].innerText;
	}
}

export function html(els: any[], proxy: any): any {
	return (...ars: any[]) => {
		if (ars.length) {
			for (const el of els) el.innerHTML = ars[0]
			return proxy;
		}
		return els[0].innerHTML;
	}
}

export function attr(els: any[], proxy: any): any {
	return (name: string | Object, value?: string) => {
		if (isString(name)) {
			if (value === undefined) {
				return els[0].getAttribute(name);
			} else {
				for (const el of els) el.setAttribute(name, value)
				return proxy;
			}
		}
		for (const [k, v] of Object.entries(name)) {
			for (const el of els) el.setAttribute(k, v)
		}
		return proxy;
	}
}