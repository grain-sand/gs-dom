import {EventType, EventTypeOrArray, Listener} from "../event";
import {WinOrDom} from "../com/BrowserTypes";
import {IWaitFindArg, ObserverArg} from "../observer";
import {IEventProps} from "../event";


export interface IGDom<T extends WinOrDom = WinOrDom> {

	text(): string

	text(text: string): GDom<T>

	html(): string

	html(text: string): GDom<T>

	attr(name: string): string

	attr(name: string, value: string): GDom<T>

	trigger(type: EventType, props?: IEventProps): GDom<T>

	on(event: EventTypeOrArray, listener: Listener, options?: boolean | AddEventListenerOptions): GDom<T>

	un(event: EventTypeOrArray, listener: Listener): GDom<T>

	observer(arg: ObserverArg): Promise<MutationObserver>

	waitFind(selector: string, arg?: IWaitFindArg): Promise<GDom<HTMLElement> | undefined>

}

export type GDom<T extends WinOrDom = WinOrDom> = IGDom<T> & T[] & T

export type GDomFn<T extends WinOrDom = WinOrDom, R = any> = (els: WinOrDom[], proxy: IGDom<T>) => GDom<T> | R | undefined | Promise<GDom<T> | R | undefined>;