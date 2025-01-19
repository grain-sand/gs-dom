export function manyQuerySelectorAll(baseEls:HTMLElement | Document | HTMLElement[], selector: string):HTMLElement[] {
	if(!Array.isArray(baseEls)) {
		return Array.from(baseEls.querySelectorAll(selector))
	}
	const els:any[] = [];
	for (const baseEl of baseEls) {
		els.push(...Array.from(baseEl.querySelectorAll(selector)));
	}
	return els as any;
}