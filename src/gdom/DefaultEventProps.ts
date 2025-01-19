import {IEventProps} from "../event/EventTypes";

let defaultEventProps: any;

export function getDefaultEventProps(): IEventProps {
	return defaultEventProps || (defaultEventProps = {
		bubbles: true,
		cancelable: true,
		view: window
	});
}

export function setDefaultEventProps(props: IEventProps): IEventProps {
	return defaultEventProps = Object.assign(getDefaultEventProps(), props);
}