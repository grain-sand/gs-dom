import {ElementUpdateFn, GDomUpdateFn, TextNodeUpdateFn} from "../IObserveArg";
import {groupNodes} from "../../helper";

let proxyGDom: Function;

export function callGrouped(mutation: MutationRecord, nodes: NodeList, selectors: string[], selectorRecord: Record<string, ElementUpdateFn>, selectorGRecord: Record<string, GDomUpdateFn>, textsUpdated?: TextNodeUpdateFn, elementsUpdated?: ElementUpdateFn, gdomUpdated?: GDomUpdateFn, deepMatch?: boolean) {
	if (proxyGDom) {
		realCallGrouped(mutation, nodes, selectors, selectorRecord, selectorGRecord, textsUpdated, elementsUpdated, gdomUpdated, deepMatch, proxyGDom);
	} else import('../../gdom/proxyGDom').then(exp => {
		proxyGDom = exp.proxyGDom;
		realCallGrouped(mutation, nodes, selectors, selectorRecord, selectorGRecord, textsUpdated, elementsUpdated, gdomUpdated, deepMatch, proxyGDom);
	})
}

export function callSelector(selectors: string[], elementNodes: HTMLElement[], selectorRecord: Record<string, ElementUpdateFn>, selectorGRecord: Record<string, GDomUpdateFn>, deepMatch?: boolean, mutation?: MutationRecord, proxyGDom?: Function) {
	if (proxyGDom) {
		realCallSelector(selectors, elementNodes, selectorRecord, selectorGRecord, deepMatch, mutation, proxyGDom);
	} else import('../../gdom/proxyGDom').then(exp => {
		proxyGDom = exp.proxyGDom;
		realCallSelector(selectors, elementNodes, selectorRecord, selectorGRecord, deepMatch, mutation, proxyGDom);
	});
}

function realCallGrouped(mutation: MutationRecord, nodes: NodeList, selectors: string[], selectorRecord: Record<string, ElementUpdateFn>, selectorGRecord: Record<string, GDomUpdateFn>, textsUpdated?: TextNodeUpdateFn, elementsUpdated?: ElementUpdateFn, gdomUpdated?: GDomUpdateFn, deepMatch?: boolean, proxyGDom?: Function) {
	const {textNodes, elementNodes} = groupNodes(mutation.addedNodes)
	textNodes.length && textsUpdated?.(textNodes, mutation);
	if (elementNodes.length) {
		elementsUpdated?.(elementNodes, mutation);
		gdomUpdated?.(proxyGDom!(elementNodes), mutation);
	}
	selectors.length && callSelector(selectors, elementNodes, selectorRecord, selectorGRecord, deepMatch, mutation, proxyGDom);
}

function realCallSelector(selectors: string[], elementNodes: HTMLElement[], selectorRecord: Record<string, ElementUpdateFn>, selectorGRecord: Record<string, GDomUpdateFn>, deepMatch?: boolean, mutation?: MutationRecord, proxyGDom?: Function) {
	for (const selector of selectors) {
		const selectedEls = deepMatches(elementNodes, selector, deepMatch);
		if (selectedEls.length) {
			selectorRecord[selector]?.(selectedEls, mutation);
			selectorGRecord[selector]?.(proxyGDom!(selectedEls), mutation);
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































