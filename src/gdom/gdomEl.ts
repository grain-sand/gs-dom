import {WinOrDom} from "../com/BrowserTypes";
import {newGDom} from "./newGDom";
import {GDom} from "./index";

export function gdomEl<T extends WinOrDom>(el: T | T[], gdom: true): GDom<T>;

export function gdomEl<T extends WinOrDom>(el: T | T[], gdom?: false | undefined): T[];

export function gdomEl<T extends WinOrDom>(el: T | T[], gdom?: boolean | undefined): T[] | GDom<T> {
	if (gdom) {
		return newGDom(el);
	}
	return Array.isArray(el) ? el : [el];
}