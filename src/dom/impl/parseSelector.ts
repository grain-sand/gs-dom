import {IIndexedQuerySelector, IndexedQuerySelector} from "../IQueryArg";
import {isString} from "gs-base";
import {DomOrEl} from "../../com/BrowserTypes";
import {isVisible} from "../isVisible";

const typeRegex = /^[>{~^]/;

export interface IParsedSelector {
	selector: string
	skipCheck: boolean
	index?: number
	mode?: '^' | '>' | '{' | '~'
	check: (el: HTMLElement) => boolean
}

export interface ISimpleArg<El extends DomOrEl> extends IParsedSelector {
	parsedBy: El[]
}

export function parseSelector(arg: IndexedQuerySelector): IParsedSelector {
	const {visible, content, index} = arg as IIndexedQuerySelector;
	let selector = (isString(arg) ? arg as string : (arg as IIndexedQuerySelector).selector);
	let mode: IParsedSelector['mode'];
	if (typeRegex.test(selector)) {
		mode = selector.charAt(0) as IParsedSelector['mode'];
		selector = selector.slice(1);
	}
	const regex = content ? content instanceof RegExp ? content : new RegExp(content) : undefined;
	return {
		skipCheck: !regex && !visible,
		mode,
		selector,
		index,
		check: (el) => (!visible || isVisible(el, visible === 'checkParents')) && (!regex || regex.test(el.innerText))
	}
}

export function parseFindArg<El extends DomOrEl>(arg: IndexedQuerySelector, by: El | El[]) {
	const parsedArg = parseSelector(arg) as ISimpleArg<El>;
	parsedArg.parsedBy = Array.isArray(by) ? by : [by];
	return parsedArg
}