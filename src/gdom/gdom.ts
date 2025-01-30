import {WinOrDom} from "../com/BrowserTypes";
import {GDom} from "./IGDom";
import {isFunction, isString} from "gs-base";
import {newGDom} from "./newGDom";
import {ITagProps, TagString} from "../dom/ITagProps";
import {IQueryArg} from "../dom/IQueryArg";
import {createEl} from "../dom/createEl";
import {Listener} from "../event/EventTypes";
import {query} from "../dom/query";
import {on} from "../event/on";

export function gdom(loaded: Listener): void ;

export function gdom<EL extends WinOrDom = WinOrDom>(tag: TagString, props?: ITagProps | Object): GDom<EL> ;

export function gdom<EL extends WinOrDom = WinOrDom>(selector: string | string[] | WinOrDom | IQueryArg): GDom<EL> ;

export function gdom<EL extends WinOrDom = WinOrDom>(selector: any, props?: any): any {
	if (isString(selector)) {
		if (/^</.test(selector)) {
			return newGDom(createEl(selector, props))
		}
		return query({selectors: selector, gdom: true});
	}
	if (isFunction(selector)) {
		if(document.readyState==='complete') {
			selector(new Event('DomContentLoaded'));
		} else {
			on('DOMContentLoaded', selector);
		}
		return;
	}
	if (selector instanceof HTMLElement || selector instanceof SVGElement || selector instanceof Document || selector instanceof DocumentFragment || selector instanceof Window) {
		return newGDom(selector as any);
	}
	if (Array.isArray(selector) || selector instanceof Object) {
		return query({selectors: selector, gdom: true});
	}
	return newGDom(document);
}

export const $ = gdom;