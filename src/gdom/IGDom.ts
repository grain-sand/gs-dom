import {EventType, EventTypeOrArray, Listener} from "../event";
import {WinAndDom} from "../com/BrowserTypes";
import {IWaitFindArg, ObserverArg} from "../observer";
import {IEventProps} from "../event/EventTypes";

export interface IGDom<T extends WinAndDom = any> {

	text(): string

	text(text: string): GDom<T>

	html(): string

	html(text: string): GDom<T>

	trigger(type: EventType, props?: IEventProps): GDom<T>

	on(event: EventTypeOrArray, listener: Listener, options?: boolean | AddEventListenerOptions): GDom<T>

	un(event: EventTypeOrArray, listener: Listener): GDom<T>

	observer(arg: ObserverArg): Promise<MutationObserver>

	waitFind(selector: string, arg?: IWaitFindArg): Promise<GDom<HTMLElement> | undefined>

}

export type GDom<T extends WinAndDom = any> = IGDom<T> & T[] & T