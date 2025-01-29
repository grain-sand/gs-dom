import {AtLeastOne} from "gs-base";
import {GDom} from "../gdom";
import {DomElOrArr} from "../com/BrowserTypes";
import {QuerySelector} from "../dom";

export type ElementUpdateFn = (elements: HTMLElement[], mutation?: MutationRecord) => void | Promise<void>;
export type GDomUpdateFn = (gdom: GDom<HTMLElement>, mutation?: MutationRecord) => void | Promise<void>;
export type TextNodeUpdateFn = (texts: Text[], mutation?: MutationRecord) => void | Promise<void>;

interface IElementUpdate {

	/**
	 * 当添加了元素节点时调用
	 */
	addedElements?: ElementUpdateFn;

	/**
	 * 当删除了元素节点时调用
	 */
	removedElements?: ElementUpdateFn;

	/**
	 * 当添加了元素时调用,参数将包装为`GDom`对象
	 */
	addedGDom?: GDomUpdateFn;

	/**
	 * 当删除了元素时调用,参数将包装为`GDom`对象
	 */
	removedGDom?: GDomUpdateFn;

}

interface ISelectorElementUpdate extends IElementUpdate {

	/**
	 * 当监听元素节点添加与删除时,需要匹配的选择器
	 */
	selector: QuerySelector
}

export type SelectorElementUpdate = AtLeastOne<ISelectorElementUpdate, 'addedElements' | 'removedElements' | 'addedGDom' | 'removedGDom'>;

type PartialIElementUpdate = Partial<IElementUpdate>;

interface IObserveArg extends PartialIElementUpdate {

	/**
	 * 是否监听子节点
	 */
	subtree?: boolean

	/**
	 * 属性节点改变时,是否提供旧值
	 */
	attributeOldValue?: boolean

	/**
	 * 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
	 */
	attributeFilter?: string[]

	/**
	 * 文本节点改变时,是否提供旧值
	 */
	textOldValue?: boolean

	/**
	 * 当属性节点的nodeValue发生改变时调用
	 * @param mutation
	 */
	changedAttributes?: (mutation: MutationRecord) => void | Promise<void>;

	/**
	 * 当文本节点的nodeValue发生改变时调用
	 * @param mutation
	 */
	changedText?: (mutation: MutationRecord) => void | Promise<void>;

	/**
	 * 当添加了任意节点时调用
	 * @param nodeList
	 * @param mutation
	 */
	addedNodes?: (nodeList: NodeList, mutation?: MutationRecord) => void | Promise<void>;

	/**
	 * 当添加了文本节点时调用
	 * @param texts
	 * @param mutation
	 */
	addedTexts?: TextNodeUpdateFn;

	/**
	 * 当删除了任意节点时调用
	 * @param nodeList
	 * @param mutation
	 */
	removedNodes?: (nodeList: NodeList, mutation?: MutationRecord) => void | Promise<void>;

	/**
	 * 当删除了文本节点时调用
	 * @param texts
	 * @param mutation
	 */
	removedTexts?: TextNodeUpdateFn;

	/**
	 * 当监听匹配选择器的元素节点添加与删除
	 */
	selectors?: SelectorElementUpdate[]

	/**
	 * 使用selectors时，是否匹配子孙元素
	 */
	deepMatch?: boolean

	/**
	 * 使用selectors时，是否立即触发一次
	 */
	immediate?: boolean

}

interface IByObserveArg extends IObserveArg{

	by?: DomElOrArr

}

export type ObserverArg = AtLeastOne<IObserveArg,
	'changedAttributes' | 'addedNodes' | 'addedElements' | 'addedTexts' | 'removedNodes' | 'removedElements' | 'removedTexts' | 'selectors'>;

export type ByObserverArg = AtLeastOne<IByObserveArg,
	'changedAttributes' | 'addedNodes' | 'addedElements' | 'addedTexts' | 'removedNodes' | 'removedElements' | 'removedTexts' | 'selectors'>;
