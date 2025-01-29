import {SelectorElementUpdate} from "../IObserveArg";
import {parseSelector} from "../../dom/impl/parseSelector";
import {newGDom} from "../../gdom";

export type SelectorFn = (els: HTMLElement[], mutation?: MutationRecord, liveDeep?: boolean) => void;

interface ISelectorFns {
	onAddedSelectors: SelectorFn[]
	onRemovedSelectors: SelectorFn[]
}

export function mapSelectorToFn(selectors: SelectorElementUpdate[]): ISelectorFns {
	const onAddedSelectors: SelectorFn[] = [];
	const onRemovedSelectors: SelectorFn[] = [];
	for (const selector of selectors) {
		const {onAddEl, onRemoveEl} = selectorToFns(selector)
		onAddedSelectors.push(onAddEl)
		onRemovedSelectors.push(onRemoveEl)
	}
	return {
		onAddedSelectors,
		onRemovedSelectors
	}
}

function selectorToFns(selectorUpdate: SelectorElementUpdate) {
	const {addedElements, removedElements, addedGDom, removedGDom} = selectorUpdate
	const useAdd = !!(addedElements || addedGDom)
	const useRemove = !!(removedElements || removedGDom)
	const {selector, skipCheck, check} = parseSelector(selectorUpdate.selector)

	function filter(els: HTMLElement[], deepMatch?: boolean) {
		const arr: HTMLElement[] = [];
		for (const el of els) {
			if (el.matches?.(selector)) {
				arr.push(el);
			} else if (deepMatch) {
				arr.push(...Array.from(el.querySelectorAll(selector)) as HTMLElement[]);
			}
		}
		return skipCheck ? arr : arr.filter(e => check(e))
	}

	return {
		onAddEl: (els: HTMLElement[], mutation?: MutationRecord, deepMatch?: boolean): void => {
			if (!useAdd) {
				return;
			}
			els = filter(els, deepMatch);
			if (els) {
				addedElements?.(els, mutation)
				addedGDom?.(newGDom(els), mutation)
			}
		},
		onRemoveEl: (els: HTMLElement[], mutation?: MutationRecord, deepMatch?: boolean): void => {
			if (!useRemove) {
				return;
			}
			els = filter(els, deepMatch);
			if (els) {
				removedElements?.(els, mutation)
				removedGDom?.(newGDom(els), mutation)
			}
		}
	}
}