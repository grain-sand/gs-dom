import {ByObserverArg, IByWaitFindArg, observe as observeEl, waitFind as waitFindBy} from "../../observer";
import {DomElOrArr} from "../../com/BrowserTypes";


export function observer(els: DomElOrArr, proxy: any): any {
	return (arg: ByObserverArg) => {
		arg.by = els;
		return observeEl(arg);
	};
}

export function waitFind(els: any[], proxy: any): any {
	return (selector: string, arg: IByWaitFindArg) => {
		arg || (arg = {});
		arg.by = els;
		arg.gdom = true;
		return waitFindBy(selector, arg)
	};
}