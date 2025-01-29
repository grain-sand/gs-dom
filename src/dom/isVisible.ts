export function isVisible(el: HTMLElement, checkParents?: boolean | string | object): boolean {
	if (!(el instanceof HTMLElement)) return false;

	// 检查元素本身的可见性
	const style = getComputedStyle(el);
	if (
		style.display === "none" ||
		style.visibility === "hidden" ||
		style.opacity === "0" ||
		((style.overflow === "hidden" || style.overflowX === "hidden" || style.overflowY === "hidden") && (el.offsetWidth === 0 || el.offsetHeight === 0))
	) {
		return false;
	}

	if (!checkParents) {
		return true;
	}

	let parent: HTMLElement | null = el;
	while ((parent = parent.parentElement)) {
		const parentStyle = getComputedStyle(parent);
		if (
			parentStyle.display === "none" ||
			parentStyle.visibility === "hidden" ||
			parentStyle.overflow === "hidden" &&
			(
				el.offsetLeft + el.offsetWidth > parent.offsetWidth ||
				el.offsetTop + el.offsetHeight > parent.offsetHeight
			)
		) {
			return false;
		}
	}

	return true;
}
