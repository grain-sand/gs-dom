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