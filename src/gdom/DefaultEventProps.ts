import {IByEventProps} from "../event";

let defaultEventProps: any;

export function getDefaultEventProps(): IByEventProps {
	return defaultEventProps || (defaultEventProps = {
		bubbles: true,
		cancelable: true,
		view: window
	});
}

export function setDefaultEventProps(props: IByEventProps): IByEventProps {
	return defaultEventProps = Object.assign(getDefaultEventProps(), props);
}