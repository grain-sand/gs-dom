import {EventType, EventTypeOrArray, IEventProps, Listener} from "./EventTypes";
import {triggerBy} from "./impl/triggerBy";
import {onBy} from "./impl/onBy";
import {unBy} from "./impl/unBy";

const trigger = (type: EventType, props?: IEventProps): void => triggerBy(document, type, props);

const on = (event: EventTypeOrArray, listener: Listener, options?: boolean | AddEventListenerOptions): void => onBy(document, event, listener, options);
const un = (event: EventTypeOrArray, listener: Listener): void => unBy(document, event, listener);

export {EventType, EventTypeOrArray, Listener, trigger, on, un, IEventProps}