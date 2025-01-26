import {WinOrDom} from "../com/BrowserTypes";
import {proxyGDom} from "./proxyGDom";
import {GDom} from "./index";

export function gdomEl<T extends WinOrDom>(el: T|T[], gdom: true): GDom<T>;

export function gdomEl<T extends WinOrDom>(el: T|T[], gdom?: false): T[];

export function gdomEl<T extends WinOrDom>(el: T|T[], gdom?: boolean): T[] | GDom<T> {
	if (gdom) {
		return proxyGDom(el);
	}
	return Array.isArray(el) ? el : [el];
}