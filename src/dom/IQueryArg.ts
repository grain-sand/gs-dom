import {DomEl, DomElOrArr} from "../com/BrowserTypes";

export interface IQuerySelector {

	/**
	 * - `selector` 为`string`且起始为
	 *   - `^` 向所有父级查找
	 *   - `>` 仅从子级中查找
	 *   - `{` 向左面的兄弟元素查找
	 *   - `~` 向右面的兄弟元素查找
	 */
	selector: string

	/**
	 * 为`true`时仅返回可见元素
	 */
	visible?: boolean | 'checkParents'

	content?: string | RegExp

}

export type QuerySelector = string | IQuerySelector

/**
 *  - 查找顺序为
 *    1. `selector` 原始选择器
 *    2. `visible`  判断可见性
 *    3. `content`  判断内容
 *    4. `index`    返回对应索引
 */
export interface IIndexedQuerySelector extends IQuerySelector {

	/**
	 * 存在时将仅返回唯一值
	 * 为负数时, 从末尾开始查找
	 */
	index?: number

}

export type IndexedQuerySelector = string | IIndexedQuerySelector

export type IndexedSelectorOrArr = IndexedQuerySelector | IndexedQuerySelector[]

export interface IQueryArg {
	selectors: IndexedSelectorOrArr
	/**
	 * - 是否查找`by`
	 *   - `return`  在`by`查找到结果后后立即返回,不再查找子孙元素,否则查找子孙元素
	 *   - `continue` 不管在`by`中是否查找到结果,都将继续查找子孙元素
	 *   - `none`    不查找
	 */
	withBy?: 'return' | 'continue' | 'none'
}

export interface IByQueryArg extends IQueryArg {
	by?: DomElOrArr
	gdom?: boolean
}

export interface IGdomByQueryArg extends IByQueryArg {
	gdom: true
}

export interface IValidQueryArg extends Required<IByQueryArg> {
	selectors: IndexedQuerySelector[]
	by: DomEl[]
}

export type SimpleQueryFn = <El extends DomEl = DomEl>(arg: IndexedQuerySelector, by: DomElOrArr) => El[]