import {ByObserverArg} from "./IObserveArg";
import {callGrouped, callSelector} from "./impl/observerBy";
import {IPreParsingSelectorResult, preParsingSelector} from "./impl/preParsingSelector";

export function observe(arg: ByObserverArg) {
	const config: MutationObserverInit = {
		subtree: arg.subtree as any,
		attributeOldValue: arg.attributeOldValue as any,
		attributeFilter: arg.attributeFilter as any,
		characterDataOldValue: arg.textOldValue as any,
	};

	arg.changedAttributes && (config.attributes = true);
	arg.changedText && (config.characterData = true);

	const {
		by = document,
		addedNodes,
		removedNodes,
		addedTexts,
		removedTexts,
		addedElements,
		removedElements,
		addedGDom,
		removedGDom,
		changedAttributes,
		changedText,
		selectors,
		deepMatch
	}: ByObserverArg = arg;

	const {
		addedSelectors,
		removedSelectors,
		addedRecord,
		removedRecord,
		addedGRecord,
		removedGRecord
	}: IPreParsingSelectorResult = preParsingSelector(selectors);

	const addedGrouped = !!(addedElements || addedGDom || addedTexts || addedSelectors.length);
	const removedGrouped = !!(removedElements || removedGDom || removedTexts || removedSelectors.length);
	(addedNodes || removedNodes || addedGrouped || removedGrouped) && (config.childList = true);

	const observer = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			if (mutation.type === 'attributes') {
				changedAttributes?.(mutation);
			} else if (mutation.type === 'characterData') {
				changedText?.(mutation)
			} else if (mutation.addedNodes.length) {
				mutation.addedNodes.length && addedNodes?.(mutation.addedNodes, mutation)
				addedGrouped && callGrouped(mutation, mutation.addedNodes, addedSelectors, addedRecord, addedGRecord, addedTexts, addedElements, addedGDom, deepMatch)
			} else if (mutation.removedNodes.length) {
				mutation.removedNodes.length && removedNodes?.(mutation.removedNodes, mutation)
				removedGrouped && callGrouped(mutation, mutation.removedNodes, removedSelectors, removedRecord, removedGRecord, removedTexts, removedElements, removedGDom, deepMatch)
			}
		}
	});
	if (Array.isArray(by)) {
		for (const el of by as HTMLElement[]) observer.observe(el, config)
		if (arg.immediate && addedGrouped) callSelector(addedSelectors, by as HTMLElement[], addedRecord, addedGRecord, true);
	} else {
		observer.observe(by as HTMLElement, config)
		if (arg.immediate && addedGrouped) callSelector(addedSelectors, [by as HTMLElement], addedRecord, addedGRecord, true);
	}
	return observer;
}