import {ElementUpdateFn, GDomUpdateFn, ObserverArg, TextNodeUpdateFn} from "../IObserverArg";
import {groupNodes} from "../../helper";
import {IPreParsingSelectorResult, preParsingSelector} from "./preParsingSelector";
import {proxyGDom} from "../../gdom/proxyGDom";

export function observerBy(by: HTMLElement | Document | HTMLElement[], arg: ObserverArg): MutationObserver {
	const config: MutationObserverInit = {
		subtree: arg.subtree as any,
		attributeOldValue: arg.attributeOldValue as any,
		attributeFilter: arg.attributeFilter as any,
		characterDataOldValue: arg.textOldValue as any,
	};

	arg.changedAttributes && (config.attributes = true);
	arg.changedText && (config.characterData = true);

	const {
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
	}: ObserverArg = arg;

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
		if (arg.immediate && addedGrouped) callSelector(addedSelectors, by, addedRecord, addedGRecord, true);
	} else {
		observer.observe(by, config)
		if (arg.immediate && addedGrouped) callSelector(addedSelectors, [by as HTMLElement], addedRecord, addedGRecord, true);
	}
	return observer;
}


function callGrouped(mutation: MutationRecord, nodes: NodeList, selectors: string[], selectorRecord: Record<string, ElementUpdateFn>, selectorGRecord: Record<string, GDomUpdateFn>, textsUpdated?: TextNodeUpdateFn, elementsUpdated?: ElementUpdateFn, gdomUpdated?: GDomUpdateFn, deepMatch?: boolean) {
	const {textNodes, elementNodes} = groupNodes(mutation.addedNodes)
	textNodes.length && textsUpdated?.(textNodes, mutation);
	if (elementNodes.length) {
		elementsUpdated?.(elementNodes, mutation);
		gdomUpdated?.(proxyGDom(elementNodes), mutation);
	}
	selectors.length && callSelector(selectors, elementNodes, selectorRecord, selectorGRecord, deepMatch, mutation);
}

function callSelector(selectors: string[], elementNodes: HTMLElement[], selectorRecord: Record<string, ElementUpdateFn>, selectorGRecord: Record<string, GDomUpdateFn>, deepMatch?: boolean, mutation?: MutationRecord) {
	for (const selector of selectors) {
		const selectedEls = deepMatches(elementNodes, selector, deepMatch);
		if (selectedEls.length) {
			selectorRecord[selector]?.(selectedEls, mutation);
			selectorGRecord[selector]?.(proxyGDom(selectedEls), mutation);
		}
	}
}

function deepMatches(els: HTMLElement[], selector: string, deepMatch?: boolean): HTMLElement[] {
	const arr = [];
	for (const el of els) {
		if (el.matches?.(selector)) {
			arr.push(el);
		} else if (deepMatch) {
			arr.push(...Array.from(el.querySelectorAll(selector)));
		}
	}
	return arr as any;
}































