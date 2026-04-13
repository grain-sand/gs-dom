// noinspection TypeScriptUnresolvedReference

import {IReactXCellDivProps, DisplayType} from './IReactXCellDivProps';

export function getTweetId(el: Element): string | undefined {
	return getTweetIdByProps(getReactProps(el))
}

/**
 * 获取 Tweet 或 FocalTweet 类型的内容 ID
 * @param props React 组件属性
 * @returns 内容 ID，如果不存在则返回 undefined
 */
export function getTweetIdByProps(props: IReactXCellDivProps): string | undefined {
	// 检查 displayType 是否为 Tweet 或 FocalTweet
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

	// 只有当 displayType 为 Tweet 或 FocalTweet 时才继续处理
	if (displayType !== 'Tweet' && displayType !== 'FocalTweet') {
		return undefined;
	}

	// 尝试从不同路径获取 content.id
	let contentId: string | undefined;

	if (props.entry?.content?.id) {
		contentId = props.entry.content.id;
	} else if (props.children?.entry?.content?.id) {
		contentId = props.children.entry.content.id;
	} else if (props.children?.props?.entry?.content?.id) {
		contentId = props.children.props.entry.content.id;
	} else if (props.children?.props?.children?.props?.entry?.content?.id) {
		contentId = props.children.props.children.props.entry.content.id;
	}

	// 如果找到 content.id，直接返回
	if (contentId) {
		return contentId;
	}

	// 如果 content.id 不存在，尝试从 entryId 分析
	let entryId: string | undefined;

	if (props.entry?.entryId) {
		entryId = props.entry.entryId;
	} else if (props.children?.entry?.entryId) {
		entryId = props.children.entry.entryId;
	} else if (props.children?.props?.entry?.entryId) {
		entryId = props.children.props.entry.entryId;
	} else if (props.children?.props?.children?.props?.entry?.entryId) {
		entryId = props.children.props.children.props.entry.entryId;
	}

	// 从 entryId 中提取 id（例如从 "tweet-123456" 中提取 "123456"）
	if (entryId && entryId.startsWith('tweet-')) {
		return entryId.substring('tweet-'.length);
	}

	// 所有尝试都失败，返回 undefined
	return undefined;
}
