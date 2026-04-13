// noinspection TypeScriptUnresolvedReference

import {IReactXCellDivProps} from './types/IReactXCellDivProps';
import { DisplayType } from './types/DisplayType';
import {getReactProps} from '../react/getReactProps';

export function getTweetUserId(el: Element): string | undefined {
	return getTweetUserIdByProps(getReactProps(el)!);
}

/**
 * 获取 tweet 的用户 ID
 * @param props React 组件属性
 * @returns 用户 ID，如果不存在则返回 undefined
 */
export function getTweetUserIdByProps(props: IReactXCellDivProps): string | undefined {
	// 检查 displayType
	let displayType: DisplayType | undefined;

	// 尝试从不同路径获取 displayType
	if (props.displayType) {
		displayType = props.displayType;
	} else if (props.children?.displayType) {
		displayType = props.children.displayType;
	} else if (props.children?.props?.displayType) {
		displayType = props.children.props.displayType;
	} else if (props.children?.props?.children?.props?.displayType) {
		displayType = props.children.props.children.props.displayType;
	} else if (props.entry?.content?.displayType) {
		displayType = props.entry.content.displayType;
	} else if (props.children?.entry?.content?.displayType) {
		displayType = props.children.entry.content.displayType;
	} else if (props.children?.props?.entry?.content?.displayType) {
		displayType = props.children.props.entry.content.displayType;
	} else if (props.children?.props?.children?.props?.entry?.content?.displayType) {
		displayType = props.children.props.children.props.entry.content.displayType;
	}

	// 如果 displayType 为 User，尝试获取用户 ID
	if (displayType === 'User') {
		// 尝试从不同路径获取用户 ID
		if (props.entry?.content?.id) {
			return props.entry.content.id;
		} else if (props.children?.entry?.content?.id) {
			return props.children.entry.content.id;
		} else if (props.children?.props?.entry?.content?.id) {
			return props.children.props.entry.content.id;
		} else if (props.children?.props?.children?.props?.entry?.content?.id) {
			return props.children.props.children.props.entry.content.id;
		} else if (props.item?.id) {
			return props.item.id;
		} else if (props.children?.item?.id) {
			return props.children.item.id;
		} else if (props.children?.props?.item?.id) {
			return props.children.props.item.id;
		} else if (props.item?.data?.content?.id) {
			return props.item.data.content.id;
		} else if (props.children?.item?.data?.content?.id) {
			return props.children.item.data.content.id;
		} else if (props.children?.props?.item?.data?.content?.id) {
			return props.children.props.item.data.content.id;
		}
	}

	return undefined;
}
