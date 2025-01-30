import {ByEventProps} from "./EventTypes";

let defaultEventProps: any;

export function getDefaultEventProps(): ByEventProps {
	return defaultEventProps || (defaultEventProps = {
		bubbles: true,
		cancelable: true,
		view: window,
		by: document
	});
}

export function setDefaultEventProps(props: ByEventProps): ByEventProps {
	return defaultEventProps = Object.assign(getDefaultEventProps(), props);
}