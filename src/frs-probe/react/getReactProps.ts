import {IReactProps} from "./IReactProps";

const EventPropRegex = /^__reactProps/;

export function getReactProps<T extends IReactProps = IReactProps>(el: Element): T | undefined {
	let key = Object.keys(el).find(key => EventPropRegex.test(key))
	if (key) {
		return el[key]
	}
}
