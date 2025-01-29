import {DomElOrArr} from "../com/BrowserTypes";

export interface IWaitFindArg {

	/**
	 * 是否遍历孙节点
	 */
	subtree?: boolean

	/**
	 * 超时时间,单位秒
	 * 默认为5分钟
	 */
	timeout?: number

	/**
	 * 超时后是否抛出异常
	 * 默认为false；超时后返回undefined
	 */
	throwError?: boolean

	/**
	 * 最小查找个数
	 * 默认为1
	 */
	minFindCount?: number

}

export interface IByWaitFindArg extends IWaitFindArg {

	by?: DomElOrArr

	gdom?: boolean
}

export interface IGdomByWaitFindArg extends IByWaitFindArg {

	gdom: true

}