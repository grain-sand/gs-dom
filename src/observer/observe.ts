import {ByObserverArg, ElementUpdateFn, TextNodeUpdateFn} from "./IObserveArg";
import {mapSelectorToFn, SelectorFn} from "./impl/selectorToFns";
import {groupNodes} from "../dom";

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
		changedAttributes,
		changedText,
		selectors = [],
		deepMatch
	}: ByObserverArg = arg;

	const {onAddedSelectors, onRemovedSelectors} = mapSelectorToFn(selectors!)

	const addedGrouped = !!(addedElements || addedTexts || onAddedSelectors.length);
	const removedGrouped = !!(removedElements || removedTexts || onRemovedSelectors.length);
	(addedNodes || removedNodes || addedGrouped || removedGrouped) && (config.childList = true);

	const observer = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			if (mutation.type === 'attributes') {
				changedAttributes?.(mutation);
			} else if (mutation.type === 'characterData') {
				changedText?.(mutation)
			} else if (mutation.addedNodes.length) {
				mutation.addedNodes.length && addedNodes?.(mutation.addedNodes, mutation)
				addedGrouped && callGrouped(mutation, mutation.addedNodes, onAddedSelectors, addedTexts, addedElements, deepMatch)
			} else if (mutation.removedNodes.length) {
				mutation.removedNodes.length && removedNodes?.(mutation.removedNodes, mutation)
				// removedGrouped && callGrouped(mutation, mutation.removedNodes, removedSelectors, removedRecord, removedGRecord, removedTexts, removedElements, removedGDom, deepMatch)
			}
		}
	});
	if (Array.isArray(by)) {
		for (const el of by as HTMLElement[]) observer.observe(el, config)
		if (arg.immediate && onAddedSelectors.length) callSelector(onAddedSelectors, by as HTMLElement[], undefined, true);
	} else {
		observer.observe(by as HTMLElement, config)
		if (arg.immediate && onAddedSelectors.length) callSelector(onAddedSelectors, [by as HTMLElement], undefined, true);
	}
	return observer;
}

export function callGrouped(mutation: MutationRecord, nodes: NodeList, onUpdatedSelectors: SelectorFn[], textsUpdated?: TextNodeUpdateFn, elementsUpdated?: ElementUpdateFn, deepMatch?: boolean) {
	const {textNodes, elementNodes} = groupNodes(mutation.addedNodes)
	textNodes.length && textsUpdated?.(textNodes, mutation);
	if (elementNodes.length < 1) {
		return
	}
	elementsUpdated?.(elementNodes, mutation);
	onUpdatedSelectors.length && callSelector(onUpdatedSelectors, elementNodes, mutation, deepMatch);
}

export function callSelector(onAddedSelectors: SelectorFn[], by: HTMLElement[], mutation?: MutationRecord, liveDeep?: boolean) {
	for (const selectorFn of onAddedSelectors) {
		selectorFn(by, mutation, liveDeep);
	}
}
