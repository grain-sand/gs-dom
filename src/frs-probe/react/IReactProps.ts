export interface IReactChildren<Props extends IReactProps> {
	$$typeof?: string;
	type?: string | Function | {
		$$typeof?: string;
		type?: {
			$$typeof?: string;
			render?: Function;
		};
		compare?: any;
		WrappedComponent?: {
			$$typeof?: string;
			type?: Function;
			compare?: any;
		};
		displayName?: string;
	};
	key?: string | null;
	ref?: any;
	props?: Props;
	_owner?: any;
}

export interface IReactProps<TEntry = any, TItem = any, Props extends IReactProps<TEntry, TItem> = IReactProps<TEntry, TItem>> {
	children?: Props;
	key?: string | null;
	ref?: any;
	$$typeof?: string;
	type?: string | Function;
	dir?: string | null;
	className?: string;
	style?: Partial<CSSStyleDeclaration>;
	"data-testid"?: string;
	viewRef?: Function;
	withInteractiveStyling?: boolean;
	renderEntry?: Function;
	isAnimationDisabled?: boolean;
	onAnimationEnded?: Function;
	onAnimationStarted?: Function;
	onHeightChanged?: Function;
	onVisible?: Function;
	positioningStyle?: {
		top?: any;
		transform?: string;
	};
	shouldAnimate?: boolean;
	translationTransitionStyle?: string;
	visible?: boolean;
	entry?: TEntry;
	item?: TItem;
}
