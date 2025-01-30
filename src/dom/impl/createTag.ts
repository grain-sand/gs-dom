import {IChildTagProps, ITagProps} from "../ITagProps";
import {isString} from "gs-base";

const TagRegex = /^\s*<?(\w+)\s*\/?>?\s*$/

export function createTag(tag: string | IChildTagProps, props: ITagProps | Object | undefined) {
	if (!isString(tag)) {
		tag = (tag as IChildTagProps).tag;
		props && (props = {...tag as any, ...props}) || (props = tag as any);
	}
	let els: HTMLElement[];
	const match = TagRegex.exec(tag as string);
	if (match?.[1]) {
		els = [document.createElement(match![1] as string) as any];
	} else {
		els = Array.from(new DOMParser().parseFromString(tag as string, "text/html").body.children as any || []);
	}
	return {
		els,
		validProps: props
	}
}