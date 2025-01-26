export function trigger(els: any[], proxy: any): any {
	return (...ars: any[]) => {
		for (const el of els) el.dispatchEvent(new Event(ars[0]))
		return proxy;
	}
}

export function on(els: any[], proxy: any): any {
	return (...ars: any[]) => {
		for (const el of els) el.addEventListener(ars[0], ars[1], ars[2])
		return proxy;
	}
}

export function un(els: any[], proxy: any): any {
	return (...ars: any[]) => {
		for (const el of els) el.removeEventListener(ars[0], ars[1])
		return proxy;
	}
}