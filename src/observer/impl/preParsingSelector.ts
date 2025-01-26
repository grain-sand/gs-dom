import {ElementUpdateFn, GDomUpdateFn, SelectorElementUpdate} from "../IObserveArg";

export interface IPreParsingSelectorResult {
	addedSelectors: string[]
	removedSelectors: string[]
	addedRecord: Record<string, ElementUpdateFn>
	removedRecord: Record<string, ElementUpdateFn>
	addedGRecord: Record<string, GDomUpdateFn>
	removedGRecord: Record<string, GDomUpdateFn>
}

export function preParsingSelector(selectors?: SelectorElementUpdate[]): IPreParsingSelectorResult {
	const result: IPreParsingSelectorResult = {
		addedGRecord: {}, removedGRecord: {},
		addedRecord: {},addedSelectors: [],
		removedRecord: {},removedSelectors: []
	};
	if (!selectors) return result
	const {addedRecord, removedRecord,addedGRecord,removedGRecord}: IPreParsingSelectorResult = result
	const addedSet = new Set<string>();
	const removedSet = new Set<string>();
	for (const {selector, addedElements, removedElements, addedGDom, removedGDom} of selectors!) {
		if (addedElements) {
			addedSet.add(selector)
			addedRecord[selector] = addedElements
		}
		if (removedElements) {
			removedSet.add(selector)
			removedRecord[selector] = removedElements
		}
		if(addedGDom) {
			addedSet.add(selector)
			addedGRecord[selector] = addedGDom
		}
		if(removedGDom) {
			removedSet.add(selector)
			removedGRecord[selector] = removedGDom
		}
	}
	result.addedSelectors.push(...addedSet);
	result.removedSelectors.push(...removedSet);
	return result;
}