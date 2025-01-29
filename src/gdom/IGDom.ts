import {EventType, EventTypeOrArray, IEventProps, Listener} from "../event";
import {DomEl, WinOrDom} from "../com/BrowserTypes";
import {IWaitFindArg, ObserverArg} from "../observer";
import {IndexedQuerySelector, IndexedQuerySelectorOrArr} from "../dom";


export interface IGDom<T extends WinOrDom = WinOrDom> {

	readonly raw: T[]

	text(): string

	text(text: string): GDom<T>

	html(): string

	html(text: string): GDom<T>

	attr(name: string): string

	attr(name: string, value: string): GDom<T>

	attr(name: Object): string

	trigger(type: EventType, props?: IEventProps): GDom<T>

	on(event: EventTypeOrArray, listener: Listener, options?: boolean | AddEventListenerOptions): GDom<T>;

	on(event: Record<EventType, Listener> | Object, options?: boolean | AddEventListenerOptions): GDom<T>;

	un(event: Record<EventType, Listener> | Object): void;

	un(event: EventTypeOrArray, listener: Listener): void;

	observe(arg: ObserverArg): Promise<MutationObserver>

	waitFind<El extends DomEl = DomEl>(selector: string, arg?: IWaitFindArg): Promise<GDom<El> | undefined>

	query<El extends DomEl = DomEl>(selector: IndexedQuerySelectorOrArr): GDom<El>

	filter<El extends DomEl = DomEl>(selector: IndexedQuerySelector): GDom<El>

}

export type GDom<T extends WinOrDom = WinOrDom> = IGDom<T> & T[] & T

export type GDomResultFn<T extends WinOrDom = WinOrDom, R = any> = (...args: any[]) => GDom

export type GDomFn<T extends WinOrDom = WinOrDom, R = any> = (els: WinOrDom[], proxy: IGDom<T>) => R | GDomResultFn<T, R>