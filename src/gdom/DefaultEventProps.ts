let defaultEventProps: any;

export function getDefaultEventProps(): any {
	return defaultEventProps || (defaultEventProps = {
		bubbles: true,
		cancelable: true,
		view: window
	});
}

export function setDefaultEventProps(props: any): any {
	return defaultEventProps = Object.assign(getDefaultEventProps(), props);
}