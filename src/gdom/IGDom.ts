import {DomEl, ElOrArr, WinOrDom} from "../com/BrowserTypes";
import {IByQueryArg, IndexedQuerySelector, IndexedSelectorOrArr} from "../dom/IQueryArg";
import {ChildTag} from "../dom/ITagProps";
import {EventProp, EventRecord, EventType, EventTypeOrArray, Listener} from "../event/EventTypes";
import {ObserverArg} from "../observer/IObserveArg";
import {IWaitFindArg} from "../observer/IWaitFindArg";
import {InputProps} from "../event/input";

export type GDomQueryFn = <El extends DomEl = DomEl>(arg: IndexedQuerySelector) => GDom<El>

export type GDomAttrFn<T extends WinOrDom = WinOrDom, V = string> = {
	(): V
	(text: V): GDom<T>
}

export type GDomEventFn<T extends WinOrDom = WinOrDom, E extends Event = Event, Init extends EventInit = EventInit> = {
	(arg: Listener<E>, options?: boolean | AddEventListenerOptions): GDom<T>
	(arg: EventProp<Init>): GDom<T>
};

export type GDomKeyEventFn<T extends WinOrDom = WinOrDom> = GDomEventFn<T, KeyboardEvent, KeyboardEventInit>

export type GDomMouseEventFn<T extends WinOrDom = WinOrDom> = GDomEventFn<T, MouseEvent, MouseEventInit>

export interface IGDom<T extends WinOrDom = WinOrDom> {

	readonly raw: T[]

	parents: GDomQueryFn

	nextAll: GDomQueryFn

	prevAll: GDomQueryFn

	focus: GDomEventFn<T>

	blur: GDomEventFn<T>

	change: GDomEventFn<T>

	keyup: GDomKeyEventFn<T>

	keydown: GDomKeyEventFn<T>

	mouseenter: GDomMouseEventFn<T>

	mouseleave: GDomMouseEventFn<T>

	mouseover: GDomMouseEventFn<T>

	mouseout: GDomMouseEventFn<T>

	mousedown: GDomMouseEventFn<T>

	mouseup: GDomMouseEventFn<T>

	click: GDomMouseEventFn<T>
	text: GDomAttrFn
	html: GDomAttrFn
	val: GDomAttrFn

	input(arg: Listener<InputEvent>, options?: AddEventListenerOptions): GDom<T>

	input(arg: InputProps | string): GDom<T>

	attr(name: string): string

	attr(name: string, value: string): GDom<T>

	attr(name: Object): GDom<T>

	trigger(type: EventType, props?: EventProp): GDom<T>

	on(event: EventTypeOrArray, listener: Listener, options?: boolean | AddEventListenerOptions): GDom<T>;

	on(event: EventRecord | Object, options?: boolean | AddEventListenerOptions): GDom<T>;

	un(event: EventRecord | Object): void;

	un(event: EventTypeOrArray, listener: Listener): void;

	observe(arg: ObserverArg): Promise<MutationObserver>

	waitFind<El extends DomEl = DomEl>(selector: string, arg?: IWaitFindArg): Promise<GDom<El> | undefined>

	query<El extends DomEl = DomEl>(selector: IndexedSelectorOrArr): GDom<El>

	filter<El extends DomEl = DomEl>(selector: IndexedQuerySelector): GDom<El>

	appendTo(arg: ElOrArr | IndexedSelectorOrArr | IByQueryArg): GDom<T>

	append(arg: ChildTag | ChildTag[]): GDom<T>

}

export type GDom<T extends WinOrDom = WinOrDom> = IGDom<T> & T[] & T

export type GDomResultFn<T extends WinOrDom = WinOrDom, R = any> = (...args: any[]) => GDom

export type GDomFn<T extends WinOrDom = WinOrDom, R = any> = (els: WinOrDom[], proxy: IGDom<T>) => R | GDomResultFn<T, R>