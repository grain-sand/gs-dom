const EventHandlerRegex = /^__reactEventHandlers/;

export interface IReactHandlers {
	onFocus?: (event: Event) => void
	onKeyDown?: (event: Event) => void
	onBlur?: (event: Event) => void
	onChange?: (event: Event) => void
	onClick?: (event?: Event) => void
	onCompositionStart?: (event?: Event) => void
	onCompositionEnd?: (event?: Event) => void
	placeholder?: string
	value?: string
}

export function getReactHandlers(el: Element): IReactHandlers | undefined {
	let key = Object.keys(el).find(key => EventHandlerRegex.test(key))
	if (key) {
		return el[key]
	}
}
