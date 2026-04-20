// noinspection TypeScriptUnresolvedReference

import {IReactXCellDivProps} from './types/IReactXCellDivProps';
import {DisplayType} from './types/DisplayType';
import {getReactProps} from '../react/getReactProps';

const DomIdReg = /status\/(\d+)/

export function getTweetId(el: Element): string | undefined {
	let id = getTweetIdByProps(getReactProps(el)!)
	if (id) {
		return id;
	}
	return getTweetIdByDom(el);
}

export function getTweetIdByDom(el: Element) {
	const href: string = (el?.querySelector('a[href*="/status/"]') as any)?.href
	return DomIdReg.exec(href || '')?.[1]
}

/**
 * 获取 Tweet 或 FocalTweet 类型的内容 ID
 * @param props React 组件属性
 * @returns 内容 ID，如果不存在则返回 undefined
 */
export function getTweetIdByProps(props: IReactXCellDivProps): string | undefined {
	// 尝试从 targetTweets 字段获取 tweet ID
	if (props.entry?.content?.targetTweets?.['0']) {
		return props.entry.content.targetTweets['0'];
	} else if (props.children?.entry?.content?.targetTweets?.['0']) {
		return props.children.entry.content.targetTweets['0'];
	} else if (props.children?.props?.entry?.content?.targetTweets?.['0']) {
		return props.children.props.entry.content.targetTweets['0'];
	} else if (props.children?.props?.children?.props?.entry?.content?.targetTweets?.['0']) {
		return props.children.props.children.props.entry.content.targetTweets['0'];
	}

	// 尝试从 url 字段提取 tweet ID
	if (props.entry?.content?.url?.url) {
		const tweetIdFromUrl = extractTweetIdFromUrl(props.entry.content.url.url);
		if (tweetIdFromUrl) {
			return tweetIdFromUrl;
		}
	} else if (props.children?.entry?.content?.url?.url) {
		const tweetIdFromUrl = extractTweetIdFromUrl(props.children.entry.content.url.url);
		if (tweetIdFromUrl) {
			return tweetIdFromUrl;
		}
	} else if (props.children?.props?.entry?.content?.url?.url) {
		const tweetIdFromUrl = extractTweetIdFromUrl(props.children.props.entry.content.url.url);
		if (tweetIdFromUrl) {
			return tweetIdFromUrl;
		}
	} else if (props.children?.props?.children?.props?.entry?.content?.url?.url) {
		const tweetIdFromUrl = extractTweetIdFromUrl(props.children.props.children.props.entry.content.url.url);
		if (tweetIdFromUrl) {
			return tweetIdFromUrl;
		}
	}

	// 尝试从 tweet.id_str 字段获取 tweet ID
	if (props.children?.['2']?.props?.tweet?.id_str) {
		return props.children?.['2'].props.tweet.id_str;
	} else if (props.children?.props?.tweet?.id_str) {
		return props.children.props.tweet.id_str;
	} else if (props.children?.props?.children?.props?.tweet?.id_str) {
		return props.children.props.children.props.tweet.id_str;
	}

	// 检查 displayType 是否为 Tweet、FocalTweet 或 MediaGrid
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

	// 只有当 displayType 为 Tweet、FocalTweet 或 MediaGrid 时才继续处理
	if (displayType !== 'Tweet' && displayType !== 'FocalTweet' && displayType !== 'MediaGrid') {
		// 检查是否为 home.json 类型的结构，其中 tweet 项在 children.sibling 中
		if (props.children?.sibling) {
			return getTweetIdFromSibling(props.children.sibling);
		}
		// 检查是否为 home.json 类型的结构，其中 tweet 项在 children._owner.sibling 中
		if (props.children?._owner?.sibling) {
			return getTweetIdFromSibling(props.children._owner.sibling);
		}
		// 检查是否为 home.json 类型的结构，其中 tweet 项在 children.props.sibling 中
		if (props.children?.props?.sibling) {
			return getTweetIdFromSibling(props.children.props.sibling);
		}
		// 检查是否为 home.json 类型的结构，其中 tweet 项在 children._owner.return.sibling 中
		if (props.children?._owner?.return?.sibling) {
			return getTweetIdFromSibling(props.children._owner.return.sibling);
		}
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
	} else if (props.item?.id) {
		contentId = props.item.id;
	} else if (props.children?.item?.id) {
		contentId = props.children.item.id;
	} else if (props.children?.props?.item?.id) {
		contentId = props.children.props.item.id;
	} else if (props.item?.data?.content?.id) {
		contentId = props.item.data.content.id;
	} else if (props.children?.item?.data?.content?.id) {
		contentId = props.children.item.data.content.id;
	} else if (props.children?.props?.item?.data?.content?.id) {
		contentId = props.children.props.item.data.content.id;
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
	} else if (props.item?.data?.entryId) {
		entryId = props.item.data.entryId;
	} else if (props.children?.item?.data?.entryId) {
		entryId = props.children.item.data.entryId;
	} else if (props.children?.props?.item?.data?.entryId) {
		entryId = props.children.props.item.data.entryId;
	}

	// 从 entryId 中提取 id（例如从 "tweet-123456" 中提取 "123456"）
	if (entryId && entryId.startsWith('tweet-')) {
		return entryId.substring('tweet-'.length);
	}

	// 所有尝试都失败，返回 undefined
	return undefined;
}

/**
 * 从 URL 中提取 tweet ID
 * @param url 包含 tweet ID 的 URL
 * @returns tweet ID，如果不存在则返回 undefined
 */
function extractTweetIdFromUrl(url: string): string | undefined {
	// 匹配 https://twitter.com/username/status/1234567890 格式的 URL
	const match = url.match(/\/status\/(\d+)/);
	if (match && match[1]) {
		return match[1];
	}
	return undefined;
}

/**
 * 从 sibling 节点中获取 tweet-id
 * @param sibling sibling 节点
 * @returns 内容 ID，如果不存在则返回 undefined
 */
function getTweetIdFromSibling(sibling: any): string | undefined {
	// 检查当前 sibling 是否包含 tweet 相关信息
	if (sibling.key && sibling.key.startsWith('tweet-')) {
		// 从 key 中提取 tweet-id
		return sibling.key.substring('tweet-'.length);
	}

	// 检查 sibling 的 props.item.id
	if (sibling.props?.item?.id && sibling.props.item.id.startsWith('tweet-')) {
		return sibling.props.item.id.substring('tweet-'.length);
	}

	// 检查 sibling 的 props.item.data.content.id
	if (sibling.props?.item?.data?.content?.id) {
		return sibling.props.item.data.content.id;
	}

	// 检查 sibling 的 props.item.data.entryId
	if (sibling.props?.item?.data?.entryId && sibling.props.item.data.entryId.startsWith('tweet-')) {
		return sibling.props.item.data.entryId.substring('tweet-'.length);
	}

	// 递归检查下一个 sibling
	if (sibling.sibling) {
		return getTweetIdFromSibling(sibling.sibling);
	}

	// 所有尝试都失败，返回 undefined
	return undefined;
}
