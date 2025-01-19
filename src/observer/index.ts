import {observerBy} from "./impl/observerBy";
import {waitFindBy} from "./impl/waitFindBy";

import {ObserverArg} from "./IObserverArg";
import {IWaitFindArg} from "./IWaitFindArg";
import {GDom} from "../gdom";
import {proxyGDom} from "../gdom/proxyGDom";

const observer = (arg: ObserverArg): MutationObserver => observerBy(document, arg);

async function waitFind(selector: string, arg?: IWaitFindArg): Promise<GDom<HTMLElement> | undefined> {
	const cls = await waitFindBy(document, selector, arg);
	if (cls) return proxyGDom<HTMLElement>(cls!)
}


export {ObserverArg, IWaitFindArg, observer, waitFind}